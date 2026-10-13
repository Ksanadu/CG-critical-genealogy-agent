"""Phase-2 reduction drafts, schema gates, and signed proposal activation."""

from __future__ import annotations

import hashlib
import json
import math
import os
import random
import re
import sqlite3
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Sequence

from .falsifiability import validate_falsifiability_condition
from .layering import DEFAULT_DECISIONS_PATH, _PHASE1_SCHEMA
from .ledger import CorpusLedger, LedgerError, LedgerIntegrityError


class PhaseTwoError(Exception):
    """Raised when a reduction draft or human review fails its contract."""


class ProposalValidationError(PhaseTwoError):
    """Raised when an active Proposal record is incomplete or malformed."""


def _canonical_json(value: Any) -> str:
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"))


def _hash_json(value: dict[str, Any]) -> str:
    return "sha256:" + hashlib.sha256(_canonical_json(value).encode("utf-8")).hexdigest()


def _valid_score(value: object) -> bool:
    return (
        isinstance(value, (int, float))
        and not isinstance(value, bool)
        and math.isfinite(float(value))
        and 0.0 <= float(value) <= 1.0
    )


class ProposedReduction:
    """Validated active record; drafts cannot be cast to this type implicitly."""

    REQUIRED_FIELDS = (
        "proposal_id",
        "record_type",
        "rule_id",
        "confidence",
        "source_id",
        "reasoning_chain",
        "mapping",
        "falsifiability_condition",
        "source_refs",
        "parent_hypothesis_ids",
        "human_approved",
    )

    @classmethod
    def validate(cls, payload: dict[str, Any]) -> dict[str, Any]:
        missing = [field for field in cls.REQUIRED_FIELDS if field not in payload]
        if missing:
            raise ProposalValidationError(f"missing Proposal fields: {', '.join(missing)}")
        if payload["record_type"] != "proposal":
            raise ProposalValidationError("active reduction records must have record_type='proposal'")
        if not isinstance(payload["rule_id"], str) or not re.fullmatch(
            r"[A-Za-z0-9][A-Za-z0-9._-]{0,63}", payload["rule_id"]
        ):
            raise ProposalValidationError("rule_id must be a non-empty stable identifier")
        if not _valid_score(payload["confidence"]):
            raise ProposalValidationError("confidence must be an explicitly supplied number in [0, 1]")
        if payload["human_approved"] is not True:
            raise ProposalValidationError("an active Proposal requires human_approved=true")
        for field in ("source_id", "mapping", "falsifiability_condition"):
            if not isinstance(payload[field], str) or not payload[field].strip():
                raise ProposalValidationError(f"{field} must not be empty")
        reasoning = payload["reasoning_chain"]
        if not isinstance(reasoning, list) or not reasoning or any(
            not isinstance(step, str) or not step.strip() for step in reasoning
        ):
            raise ProposalValidationError("reasoning_chain must contain non-empty human-readable steps")
        if not isinstance(payload["proposal_id"], str) or not payload["proposal_id"].strip():
            raise ProposalValidationError("proposal_id must not be empty")
        refs = payload["source_refs"]
        if not isinstance(refs, list) or not refs or any(not isinstance(reference, dict) for reference in refs):
            raise ProposalValidationError("source_refs must contain structured source spans")
        if not any(reference.get("source_id") == payload["source_id"] for reference in refs):
            raise ProposalValidationError("source_id must be represented in source_refs")
        parents = payload["parent_hypothesis_ids"]
        if not isinstance(parents, list) or not parents or any(not isinstance(parent, str) or not parent for parent in parents):
            raise ProposalValidationError("parent_hypothesis_ids must name a reviewed layer hypothesis")
        condition_result = validate_falsifiability_condition(payload["falsifiability_condition"])
        if not condition_result.valid:
            raise ProposalValidationError(
                "falsifiability_condition failed mechanical validation: "
                + "; ".join(condition_result.reasons)
            )
        return dict(payload)


_PHASE2_SCHEMA = """
CREATE TABLE IF NOT EXISTS reduction_drafts (
    draft_id TEXT PRIMARY KEY,
    record_type TEXT NOT NULL CHECK (record_type = 'proposal_draft'),
    source_id TEXT NOT NULL REFERENCES documents(source_id),
    draft_json TEXT NOT NULL,
    content_hash TEXT NOT NULL,
    condition_valid INTEGER NOT NULL CHECK (condition_valid IN (0, 1)),
    confidence REAL CHECK (confidence IS NULL),
    human_approved INTEGER NOT NULL CHECK (human_approved = 0),
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS reduction_review_queue (
    review_id TEXT PRIMARY KEY,
    draft_id TEXT NOT NULL UNIQUE REFERENCES reduction_drafts(draft_id),
    payload_json TEXT NOT NULL,
    content_hash TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS proposals (
    proposal_id TEXT PRIMARY KEY,
    draft_id TEXT NOT NULL UNIQUE REFERENCES reduction_drafts(draft_id),
    review_id TEXT NOT NULL UNIQUE REFERENCES reduction_review_queue(review_id),
    record_type TEXT NOT NULL CHECK (record_type = 'proposal'),
    rule_id TEXT NOT NULL CHECK (length(trim(rule_id)) > 0),
    confidence REAL NOT NULL CHECK (
        typeof(confidence) IN ('integer', 'real') AND confidence >= 0.0 AND confidence <= 1.0
    ),
    source_id TEXT NOT NULL REFERENCES documents(source_id),
    mapping TEXT NOT NULL CHECK (length(trim(mapping)) > 0),
    falsifiability_condition TEXT NOT NULL CHECK (length(trim(falsifiability_condition)) > 0),
    reasoning_chain_json TEXT NOT NULL CHECK (length(reasoning_chain_json) > 2),
    source_refs_json TEXT NOT NULL CHECK (length(source_refs_json) > 2),
    parent_hypothesis_ids_json TEXT NOT NULL CHECK (length(parent_hypothesis_ids_json) > 2),
    human_approved INTEGER NOT NULL CHECK (human_approved = 1),
    signer TEXT NOT NULL CHECK (length(trim(signer)) > 0),
    reason TEXT NOT NULL CHECK (length(trim(reason)) >= 20),
    decision_log_source_id TEXT NOT NULL REFERENCES documents(source_id),
    decision_log_start INTEGER NOT NULL CHECK (decision_log_start >= 0),
    decision_log_end INTEGER NOT NULL CHECK (decision_log_end > decision_log_start),
    content_hash TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS reduction_decisions (
    review_id TEXT PRIMARY KEY REFERENCES reduction_review_queue(review_id),
    action TEXT NOT NULL CHECK (action IN ('approve', 'reject')),
    human_approved INTEGER NOT NULL CHECK (human_approved = 1),
    confidence REAL,
    proposal_id TEXT,
    signer TEXT NOT NULL CHECK (length(trim(signer)) > 0),
    reason TEXT NOT NULL CHECK (length(trim(reason)) >= 20),
    decision_log_source_id TEXT NOT NULL REFERENCES documents(source_id),
    decision_log_start INTEGER NOT NULL CHECK (decision_log_start >= 0),
    decision_log_end INTEGER NOT NULL CHECK (decision_log_end > decision_log_start),
    created_at TEXT NOT NULL,
    CHECK (
        (action = 'approve' AND confidence IS NOT NULL AND confidence >= 0.0 AND confidence <= 1.0 AND proposal_id IS NOT NULL)
        OR (action = 'reject' AND confidence IS NULL AND proposal_id IS NULL)
    )
);

CREATE TABLE IF NOT EXISTS condition_audit_batches (
    batch_id TEXT PRIMARY KEY,
    sample_size INTEGER NOT NULL CHECK (sample_size = 20),
    seed INTEGER,
    sampled_draft_ids_json TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS condition_audit_queue (
    audit_id TEXT PRIMARY KEY,
    batch_id TEXT NOT NULL REFERENCES condition_audit_batches(batch_id),
    draft_id TEXT NOT NULL REFERENCES reduction_drafts(draft_id),
    order_index INTEGER NOT NULL CHECK (order_index >= 0),
    condition_text TEXT NOT NULL,
    validation_json TEXT NOT NULL,
    UNIQUE (batch_id, draft_id),
    UNIQUE (batch_id, order_index)
);

CREATE TABLE IF NOT EXISTS condition_audit_reviews (
    audit_id TEXT PRIMARY KEY REFERENCES condition_audit_queue(audit_id),
    observable INTEGER NOT NULL CHECK (observable IN (0, 1)),
    human_approved INTEGER NOT NULL CHECK (human_approved = 1),
    reviewer TEXT NOT NULL CHECK (length(trim(reviewer)) > 0),
    reason TEXT NOT NULL CHECK (length(trim(reason)) >= 20),
    created_at TEXT NOT NULL
);

CREATE TRIGGER IF NOT EXISTS condition_audit_batches_no_update
BEFORE UPDATE ON condition_audit_batches
BEGIN
    SELECT RAISE(ABORT, 'condition audit batches are immutable');
END;

CREATE TRIGGER IF NOT EXISTS condition_audit_batches_no_delete
BEFORE DELETE ON condition_audit_batches
BEGIN
    SELECT RAISE(ABORT, 'condition audit batches are immutable');
END;

CREATE TRIGGER IF NOT EXISTS condition_audit_queue_no_update
BEFORE UPDATE ON condition_audit_queue
BEGIN
    SELECT RAISE(ABORT, 'condition audit items are immutable');
END;

CREATE TRIGGER IF NOT EXISTS condition_audit_queue_no_delete
BEFORE DELETE ON condition_audit_queue
BEGIN
    SELECT RAISE(ABORT, 'condition audit items are immutable');
END;

CREATE TRIGGER IF NOT EXISTS condition_audit_reviews_no_update
BEFORE UPDATE ON condition_audit_reviews
BEGIN
    SELECT RAISE(ABORT, 'condition audit decisions are immutable');
END;

CREATE TRIGGER IF NOT EXISTS condition_audit_reviews_no_delete
BEFORE DELETE ON condition_audit_reviews
BEGIN
    SELECT RAISE(ABORT, 'condition audit decisions are immutable');
END;

CREATE TRIGGER IF NOT EXISTS reduction_drafts_no_update
BEFORE UPDATE ON reduction_drafts
BEGIN
    SELECT RAISE(ABORT, 'reduction drafts are immutable');
END;

CREATE TRIGGER IF NOT EXISTS reduction_drafts_no_delete
BEFORE DELETE ON reduction_drafts
BEGIN
    SELECT RAISE(ABORT, 'reduction drafts are immutable');
END;

CREATE TRIGGER IF NOT EXISTS reduction_review_queue_no_update
BEFORE UPDATE ON reduction_review_queue
BEGIN
    SELECT RAISE(ABORT, 'reduction review requests are immutable');
END;

CREATE TRIGGER IF NOT EXISTS reduction_review_queue_no_delete
BEFORE DELETE ON reduction_review_queue
BEGIN
    SELECT RAISE(ABORT, 'reduction review requests are immutable');
END;

CREATE TRIGGER IF NOT EXISTS proposals_no_update
BEFORE UPDATE ON proposals
BEGIN
    SELECT RAISE(ABORT, 'proposals are immutable');
END;

CREATE TRIGGER IF NOT EXISTS proposals_no_delete
BEFORE DELETE ON proposals
BEGIN
    SELECT RAISE(ABORT, 'proposals are immutable');
END;

CREATE TRIGGER IF NOT EXISTS proposals_require_signed_review
BEFORE INSERT ON proposals
WHEN NOT EXISTS (
    SELECT 1 FROM reduction_decisions AS d
    WHERE d.review_id = NEW.review_id
      AND d.action = 'approve'
      AND d.human_approved = 1
      AND d.proposal_id = NEW.proposal_id
      AND d.confidence = NEW.confidence
)
BEGIN
    SELECT RAISE(ABORT, 'a signed human approval is required before Proposal activation');
END;

CREATE TRIGGER IF NOT EXISTS reduction_decisions_no_update
BEFORE UPDATE ON reduction_decisions
BEGIN
    SELECT RAISE(ABORT, 'reduction decisions are immutable');
END;

CREATE TRIGGER IF NOT EXISTS reduction_decisions_no_delete
BEFORE DELETE ON reduction_decisions
BEGIN
    SELECT RAISE(ABORT, 'reduction decisions are immutable');
END;
"""


class PhaseTwoAgent:
    """Accept human-supplied mapping drafts and only activate signed Proposals."""

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

    @staticmethod
    def _resolve_source_refs(
        ledger: CorpusLedger,
        source_id: str,
        source_refs: Sequence[dict[str, Any]],
    ) -> list[dict[str, Any]]:
        if not source_refs:
            raise PhaseTwoError("at least one source_refs entry is required")
        resolved: list[dict[str, Any]] = []
        for reference in source_refs:
            if not isinstance(reference, dict):
                raise PhaseTwoError("each source reference must be an object")
            ref_source_id = reference.get("source_id", source_id)
            char_range = reference.get("char_range")
            if (
                not isinstance(ref_source_id, str)
                or not isinstance(char_range, (list, tuple))
                or len(char_range) != 2
                or not all(isinstance(value, int) and not isinstance(value, bool) for value in char_range)
            ):
                raise PhaseTwoError("each source reference needs source_id and [start, end) char_range")
            location = ledger.locate_span(ref_source_id, char_range[0], char_range[1])
            resolved.append(location.as_dict())
        if not any(reference["source_id"] == source_id for reference in resolved):
            raise PhaseTwoError("primary source_id must be included in source_refs")
        return resolved

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

    def submit_draft(
        self,
        *,
        parent_hypothesis_ids: Sequence[str],
        rule_id: str,
        mapping: str,
        falsifiability_condition: str,
        reasoning_chain: Sequence[str],
        source_id: str,
        source_refs: Sequence[dict[str, Any]],
    ) -> dict[str, Any]:
        reconfigure = getattr(sys.stdout, "reconfigure", None)
        if reconfigure is not None:
            reconfigure(encoding="utf-8")
        print(
            "这是一个需要人工判断的决策点：具体还原内容仅进入 proposal_draft 队列，"
            "不会赋予置信度或写成有效 Proposal。"
        )

        if not isinstance(rule_id, str) or not re.fullmatch(r"[A-Za-z0-9][A-Za-z0-9._-]{0,63}", rule_id):
            raise PhaseTwoError("rule_id must be a non-empty stable identifier")
        if not isinstance(mapping, str) or not mapping.strip():
            raise PhaseTwoError("mapping must not be empty")
        if not isinstance(falsifiability_condition, str) or not falsifiability_condition.strip():
            raise PhaseTwoError("falsifiability_condition must not be empty")
        if not isinstance(source_id, str) or not source_id:
            raise PhaseTwoError("source_id must not be empty")
        if not isinstance(reasoning_chain, (list, tuple)) or not reasoning_chain or any(
            not isinstance(step, str) or not step.strip() for step in reasoning_chain
        ):
            raise PhaseTwoError("reasoning_chain must contain non-empty steps")
        if (
            not isinstance(parent_hypothesis_ids, (list, tuple))
            or not parent_hypothesis_ids
            or any(not isinstance(parent_id, str) or not parent_id for parent_id in parent_hypothesis_ids)
        ):
            raise PhaseTwoError("at least one valid parent layer_hypothesis_id is required")
        if not isinstance(falsifiability_condition, str) or not falsifiability_condition.strip():
            raise PhaseTwoError("falsifiability_condition must not be empty")
        if not isinstance(source_id, str) or not source_id:
            raise PhaseTwoError("source_id must not be empty")

        validation = validate_falsifiability_condition(falsifiability_condition)
        resolved_refs = self._resolve_source_refs(self.ledger, source_id, source_refs)
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            known = {
                str(row["hypothesis_id"])
                for row in connection.execute(
                    "SELECT hypothesis_id FROM layer_hypotheses WHERE hypothesis_id IN ("
                    + ",".join("?" for _ in parent_hypothesis_ids)
                    + ")",
                    tuple(parent_hypothesis_ids),
                ).fetchall()
            }
        if known != set(parent_hypothesis_ids):
            missing = sorted(set(parent_hypothesis_ids) - known)
            raise PhaseTwoError("unknown parent layer hypotheses: " + ", ".join(missing))

        body: dict[str, Any] = {
            "schema_version": 1,
            "record_type": "proposal_draft",
            "parent_hypothesis_ids": list(parent_hypothesis_ids),
            "rule_id": rule_id,
            "mapping": mapping.strip(),
            "falsifiability_condition": falsifiability_condition.strip(),
            "reasoning_chain": [step.strip() for step in reasoning_chain],
            "source_id": source_id,
            "source_refs": resolved_refs,
            "falsifiability_validation": validation.as_dict(),
            "confidence": None,
            "human_approved": False,
            "status": "pending_human_review" if validation.valid else "blocked_by_condition_format",
        }
        content_hash = _hash_json(body)
        draft_id = content_hash
        review_id = _hash_json({"kind": "proposal-review", "draft_id": draft_id})
        body["draft_id"] = draft_id
        body["review_id"] = review_id
        body["content_hash"] = content_hash
        payload = _canonical_json(body)
        created_at = datetime.now(timezone.utc).isoformat()

        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            connection.execute("BEGIN IMMEDIATE")
            try:
                existing = connection.execute(
                    "SELECT content_hash, draft_json FROM reduction_drafts WHERE draft_id = ?",
                    (draft_id,),
                ).fetchone()
                inserted = existing is None
                if existing is not None:
                    if str(existing["content_hash"]) != content_hash or str(existing["draft_json"]) != payload:
                        raise LedgerIntegrityError(f"immutable reduction draft mismatch: {draft_id}")
                else:
                    connection.execute(
                        """INSERT INTO reduction_drafts
                           (draft_id, record_type, source_id, draft_json, content_hash,
                            condition_valid, confidence, human_approved, created_at)
                           VALUES (?, 'proposal_draft', ?, ?, ?, ?, NULL, 0, ?)""",
                        (draft_id, source_id, payload, content_hash, int(validation.valid), created_at),
                    )
                    connection.execute(
                        """INSERT INTO reduction_review_queue
                           (review_id, draft_id, payload_json, content_hash, created_at)
                           VALUES (?, ?, ?, ?, ?)""",
                        (review_id, draft_id, payload, content_hash, created_at),
                    )
                connection.execute("COMMIT")
            except Exception:
                if connection.in_transaction:
                    connection.execute("ROLLBACK")
                raise
        return {
            "draft_id": draft_id,
            "review_id": review_id,
            "status": body["status"],
            "condition_validation": validation.as_dict(),
            "confidence": None,
            "human_approved": False,
            "inserted": inserted,
        }

    def list_reviews(self) -> tuple[dict[str, Any], ...]:
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            rows = connection.execute(
                """SELECT q.review_id, d.draft_id, d.draft_json, r.action,
                          r.human_approved, r.confidence, r.signer, r.reason
                   FROM reduction_review_queue AS q
                   JOIN reduction_drafts AS d ON d.draft_id = q.draft_id
                   LEFT JOIN reduction_decisions AS r ON r.review_id = q.review_id
                   ORDER BY q.created_at, q.review_id"""
            ).fetchall()
        result: list[dict[str, Any]] = []
        for row in rows:
            draft = json.loads(str(row["draft_json"]))
            result.append(
                {
                    "review_id": str(row["review_id"]),
                    "draft_id": str(row["draft_id"]),
                    "status": draft["status"] if row["action"] is None else str(row["action"]),
                    "condition_valid": bool(draft["falsifiability_validation"]["valid"]),
                    "human_approved": bool(row["human_approved"] or False),
                    "confidence": row["confidence"],
                    "signer": row["signer"],
                    "reason": row["reason"],
                    "rule_id": draft["rule_id"],
                    "mapping": draft["mapping"],
                    "source_id": draft["source_id"],
                    "parent_hypothesis_ids": draft["parent_hypothesis_ids"],
                }
            )
        return tuple(result)

    def get_review(self, review_id: str) -> dict[str, Any]:
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            row = connection.execute(
                """SELECT q.review_id, d.draft_json, r.action,
                          r.human_approved, r.confidence, r.signer, r.reason
                   FROM reduction_review_queue AS q
                   JOIN reduction_drafts AS d ON d.draft_id = q.draft_id
                   LEFT JOIN reduction_decisions AS r ON r.review_id = q.review_id
                   WHERE q.review_id = ?""",
                (review_id,),
            ).fetchone()
        if row is None:
            raise PhaseTwoError(f"review request not found: {review_id}")
        return {
            "review_id": str(row["review_id"]),
            "decision": row["action"],
            "human_approved": bool(row["human_approved"] or False),
            "confidence": row["confidence"],
            "signer": row["signer"],
            "reason": row["reason"],
            "draft": json.loads(str(row["draft_json"])),
        }

    def active_proposals(self) -> tuple[dict[str, Any], ...]:
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            rows = connection.execute(
                """SELECT proposal_id, draft_id, review_id, record_type, rule_id,
                          confidence, source_id, mapping, falsifiability_condition,
                          reasoning_chain_json, source_refs_json, parent_hypothesis_ids_json,
                          human_approved, signer, reason, decision_log_source_id,
                          decision_log_start, decision_log_end, content_hash
                   FROM proposals ORDER BY created_at, proposal_id"""
            ).fetchall()
            return tuple(dict(row) for row in rows)

    def sample_conditions_for_human_review(self, seed: int | None = None) -> dict[str, Any]:
        reconfigure = getattr(sys.stdout, "reconfigure", None)
        if reconfigure is not None:
            reconfigure(encoding="utf-8")
        print(
            "这是一个需要人工判断的决策点：将随机抽取 20 条可证伪条件，"
            "人工逐条判断其是否指向可观测事实。"
        )
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            population = connection.execute(
                "SELECT draft_id, draft_json FROM reduction_drafts ORDER BY draft_id"
            ).fetchall()
        if len(population) < 20:
            raise PhaseTwoError(
                f"20-condition human audit requires at least 20 drafts; found {len(population)}"
            )
        generator = random.SystemRandom() if seed is None else random.Random(seed)
        chosen = generator.sample(population, 20)
        created_at = datetime.now(timezone.utc).isoformat()
        draft_ids = [str(row["draft_id"]) for row in chosen]
        batch_id = _hash_json(
            {"sample_size": 20, "draft_ids": draft_ids, "created_at": created_at, "seed": seed}
        )
        audit_ids: list[str] = []
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            connection.execute("BEGIN IMMEDIATE")
            try:
                connection.execute(
                    """INSERT INTO condition_audit_batches
                       (batch_id, sample_size, seed, sampled_draft_ids_json, created_at)
                       VALUES (?, 20, ?, ?, ?)""",
                    (batch_id, seed, _canonical_json({"draft_ids": draft_ids}), created_at),
                )
                for order_index, row in enumerate(chosen):
                    draft_id = str(row["draft_id"])
                    draft = json.loads(str(row["draft_json"]))
                    audit_id = _hash_json({"kind": "condition-audit", "batch_id": batch_id, "draft_id": draft_id})
                    audit_ids.append(audit_id)
                    connection.execute(
                        """INSERT INTO condition_audit_queue
                           (audit_id, batch_id, draft_id, order_index, condition_text,
                            validation_json)
                           VALUES (?, ?, ?, ?, ?, ?)""",
                        (
                            audit_id,
                            batch_id,
                            draft_id,
                            order_index,
                            draft["falsifiability_condition"],
                            _canonical_json(draft["falsifiability_validation"]),
                        ),
                    )
                connection.execute("COMMIT")
            except Exception:
                if connection.in_transaction:
                    connection.execute("ROLLBACK")
                raise
        return {
            "batch_id": batch_id,
            "sample_size": 20,
            "draft_ids": draft_ids,
            "audit_ids": audit_ids,
            "status": "awaiting_human_review",
        }

    def list_condition_audit(self, batch_id: str) -> tuple[dict[str, Any], ...]:
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            rows = connection.execute(
                """SELECT q.audit_id, q.draft_id, q.order_index, q.condition_text,
                          q.validation_json, r.observable, r.human_approved,
                          r.reviewer, r.reason
                   FROM condition_audit_queue AS q
                   LEFT JOIN condition_audit_reviews AS r ON r.audit_id = q.audit_id
                   WHERE q.batch_id = ? ORDER BY q.order_index""",
                (batch_id,),
            ).fetchall()
        return tuple(
            {
                "audit_id": str(row["audit_id"]),
                "draft_id": str(row["draft_id"]),
                "order_index": int(row["order_index"]),
                "condition": str(row["condition_text"]),
                "validation": json.loads(str(row["validation_json"])),
                "observable": None if row["observable"] is None else bool(row["observable"]),
                "human_approved": bool(row["human_approved"] or False),
                "reviewer": row["reviewer"],
                "reason": row["reason"],
            }
            for row in rows
        )

    def review_condition_audit(
        self,
        audit_id: str,
        *,
        observable: bool,
        reviewer: str,
        reason: str,
        human_approved: bool,
    ) -> dict[str, Any]:
        if human_approved is not True:
            raise PhaseTwoError("human_approved=true must be explicit")
        if not isinstance(observable, bool):
            raise PhaseTwoError("observable must be an explicit yes/no human judgment")
        if not reviewer.strip():
            raise PhaseTwoError("reviewer must not be empty")
        if len(reason.strip()) < 20:
            raise PhaseTwoError("condition audit reason must contain at least 20 characters")
        created_at = datetime.now(timezone.utc).isoformat()
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            connection.execute("BEGIN IMMEDIATE")
            try:
                if connection.execute(
                    "SELECT 1 FROM condition_audit_queue WHERE audit_id = ?",
                    (audit_id,),
                ).fetchone() is None:
                    raise PhaseTwoError(f"condition audit item not found: {audit_id}")
                connection.execute(
                    """INSERT INTO condition_audit_reviews
                       (audit_id, observable, human_approved, reviewer, reason, created_at)
                       VALUES (?, ?, 1, ?, ?, ?)""",
                    (audit_id, int(observable), reviewer.strip(), reason.strip(), created_at),
                )
                connection.execute("COMMIT")
            except Exception:
                if connection.in_transaction:
                    connection.execute("ROLLBACK")
                raise
        return {
            "audit_id": audit_id,
            "observable": observable,
            "human_approved": True,
            "reviewer": reviewer.strip(),
            "reason": reason.strip(),
        }

    def condition_audit_status(self, batch_id: str) -> dict[str, Any]:
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            batch = connection.execute(
                "SELECT sample_size FROM condition_audit_batches WHERE batch_id = ?",
                (batch_id,),
            ).fetchone()
            if batch is None:
                raise PhaseTwoError(f"condition audit batch not found: {batch_id}")
            rows = connection.execute(
                """SELECT r.observable FROM condition_audit_queue AS q
                   LEFT JOIN condition_audit_reviews AS r ON r.audit_id = q.audit_id
                   WHERE q.batch_id = ? ORDER BY q.order_index""",
                (batch_id,),
            ).fetchall()
        sample_size = int(batch["sample_size"])
        reviewed = sum(row["observable"] is not None for row in rows)
        unobservable = sum(row["observable"] == 0 for row in rows)
        complete = reviewed == sample_size
        failure_rate = (unobservable / sample_size) if complete else None
        passed = complete and failure_rate is not None and failure_rate <= 0.10
        return {
            "batch_id": batch_id,
            "sample_size": sample_size,
            "reviewed": reviewed,
            "unobservable": unobservable,
            "failure_rate": failure_rate,
            "status": "passed" if passed else ("blocked" if complete else "awaiting_human_review"),
            "may_advance": passed,
        }

    def _append_decision_log(
        self,
        *,
        review_id: str,
        action: str,
        signer: str,
        reason: str,
        confidence: float | None,
        draft: dict[str, Any],
    ) -> tuple[str, int, int]:
        if not self.decisions_path.exists():
            raise PhaseTwoError(f"decision log does not exist: {self.decisions_path}")
        existing_text = self.decisions_path.read_text(encoding="utf-8")
        if review_id in existing_text:
            raise PhaseTwoError("decision log already contains this review id; reconcile manually")
        refs = [
            f"  - {reference['source_id']} [{reference['char_range'][0]}, {reference['char_range'][1]})"
            for reference in draft["source_refs"]
        ]
        entry = "\n".join(
            [
                f"## Phase 2 人工审阅：{review_id}",
                "",
                f"- 决定：{action}",
                f"- draft_id：{draft['draft_id']}",
                f"- 规则：{draft['rule_id']}",
                f"- 映射候选：{draft['mapping']}",
                f"- 可证伪条件：{draft['falsifiability_condition']}",
                f"- 审阅人：{signer.strip()}",
                f"- 理由：{reason.strip()}",
                f"- 置信度：{confidence if confidence is not None else '未指定'}",
                "- human_approved：true",
                "- 原文引用：",
                *refs,
            ]
        )
        prefix = existing_text.rstrip("\n")
        separator = "\n\n" if prefix else ""
        new_text = prefix + separator + entry + "\n"
        start = len(prefix + separator)
        end = len(new_text)
        source = self.ledger.ingest_text(new_text, title="DECISIONS.md Phase2 reviewed version")
        location = self.ledger.locate_span(source.source_id, start, end)
        if location.text_span != new_text[start:end]:
            raise LedgerIntegrityError("Phase2 decision log span failed to round-trip")
        self._atomic_write(self.decisions_path, new_text)
        return source.source_id, start, end

    def _approved_parents(self, parent_ids: Sequence[str]) -> set[str]:
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            rows = connection.execute(
                """SELECT hypothesis_id FROM approved_layer_hypotheses
                   WHERE hypothesis_id IN (""" + ",".join("?" for _ in parent_ids) + ")",
                tuple(parent_ids),
            ).fetchall()
            return {str(row["hypothesis_id"]) for row in rows}

    def decide(
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
            raise PhaseTwoError("human_approved=true must be explicit")
        if action not in {"approve", "reject"}:
            raise PhaseTwoError("action must be approve or reject")
        if not signer.strip():
            raise PhaseTwoError("signer must not be empty")
        if len(reason.strip()) < 20:
            raise PhaseTwoError("review reason must contain at least 20 characters")
        if action == "approve":
            if not _valid_score(confidence):
                raise PhaseTwoError("approval requires an explicit confidence between 0 and 1")
            confidence = float(confidence)
        elif confidence is not None:
            raise PhaseTwoError("rejection must not assign confidence")

        review = self.get_review(review_id)
        if review["decision"] is not None:
            raise PhaseTwoError(f"review already signed: {review_id}")
        draft = review["draft"]
        if action == "approve":
            if not draft["falsifiability_validation"]["valid"]:
                raise PhaseTwoError("condition failed mechanical validation; revise the draft first")
            approved = self._approved_parents(draft["parent_hypothesis_ids"])
            if approved != set(draft["parent_hypothesis_ids"]):
                raise PhaseTwoError("all parent layer hypotheses must be human-approved first")

        log_source_id, log_start, log_end = self._append_decision_log(
            review_id=review_id,
            action=action,
            signer=signer,
            reason=reason,
            confidence=confidence,
            draft=draft,
        )
        proposal_payload: dict[str, Any] | None = None
        proposal_id: str | None = None
        content_hash: str | None = None
        if action == "approve":
            proposal_payload = {
                "record_type": "proposal",
                "rule_id": draft["rule_id"],
                "confidence": confidence,
                "source_id": draft["source_id"],
                "reasoning_chain": draft["reasoning_chain"],
                "mapping": draft["mapping"],
                "falsifiability_condition": draft["falsifiability_condition"],
                "source_refs": draft["source_refs"],
                "parent_hypothesis_ids": draft["parent_hypothesis_ids"],
                "human_approved": True,
                "signer": signer.strip(),
                "reason": reason.strip(),
                "decision_log_source_id": log_source_id,
                "decision_log_char_range": [log_start, log_end],
            }
            content_hash = _hash_json(proposal_payload)
            proposal_id = content_hash
            proposal_payload["proposal_id"] = proposal_id
            proposal_payload["content_hash"] = content_hash
            ProposedReduction.validate(proposal_payload)

        created_at = datetime.now(timezone.utc).isoformat()
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            connection.execute("BEGIN IMMEDIATE")
            try:
                exists = connection.execute(
                    "SELECT 1 FROM reduction_decisions WHERE review_id = ?",
                    (review_id,),
                ).fetchone()
                if exists is not None:
                    raise PhaseTwoError(f"review already signed: {review_id}")
                connection.execute(
                    """INSERT INTO reduction_decisions
                       (review_id, action, human_approved, confidence, proposal_id,
                        signer, reason, decision_log_source_id, decision_log_start,
                        decision_log_end, created_at)
                       VALUES (?, ?, 1, ?, ?, ?, ?, ?, ?, ?, ?)""",
                    (
                        review_id,
                        action,
                        confidence,
                        proposal_id,
                        signer.strip(),
                        reason.strip(),
                        log_source_id,
                        log_start,
                        log_end,
                        created_at,
                    ),
                )
                if proposal_payload is not None:
                    connection.execute(
                        """INSERT INTO proposals
                           (proposal_id, draft_id, review_id, record_type, rule_id, confidence,
                            source_id, mapping, falsifiability_condition, reasoning_chain_json,
                            source_refs_json, parent_hypothesis_ids_json, human_approved, signer,
                            reason, decision_log_source_id, decision_log_start, decision_log_end,
                            content_hash, created_at)
                           VALUES (?, ?, ?, 'proposal', ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?)""",
                        (
                            proposal_id,
                            draft["draft_id"],
                            review_id,
                            draft["rule_id"],
                            confidence,
                            draft["source_id"],
                            draft["mapping"],
                            draft["falsifiability_condition"],
                            _canonical_json(draft["reasoning_chain"]),
                            _canonical_json(draft["source_refs"]),
                            _canonical_json(draft["parent_hypothesis_ids"]),
                            signer.strip(),
                            reason.strip(),
                            log_source_id,
                            log_start,
                            log_end,
                            content_hash,
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
            "action": action,
            "human_approved": True,
            "confidence": confidence,
            "proposal_id": proposal_id,
            "decision_log_source_id": log_source_id,
            "decision_log_char_range": [log_start, log_end],
        }
