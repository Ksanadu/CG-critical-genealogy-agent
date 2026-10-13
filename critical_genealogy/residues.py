"""Phase-4 probe candidates, human timeline, and non-automatic backtests."""

from __future__ import annotations

import hashlib
import json
import math
import os
import random
import sqlite3
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Sequence

from .graph import _PHASE3_SCHEMA
from .layering import DEFAULT_DECISIONS_PATH, _PHASE1_SCHEMA
from .ledger import CorpusLedger, LedgerIntegrityError
from .proposals import _PHASE2_SCHEMA


class PhaseFourError(Exception):
    """Raised when a probe, timeline, backtest, or weight request is invalid."""


PROBE_TABLES = {
    "lacan_residue": "residue_candidates",
    "deleuze_singularity": "singularity_candidates",
    "badiou_event_site": "event_site_candidates",
}


def _canonical_json(value: Any) -> str:
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"))


def _hash_json(value: dict[str, Any]) -> str:
    return "sha256:" + hashlib.sha256(_canonical_json(value).encode("utf-8")).hexdigest()


def _signed_text(value: str, field: str, minimum: int = 1) -> str:
    if not isinstance(value, str) or len(value.strip()) < minimum:
        raise PhaseFourError(f"{field} must contain at least {minimum} characters")
    return value.strip()


def _validate_interval(start: int, end: int, name: str) -> None:
    if (
        not isinstance(start, int)
        or isinstance(start, bool)
        or not isinstance(end, int)
        or isinstance(end, bool)
        or end < start
    ):
        raise PhaseFourError(f"{name} must be an ordered pair of signed integer years")


def _interval_gap(left_start: int, left_end: int, right_start: int, right_end: int) -> int:
    if left_end < right_start:
        return right_start - left_end
    if right_end < left_start:
        return left_start - right_end
    return 0


_CANDIDATE_TABLES = """
CREATE TABLE IF NOT EXISTS residue_candidates (
    candidate_id TEXT PRIMARY KEY,
    graph_version_id TEXT NOT NULL REFERENCES graph_versions(version_id),
    civilization TEXT NOT NULL CHECK (length(trim(civilization)) > 0),
    signal TEXT NOT NULL CHECK (length(trim(signal)) > 0),
    rationale TEXT NOT NULL CHECK (length(trim(rationale)) > 0),
    year_start INTEGER NOT NULL,
    year_end INTEGER NOT NULL CHECK (year_end >= year_start),
    graph_refs_json TEXT NOT NULL,
    source_refs_json TEXT NOT NULL,
    content_hash TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS singularity_candidates (
    candidate_id TEXT PRIMARY KEY,
    graph_version_id TEXT NOT NULL REFERENCES graph_versions(version_id),
    civilization TEXT NOT NULL CHECK (length(trim(civilization)) > 0),
    signal TEXT NOT NULL CHECK (length(trim(signal)) > 0),
    rationale TEXT NOT NULL CHECK (length(trim(rationale)) > 0),
    year_start INTEGER NOT NULL,
    year_end INTEGER NOT NULL CHECK (year_end >= year_start),
    graph_refs_json TEXT NOT NULL,
    source_refs_json TEXT NOT NULL,
    content_hash TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS event_site_candidates (
    candidate_id TEXT PRIMARY KEY,
    graph_version_id TEXT NOT NULL REFERENCES graph_versions(version_id),
    civilization TEXT NOT NULL CHECK (length(trim(civilization)) > 0),
    signal TEXT NOT NULL CHECK (length(trim(signal)) > 0),
    rationale TEXT NOT NULL CHECK (length(trim(rationale)) > 0),
    year_start INTEGER NOT NULL,
    year_end INTEGER NOT NULL CHECK (year_end >= year_start),
    graph_refs_json TEXT NOT NULL,
    source_refs_json TEXT NOT NULL,
    content_hash TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS probe_review_queue (
    review_id TEXT PRIMARY KEY,
    probe_id TEXT NOT NULL CHECK (probe_id IN ('lacan_residue', 'deleuze_singularity', 'badiou_event_site')),
    candidate_id TEXT NOT NULL,
    payload_json TEXT NOT NULL,
    content_hash TEXT NOT NULL,
    created_at TEXT NOT NULL,
    UNIQUE (probe_id, candidate_id)
);

CREATE TABLE IF NOT EXISTS probe_decisions (
    review_id TEXT PRIMARY KEY REFERENCES probe_review_queue(review_id),
    action TEXT NOT NULL CHECK (action IN ('keep', 'reject')),
    human_approved INTEGER NOT NULL CHECK (human_approved = 1),
    signer TEXT NOT NULL CHECK (length(trim(signer)) > 0),
    reason TEXT NOT NULL CHECK (length(trim(reason)) >= 20),
    decision_log_source_id TEXT NOT NULL REFERENCES documents(source_id),
    decision_log_start INTEGER NOT NULL CHECK (decision_log_start >= 0),
    decision_log_end INTEGER NOT NULL CHECK (decision_log_end > decision_log_start),
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS fracture_event_drafts (
    event_id TEXT PRIMARY KEY,
    civilization TEXT NOT NULL CHECK (length(trim(civilization)) > 0),
    label TEXT NOT NULL CHECK (length(trim(label)) > 0),
    year_start INTEGER NOT NULL,
    year_end INTEGER NOT NULL CHECK (year_end >= year_start),
    source_refs_json TEXT NOT NULL,
    content_hash TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS timeline_review_queue (
    review_id TEXT PRIMARY KEY,
    event_id TEXT NOT NULL UNIQUE REFERENCES fracture_event_drafts(event_id),
    payload_json TEXT NOT NULL,
    content_hash TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS timeline_decisions (
    review_id TEXT PRIMARY KEY REFERENCES timeline_review_queue(review_id),
    action TEXT NOT NULL CHECK (action IN ('approve', 'reject')),
    human_approved INTEGER NOT NULL CHECK (human_approved = 1),
    signer TEXT NOT NULL CHECK (length(trim(signer)) > 0),
    reason TEXT NOT NULL CHECK (length(trim(reason)) >= 20),
    decision_log_source_id TEXT NOT NULL REFERENCES documents(source_id),
    decision_log_start INTEGER NOT NULL CHECK (decision_log_start >= 0),
    decision_log_end INTEGER NOT NULL CHECK (decision_log_end > decision_log_start),
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS fracture_events (
    event_id TEXT PRIMARY KEY REFERENCES fracture_event_drafts(event_id),
    review_id TEXT NOT NULL UNIQUE REFERENCES timeline_review_queue(review_id),
    civilization TEXT NOT NULL,
    label TEXT NOT NULL,
    year_start INTEGER NOT NULL,
    year_end INTEGER NOT NULL,
    source_refs_json TEXT NOT NULL,
    human_approved INTEGER NOT NULL CHECK (human_approved = 1),
    signer TEXT NOT NULL,
    reason TEXT NOT NULL,
    decision_log_source_id TEXT NOT NULL REFERENCES documents(source_id),
    decision_log_start INTEGER NOT NULL,
    decision_log_end INTEGER NOT NULL,
    content_hash TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS backtest_runs (
    backtest_id TEXT PRIMARY KEY,
    graph_version_id TEXT NOT NULL REFERENCES graph_versions(version_id),
    civilization TEXT NOT NULL,
    tolerance_years INTEGER NOT NULL CHECK (tolerance_years >= 0),
    metrics_json TEXT NOT NULL,
    human_approved INTEGER NOT NULL CHECK (human_approved = 1),
    signer TEXT NOT NULL,
    reason TEXT NOT NULL,
    decision_log_source_id TEXT NOT NULL REFERENCES documents(source_id),
    decision_log_start INTEGER NOT NULL,
    decision_log_end INTEGER NOT NULL,
    content_hash TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS weight_change_drafts (
    weight_draft_id TEXT PRIMARY KEY,
    backtest_id TEXT NOT NULL REFERENCES backtest_runs(backtest_id),
    graph_version_id TEXT NOT NULL REFERENCES graph_versions(version_id),
    civilization TEXT NOT NULL,
    weights_json TEXT NOT NULL,
    rationale TEXT NOT NULL CHECK (length(trim(rationale)) >= 20),
    content_hash TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS weight_review_queue (
    review_id TEXT PRIMARY KEY,
    weight_draft_id TEXT NOT NULL UNIQUE REFERENCES weight_change_drafts(weight_draft_id),
    payload_json TEXT NOT NULL,
    content_hash TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS weight_decisions (
    review_id TEXT PRIMARY KEY REFERENCES weight_review_queue(review_id),
    action TEXT NOT NULL CHECK (action IN ('approve', 'reject')),
    weight_set_id TEXT,
    human_approved INTEGER NOT NULL CHECK (human_approved = 1),
    signer TEXT NOT NULL CHECK (length(trim(signer)) > 0),
    reason TEXT NOT NULL CHECK (length(trim(reason)) >= 20),
    decision_log_source_id TEXT NOT NULL REFERENCES documents(source_id),
    decision_log_start INTEGER NOT NULL CHECK (decision_log_start >= 0),
    decision_log_end INTEGER NOT NULL CHECK (decision_log_end > decision_log_start),
    created_at TEXT NOT NULL,
    CHECK (
        (action = 'approve' AND weight_set_id IS NOT NULL)
        OR (action = 'reject' AND weight_set_id IS NULL)
    )
);

CREATE TABLE IF NOT EXISTS probe_weights (
    weight_set_id TEXT PRIMARY KEY,
    review_id TEXT NOT NULL UNIQUE REFERENCES weight_review_queue(review_id),
    weight_draft_id TEXT NOT NULL UNIQUE REFERENCES weight_change_drafts(weight_draft_id),
    graph_version_id TEXT NOT NULL REFERENCES graph_versions(version_id),
    civilization TEXT NOT NULL,
    weights_json TEXT NOT NULL,
    human_approved INTEGER NOT NULL CHECK (human_approved = 1),
    signer TEXT NOT NULL,
    reason TEXT NOT NULL,
    decision_log_source_id TEXT NOT NULL REFERENCES documents(source_id),
    decision_log_start INTEGER NOT NULL,
    decision_log_end INTEGER NOT NULL,
    content_hash TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL
);

"""

_PHASE4_APPROVAL_TRIGGERS = """
CREATE TRIGGER IF NOT EXISTS fracture_events_require_signed_review
BEFORE INSERT ON fracture_events
WHEN NOT EXISTS (
    SELECT 1 FROM timeline_decisions AS d
    WHERE d.review_id = NEW.review_id AND d.action = 'approve' AND d.human_approved = 1
)
BEGIN
    SELECT RAISE(ABORT, 'human-approved timeline review is required');
END;

CREATE TRIGGER IF NOT EXISTS probe_weights_require_signed_review
BEFORE INSERT ON probe_weights
WHEN NOT EXISTS (
    SELECT 1 FROM weight_decisions AS d
    WHERE d.review_id = NEW.review_id AND d.action = 'approve'
      AND d.human_approved = 1 AND d.weight_set_id = NEW.weight_set_id
)
BEGIN
    SELECT RAISE(ABORT, 'human-approved weight review is required');
END;
"""


def _immutable_triggers() -> str:
    table_names = (
        "residue_candidates",
        "singularity_candidates",
        "event_site_candidates",
        "probe_review_queue",
        "probe_decisions",
        "fracture_event_drafts",
        "timeline_review_queue",
        "timeline_decisions",
        "fracture_events",
        "backtest_runs",
        "weight_change_drafts",
        "weight_review_queue",
        "weight_decisions",
        "probe_weights",
    )
    statements = []
    for table in table_names:
        statements.append(
            f"CREATE TRIGGER IF NOT EXISTS {table}_no_update BEFORE UPDATE ON {table} "
            "BEGIN SELECT RAISE(ABORT, 'phase-4 records are immutable'); END;"
        )
        statements.append(
            f"CREATE TRIGGER IF NOT EXISTS {table}_no_delete BEFORE DELETE ON {table} "
            "BEGIN SELECT RAISE(ABORT, 'phase-4 records are immutable'); END;"
        )
    return "\n".join(statements)


_PHASE4_SCHEMA = _CANDIDATE_TABLES + _PHASE4_APPROVAL_TRIGGERS + _immutable_triggers()


class ResidueProbeAgent:
    """Collect human-reviewed probe candidates, timeline events, and backtests."""

    def __init__(
        self,
        ledger: CorpusLedger | None = None,
        decisions_path: str | Path = DEFAULT_DECISIONS_PATH,
    ) -> None:
        self.ledger = ledger or CorpusLedger()
        self.decisions_path = Path(decisions_path)
        self._ensure_schema()

    def _ensure_schema(self) -> None:
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            connection.executescript(_PHASE3_SCHEMA)
            connection.executescript(_CANDIDATE_TABLES)
            for table, column in (
                ("fracture_events", "review_id"),
                ("weight_decisions", "weight_set_id"),
                ("probe_weights", "review_id"),
            ):
                columns = {
                    str(row["name"])
                    for row in connection.execute(f"PRAGMA table_info({table})").fetchall()
                }
                if column not in columns:
                    existing_rows = int(
                        connection.execute(f"SELECT COUNT(*) FROM {table}").fetchone()[0]
                    )
                    if existing_rows:
                        raise PhaseFourError(
                            f"Phase4 schema migration for {table}.{column} requires manual reconciliation"
                        )
                    connection.execute(f"ALTER TABLE {table} ADD COLUMN {column} TEXT")
            connection.execute(
                "CREATE UNIQUE INDEX IF NOT EXISTS fracture_events_review_id_unique "
                "ON fracture_events(review_id)"
            )
            connection.execute(
                "CREATE UNIQUE INDEX IF NOT EXISTS probe_weights_review_id_unique "
                "ON probe_weights(review_id)"
            )
            connection.executescript(_PHASE4_APPROVAL_TRIGGERS)
            connection.executescript(_immutable_triggers())

    def _resolve_source_refs(
        self,
        refs: Sequence[dict[str, Any]],
        allowed: Sequence[dict[str, Any]] | None = None,
    ) -> list[dict[str, Any]]:
        if not isinstance(refs, (list, tuple)) or not refs:
            raise PhaseFourError("at least one source reference is required")
        normalized: list[dict[str, Any]] = []
        for ref in refs:
            if not isinstance(ref, dict):
                raise PhaseFourError("source references must be structured objects")
            source_id = ref.get("source_id")
            char_range = ref.get("char_range")
            if (
                not isinstance(source_id, str)
                or not isinstance(char_range, (list, tuple))
                or len(char_range) != 2
                or any(not isinstance(value, int) or isinstance(value, bool) for value in char_range)
            ):
                raise PhaseFourError("source reference needs source_id and [start, end) char_range")
            if allowed is not None:
                if not any(
                    item.get("source_id") == source_id
                    and isinstance(item.get("char_range"), (list, tuple))
                    and int(item["char_range"][0]) <= char_range[0]
                    and char_range[1] <= int(item["char_range"][1])
                    for item in allowed
                ):
                    raise PhaseFourError("source span must be covered by its graph or timeline parent")
            normalized.append(
                self.ledger.locate_span(source_id, char_range[0], char_range[1]).as_dict()
            )
        return normalized

    def _graph_refs(self, graph_version_id: str, refs: Sequence[dict[str, str]]) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
        if not isinstance(refs, (list, tuple)) or not refs:
            raise PhaseFourError("each probe candidate must cite at least one graph node or edge")
        normalized: list[dict[str, Any]] = []
        allowed_source_refs: list[dict[str, Any]] = []
        with self.ledger._connect() as connection:
            version = connection.execute(
                "SELECT 1 FROM graph_versions WHERE version_id = ?", (graph_version_id,)
            ).fetchone()
            if version is None:
                raise PhaseFourError(f"graph version is not active: {graph_version_id}")
            for ref in refs:
                if not isinstance(ref, dict) or ref.get("ref_type") not in {"node", "edge"}:
                    raise PhaseFourError("graph_refs require ref_type=node|edge and ref_id")
                ref_type, ref_id = ref["ref_type"], ref.get("ref_id")
                if not isinstance(ref_id, str) or not ref_id:
                    raise PhaseFourError("graph ref_id must not be empty")
                table = "graph_nodes" if ref_type == "node" else "graph_edges"
                row = connection.execute(
                    f"SELECT source_refs_json FROM {table} WHERE node_id = ? AND version_id = ?"
                    if ref_type == "node"
                    else f"SELECT source_refs_json FROM {table} WHERE edge_id = ? AND version_id = ?",
                    (ref_id, graph_version_id),
                ).fetchone()
                if row is None:
                    raise PhaseFourError(f"graph reference is absent from version: {ref_id}")
                allowed_source_refs.extend(json.loads(str(row["source_refs_json"])))
                normalized.append({"ref_type": ref_type, "ref_id": ref_id})
        return normalized, allowed_source_refs

    def submit_probe_candidate(
        self,
        probe_id: str,
        *,
        graph_version_id: str,
        civilization: str,
        signal: str,
        rationale: str,
        year_start: int,
        year_end: int,
        graph_refs: Sequence[dict[str, str]],
        source_refs: Sequence[dict[str, Any]],
    ) -> dict[str, Any]:
        reconfigure = getattr(sys.stdout, "reconfigure", None)
        if reconfigure is not None:
            reconfigure(encoding="utf-8")
        print(
            "这是一个需要人工判断的决策点：探针标记只写入对应待审表，"
            "不能自动认定为 Residue/Singularity/EventSite。"
        )
        if probe_id not in PROBE_TABLES:
            raise PhaseFourError(f"unknown probe id: {probe_id}")
        civilization = _signed_text(civilization, "civilization")
        signal = _signed_text(signal, "signal")
        rationale = _signed_text(rationale, "rationale")
        _validate_interval(year_start, year_end, "probe time range")
        normalized_graph_refs, allowed_refs = self._graph_refs(graph_version_id, graph_refs)
        normalized_source_refs = self._resolve_source_refs(source_refs, allowed_refs)
        candidate_table = PROBE_TABLES[probe_id]
        body = {
            "record_type": f"{probe_id}_candidate",
            "probe_id": probe_id,
            "graph_version_id": graph_version_id,
            "civilization": civilization,
            "signal": signal,
            "rationale": rationale,
            "year_start": year_start,
            "year_end": year_end,
            "graph_refs": normalized_graph_refs,
            "source_refs": normalized_source_refs,
            "human_approved": False,
            "status": "pending_human_review",
        }
        content_hash = _hash_json(body)
        candidate_id = content_hash
        review_id = _hash_json({"kind": "probe-review", "probe_id": probe_id, "candidate_id": candidate_id})
        body["candidate_id"] = candidate_id
        body["review_id"] = review_id
        body["content_hash"] = content_hash
        payload = _canonical_json(body)
        created_at = datetime.now(timezone.utc).isoformat()

        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            connection.executescript(_PHASE3_SCHEMA)
            connection.executescript(_PHASE4_SCHEMA)
            connection.execute("BEGIN IMMEDIATE")
            try:
                existing = connection.execute(
                    f"SELECT content_hash FROM {candidate_table} WHERE candidate_id = ?",
                    (candidate_id,),
                ).fetchone()
                inserted = existing is None
                if existing is None:
                    connection.execute(
                        f"""INSERT INTO {candidate_table}
                           (candidate_id, graph_version_id, civilization, signal, rationale,
                            year_start, year_end, graph_refs_json, source_refs_json, content_hash, created_at)
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                        (
                            candidate_id,
                            graph_version_id,
                            civilization,
                            signal,
                            rationale,
                            year_start,
                            year_end,
                            _canonical_json(normalized_graph_refs),
                            _canonical_json(normalized_source_refs),
                            content_hash,
                            created_at,
                        ),
                    )
                    connection.execute(
                        """INSERT INTO probe_review_queue
                           (review_id, probe_id, candidate_id, payload_json, content_hash, created_at)
                           VALUES (?, ?, ?, ?, ?, ?)""",
                        (review_id, probe_id, candidate_id, payload, content_hash, created_at),
                    )
                elif str(existing["content_hash"]) != content_hash:
                    raise LedgerIntegrityError("immutable probe candidate hash mismatch")
                connection.execute("COMMIT")
            except Exception:
                if connection.in_transaction:
                    connection.execute("ROLLBACK")
                raise
        return {
            "candidate_id": candidate_id,
            "review_id": review_id,
            "probe_id": probe_id,
            "status": "pending_human_review",
            "human_approved": False,
            "inserted": inserted,
        }

    def list_probe_reviews(self, probe_id: str | None = None) -> tuple[dict[str, Any], ...]:
        if probe_id is not None and probe_id not in PROBE_TABLES:
            raise PhaseFourError(f"unknown probe id: {probe_id}")
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            connection.executescript(_PHASE3_SCHEMA)
            connection.executescript(_PHASE4_SCHEMA)
            sql = """SELECT q.review_id, q.probe_id, q.candidate_id, q.payload_json,
                            d.action, d.human_approved, d.signer, d.reason
                     FROM probe_review_queue AS q
                     LEFT JOIN probe_decisions AS d ON d.review_id = q.review_id"""
            parameters: tuple[Any, ...] = ()
            if probe_id is not None:
                sql += " WHERE q.probe_id = ?"
                parameters = (probe_id,)
            sql += " ORDER BY q.created_at, q.review_id"
            rows = connection.execute(sql, parameters).fetchall()
        return tuple(
            {
                "review_id": str(row["review_id"]),
                "probe_id": str(row["probe_id"]),
                "candidate_id": str(row["candidate_id"]),
                "action": row["action"],
                "human_approved": bool(row["human_approved"] or False),
                "signer": row["signer"],
                "reason": row["reason"],
                "candidate": json.loads(str(row["payload_json"])),
            }
            for row in rows
        )

    def _append_decision_log(self, title: str, lines: list[str]) -> tuple[str, int, int]:
        if not self.decisions_path.exists():
            raise PhaseFourError(f"decision log does not exist: {self.decisions_path}")
        current = self.decisions_path.read_text(encoding="utf-8")
        body = "\n".join(lines)
        prefix = current.rstrip("\n")
        separator = "\n\n" if prefix else ""
        new_text = prefix + separator + body + "\n"
        start, end = len(prefix + separator), len(new_text)
        stored = self.ledger.ingest_text(new_text, title=title)
        if self.ledger.locate_span(stored.source_id, start, end).text_span != new_text[start:end]:
            raise LedgerIntegrityError("Phase4 decision log span failed to round-trip")
        temporary_path: Path | None = None
        try:
            with tempfile.NamedTemporaryFile(
                mode="w", encoding="utf-8", newline="", prefix=".pending-",
                dir=self.decisions_path.parent, delete=False,
            ) as temporary:
                temporary.write(new_text)
                temporary.flush()
                os.fsync(temporary.fileno())
                temporary_path = Path(temporary.name)
            os.replace(temporary_path, self.decisions_path)
        finally:
            if temporary_path is not None and temporary_path.exists():
                temporary_path.unlink()
        return stored.source_id, start, end

    def decide_probe_candidate(
        self,
        review_id: str,
        *,
        action: str,
        signer: str,
        reason: str,
        human_approved: bool,
    ) -> dict[str, Any]:
        if human_approved is not True:
            raise PhaseFourError("human_approved=true must be explicit")
        if action not in {"keep", "reject"}:
            raise PhaseFourError("probe decision must be keep or reject")
        signer = _signed_text(signer, "signer")
        reason = _signed_text(reason, "reason", minimum=20)
        review = next((item for item in self.list_probe_reviews() if item["review_id"] == review_id), None)
        if review is None:
            raise PhaseFourError(f"probe review not found: {review_id}")
        if review["action"] is not None:
            raise PhaseFourError(f"probe review already signed: {review_id}")
        log_source_id, log_start, log_end = self._append_decision_log(
            "DECISIONS.md Phase4 probe review",
            [
                f"## Phase 4 probe 审阅：{review_id}",
                "",
                f"- probe：{review['probe_id']}",
                f"- candidate：{review['candidate_id']}",
                f"- 决定：{action}",
                f"- 审阅人：{signer}",
                f"- 理由：{reason}",
                "- human_approved：true",
            ],
        )
        created_at = datetime.now(timezone.utc).isoformat()
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            connection.executescript(_PHASE3_SCHEMA)
            connection.executescript(_PHASE4_SCHEMA)
            connection.execute("BEGIN IMMEDIATE")
            try:
                connection.execute(
                    """INSERT INTO probe_decisions
                       (review_id, action, human_approved, signer, reason,
                        decision_log_source_id, decision_log_start, decision_log_end, created_at)
                       VALUES (?, ?, 1, ?, ?, ?, ?, ?, ?)""",
                    (review_id, action, signer, reason, log_source_id, log_start, log_end, created_at),
                )
                connection.execute("COMMIT")
            except Exception:
                if connection.in_transaction:
                    connection.execute("ROLLBACK")
                raise
        return {"review_id": review_id, "action": action, "human_approved": True}

    def submit_timeline_event(
        self,
        *,
        civilization: str,
        label: str,
        year_start: int,
        year_end: int,
        source_refs: Sequence[dict[str, Any]],
    ) -> dict[str, Any]:
        reconfigure = getattr(sys.stdout, "reconfigure", None)
        if reconfigure is not None:
            reconfigure(encoding="utf-8")
        print("这是一个需要人工判断的决策点：断裂事件时间线由人类提供并审阅，系统不会自动标注历史事件。")
        civilization = _signed_text(civilization, "civilization")
        label = _signed_text(label, "event label")
        _validate_interval(year_start, year_end, "event time range")
        refs = self._resolve_source_refs(source_refs)
        body = {
            "record_type": "fracture_event_draft",
            "civilization": civilization,
            "label": label,
            "year_start": year_start,
            "year_end": year_end,
            "source_refs": refs,
            "human_approved": False,
        }
        content_hash = _hash_json(body)
        event_id = content_hash
        review_id = _hash_json({"kind": "timeline-review", "event_id": event_id})
        body["event_id"] = event_id
        body["review_id"] = review_id
        body["content_hash"] = content_hash
        payload = _canonical_json(body)
        created_at = datetime.now(timezone.utc).isoformat()
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            connection.executescript(_PHASE3_SCHEMA)
            connection.executescript(_PHASE4_SCHEMA)
            connection.execute("BEGIN IMMEDIATE")
            try:
                existing = connection.execute(
                    "SELECT content_hash, payload_json FROM timeline_review_queue WHERE review_id = ?",
                    (review_id,),
                ).fetchone()
                inserted = existing is None
                if existing is not None:
                    if str(existing["content_hash"]) != content_hash or str(existing["payload_json"]) != payload:
                        raise LedgerIntegrityError("immutable timeline draft mismatch")
                else:
                    connection.execute(
                        """INSERT INTO fracture_event_drafts
                           (event_id, civilization, label, year_start, year_end,
                            source_refs_json, content_hash, created_at)
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
                        (
                            event_id,
                            civilization,
                            label,
                            year_start,
                            year_end,
                            _canonical_json(refs),
                            content_hash,
                            created_at,
                        ),
                    )
                    connection.execute(
                        """INSERT INTO timeline_review_queue
                           (review_id, event_id, payload_json, content_hash, created_at)
                           VALUES (?, ?, ?, ?, ?)""",
                        (review_id, event_id, payload, content_hash, created_at),
                    )
                connection.execute("COMMIT")
            except Exception:
                if connection.in_transaction:
                    connection.execute("ROLLBACK")
                raise
        return {"event_id": event_id, "review_id": review_id, "inserted": inserted, "human_approved": False}

    def list_timeline_reviews(self) -> tuple[dict[str, Any], ...]:
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            connection.executescript(_PHASE3_SCHEMA)
            connection.executescript(_PHASE4_SCHEMA)
            rows = connection.execute(
                """SELECT q.review_id, q.payload_json, d.action, d.human_approved,
                          d.signer, d.reason
                   FROM timeline_review_queue AS q
                   LEFT JOIN timeline_decisions AS d ON d.review_id = q.review_id
                   ORDER BY q.created_at, q.review_id"""
            ).fetchall()
        return tuple(
            {
                "review_id": str(row["review_id"]),
                "action": row["action"],
                "human_approved": bool(row["human_approved"] or False),
                "signer": row["signer"],
                "reason": row["reason"],
                "event": json.loads(str(row["payload_json"])),
            }
            for row in rows
        )

    def decide_timeline_event(
        self,
        review_id: str,
        *,
        action: str,
        signer: str,
        reason: str,
        human_approved: bool,
    ) -> dict[str, Any]:
        if human_approved is not True:
            raise PhaseFourError("human_approved=true must be explicit")
        if action not in {"approve", "reject"}:
            raise PhaseFourError("timeline decision must be approve or reject")
        signer = _signed_text(signer, "signer")
        reason = _signed_text(reason, "reason", minimum=20)
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            connection.executescript(_PHASE3_SCHEMA)
            connection.executescript(_PHASE4_SCHEMA)
            request = connection.execute(
                "SELECT q.event_id, q.payload_json, d.action FROM timeline_review_queue AS q "
                "LEFT JOIN timeline_decisions AS d ON d.review_id=q.review_id WHERE q.review_id=?",
                (review_id,),
            ).fetchone()
        if request is None:
            raise PhaseFourError(f"timeline review not found: {review_id}")
        if request["action"] is not None:
            raise PhaseFourError(f"timeline review already signed: {review_id}")
        event = json.loads(str(request["payload_json"]))
        log_source_id, log_start, log_end = self._append_decision_log(
            "DECISIONS.md Phase4 timeline review",
            [
                f"## Phase 4 timeline 审阅：{review_id}",
                "",
                f"- event_id：{event['event_id']}",
                f"- 决定：{action}",
                f"- 审阅人：{signer}",
                f"- 理由：{reason}",
                "- human_approved：true",
            ],
        )
        created_at = datetime.now(timezone.utc).isoformat()
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            connection.executescript(_PHASE3_SCHEMA)
            connection.executescript(_PHASE4_SCHEMA)
            connection.execute("BEGIN IMMEDIATE")
            try:
                connection.execute(
                    """INSERT INTO timeline_decisions
                       (review_id, action, human_approved, signer, reason,
                        decision_log_source_id, decision_log_start, decision_log_end, created_at)
                       VALUES (?, ?, 1, ?, ?, ?, ?, ?, ?)""",
                    (review_id, action, signer, reason, log_source_id, log_start, log_end, created_at),
                )
                if action == "approve":
                    content = {
                        "event_id": event["event_id"],
                        "civilization": event["civilization"],
                        "label": event["label"],
                        "year_start": event["year_start"],
                        "year_end": event["year_end"],
                        "source_refs": event["source_refs"],
                        "human_approved": True,
                        "signer": signer,
                        "reason": reason,
                        "decision_log_source_id": log_source_id,
                        "decision_log_char_range": [log_start, log_end],
                    }
                    connection.execute(
                        """INSERT INTO fracture_events
                           (event_id, review_id, civilization, label, year_start, year_end,
                            source_refs_json, human_approved, signer, reason,
                            decision_log_source_id, decision_log_start, decision_log_end,
                            content_hash, created_at)
                           VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?)""",
                        (
                            event["event_id"],
                            review_id,
                            event["civilization"],
                            event["label"],
                            event["year_start"],
                            event["year_end"],
                            _canonical_json(event["source_refs"]),
                            signer,
                            reason,
                            log_source_id,
                            log_start,
                            log_end,
                            _hash_json(content),
                            created_at,
                        ),
                    )
                connection.execute("COMMIT")
            except Exception:
                if connection.in_transaction:
                    connection.execute("ROLLBACK")
                raise
        return {"review_id": review_id, "action": action, "human_approved": True}

    def run_backtest(
        self,
        *,
        graph_version_id: str,
        civilization: str,
        tolerance_years: int,
        signer: str,
        reason: str,
        human_approved: bool,
    ) -> dict[str, Any]:
        reconfigure = getattr(sys.stdout, "reconfigure", None)
        if reconfigure is not None:
            reconfigure(encoding="utf-8")
        print("这是一个需要人工判断的决策点：时间窗容差由人类明确指定，回测只产出原始匹配指标，不自动调权。")
        if human_approved is not True:
            raise PhaseFourError("human_approved=true must be explicit for a backtest run")
        civilization = _signed_text(civilization, "civilization")
        signer = _signed_text(signer, "signer")
        reason = _signed_text(reason, "reason", minimum=20)
        if not isinstance(tolerance_years, int) or isinstance(tolerance_years, bool) or tolerance_years < 0:
            raise PhaseFourError("tolerance_years must be a non-negative human-supplied integer")
        metrics: dict[str, Any] = {}
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            connection.executescript(_PHASE3_SCHEMA)
            connection.executescript(_PHASE4_SCHEMA)
            if connection.execute(
                "SELECT 1 FROM graph_versions WHERE version_id = ?", (graph_version_id,)
            ).fetchone() is None:
                raise PhaseFourError(f"graph version not found: {graph_version_id}")
            events = connection.execute(
                "SELECT year_start, year_end FROM fracture_events WHERE civilization = ? AND human_approved = 1",
                (civilization,),
            ).fetchall()
            if not events:
                raise PhaseFourError("backtest requires human-approved fracture timeline events")
            for probe_id, table in PROBE_TABLES.items():
                rows = connection.execute(
                    f"""SELECT c.candidate_id, c.year_start, c.year_end
                        FROM {table} AS c
                        JOIN probe_review_queue AS q
                          ON q.probe_id = ? AND q.candidate_id = c.candidate_id
                        JOIN probe_decisions AS d ON d.review_id = q.review_id
                        WHERE c.graph_version_id = ? AND c.civilization = ?
                          AND d.action = 'keep' AND d.human_approved = 1""",
                    (probe_id, graph_version_id, civilization),
                ).fetchall()
                if not rows:
                    raise PhaseFourError(f"backtest requires at least one human-kept {probe_id} signal")
                gaps = [
                    min(
                        _interval_gap(
                            int(candidate["year_start"]),
                            int(candidate["year_end"]),
                            int(event["year_start"]),
                            int(event["year_end"]),
                        )
                        for event in events
                    )
                    for candidate in rows
                ]
                matched = sum(gap <= tolerance_years for gap in gaps)
                metrics[probe_id] = {
                    "candidate_count": len(rows),
                    "timeline_event_count": len(events),
                    "matched_within_tolerance": matched,
                    "match_rate": matched / len(rows),
                    "mean_nearest_gap_years": sum(gaps) / len(gaps),
                }
        log_source_id, log_start, log_end = self._append_decision_log(
            "DECISIONS.md Phase4 backtest run",
            [
                f"## Phase 4 backtest：{graph_version_id}",
                "",
                f"- civilization：{civilization}",
                f"- tolerance_years：{tolerance_years}",
                f"- 审阅人：{signer}",
                f"- 理由：{reason}",
                f"- raw metrics：{_canonical_json(metrics)}",
                "- human_approved：true",
                "- weight changes applied：none",
            ],
        )
        created_at = datetime.now(timezone.utc).isoformat()
        run_payload = {
            "graph_version_id": graph_version_id,
            "civilization": civilization,
            "tolerance_years": tolerance_years,
            "metrics": metrics,
            "signer": signer,
            "reason": reason,
            "decision_log_source_id": log_source_id,
            "decision_log_char_range": [log_start, log_end],
        }
        backtest_id = _hash_json(run_payload)
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            connection.executescript(_PHASE3_SCHEMA)
            connection.executescript(_PHASE4_SCHEMA)
            connection.execute(
                """INSERT INTO backtest_runs
                   (backtest_id, graph_version_id, civilization, tolerance_years,
                    metrics_json, human_approved, signer, reason, decision_log_source_id,
                    decision_log_start, decision_log_end, content_hash, created_at)
                   VALUES (?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?)""",
                (
                    backtest_id,
                    graph_version_id,
                    civilization,
                    tolerance_years,
                    _canonical_json(metrics),
                    signer,
                    reason,
                    log_source_id,
                    log_start,
                    log_end,
                    _hash_json(run_payload),
                    created_at,
                ),
            )
        return {"backtest_id": backtest_id, "metrics": metrics, "weights_updated": False}

    def submit_weight_change(
        self,
        *,
        backtest_id: str,
        weights: dict[str, float],
        rationale: str,
    ) -> dict[str, Any]:
        reconfigure = getattr(sys.stdout, "reconfigure", None)
        if reconfigure is not None:
            reconfigure(encoding="utf-8")
        print("这是一个需要人工判断的决策点：探针权重由人类提出并签字，回测不会自动修改权重。")
        rationale = _signed_text(rationale, "rationale", minimum=20)
        if not isinstance(weights, dict) or set(weights) != set(PROBE_TABLES):
            raise PhaseFourError("weights must specify exactly lacan_residue, deleuze_singularity, badiou_event_site")
        normalized_weights: dict[str, float] = {}
        for probe_id, weight in weights.items():
            if not isinstance(weight, (int, float)) or isinstance(weight, bool) or not math.isfinite(float(weight)) or not 0.0 <= float(weight) <= 1.0:
                raise PhaseFourError(f"weight for {probe_id} must be a number in [0, 1]")
            normalized_weights[probe_id] = float(weight)
        if not math.isclose(sum(normalized_weights.values()), 1.0, abs_tol=1e-6):
            raise PhaseFourError("human-proposed probe weights must sum to 1")

        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            connection.executescript(_PHASE3_SCHEMA)
            connection.executescript(_PHASE4_SCHEMA)
            run = connection.execute(
                "SELECT graph_version_id, civilization FROM backtest_runs WHERE backtest_id = ?",
                (backtest_id,),
            ).fetchone()
        if run is None:
            raise PhaseFourError(f"backtest run not found: {backtest_id}")
        body = {
            "record_type": "probe_weight_draft",
            "backtest_id": backtest_id,
            "graph_version_id": str(run["graph_version_id"]),
            "civilization": str(run["civilization"]),
            "weights": normalized_weights,
            "rationale": rationale,
            "human_approved": False,
        }
        content_hash = _hash_json(body)
        draft_id = content_hash
        review_id = _hash_json({"kind": "probe-weight-review", "draft_id": draft_id})
        body["weight_draft_id"] = draft_id
        body["review_id"] = review_id
        body["content_hash"] = content_hash
        payload = _canonical_json(body)
        created_at = datetime.now(timezone.utc).isoformat()
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            connection.executescript(_PHASE3_SCHEMA)
            connection.executescript(_PHASE4_SCHEMA)
            connection.execute("BEGIN IMMEDIATE")
            try:
                connection.execute(
                    """INSERT INTO weight_change_drafts
                       (weight_draft_id, backtest_id, graph_version_id, civilization,
                        weights_json, rationale, content_hash, created_at)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
                    (
                        draft_id,
                        backtest_id,
                        run["graph_version_id"],
                        run["civilization"],
                        _canonical_json(normalized_weights),
                        rationale,
                        content_hash,
                        created_at,
                    ),
                )
                connection.execute(
                    """INSERT INTO weight_review_queue
                       (review_id, weight_draft_id, payload_json, content_hash, created_at)
                       VALUES (?, ?, ?, ?, ?)""",
                    (review_id, draft_id, payload, content_hash, created_at),
                )
                connection.execute("COMMIT")
            except Exception:
                if connection.in_transaction:
                    connection.execute("ROLLBACK")
                raise
        return {"weight_draft_id": draft_id, "review_id": review_id, "human_approved": False, "weights": normalized_weights}

    def list_weight_drafts(self) -> tuple[dict[str, Any], ...]:
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            connection.executescript(_PHASE3_SCHEMA)
            connection.executescript(_PHASE4_SCHEMA)
            rows = connection.execute(
                """SELECT q.review_id, q.payload_json, d.action, d.human_approved,
                          d.signer, d.reason
                   FROM weight_review_queue AS q
                   LEFT JOIN weight_decisions AS d ON d.review_id = q.review_id
                   ORDER BY q.created_at, q.review_id"""
            ).fetchall()
        return tuple(
            {
                "review_id": str(row["review_id"]),
                "action": row["action"],
                "human_approved": bool(row["human_approved"] or False),
                "signer": row["signer"],
                "reason": row["reason"],
                "draft": json.loads(str(row["payload_json"])),
            }
            for row in rows
        )

    def active_weights(self, civilization: str | None = None) -> tuple[dict[str, Any], ...]:
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            connection.executescript(_PHASE3_SCHEMA)
            connection.executescript(_PHASE4_SCHEMA)
            if civilization is None:
                rows = connection.execute(
                    "SELECT * FROM probe_weights ORDER BY created_at, weight_set_id"
                ).fetchall()
            else:
                rows = connection.execute(
                    "SELECT * FROM probe_weights WHERE civilization = ? ORDER BY created_at, weight_set_id",
                    (civilization,),
                ).fetchall()
        result = []
        for row in rows:
            item = dict(row)
            item["weights"] = json.loads(str(item.pop("weights_json")))
            result.append(item)
        return tuple(result)

    def decide_weight_change(
        self,
        review_id: str,
        *,
        action: str,
        signer: str,
        reason: str,
        human_approved: bool,
    ) -> dict[str, Any]:
        if human_approved is not True:
            raise PhaseFourError("human_approved=true must be explicit")
        if action not in {"approve", "reject"}:
            raise PhaseFourError("weight decision must be approve or reject")
        signer = _signed_text(signer, "signer")
        reason = _signed_text(reason, "reason", minimum=20)
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            connection.executescript(_PHASE3_SCHEMA)
            connection.executescript(_PHASE4_SCHEMA)
            row = connection.execute(
                """SELECT q.payload_json, d.action FROM weight_review_queue AS q
                   LEFT JOIN weight_decisions AS d ON d.review_id=q.review_id
                   WHERE q.review_id=?""",
                (review_id,),
            ).fetchone()
        if row is None:
            raise PhaseFourError(f"weight review not found: {review_id}")
        if row["action"] is not None:
            raise PhaseFourError(f"weight review already signed: {review_id}")
        draft = json.loads(str(row["payload_json"]))
        log_source_id, log_start, log_end = self._append_decision_log(
            "DECISIONS.md Phase4 probe weights",
            [
                f"## Phase 4 权重审阅：{review_id}",
                "",
                f"- 决定：{action}",
                f"- weights：{_canonical_json(draft['weights'])}",
                f"- 审阅人：{signer}",
                f"- 理由：{reason}",
                "- human_approved：true",
            ],
        )
        weight_set_id: str | None = None
        weight_body: dict[str, Any] | None = None
        if action == "approve":
            weight_body = {
                "review_id": review_id,
                "weight_draft_id": draft["weight_draft_id"],
                "graph_version_id": draft["graph_version_id"],
                "civilization": draft["civilization"],
                "weights": draft["weights"],
                "human_approved": True,
                "signer": signer,
                "reason": reason,
                "decision_log_source_id": log_source_id,
                "decision_log_char_range": [log_start, log_end],
            }
            weight_set_id = _hash_json(weight_body)
        created_at = datetime.now(timezone.utc).isoformat()
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            connection.executescript(_PHASE3_SCHEMA)
            connection.executescript(_PHASE4_SCHEMA)
            connection.execute("BEGIN IMMEDIATE")
            try:
                connection.execute(
                    """INSERT INTO weight_decisions
                       (review_id, action, weight_set_id, human_approved, signer, reason,
                        decision_log_source_id, decision_log_start, decision_log_end, created_at)
                       VALUES (?, ?, ?, 1, ?, ?, ?, ?, ?, ?)""",
                    (review_id, action, weight_set_id, signer, reason, log_source_id, log_start, log_end, created_at),
                )
                if action == "approve":
                    assert weight_body is not None and weight_set_id is not None
                    connection.execute(
                        """INSERT INTO probe_weights
                           (weight_set_id, review_id, weight_draft_id, graph_version_id, civilization,
                            weights_json, human_approved, signer, reason,
                            decision_log_source_id, decision_log_start, decision_log_end,
                            content_hash, created_at)
                           VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?)""",
                        (
                            weight_set_id,
                            review_id,
                            draft["weight_draft_id"],
                            draft["graph_version_id"],
                            draft["civilization"],
                            _canonical_json(draft["weights"]),
                            signer,
                            reason,
                            log_source_id,
                            log_start,
                            log_end,
                            _hash_json(weight_body),
                            created_at,
                        ),
                    )
                connection.execute("COMMIT")
            except Exception:
                if connection.in_transaction:
                    connection.execute("ROLLBACK")
                raise
        return {"review_id": review_id, "action": action, "weight_set_id": weight_set_id, "human_approved": True}
