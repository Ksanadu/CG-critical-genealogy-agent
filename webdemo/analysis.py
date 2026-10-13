"""Generic text-analysis API: ingest any UTF-8 text, score candidates, sign reconstructions.

Phase 1 (this module's first scope): generic ingest only. Later phases add
scoring (Phase 2) and signed reconstruction (Phase 3). All analysis jobs live
in the demo scratch ledger and never touch the formal ledger.
"""

from __future__ import annotations

import hashlib
import json
import sqlite3
from typing import Any

from critical_genealogy.falsifiability import validate_falsifiability_condition
from critical_genealogy.ledger import CorpusLedger, LedgerError

ANALYZE_ROUTES = [
    ("POST /api/analyze/ingest", "摄取任意 UTF-8 中英文文本，返回 source_id"),
    ("POST /api/analyze/run", "对候选算拟合分并排序（Phase 2）"),
    ("GET /api/analyze/result?job_id=", "最佳拟合 + 量化面板（Phase 2）"),
    ("POST /api/analyze/approve", "签字批准候选（Phase 3）"),
    ("GET /api/analyze/reconstruction?job_id=", "重构文本视图（Phase 3）"),
]

_JOB_SCHEMA = """
CREATE TABLE IF NOT EXISTS analysis_jobs (
    job_id TEXT PRIMARY KEY,
    source_id TEXT NOT NULL,
    title TEXT NOT NULL,
    candidates_json TEXT NOT NULL,
    ranking_json TEXT,
    approval_json TEXT,
    created_at TEXT NOT NULL
);
CREATE TRIGGER IF NOT EXISTS analysis_jobs_no_update
BEFORE UPDATE ON analysis_jobs
BEGIN
    SELECT RAISE(ABORT, 'analysis jobs are immutable; create a new job instead');
END;
CREATE TRIGGER IF NOT EXISTS analysis_jobs_no_delete
BEFORE DELETE ON analysis_jobs
BEGIN
    SELECT RAISE(ABORT, 'analysis jobs are immutable');
END;
"""
# Approval is a separate immutable row (never an UPDATE): job_id + ":approval:" + candidate_id.
_APPROVAL_KIND = "approval"


def _canonical(value: Any) -> str:
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"))


def _hash(value: Any) -> str:
    return "sha256:" + hashlib.sha256(_canonical(value).encode("utf-8")).hexdigest()


class AnalysisAPI:
    """Ingest + score + approve over the scratch ledger.

    The API never binds the formal ledger: it operates on the demo scratch
    ledger owned by DemoWriteAPI (rebuilt by POST /api/demo/reset). If no
    scratch ledger exists yet, the first ingest triggers an implicit reset so
    that generic text can never land in the formal database.
    """

    def __init__(self, scratch: Any) -> None:
        self.scratch = scratch

    @property
    def ledger(self) -> CorpusLedger:
        ledger = self.scratch.ensure_ledger()
        with ledger._connect() as connection:
            connection.executescript(_JOB_SCHEMA)
        return ledger

    # -- Phase 1: ingest ---------------------------------------------------
    def ingest(self, body: dict[str, Any]) -> dict[str, Any]:
        title = body.get("title", "")
        text = body.get("text", "")
        if not isinstance(title, str) or not title.strip():
            raise LedgerError("title must not be empty")
        if not isinstance(text, str) or not text:
            raise LedgerError("text must not be empty")
        if len(text.encode("utf-8")) > (1 << 20):
            raise LedgerError("text exceeds the 1MB demo ingest limit")
        result = self.ledger.ingest_text(text, title=title.strip())
        return {
            "ok": True,
            "source_id": result.source_id,
            "title": result.title,
            "byte_count": result.byte_count,
            "char_count": result.char_count,
            "unit_count": len(result.units),
            "already_present": result.already_present,
        }

    # -- Phase 2: mechanical fit scoring ------------------------------------
    # Fit rule v1 (deterministic, rescorable; see TEXT-ANALYSIS-GOALS.md §3):
    #   coverage/40 + condition/25 + diversity/20 + structure/15 = 100 max.
    # No semantic judgment anywhere: only span arithmetic, the existing
    # falsifiability validator, and presence checks on required fields.

    @staticmethod
    def _merge_spans(spans: list[tuple[int, int]]) -> list[tuple[int, int]]:
        merged: list[tuple[int, int]] = []
        for start, end in sorted(spans):
            if merged and start <= merged[-1][1]:
                merged = merged[:-1] + [(merged[-1][0], max(merged[-1][1], end))]
            else:
                merged.append((start, end))
        return merged

    @staticmethod
    def _validate_candidate(candidate: dict[str, Any]) -> tuple[str, list[tuple[int, int]], str, list[str], str]:
        candidate_id = candidate.get("candidate_id", "")
        raw_spans = candidate.get("spans", [])
        condition = candidate.get("condition", "")
        reasoning = candidate.get("reasoning_chain", [])
        label = candidate.get("label", "")
        if not isinstance(candidate_id, str) or not candidate_id.strip():
            raise LedgerError("each candidate needs a non-empty candidate_id")
        if not isinstance(raw_spans, list) or not raw_spans:
            raise LedgerError(f"candidate {candidate_id}: spans must be a non-empty list")
        spans: list[tuple[int, int]] = []
        for span in raw_spans:
            if (
                not isinstance(span, (list, tuple)) or len(span) != 2
                or not all(isinstance(v, int) and not isinstance(v, bool) for v in span)
                or span[1] <= span[0] or span[0] < 0
            ):
                raise LedgerError(f"candidate {candidate_id}: each span must be [start, end) ints")
            spans.append((span[0], span[1]))
        if not isinstance(condition, str) or not condition.strip():
            raise LedgerError(f"candidate {candidate_id}: condition must not be empty")
        if not isinstance(reasoning, list) or not reasoning:
            raise LedgerError(f"candidate {candidate_id}: reasoning_chain must be a non-empty list")
        if not isinstance(label, str):
            raise LedgerError(f"candidate {candidate_id}: label must be text")
        return candidate_id.strip(), spans, condition.strip(), reasoning, label.strip()

    def _score_candidate(
        self, source_id: str, char_count: int, candidate: dict[str, Any], parent_signed: bool
    ) -> dict[str, Any]:
        candidate_id, spans, condition, reasoning, label = self._validate_candidate(candidate)
        for start, end in spans:
            if end > char_count:
                raise LedgerError(f"candidate {candidate_id}: span [{start}, {end}) exceeds text length {char_count}")
            self.ledger.locate_span(source_id, start, end)
        merged = self._merge_spans(spans)
        covered = sum(end - start for start, end in merged)
        coverage_ratio = covered / char_count if char_count else 0.0
        coverage_pts = round(coverage_ratio * 40, 2)

        validation = validate_falsifiability_condition(condition)
        if validation.valid:
            condition_pts = min(25, 15 + 5 * len(validation.observable_classes))
        else:
            condition_pts = 0

        disjoint = len(merged)
        diversity_pts = 20 if disjoint >= 3 else (14 if disjoint == 2 else 8)

        missing = 0
        if not candidate.get("rule_id", ""):
            missing += 1
        if not candidate.get("mapping", ""):
            missing += 1
        if len([s for s in reasoning if isinstance(s, str) and s.strip()]) < 2:
            missing += 1
        if not parent_signed:
            missing += 1
        structure_pts = 15 - 5 * missing

        total = round(coverage_pts + condition_pts + diversity_pts + structure_pts, 2)
        return {
            "candidate_id": candidate_id,
            "label": label,
            "total": total,
            "breakdown": {
                "coverage": coverage_pts,
                "condition": condition_pts,
                "diversity": diversity_pts,
                "structure": structure_pts,
            },
            "coverage_ratio": round(coverage_ratio, 4),
            "condition_valid": validation.valid,
            "condition_classes": list(validation.observable_classes),
            "span_count": disjoint,
            "parent_signed": parent_signed,
        }

    def run(self, body: dict[str, Any]) -> dict[str, Any]:
        from datetime import datetime, timezone

        source_id = body.get("source_id", "")
        candidates = body.get("candidates", [])
        parent_signed = body.get("parent_signed", False)
        if not isinstance(source_id, str) or not source_id:
            raise LedgerError("source_id must not be empty")
        if not isinstance(candidates, list) or not candidates:
            raise LedgerError("candidates must be a non-empty list")
        if len(candidates) > 50:
            raise LedgerError("at most 50 candidates per job")
        seen: set[str] = set()
        for candidate in candidates:
            if not isinstance(candidate, dict):
                raise LedgerError("each candidate must be an object")
            cid = str(candidate.get("candidate_id", ""))
            if cid in seen:
                raise LedgerError(f"duplicate candidate_id: {cid}")
            seen.add(cid)
        ledger = self.ledger
        located = ledger.locate_span(source_id, 0, 1)
        _ = located
        with ledger._connect() as connection:
            row = connection.execute(
                "SELECT char_count FROM documents WHERE source_id = ?", (source_id,)
            ).fetchone()
            if row is None:
                raise LedgerError(f"unknown source_id: {source_id}")
            char_count = int(row["char_count"])
        scored = [self._score_candidate(source_id, char_count, c, bool(parent_signed)) for c in candidates]
        scored.sort(key=lambda s: (-s["total"], s["candidate_id"]))
        best = scored[0]["total"]
        joint_top = [s["candidate_id"] for s in scored if best - s["total"] <= 3]
        ranking = {
            "ordered": scored,
            "best_id": scored[0]["candidate_id"],
            "best_total": best,
            "runner_up_gap": round(best - scored[1]["total"], 2) if len(scored) > 1 else None,
            "joint_top": joint_top,
            "status": "fit_ranking_machine_computed_unsigned",
        }
        job_id = _hash({"source_id": source_id, "candidates": candidates, "parent_signed": bool(parent_signed)})
        created_at = datetime.now(timezone.utc).isoformat()
        with ledger._connect() as connection:
            connection.execute(
                "INSERT OR IGNORE INTO analysis_jobs (job_id, source_id, title, candidates_json,"
                " ranking_json, approval_json, created_at) VALUES (?, ?, ?, ?, ?, NULL, ?)",
                (job_id, source_id, str(body.get("title", "")), _canonical(candidates),
                 _canonical(ranking), created_at),
            )
        return {"ok": True, "job_id": job_id, "ranking": ranking}

    def result(self, job_id: str) -> dict[str, Any]:
        job = self._load_job(job_id)
        ledger = job["ledger"]
        source_id = job["source_id"]
        ranking = job["ranking"]
        ordered = ranking["ordered"]
        candidates = job["candidates"]
        with ledger._connect() as connection:
            unit_count = connection.execute(
                "SELECT COUNT(*) FROM ledger_entries WHERE source_id = ?", (source_id,)
            ).fetchone()[0]
            char_count = int(connection.execute(
                "SELECT char_count FROM documents WHERE source_id = ?", (source_id,)
            ).fetchone()["char_count"])
        # evidence coverage: union of all candidate spans / char_count
        all_spans: list[tuple[int, int]] = []
        for scored in ordered:
            for candidate in candidates:
                if candidate.get("candidate_id") == scored["candidate_id"]:
                    all_spans += [(s[0], s[1]) for s in candidate["spans"]]
        merged = self._merge_spans(all_spans)
        covered = sum(e - s for s, e in merged)
        valid_conditions = sum(1 for s in ordered if s["condition_valid"])
        approvals = job["approvals"]
        confidences = [a["confidence"] for a in approvals if a.get("confidence") is not None]
        panel = {
            "fit_detail": [
                {"candidate_id": s["candidate_id"], "label": s["label"], "total": s["total"],
                 "breakdown": s["breakdown"],
                 "gap_to_best": round(ranking["best_total"] - s["total"], 2)}
                for s in ordered
            ],
            "evidence_coverage": round(covered / char_count, 4) if char_count else 0.0,
            "residue_mark_ratio": "N/A",
            "parallel_branches": len(ranking["joint_top"]),
            "mean_confidence": round(sum(confidences) / len(confidences), 4) if confidences else "N/A",
            "condition_observability_rate": round(valid_conditions / len(ordered), 4),
            "trace_integrity": "signed" if approvals else "N/A (no signed conclusions yet)",
            "ledger": ledger.verify().as_dict(),
            "unit_count": unit_count,
        }
        return {
            "ok": True, "job_id": job_id, "source_id": source_id, "title": job["title"],
            "status": ranking["status"], "best_id": ranking["best_id"],
            "joint_top": ranking["joint_top"], "runner_up_gap": ranking["runner_up_gap"],
            "ranking": ordered, "metrics": panel,
            "approvals": approvals,
            "approval": approvals[0] if approvals else None,
        }

    # -- Phase 3: sign-off + reconstruction ----------------------------------
    def _load_job(self, job_id: str) -> dict[str, Any]:
        ledger = self.ledger
        with ledger._connect() as connection:
            row = connection.execute(
                "SELECT source_id, title, candidates_json, ranking_json, created_at"
                " FROM analysis_jobs WHERE job_id = ? AND approval_json IS NULL",
                (job_id,),
            ).fetchone()
            if row is None:
                # either unknown, or this row is an approval row, not a job row
                exists = connection.execute(
                    "SELECT 1 FROM analysis_jobs WHERE job_id = ?", (job_id,)
                ).fetchone()
                if exists is None:
                    raise LedgerError(f"unknown job_id: {job_id}")
                raise LedgerError("job_id refers to an approval record, not an analysis job")
            approvals = connection.execute(
                "SELECT approval_json FROM analysis_jobs"
                " WHERE job_id LIKE ? AND approval_json IS NOT NULL",
                (job_id + ":approval:%",),
            ).fetchall()
        return {
            "ledger": ledger,
            "source_id": str(row["source_id"]),
            "title": str(row["title"]),
            "candidates": json.loads(str(row["candidates_json"])),
            "ranking": json.loads(str(row["ranking_json"])),
            "created_at": str(row["created_at"]),
            "approvals": [json.loads(str(a["approval_json"])) for a in approvals],
        }

    def approve(self, body: dict[str, Any]) -> dict[str, Any]:
        from datetime import datetime, timezone

        job_id = body.get("job_id", "")
        candidate_id = body.get("candidate_id", "")
        signer = body.get("signer", "")
        reason = body.get("reason", "")
        confidence = body.get("confidence")
        human_approved = body.get("human_approved", False)
        if not isinstance(job_id, str) or not job_id:
            raise LedgerError("job_id must not be empty")
        if human_approved is not True:
            raise LedgerError("human_approved=true must be explicit")
        if not isinstance(signer, str) or not signer.strip():
            raise LedgerError("signer must not be empty")
        if not isinstance(reason, str) or len(reason.strip()) < 20:
            raise LedgerError("reason must contain at least 20 characters")
        if (
            not isinstance(confidence, (int, float)) or isinstance(confidence, bool)
            or not 0.0 <= float(confidence) <= 1.0
        ):
            raise LedgerError("confidence must be a number in [0, 1]")
        job = self._load_job(job_id)
        candidates = {c.get("candidate_id"): c for c in job["candidates"]}
        if candidate_id not in candidates:
            raise LedgerError(f"unknown candidate_id for this job: {candidate_id}")
        candidate = candidates[candidate_id]
        spans = [(s[0], s[1]) for s in candidate["spans"]]
        for start, end in spans:
            job["ledger"].locate_span(job["source_id"], start, end)
        approval = {
            "job_id": job_id,
            "candidate_id": candidate_id,
            "action": "approve",
            "signer": signer.strip(),
            "reason": reason.strip(),
            "confidence": float(confidence),
            "human_approved": True,
            "source_id": job["source_id"],
            "spans": spans,
            "approved_at": datetime.now(timezone.utc).isoformat(),
        }
        approval_id = job_id + ":approval:" + candidate_id
        with job["ledger"]._connect() as connection:
            connection.execute(
                "INSERT OR IGNORE INTO analysis_jobs (job_id, source_id, title, candidates_json,"
                " ranking_json, approval_json, created_at) VALUES (?, ?, ?, ?, NULL, ?, ?)",
                (approval_id, job["source_id"], job["title"], _canonical([candidate]),
                 _canonical(approval), approval["approved_at"]),
            )
        return {"ok": True, "approval_id": approval_id, "approval": approval}

    def reconstruction(self, job_id: str) -> dict[str, Any]:
        job = self._load_job(job_id)
        if not job["approvals"]:
            return {
                "ok": True, "job_id": job_id, "status": "pending_signature",
                "message": "重构文本尚未存在：请先对某条候选签字（POST /api/analyze/approve），签字前只有拟合排序与量化面板。",
                "candidates_pending": [c.get("candidate_id") for c in job["candidates"]],
            }
        sentences = []
        for approval in job["approvals"]:
            ledger = job["ledger"]
            for start, end in approval["spans"]:
                located = ledger.locate_span(approval["source_id"], start, end).as_dict()
                sentences.append(
                    {
                        "text": located["text_span"],
                        "source_id": approval["source_id"],
                        "char_range": located["char_range"],
                        "unit_ids": located["unit_ids"],
                        "candidate_id": approval["candidate_id"],
                        "signer": approval["signer"],
                        "confidence": approval["confidence"],
                        "trace": f"/api/analyze/reconstruction?job_id={job_id}",
                    }
                )
        return {
            "ok": True, "job_id": job_id, "status": "signed",
            "approvals": job["approvals"],
            "sentences": sentences,
            "note": "每句断言均可回溯到原文跨度与签字记录；点不进去的句子不会出现在这里。",
        }


def dispatch_analyze(api: AnalysisAPI, path: str, body: dict[str, Any]) -> tuple[int, Any]:
    from urllib.parse import parse_qs, urlparse

    parsed = urlparse(path)
    route = parsed.path
    params = {key: values[-1] for key, values in parse_qs(parsed.query).items()}
    try:
        if route == "/api/analyze/ingest":
            return 200, api.ingest(body)
        if route == "/api/analyze/run":
            return 200, api.run(body)
        if route == "/api/analyze/result":
            if not params.get("job_id"):
                raise LedgerError("missing job_id")
            return 200, api.result(params["job_id"])
        if route == "/api/analyze/approve":
            return 200, api.approve(body)
        if route == "/api/analyze/reconstruction":
            if not params.get("job_id"):
                raise LedgerError("missing job_id")
            return 200, api.reconstruction(params["job_id"])
        return 404, {"ok": False, "error": f"unknown path: {route}"}
    except (LedgerError, OSError, sqlite3.Error, ValueError, KeyError) as error:
        return 400, {"ok": False, "error": str(error) or type(error).__name__}
