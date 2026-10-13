"""Phase-1 source-layer candidates with mandatory human review."""

from __future__ import annotations

import hashlib
import json
import math
import os
import re
import sqlite3
import sys
import tempfile
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from .ledger import CorpusLedger, LedgerError, LedgerIntegrityError, SourceNotFoundError


PROJECT_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_CANDIDATE_PATH = PROJECT_ROOT / "data" / "layers" / "genesis_1-3_candidates.json"
DEFAULT_DECISIONS_PATH = PROJECT_ROOT / "DECISIONS.md"


class PhaseOneError(Exception):
    """Raised when a phase-1 candidate or human review is invalid."""


@dataclass(frozen=True)
class LayerRunResult:
    source_id: str
    generated_count: int
    inserted_count: int
    pending_count: int
    hypothesis_ids: tuple[str, ...]

    def as_dict(self) -> dict[str, object]:
        return {
            "source_id": self.source_id,
            "generated_count": self.generated_count,
            "inserted_count": self.inserted_count,
            "pending_count": self.pending_count,
            "hypothesis_ids": list(self.hypothesis_ids),
            "human_review_required": True,
        }


_PHASE1_SCHEMA = """
CREATE TABLE IF NOT EXISTS layer_hypotheses (
    hypothesis_id TEXT PRIMARY KEY,
    dispute_key TEXT NOT NULL,
    model_id TEXT NOT NULL,
    source_id TEXT NOT NULL REFERENCES documents(source_id),
    hypothesis_json TEXT NOT NULL,
    confidence REAL CHECK (confidence IS NULL OR (confidence >= 0.0 AND confidence <= 1.0)),
    content_hash TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS human_review_queue (
    review_id TEXT PRIMARY KEY,
    subject_type TEXT NOT NULL CHECK (subject_type = 'layer_hypothesis'),
    subject_id TEXT NOT NULL REFERENCES layer_hypotheses(hypothesis_id),
    source_id TEXT NOT NULL REFERENCES documents(source_id),
    payload_json TEXT NOT NULL,
    content_hash TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS review_decisions (
    review_id TEXT PRIMARY KEY REFERENCES human_review_queue(review_id),
    action TEXT NOT NULL CHECK (action IN ('approve', 'reject')),
    human_approved INTEGER NOT NULL CHECK (human_approved = 1),
    confidence REAL,
    signer TEXT NOT NULL CHECK (length(trim(signer)) > 0),
    reason TEXT NOT NULL CHECK (length(trim(reason)) >= 20),
    decision_log_source_id TEXT NOT NULL REFERENCES documents(source_id),
    decision_log_start INTEGER NOT NULL CHECK (decision_log_start >= 0),
    decision_log_end INTEGER NOT NULL CHECK (decision_log_end > decision_log_start),
    created_at TEXT NOT NULL,
    CHECK (
        (action = 'approve' AND confidence IS NOT NULL AND confidence >= 0.0 AND confidence <= 1.0)
        OR (action = 'reject' AND confidence IS NULL)
    )
);

CREATE TRIGGER IF NOT EXISTS layer_hypotheses_no_update
BEFORE UPDATE ON layer_hypotheses
BEGIN
    SELECT RAISE(ABORT, 'layer hypotheses are immutable');
END;

CREATE TRIGGER IF NOT EXISTS layer_hypotheses_no_delete
BEFORE DELETE ON layer_hypotheses
BEGIN
    SELECT RAISE(ABORT, 'layer hypotheses are immutable');
END;

CREATE TRIGGER IF NOT EXISTS human_review_queue_no_update
BEFORE UPDATE ON human_review_queue
BEGIN
    SELECT RAISE(ABORT, 'review requests are immutable');
END;

CREATE TRIGGER IF NOT EXISTS human_review_queue_no_delete
BEFORE DELETE ON human_review_queue
BEGIN
    SELECT RAISE(ABORT, 'review requests are immutable');
END;

CREATE TRIGGER IF NOT EXISTS review_decisions_no_update
BEFORE UPDATE ON review_decisions
BEGIN
    SELECT RAISE(ABORT, 'review decisions are immutable');
END;

CREATE TRIGGER IF NOT EXISTS review_decisions_no_delete
BEFORE DELETE ON review_decisions
BEGIN
    SELECT RAISE(ABORT, 'review decisions are immutable');
END;

CREATE VIEW IF NOT EXISTS approved_layer_hypotheses AS
SELECT h.hypothesis_id, h.dispute_key, h.model_id, h.source_id,
       h.hypothesis_json, d.confidence, d.signer, d.reason,
       d.decision_log_source_id, d.decision_log_start, d.decision_log_end
FROM layer_hypotheses AS h
JOIN human_review_queue AS q ON q.subject_id = h.hypothesis_id
JOIN review_decisions AS d ON d.review_id = q.review_id
WHERE d.action = 'approve' AND d.human_approved = 1;
"""


def _canonical_json(value: dict[str, Any]) -> str:
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"))


def _hash_json(value: dict[str, Any]) -> str:
    return "sha256:" + hashlib.sha256(_canonical_json(value).encode("utf-8")).hexdigest()


class LayeringAgent:
    """Create auditable layer hypotheses; never activate one automatically."""

    def __init__(
        self,
        ledger: CorpusLedger | None = None,
        candidate_path: str | Path = DEFAULT_CANDIDATE_PATH,
        decisions_path: str | Path = DEFAULT_DECISIONS_PATH,
    ) -> None:
        self.ledger = ledger or CorpusLedger()
        self.candidate_path = Path(candidate_path)
        self.decisions_path = Path(decisions_path)
        self._ensure_schema()

    def _ensure_schema(self) -> None:
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)

    def _load_source(self, source_id: str | None, corpus_title: str) -> tuple[str, str]:
        self.ledger.verify()
        sources = self.ledger.sources()
        if source_id is None:
            matches = [source for source in sources if source["title"] == corpus_title]
            if len(matches) != 1:
                raise PhaseOneError(
                    f"expected exactly one source titled {corpus_title!r}; found {len(matches)}"
                )
            source_id = str(matches[0]["source_id"])
        else:
            matches = [source for source in sources if source["source_id"] == source_id]
            if not matches:
                raise SourceNotFoundError(source_id)

        metadata = matches[0]
        char_count = int(metadata["char_count"])
        source_text = self.ledger.locate_span(source_id, 0, char_count).text_span
        return source_id, source_text

    @staticmethod
    def _verse_lines(source_text: str) -> dict[tuple[int, int], tuple[int, int, str]]:
        result: dict[tuple[int, int], tuple[int, int, str]] = {}
        cursor = 0
        for line in source_text.splitlines(keepends=True):
            match = re.match(r"(\d+):(\d+)\s", line)
            if match:
                key = (int(match.group(1)), int(match.group(2)))
                if key in result:
                    raise PhaseOneError(f"duplicate verse label: {key[0]}:{key[1]}")
                result[key] = (cursor, cursor + len(line), line)
            cursor += len(line)
        return result

    @staticmethod
    def _resolve_verse_boundary(
        reference: str,
        verses: dict[tuple[int, int], tuple[int, int, str]],
        side: str,
    ) -> int:
        match = re.fullmatch(r"(\d+):(\d+)([ab]?)", reference)
        if match is None:
            raise PhaseOneError(f"malformed verse reference: {reference}")
        chapter, verse, suffix = int(match.group(1)), int(match.group(2)), match.group(3)
        key = (chapter, verse)
        if key not in verses:
            raise PhaseOneError(f"verse is absent from the ingested corpus: {reference}")
        line_start, line_end, line = verses[key]

        if suffix:
            if key != (2, 4):
                raise PhaseOneError(f"sub-verse anchors are only defined for Genesis 2:4: {reference}")
            marker = "in the day that the LORD God made the earth and the heavens,"
            local_boundary = line.find(marker)
            if local_boundary < 0:
                raise PhaseOneError(
                    "Genesis 2:4 split marker is absent; this candidate requires the recorded KJV text"
                )
            split = line_start + local_boundary
            if suffix == "a":
                return line_start if side == "start" else split
            return split if side == "start" else line_end

        return line_start if side == "start" else line_end

    def _resolve_span(
        self,
        source_id: str,
        source_text: str,
        verses: dict[tuple[int, int], tuple[int, int, str]],
        spec: dict[str, str],
    ) -> dict[str, object]:
        start = self._resolve_verse_boundary(spec["start_verse"], verses, "start")
        end = self._resolve_verse_boundary(spec["end_verse"], verses, "end")
        if end <= start or end > len(source_text):
            raise PhaseOneError(
                f"resolved span is empty or out of bounds: {spec['start_verse']}–{spec['end_verse']}"
            )
        location = self.ledger.locate_span(source_id, start, end)
        return location.as_dict()

    def _build_hypotheses(
        self,
        source_id: str,
        source_text: str,
        template: dict[str, Any],
    ) -> list[dict[str, Any]]:
        verses = self._verse_lines(source_text)
        hypotheses: list[dict[str, Any]] = []
        for definition in template["hypotheses"]:
            assignments = []
            for assignment in definition["assignments"]:
                spans = [
                    self._resolve_span(source_id, source_text, verses, spec)
                    for spec in assignment["span_specs"]
                ]
                assignments.append(
                    {
                        "layer_label": assignment["layer_label"],
                        "spans": spans,
                        "note": assignment["note"],
                    }
                )

            body: dict[str, Any] = {
                "schema_version": 1,
                "record_type": "layer_hypothesis",
                "dispute_key": template["dispute_key"],
                "source_id": source_id,
                "model_id": definition["model_id"],
                "label": definition["label"],
                "summary": definition["summary"],
                "assignments": assignments,
                "evidence_sources": template["evidence_sources"],
                "scope_note": template["scope_note"],
                "confidence": None,
                "status": "pending_human_review",
                "human_approved": False,
            }
            content_hash = _hash_json(body)
            hypothesis_id = content_hash
            review_id = _hash_json(
                {"kind": "human-review-request", "subject_type": "layer_hypothesis", "content_hash": content_hash}
            )
            body["layer_hypothesis_id"] = hypothesis_id
            body["content_hash"] = content_hash
            body["review_id"] = review_id
            hypotheses.append(body)
        return hypotheses

    def run(self, source_id: str | None = None) -> LayerRunResult:
        reconfigure = getattr(sys.stdout, "reconfigure", None)
        if reconfigure is not None:
            reconfigure(encoding="utf-8")
        print(
            "这是一个需要人工判断的决策点：阶段 1 的分层候选只入待审队列，"
            "置信度留空，未经人工签字不得作为有效分层。"
        )
        try:
            template = json.loads(self.candidate_path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as error:
            raise PhaseOneError(f"cannot load phase-1 candidate template: {error}") from error
        source_id, source_text = self._load_source(source_id, template["corpus_title"])
        hypotheses = self._build_hypotheses(source_id, source_text, template)

        inserted_count = 0
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.execute("BEGIN IMMEDIATE")
            try:
                now = datetime.now(timezone.utc).isoformat()
                for hypothesis in hypotheses:
                    content_hash = str(hypothesis["content_hash"])
                    hypothesis_id = str(hypothesis["layer_hypothesis_id"])
                    review_id = str(hypothesis["review_id"])
                    payload = _canonical_json(hypothesis)
                    existing = connection.execute(
                        "SELECT content_hash, hypothesis_json FROM layer_hypotheses WHERE hypothesis_id = ?",
                        (hypothesis_id,),
                    ).fetchone()
                    if existing is not None:
                        if (
                            str(existing["content_hash"]) != content_hash
                            or str(existing["hypothesis_json"]) != payload
                        ):
                            raise LedgerIntegrityError(
                                f"immutable layer hypothesis mismatch: {hypothesis_id}"
                            )
                        continue

                    connection.execute(
                        """INSERT INTO layer_hypotheses
                           (hypothesis_id, dispute_key, model_id, source_id,
                            hypothesis_json, confidence, content_hash, created_at)
                           VALUES (?, ?, ?, ?, ?, NULL, ?, ?)""",
                        (
                            hypothesis_id,
                            hypothesis["dispute_key"],
                            hypothesis["model_id"],
                            source_id,
                            payload,
                            content_hash,
                            now,
                        ),
                    )
                    connection.execute(
                        """INSERT INTO human_review_queue
                           (review_id, subject_type, subject_id, source_id,
                            payload_json, content_hash, created_at)
                           VALUES (?, 'layer_hypothesis', ?, ?, ?, ?, ?)""",
                        (
                            review_id,
                            hypothesis_id,
                            source_id,
                            payload,
                            content_hash,
                            now,
                        ),
                    )
                    inserted_count += 1
                connection.execute("COMMIT")
            except Exception:
                if connection.in_transaction:
                    connection.execute("ROLLBACK")
                raise

        review_items = self.list_reviews()
        pending_count = sum(item["decision"] is None for item in review_items)
        return LayerRunResult(
            source_id=source_id,
            generated_count=len(hypotheses),
            inserted_count=inserted_count,
            pending_count=pending_count,
            hypothesis_ids=tuple(str(item["layer_hypothesis_id"]) for item in hypotheses),
        )

    def list_reviews(self) -> tuple[dict[str, Any], ...]:
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            rows = connection.execute(
                """SELECT q.review_id, q.subject_id, q.source_id, q.payload_json,
                          d.action, d.human_approved, d.confidence, d.signer,
                          d.reason, d.decision_log_source_id,
                          d.decision_log_start, d.decision_log_end
                   FROM human_review_queue AS q
                   LEFT JOIN review_decisions AS d ON d.review_id = q.review_id
                   ORDER BY q.created_at, q.review_id"""
            ).fetchall()
        results: list[dict[str, Any]] = []
        for row in rows:
            hypothesis = json.loads(str(row["payload_json"]))
            results.append(
                {
                    "review_id": str(row["review_id"]),
                    "decision": None if row["action"] is None else str(row["action"]),
                    "human_approved": bool(row["human_approved"] or False),
                    "confidence": row["confidence"],
                    "signer": row["signer"],
                    "reason": row["reason"],
                    "decision_log_source_id": row["decision_log_source_id"],
                    "decision_log_char_range": (
                        None
                        if row["decision_log_start"] is None
                        else [int(row["decision_log_start"]), int(row["decision_log_end"])]
                    ),
                    "hypothesis": hypothesis,
                }
            )
        return tuple(results)

    def get_review(self, review_id: str) -> dict[str, Any]:
        for item in self.list_reviews():
            if item["review_id"] == review_id:
                return item
        raise PhaseOneError(f"review request not found: {review_id}")

    @staticmethod
    def _atomic_write(path: Path, text: str) -> None:
        path.parent.mkdir(parents=True, exist_ok=True)
        temporary_path: Path | None = None
        try:
            with tempfile.NamedTemporaryFile(
                mode="w",
                encoding="utf-8",
                newline="",
                prefix=".pending-",
                dir=path.parent,
                delete=False,
            ) as temporary:
                temporary.write(text)
                temporary.flush()
                os.fsync(temporary.fileno())
                temporary_path = Path(temporary.name)
            os.replace(temporary_path, path)
        finally:
            if temporary_path is not None and temporary_path.exists():
                temporary_path.unlink()

    def record_decision(
        self,
        review_id: str,
        *,
        action: str,
        signer: str,
        reason: str,
        confidence: float | None,
        human_approved: bool,
    ) -> dict[str, Any]:
        if human_approved is not True:
            raise PhaseOneError("human_approved=true must be explicit")
        if action not in {"approve", "reject"}:
            raise PhaseOneError("action must be approve or reject")
        if not signer.strip():
            raise PhaseOneError("signer must not be empty")
        if len(reason.strip()) < 20:
            raise PhaseOneError("review reason must contain at least 20 characters")
        if action == "approve":
            if confidence is None or not math.isfinite(confidence) or not 0.0 <= confidence <= 1.0:
                raise PhaseOneError("approval requires an explicit confidence between 0 and 1")
        elif confidence is not None:
            raise PhaseOneError("rejection must not assign a confidence score")

        review = self.get_review(review_id)
        if review["decision"] is not None:
            raise PhaseOneError(f"review already signed: {review_id}")
        hypothesis = review["hypothesis"]
        assignments = hypothesis["assignments"]
        source_refs = [
            (reference["source_id"], reference["char_range"])
            for assignment in assignments
            for reference in assignment["spans"]
        ]

        if not self.decisions_path.exists():
            raise PhaseOneError(f"decision log does not exist: {self.decisions_path}")
        existing_text = self.decisions_path.read_text(encoding="utf-8")
        if review_id in existing_text:
            raise PhaseOneError(
                "decision log already contains this review id; reconcile the prior interrupted review manually"
            )
        entry = "\n".join(
            [
                f"## Phase 1 人工审阅：{review_id}",
                "",
                f"- 决定：{action}",
                f"- 假设：{hypothesis['layer_hypothesis_id']}",
                f"- 审阅人：{signer.strip()}",
                f"- 理由：{reason.strip()}",
                f"- 置信度：{confidence if confidence is not None else '未指定'}",
                "- human_approved：true",
                "- 原文引用：",
                *[
                    f"  - {source_ref} [{char_range[0]}, {char_range[1]})"
                    for source_ref, char_range in source_refs
                ],
            ]
        )
        prefix = existing_text.rstrip("\n")
        separator = "\n\n" if prefix else ""
        new_text = prefix + separator + entry + "\n"
        decision_start = len(prefix + separator)
        decision_end = len(new_text)

        log_result = self.ledger.ingest_text(new_text, title="DECISIONS.md reviewed version")
        logged_span = self.ledger.locate_span(
            log_result.source_id,
            decision_start,
            decision_end,
        )
        if logged_span.text_span != new_text[decision_start:decision_end]:
            raise LedgerIntegrityError("decision log range did not round-trip")
        self._atomic_write(self.decisions_path, new_text)

        created_at = datetime.now(timezone.utc).isoformat()
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.execute("BEGIN IMMEDIATE")
            try:
                existing = connection.execute(
                    "SELECT 1 FROM review_decisions WHERE review_id = ?",
                    (review_id,),
                ).fetchone()
                if existing is not None:
                    raise PhaseOneError(f"review already signed: {review_id}")
                connection.execute(
                    """INSERT INTO review_decisions
                       (review_id, action, human_approved, confidence, signer, reason,
                        decision_log_source_id, decision_log_start, decision_log_end, created_at)
                       VALUES (?, ?, 1, ?, ?, ?, ?, ?, ?, ?)""",
                    (
                        review_id,
                        action,
                        confidence,
                        signer.strip(),
                        reason.strip(),
                        log_result.source_id,
                        decision_start,
                        decision_end,
                        created_at,
                    ),
                )
                connection.execute("COMMIT")
            except Exception:
                if connection.in_transaction:
                    connection.execute("ROLLBACK")
                raise
        return {
            "review_id": review_id,
            "decision": action,
            "human_approved": True,
            "signer": signer.strip(),
            "confidence": confidence,
            "decision_log_source_id": log_result.source_id,
            "decision_log_char_range": [decision_start, decision_end],
            "source_refs": source_refs,
        }
