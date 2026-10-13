"""Phase-3 proposal graph and human-gated multi-branch management."""

from __future__ import annotations

import hashlib
import json
import os
import sqlite3
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Sequence

from .layering import DEFAULT_DECISIONS_PATH, _PHASE1_SCHEMA
from .ledger import CorpusLedger, LedgerIntegrityError
from .proposals import _PHASE2_SCHEMA


class GraphError(Exception):
    """Raised when a graph patch, fork, or branch operation is invalid."""


NODE_TYPES = (
    "actor",
    "office",
    "resource",
    "ritual_symbolic_capital",
)
EDGE_TYPES = (
    "coercion",
    "exchange",
    "fictive_kinship",
    "ritual_authorization",
)


def _canonical_json(value: Any) -> str:
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"))


def _hash_json(value: dict[str, Any]) -> str:
    return "sha256:" + hashlib.sha256(_canonical_json(value).encode("utf-8")).hexdigest()


def _signed_text(value: str, name: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise GraphError(f"{name} must not be empty")
    return value.strip()


_PHASE3_SCHEMA = """
CREATE TABLE IF NOT EXISTS graph_patch_drafts (
    patch_id TEXT PRIMARY KEY,
    proposal_id TEXT NOT NULL REFERENCES proposals(proposal_id),
    parent_version_id TEXT REFERENCES graph_versions(version_id),
    patch_json TEXT NOT NULL,
    content_hash TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS graph_patch_review_queue (
    review_id TEXT PRIMARY KEY,
    patch_id TEXT NOT NULL UNIQUE REFERENCES graph_patch_drafts(patch_id),
    payload_json TEXT NOT NULL,
    content_hash TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS graph_patch_decisions (
    review_id TEXT PRIMARY KEY REFERENCES graph_patch_review_queue(review_id),
    action TEXT NOT NULL CHECK (action IN ('approve', 'reject')),
    human_approved INTEGER NOT NULL CHECK (human_approved = 1),
    signer TEXT NOT NULL CHECK (length(trim(signer)) > 0),
    reason TEXT NOT NULL CHECK (length(trim(reason)) >= 20),
    graph_version_id TEXT,
    decision_log_source_id TEXT NOT NULL REFERENCES documents(source_id),
    decision_log_start INTEGER NOT NULL CHECK (decision_log_start >= 0),
    decision_log_end INTEGER NOT NULL CHECK (decision_log_end > decision_log_start),
    created_at TEXT NOT NULL,
    CHECK (
        (action = 'approve' AND graph_version_id IS NOT NULL)
        OR (action = 'reject' AND graph_version_id IS NULL)
    )
);

CREATE TABLE IF NOT EXISTS graph_versions (
    version_id TEXT PRIMARY KEY,
    version_number INTEGER NOT NULL UNIQUE CHECK (version_number > 0),
    proposal_id TEXT NOT NULL REFERENCES proposals(proposal_id),
    patch_id TEXT NOT NULL UNIQUE REFERENCES graph_patch_drafts(patch_id),
    parent_version_id TEXT REFERENCES graph_versions(version_id),
    patch_hash TEXT NOT NULL,
    human_approved INTEGER NOT NULL CHECK (human_approved = 1),
    signer TEXT NOT NULL CHECK (length(trim(signer)) > 0),
    reason TEXT NOT NULL CHECK (length(trim(reason)) >= 20),
    decision_log_source_id TEXT NOT NULL REFERENCES documents(source_id),
    decision_log_start INTEGER NOT NULL CHECK (decision_log_start >= 0),
    decision_log_end INTEGER NOT NULL CHECK (decision_log_end > decision_log_start),
    content_hash TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS graph_nodes (
    node_id TEXT PRIMARY KEY,
    version_id TEXT NOT NULL REFERENCES graph_versions(version_id),
    proposal_id TEXT NOT NULL REFERENCES proposals(proposal_id),
    local_key TEXT NOT NULL,
    record_type TEXT NOT NULL CHECK (record_type = 'proposal_graph_node'),
    node_type TEXT NOT NULL CHECK (node_type IN (
        'actor', 'office', 'resource', 'ritual_symbolic_capital'
    )),
    label TEXT NOT NULL CHECK (length(trim(label)) > 0),
    source_refs_json TEXT NOT NULL,
    content_hash TEXT NOT NULL UNIQUE,
    UNIQUE (version_id, local_key)
);

CREATE TABLE IF NOT EXISTS graph_edges (
    edge_id TEXT PRIMARY KEY,
    version_id TEXT NOT NULL REFERENCES graph_versions(version_id),
    proposal_id TEXT NOT NULL REFERENCES proposals(proposal_id),
    local_key TEXT NOT NULL,
    record_type TEXT NOT NULL CHECK (record_type = 'proposal_graph_edge'),
    source_node_id TEXT NOT NULL REFERENCES graph_nodes(node_id),
    target_node_id TEXT NOT NULL REFERENCES graph_nodes(node_id),
    edge_type TEXT NOT NULL CHECK (edge_type IN (
        'coercion', 'exchange', 'fictive_kinship', 'ritual_authorization'
    )),
    label TEXT NOT NULL CHECK (length(trim(label)) > 0),
    source_refs_json TEXT NOT NULL,
    content_hash TEXT NOT NULL UNIQUE,
    UNIQUE (version_id, local_key)
);

CREATE TABLE IF NOT EXISTS fork_requests (
    request_id TEXT PRIMARY KEY,
    fork_point_node_id TEXT NOT NULL REFERENCES graph_nodes(node_id),
    branch_a_json TEXT NOT NULL,
    branch_b_json TEXT NOT NULL,
    reason TEXT NOT NULL CHECK (length(trim(reason)) >= 20),
    source_refs_json TEXT NOT NULL,
    request_json TEXT NOT NULL,
    content_hash TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS fork_review_queue (
    review_id TEXT PRIMARY KEY,
    request_id TEXT NOT NULL UNIQUE REFERENCES fork_requests(request_id),
    payload_json TEXT NOT NULL,
    content_hash TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS fork_decisions (
    review_id TEXT PRIMARY KEY REFERENCES fork_review_queue(review_id),
    action TEXT NOT NULL CHECK (action IN ('keep_both', 'reject')),
    human_approved INTEGER NOT NULL CHECK (human_approved = 1),
    fork_id TEXT,
    signer TEXT NOT NULL CHECK (length(trim(signer)) > 0),
    reason TEXT NOT NULL CHECK (length(trim(reason)) >= 20),
    decision_log_source_id TEXT NOT NULL REFERENCES documents(source_id),
    decision_log_start INTEGER NOT NULL CHECK (decision_log_start >= 0),
    decision_log_end INTEGER NOT NULL CHECK (decision_log_end > decision_log_start),
    created_at TEXT NOT NULL,
    CHECK (
        (action = 'keep_both' AND fork_id IS NOT NULL)
        OR (action = 'reject' AND fork_id IS NULL)
    )
);

CREATE TABLE IF NOT EXISTS fork_records (
    fork_id TEXT PRIMARY KEY,
    review_id TEXT NOT NULL UNIQUE REFERENCES fork_review_queue(review_id),
    fork_point_node_id TEXT NOT NULL REFERENCES graph_nodes(node_id),
    branch_a_json TEXT NOT NULL,
    branch_b_json TEXT NOT NULL,
    reason TEXT NOT NULL CHECK (length(trim(reason)) >= 20),
    human_approved INTEGER NOT NULL CHECK (human_approved = 1),
    signer TEXT NOT NULL CHECK (length(trim(signer)) > 0),
    decision_log_source_id TEXT NOT NULL REFERENCES documents(source_id),
    decision_log_start INTEGER NOT NULL CHECK (decision_log_start >= 0),
    decision_log_end INTEGER NOT NULL CHECK (decision_log_end > decision_log_start),
    content_hash TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS branch_operations (
    operation_id TEXT PRIMARY KEY,
    fork_id TEXT NOT NULL REFERENCES fork_records(fork_id),
    action TEXT NOT NULL CHECK (action IN ('merge', 'delete')),
    target_branch_ids_json TEXT NOT NULL,
    result_branch_json TEXT,
    human_approved INTEGER NOT NULL CHECK (human_approved = 1),
    signer TEXT NOT NULL CHECK (length(trim(signer)) > 0),
    reason TEXT NOT NULL CHECK (length(trim(reason)) >= 20),
    decision_log_source_id TEXT NOT NULL REFERENCES documents(source_id),
    decision_log_start INTEGER NOT NULL CHECK (decision_log_start >= 0),
    decision_log_end INTEGER NOT NULL CHECK (decision_log_end > decision_log_start),
    content_hash TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL,
    CHECK (
        (action = 'merge' AND result_branch_json IS NOT NULL)
        OR (action = 'delete' AND result_branch_json IS NULL)
    )
);

CREATE TRIGGER IF NOT EXISTS graph_patch_drafts_no_update
BEFORE UPDATE ON graph_patch_drafts
BEGIN
    SELECT RAISE(ABORT, 'graph patch drafts are immutable');
END;
CREATE TRIGGER IF NOT EXISTS graph_patch_drafts_no_delete
BEFORE DELETE ON graph_patch_drafts
BEGIN
    SELECT RAISE(ABORT, 'graph patch drafts are immutable');
END;
CREATE TRIGGER IF NOT EXISTS graph_patch_review_queue_no_update
BEFORE UPDATE ON graph_patch_review_queue
BEGIN
    SELECT RAISE(ABORT, 'graph patch requests are immutable');
END;
CREATE TRIGGER IF NOT EXISTS graph_patch_review_queue_no_delete
BEFORE DELETE ON graph_patch_review_queue
BEGIN
    SELECT RAISE(ABORT, 'graph patch requests are immutable');
END;
CREATE TRIGGER IF NOT EXISTS graph_patch_decisions_no_update
BEFORE UPDATE ON graph_patch_decisions
BEGIN
    SELECT RAISE(ABORT, 'graph patch decisions are immutable');
END;
CREATE TRIGGER IF NOT EXISTS graph_patch_decisions_no_delete
BEFORE DELETE ON graph_patch_decisions
BEGIN
    SELECT RAISE(ABORT, 'graph patch decisions are immutable');
END;
CREATE TRIGGER IF NOT EXISTS graph_versions_no_update
BEFORE UPDATE ON graph_versions
BEGIN
    SELECT RAISE(ABORT, 'graph versions are immutable');
END;
CREATE TRIGGER IF NOT EXISTS graph_versions_no_delete
BEFORE DELETE ON graph_versions
BEGIN
    SELECT RAISE(ABORT, 'graph versions are immutable');
END;
CREATE TRIGGER IF NOT EXISTS graph_versions_require_signed_review
BEFORE INSERT ON graph_versions
WHEN NOT EXISTS (
    SELECT 1 FROM graph_patch_decisions AS d
    WHERE d.review_id = (SELECT review_id FROM graph_patch_review_queue WHERE patch_id = NEW.patch_id)
      AND d.action = 'approve'
      AND d.human_approved = 1
      AND d.graph_version_id = NEW.version_id
)
BEGIN
    SELECT RAISE(ABORT, 'a signed human decision is required before graph activation');
END;
CREATE TRIGGER IF NOT EXISTS graph_nodes_no_update
BEFORE UPDATE ON graph_nodes
BEGIN
    SELECT RAISE(ABORT, 'graph nodes are immutable');
END;
CREATE TRIGGER IF NOT EXISTS graph_nodes_no_delete
BEFORE DELETE ON graph_nodes
BEGIN
    SELECT RAISE(ABORT, 'graph nodes are immutable');
END;
CREATE TRIGGER IF NOT EXISTS graph_edges_no_update
BEFORE UPDATE ON graph_edges
BEGIN
    SELECT RAISE(ABORT, 'graph edges are immutable');
END;
CREATE TRIGGER IF NOT EXISTS graph_edges_no_delete
BEFORE DELETE ON graph_edges
BEGIN
    SELECT RAISE(ABORT, 'graph edges are immutable');
END;
CREATE TRIGGER IF NOT EXISTS fork_requests_no_update
BEFORE UPDATE ON fork_requests
BEGIN
    SELECT RAISE(ABORT, 'fork requests are immutable');
END;
CREATE TRIGGER IF NOT EXISTS fork_requests_no_delete
BEFORE DELETE ON fork_requests
BEGIN
    SELECT RAISE(ABORT, 'fork requests are immutable');
END;
CREATE TRIGGER IF NOT EXISTS fork_review_queue_no_update
BEFORE UPDATE ON fork_review_queue
BEGIN
    SELECT RAISE(ABORT, 'fork review requests are immutable');
END;
CREATE TRIGGER IF NOT EXISTS fork_review_queue_no_delete
BEFORE DELETE ON fork_review_queue
BEGIN
    SELECT RAISE(ABORT, 'fork review requests are immutable');
END;
CREATE TRIGGER IF NOT EXISTS fork_decisions_no_update
BEFORE UPDATE ON fork_decisions
BEGIN
    SELECT RAISE(ABORT, 'fork decisions are immutable');
END;
CREATE TRIGGER IF NOT EXISTS fork_decisions_no_delete
BEFORE DELETE ON fork_decisions
BEGIN
    SELECT RAISE(ABORT, 'fork decisions are immutable');
END;
CREATE TRIGGER IF NOT EXISTS fork_records_no_update
BEFORE UPDATE ON fork_records
BEGIN
    SELECT RAISE(ABORT, 'fork records are immutable');
END;
CREATE TRIGGER IF NOT EXISTS fork_records_no_delete
BEFORE DELETE ON fork_records
BEGIN
    SELECT RAISE(ABORT, 'fork records are immutable');
END;
CREATE TRIGGER IF NOT EXISTS fork_records_require_signed_review
BEFORE INSERT ON fork_records
WHEN NOT EXISTS (
    SELECT 1 FROM fork_decisions AS d
    WHERE d.review_id = NEW.review_id
      AND d.action = 'keep_both'
      AND d.human_approved = 1
      AND d.fork_id = NEW.fork_id
)
BEGIN
    SELECT RAISE(ABORT, 'a signed human decision is required before fork activation');
END;
CREATE TRIGGER IF NOT EXISTS branch_operations_no_update
BEFORE UPDATE ON branch_operations
BEGIN
    SELECT RAISE(ABORT, 'branch operations are immutable');
END;
CREATE TRIGGER IF NOT EXISTS branch_operations_no_delete
BEFORE DELETE ON branch_operations
BEGIN
    SELECT RAISE(ABORT, 'branch operations are immutable');
END;
"""


class PhaseThreeAgent:
    """Queue human-authored graph patches and explicit fork operations."""

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

    @staticmethod
    def _resolve_refs(
        ledger: CorpusLedger,
        references: Sequence[dict[str, Any]],
        allowed_refs: Sequence[dict[str, Any]],
    ) -> list[dict[str, Any]]:
        if not isinstance(references, (list, tuple)) or not references:
            raise GraphError("each graph element needs at least one source reference")
        resolved: list[dict[str, Any]] = []
        for reference in references:
            if not isinstance(reference, dict):
                raise GraphError("source references must be structured objects")
            source_id = reference.get("source_id")
            char_range = reference.get("char_range")
            if (
                not isinstance(source_id, str)
                or not isinstance(char_range, (list, tuple))
                or len(char_range) != 2
                or not all(isinstance(value, int) and not isinstance(value, bool) for value in char_range)
            ):
                raise GraphError("each source reference needs source_id and [start, end) char_range")
            covered = any(
                parent.get("source_id") == source_id
                and isinstance(parent.get("char_range"), (list, tuple))
                and int(parent["char_range"][0]) <= char_range[0]
                and char_range[1] <= int(parent["char_range"][1])
                for parent in allowed_refs
            )
            if not covered:
                raise GraphError("graph source span must be contained in the approved Proposal source_refs")
            resolved.append(ledger.locate_span(source_id, char_range[0], char_range[1]).as_dict())
        return resolved

    @staticmethod
    def _atomic_write(path: Path, text: str) -> None:
        path.parent.mkdir(parents=True, exist_ok=True)
        temporary_path: Path | None = None
        try:
            with tempfile.NamedTemporaryFile(
                mode="w", encoding="utf-8", newline="", prefix=".pending-", dir=path.parent, delete=False
            ) as temporary:
                temporary.write(text)
                temporary.flush()
                os.fsync(temporary.fileno())
                temporary_path = Path(temporary.name)
            os.replace(temporary_path, path)
        finally:
            if temporary_path is not None and temporary_path.exists():
                temporary_path.unlink()

    @staticmethod
    def _node_ids_by_key(patch: dict[str, Any], version_id: str) -> dict[str, str]:
        return {
            node["key"]: _hash_json(
                {
                    "version_id": version_id,
                    "key": node["key"],
                    "node_type": node["node_type"],
                    "label": node["label"],
                    "source_refs": node["source_refs"],
                }
            )
            for node in patch["nodes"]
        }

    def _normalize_patch(self, proposal: sqlite3.Row, patch: dict[str, Any]) -> dict[str, Any]:
        if not isinstance(patch, dict):
            raise GraphError("graph patch must be an object")
        raw_nodes = patch.get("nodes")
        raw_edges = patch.get("edges")
        if not isinstance(raw_nodes, list) or not raw_nodes:
            raise GraphError("graph patch needs at least one node")
        if not isinstance(raw_edges, list):
            raise GraphError("graph patch edges must be a list")
        allowed_refs = json.loads(str(proposal["source_refs_json"]))
        proposal_source_id = str(proposal["source_id"])

        nodes: list[dict[str, Any]] = []
        keys: set[str] = set()
        for node in raw_nodes:
            if not isinstance(node, dict):
                raise GraphError("each node must be an object")
            key = node.get("key")
            node_type = node.get("node_type")
            label = node.get("label")
            if not isinstance(key, str) or not key.strip() or key in keys:
                raise GraphError("node keys must be unique non-empty strings")
            if node_type not in NODE_TYPES:
                raise GraphError(f"node_type must be one of {', '.join(NODE_TYPES)}")
            if not isinstance(label, str) or not label.strip():
                raise GraphError("node label must not be empty")
            source_refs = self._resolve_refs(self.ledger, node.get("source_refs", []), allowed_refs)
            if not any(ref["source_id"] == proposal_source_id for ref in source_refs):
                raise GraphError("each node must cite the Proposal primary source_id")
            keys.add(key)
            nodes.append({"key": key, "node_type": node_type, "label": label.strip(), "source_refs": source_refs})

        edges: list[dict[str, Any]] = []
        edge_keys: set[str] = set()
        for edge in raw_edges:
            if not isinstance(edge, dict):
                raise GraphError("each edge must be an object")
            key = edge.get("key")
            source_key = edge.get("source")
            target_key = edge.get("target")
            edge_type = edge.get("edge_type")
            label = edge.get("label")
            if not isinstance(key, str) or not key.strip() or key in edge_keys:
                raise GraphError("edge keys must be unique non-empty strings")
            if source_key not in keys or target_key not in keys:
                raise GraphError("edge endpoints must reference nodes in this patch")
            if edge_type not in EDGE_TYPES:
                raise GraphError(f"edge_type must be one of {', '.join(EDGE_TYPES)}")
            if not isinstance(label, str) or not label.strip():
                raise GraphError("edge label must not be empty")
            source_refs = self._resolve_refs(self.ledger, edge.get("source_refs", []), allowed_refs)
            if not any(ref["source_id"] == proposal_source_id for ref in source_refs):
                raise GraphError("each edge must cite the Proposal primary source_id")
            edge_keys.add(key)
            edges.append(
                {
                    "key": key,
                    "source": source_key,
                    "target": target_key,
                    "edge_type": edge_type,
                    "label": label.strip(),
                    "source_refs": source_refs,
                }
            )
        return {"proposal_id": str(proposal["proposal_id"]), "nodes": nodes, "edges": edges}

    def submit_patch(
        self,
        proposal_id: str,
        patch: dict[str, Any],
        parent_version_id: str | None = None,
    ) -> dict[str, Any]:
        reconfigure = getattr(sys.stdout, "reconfigure", None)
        if reconfigure is not None:
            reconfigure(encoding="utf-8")
        print("这是一个需要人工判断的决策点：图补丁只进入待审队列，未经签字不写入活动图谱。")
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            connection.executescript(_PHASE3_SCHEMA)
            proposal = connection.execute(
                "SELECT * FROM proposals WHERE proposal_id = ? AND record_type = 'proposal' AND human_approved = 1",
                (proposal_id,),
            ).fetchone()
            if proposal is None:
                raise GraphError("graph construction requires an active, human-approved Proposal")
            versions = connection.execute("SELECT COUNT(*) AS count FROM graph_versions").fetchone()
            if int(versions["count"]) > 0 and parent_version_id is None:
                raise GraphError("an existing graph requires an explicit parent_version_id")
            if parent_version_id is not None and connection.execute(
                "SELECT 1 FROM graph_versions WHERE version_id = ?", (parent_version_id,)
            ).fetchone() is None:
                raise GraphError(f"unknown parent graph version: {parent_version_id}")
            normalized = self._normalize_patch(proposal, patch)

        normalized["parent_version_id"] = parent_version_id
        normalized["snapshot_mode"] = "complete_version_snapshot"
        normalized["record_type"] = "graph_patch_draft"
        normalized["status"] = "pending_human_review"
        normalized["human_approved"] = False
        content_hash = _hash_json(normalized)
        patch_id = content_hash
        review_id = _hash_json({"kind": "graph-patch-review", "patch_id": patch_id})
        normalized["patch_id"] = patch_id
        normalized["review_id"] = review_id
        normalized["content_hash"] = content_hash
        payload = _canonical_json(normalized)
        created_at = datetime.now(timezone.utc).isoformat()

        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            connection.executescript(_PHASE3_SCHEMA)
            connection.execute("BEGIN IMMEDIATE")
            try:
                existing = connection.execute(
                    "SELECT content_hash, patch_json FROM graph_patch_drafts WHERE patch_id = ?",
                    (patch_id,),
                ).fetchone()
                inserted = existing is None
                if existing is not None:
                    if str(existing["content_hash"]) != content_hash or str(existing["patch_json"]) != payload:
                        raise LedgerIntegrityError(f"immutable graph patch mismatch: {patch_id}")
                else:
                    connection.execute(
                        """INSERT INTO graph_patch_drafts
                           (patch_id, proposal_id, parent_version_id, patch_json, content_hash, created_at)
                           VALUES (?, ?, ?, ?, ?, ?)""",
                        (patch_id, proposal_id, parent_version_id, payload, content_hash, created_at),
                    )
                    connection.execute(
                        """INSERT INTO graph_patch_review_queue
                           (review_id, patch_id, payload_json, content_hash, created_at)
                           VALUES (?, ?, ?, ?, ?)""",
                        (review_id, patch_id, payload, content_hash, created_at),
                    )
                connection.execute("COMMIT")
            except Exception:
                if connection.in_transaction:
                    connection.execute("ROLLBACK")
                raise
        return {
            "patch_id": patch_id,
            "review_id": review_id,
            "node_count": len(normalized["nodes"]),
            "edge_count": len(normalized["edges"]),
            "human_approved": False,
            "inserted": inserted,
        }

    def list_patch_reviews(self) -> tuple[dict[str, Any], ...]:
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            connection.executescript(_PHASE3_SCHEMA)
            rows = connection.execute(
                """SELECT q.review_id, d.patch_id, d.proposal_id, d.patch_json,
                          r.action, r.human_approved, r.signer
                   FROM graph_patch_review_queue AS q
                   JOIN graph_patch_drafts AS d ON d.patch_id = q.patch_id
                   LEFT JOIN graph_patch_decisions AS r ON r.review_id = q.review_id
                   ORDER BY q.created_at, q.review_id"""
            ).fetchall()
        output = []
        for row in rows:
            patch = json.loads(str(row["patch_json"]))
            output.append(
                {
                    "review_id": str(row["review_id"]),
                    "patch_id": str(row["patch_id"]),
                    "proposal_id": str(row["proposal_id"]),
                    "action": row["action"],
                    "human_approved": bool(row["human_approved"] or False),
                    "signer": row["signer"],
                    "node_count": len(patch["nodes"]),
                    "edge_count": len(patch["edges"]),
                }
            )
        return tuple(output)

    def get_patch_review(self, review_id: str) -> dict[str, Any]:
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            connection.executescript(_PHASE3_SCHEMA)
            row = connection.execute(
                """SELECT q.review_id, d.patch_json, r.action, r.human_approved, r.signer, r.reason
                   FROM graph_patch_review_queue AS q
                   JOIN graph_patch_drafts AS d ON d.patch_id = q.patch_id
                   LEFT JOIN graph_patch_decisions AS r ON r.review_id = q.review_id
                   WHERE q.review_id = ?""",
                (review_id,),
            ).fetchone()
        if row is None:
            raise GraphError(f"graph patch review not found: {review_id}")
        return {
            "review_id": str(row["review_id"]),
            "action": row["action"],
            "human_approved": bool(row["human_approved"] or False),
            "signer": row["signer"],
            "reason": row["reason"],
            "patch": json.loads(str(row["patch_json"])),
        }

    def _append_decision_log(self, title: str, lines: list[str]) -> tuple[str, int, int]:
        if not self.decisions_path.exists():
            raise GraphError(f"decision log does not exist: {self.decisions_path}")
        current = self.decisions_path.read_text(encoding="utf-8")
        body = "\n".join(lines)
        prefix = current.rstrip("\n")
        separator = "\n\n" if prefix else ""
        new_text = prefix + separator + body + "\n"
        start = len(prefix + separator)
        end = len(new_text)
        stored = self.ledger.ingest_text(new_text, title=title)
        if self.ledger.locate_span(stored.source_id, start, end).text_span != new_text[start:end]:
            raise LedgerIntegrityError("decision log span failed to round-trip")
        self._atomic_write(self.decisions_path, new_text)
        return stored.source_id, start, end

    def decide_patch(
        self,
        review_id: str,
        *,
        action: str,
        signer: str,
        reason: str,
        human_approved: bool,
    ) -> dict[str, Any]:
        if human_approved is not True:
            raise GraphError("human_approved=true must be explicit")
        if action not in {"approve", "reject"}:
            raise GraphError("action must be approve or reject")
        signer = _signed_text(signer, "signer")
        reason = _signed_text(reason, "reason")
        if len(reason) < 20:
            raise GraphError("review reason must contain at least 20 characters")
        review = self.get_patch_review(review_id)
        if review["action"] is not None:
            raise GraphError(f"graph patch review already signed: {review_id}")
        patch = review["patch"]
        proposal_id = patch["proposal_id"]
        version_id: str | None = None
        version_number: int | None = None
        version_hash: str | None = None
        if action == "approve":
            with self.ledger._connect() as connection:
                connection.execute("BEGIN")
                proposal = connection.execute(
                    "SELECT 1 FROM proposals WHERE proposal_id = ? AND record_type = 'proposal' AND human_approved = 1",
                    (proposal_id,),
                ).fetchone()
                if proposal is None:
                    connection.execute("ROLLBACK")
                    raise GraphError("patch parent Proposal is no longer active")
                version_row = connection.execute(
                    "SELECT COALESCE(MAX(version_number), 0) AS current FROM graph_versions"
                ).fetchone()
                version_number = int(version_row["current"]) + 1
                connection.execute("COMMIT")
            log_source_id, log_start, log_end = self._append_decision_log(
                "DECISIONS.md Phase3 graph version",
                [
                    f"## Phase 3 图补丁审阅：{review_id}",
                    "",
                    f"- 决定：{action}",
                    f"- patch_id：{patch['patch_id']}",
                    f"- Proposal：{proposal_id}",
                    f"- 审阅人：{signer}",
                    f"- 理由：{reason}",
                    "- human_approved：true",
                ],
            )
            version_body = {
                "proposal_id": proposal_id,
                "patch_id": patch["patch_id"],
                "parent_version_id": patch["parent_version_id"],
                "version_number": version_number,
                "decision_log_source_id": log_source_id,
                "decision_log_char_range": [log_start, log_end],
                "signer": signer,
                "reason": reason,
            }
            version_hash = _hash_json(version_body)
            version_id = version_hash
        else:
            log_source_id, log_start, log_end = self._append_decision_log(
                "DECISIONS.md Phase3 graph review",
                [
                    f"## Phase 3 图补丁审阅：{review_id}",
                    "",
                    f"- 决定：{action}",
                    f"- patch_id：{patch['patch_id']}",
                    f"- Proposal：{proposal_id}",
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
            connection.execute("BEGIN IMMEDIATE")
            try:
                if connection.execute(
                    "SELECT 1 FROM graph_patch_decisions WHERE review_id = ?", (review_id,)
                ).fetchone() is not None:
                    raise GraphError(f"graph patch review already signed: {review_id}")
                connection.execute(
                    """INSERT INTO graph_patch_decisions
                       (review_id, action, human_approved, signer, reason, graph_version_id,
                        decision_log_source_id, decision_log_start, decision_log_end, created_at)
                       VALUES (?, ?, 1, ?, ?, ?, ?, ?, ?, ?)""",
                    (review_id, action, signer, reason, version_id, log_source_id, log_start, log_end, created_at),
                )
                if action == "approve":
                    connection.execute(
                        """INSERT INTO graph_versions
                           (version_id, version_number, proposal_id, patch_id, parent_version_id,
                            patch_hash, human_approved, signer, reason, decision_log_source_id,
                            decision_log_start, decision_log_end, content_hash, created_at)
                           VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?)""",
                        (
                            version_id,
                            version_number,
                            proposal_id,
                            patch["patch_id"],
                            patch["parent_version_id"],
                            patch["content_hash"],
                            signer,
                            reason,
                            log_source_id,
                            log_start,
                            log_end,
                            version_hash,
                            created_at,
                        ),
                    )
                    node_ids = self._node_ids_by_key(patch, version_id)
                    for node in patch["nodes"]:
                        node_id = node_ids[node["key"]]
                        node_payload = {
                            "version_id": version_id,
                            "proposal_id": proposal_id,
                            "local_key": node["key"],
                            "node_type": node["node_type"],
                            "label": node["label"],
                            "source_refs": node["source_refs"],
                        }
                        connection.execute(
                            """INSERT INTO graph_nodes
                               (node_id, version_id, proposal_id, local_key, record_type,
                                node_type, label, source_refs_json, content_hash)
                               VALUES (?, ?, ?, ?, 'proposal_graph_node', ?, ?, ?, ?)""",
                            (
                                node_id,
                                version_id,
                                proposal_id,
                                node["key"],
                                node["node_type"],
                                node["label"],
                                _canonical_json(node["source_refs"]),
                                _hash_json(node_payload),
                            ),
                        )
                    for edge in patch["edges"]:
                        edge_payload = {
                            "version_id": version_id,
                            "proposal_id": proposal_id,
                            "local_key": edge["key"],
                            "source_node_id": node_ids[edge["source"]],
                            "target_node_id": node_ids[edge["target"]],
                            "edge_type": edge["edge_type"],
                            "label": edge["label"],
                            "source_refs": edge["source_refs"],
                        }
                        connection.execute(
                            """INSERT INTO graph_edges
                               (edge_id, version_id, proposal_id, local_key, record_type,
                                source_node_id, target_node_id, edge_type, label,
                                source_refs_json, content_hash)
                               VALUES (?, ?, ?, ?, 'proposal_graph_edge', ?, ?, ?, ?, ?, ?)""",
                            (
                                _hash_json(edge_payload),
                                version_id,
                                proposal_id,
                                edge["key"],
                                node_ids[edge["source"]],
                                node_ids[edge["target"]],
                                edge["edge_type"],
                                edge["label"],
                                _canonical_json(edge["source_refs"]),
                                _hash_json(edge_payload),
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
            "graph_version_id": version_id,
            "version_number": version_number,
        }

    def graph_snapshot(self, version_id: str | None = None) -> dict[str, Any]:
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            connection.executescript(_PHASE3_SCHEMA)
            if version_id is None:
                version = connection.execute(
                    "SELECT * FROM graph_versions ORDER BY version_number DESC LIMIT 1"
                ).fetchone()
            else:
                version = connection.execute(
                    "SELECT * FROM graph_versions WHERE version_id = ?", (version_id,)
                ).fetchone()
            if version is None:
                return {
                    "version": None,
                    "snapshot_mode": "complete_version_snapshot",
                    "nodes": [],
                    "edges": [],
                }
            nodes = connection.execute(
                "SELECT * FROM graph_nodes WHERE version_id = ? ORDER BY node_id", (version["version_id"],)
            ).fetchall()
            edges = connection.execute(
                "SELECT * FROM graph_edges WHERE version_id = ? ORDER BY edge_id", (version["version_id"],)
            ).fetchall()
        return {
            "version": dict(version),
            "snapshot_mode": "complete_version_snapshot",
            "nodes": [dict(row) for row in nodes],
            "edges": [dict(row) for row in edges],
        }

    def submit_fork_request(
        self,
        *,
        fork_point_node_id: str,
        branch_a: dict[str, Any],
        branch_b: dict[str, Any],
        reason: str,
    ) -> dict[str, Any]:
        reconfigure = getattr(sys.stdout, "reconfigure", None)
        if reconfigure is not None:
            reconfigure(encoding="utf-8")
        print("这是一个需要人工判断的决策点：fork 请求只入队，不选择胜者或合并分支。")
        reason = _signed_text(reason, "fork reason")
        if len(reason) < 20:
            raise GraphError("fork reason must contain at least 20 characters")
        if not isinstance(branch_a, dict) or not isinstance(branch_b, dict):
            raise GraphError("both branches must be structured objects")
        branch_a = dict(branch_a)
        branch_b = dict(branch_b)
        branch_a_id = branch_a.get("branch_id")
        branch_b_id = branch_b.get("branch_id")
        if not isinstance(branch_a_id, str) or not branch_a_id.strip() or not isinstance(branch_b_id, str) or not branch_b_id.strip():
            raise GraphError("each branch needs a stable non-empty branch_id")
        if branch_a_id == branch_b_id:
            raise GraphError("fork branches must have distinct branch_id values")

        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            connection.executescript(_PHASE3_SCHEMA)
            fork_point_row = connection.execute(
                "SELECT source_refs_json FROM graph_nodes WHERE node_id = ?",
                (fork_point_node_id,),
            ).fetchone()
            if fork_point_row is None:
                raise GraphError(f"unknown fork point node: {fork_point_node_id}")
            fork_point_refs = json.loads(str(fork_point_row["source_refs_json"]))
        for branch in (branch_a, branch_b):
            refs = self._resolve_refs(self.ledger, branch.get("source_refs", []), fork_point_refs)
            if not isinstance(branch.get("label"), str) or not branch["label"].strip():
                raise GraphError("each fork branch needs a non-empty label")
            if not isinstance(branch.get("description"), str) or not branch["description"].strip():
                raise GraphError("each fork branch needs a non-empty description")
            branch["source_refs"] = refs
        fork_body = {
            "record_type": "fork_request",
            "fork_point_node_id": fork_point_node_id,
            "branch_a": branch_a,
            "branch_b": branch_b,
            "reason": reason,
            "human_approved": False,
        }
        content_hash = _hash_json(fork_body)
        request_id = content_hash
        review_id = _hash_json({"kind": "fork-review", "request_id": request_id})
        fork_body["request_id"] = request_id
        fork_body["review_id"] = review_id
        fork_body["content_hash"] = content_hash
        payload = _canonical_json(fork_body)
        created_at = datetime.now(timezone.utc).isoformat()
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            connection.executescript(_PHASE3_SCHEMA)
            connection.execute("BEGIN IMMEDIATE")
            try:
                branch_a_json = _canonical_json(branch_a)
                branch_b_json = _canonical_json(branch_b)
                source_refs_json = _canonical_json(
                    {"branch_a": branch_a["source_refs"], "branch_b": branch_b["source_refs"]}
                )
                existing = connection.execute(
                    """SELECT content_hash, branch_a_json, branch_b_json, reason,
                              source_refs_json, request_json
                       FROM fork_requests WHERE request_id = ?""",
                    (request_id,),
                ).fetchone()
                inserted = existing is None
                if existing is not None:
                    if (
                        str(existing["content_hash"]) != content_hash
                        or str(existing["branch_a_json"]) != branch_a_json
                        or str(existing["branch_b_json"]) != branch_b_json
                        or str(existing["reason"]) != reason
                        or str(existing["source_refs_json"]) != source_refs_json
                        or str(existing["request_json"]) != payload
                    ):
                        raise LedgerIntegrityError("immutable fork request mismatch")
                else:
                    connection.execute(
                        """INSERT INTO fork_requests
                           (request_id, fork_point_node_id, branch_a_json, branch_b_json,
                            reason, source_refs_json, request_json, content_hash, created_at)
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                        (
                            request_id,
                            fork_point_node_id,
                            branch_a_json,
                            branch_b_json,
                            reason,
                            source_refs_json,
                            payload,
                            content_hash,
                            created_at,
                        ),
                    )
                    connection.execute(
                        """INSERT INTO fork_review_queue
                           (review_id, request_id, payload_json, content_hash, created_at)
                           VALUES (?, ?, ?, ?, ?)""",
                        (review_id, request_id, payload, content_hash, created_at),
                    )
                connection.execute("COMMIT")
            except Exception:
                if connection.in_transaction:
                    connection.execute("ROLLBACK")
                raise
        return {"request_id": request_id, "review_id": review_id, "inserted": inserted, "human_approved": False}

    def list_fork_reviews(self) -> tuple[dict[str, Any], ...]:
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            connection.executescript(_PHASE3_SCHEMA)
            rows = connection.execute(
                """SELECT q.review_id, r.request_id, r.fork_point_node_id,
                          d.action, d.human_approved, r.branch_a_json, r.branch_b_json
                   FROM fork_review_queue AS q
                   JOIN fork_requests AS r ON r.request_id = q.request_id
                   LEFT JOIN fork_decisions AS d ON d.review_id = q.review_id
                   ORDER BY q.created_at, q.review_id"""
            ).fetchall()
        return tuple(
            {
                "review_id": str(row["review_id"]),
                "request_id": str(row["request_id"]),
                "fork_point_node_id": str(row["fork_point_node_id"]),
                "action": row["action"],
                "human_approved": bool(row["human_approved"] or False),
                "branch_a": json.loads(str(row["branch_a_json"])),
                "branch_b": json.loads(str(row["branch_b_json"])),
            }
            for row in rows
        )

    def decide_fork(
        self,
        review_id: str,
        *,
        action: str,
        signer: str,
        reason: str,
        human_approved: bool,
    ) -> dict[str, Any]:
        if human_approved is not True:
            raise GraphError("human_approved=true must be explicit")
        if action not in {"keep_both", "reject"}:
            raise GraphError("fork action must be keep_both or reject")
        signer = _signed_text(signer, "signer")
        reason = _signed_text(reason, "reason")
        if len(reason) < 20:
            raise GraphError("fork review reason must contain at least 20 characters")
        review = next((item for item in self.list_fork_reviews() if item["review_id"] == review_id), None)
        if review is None:
            raise GraphError(f"fork review not found: {review_id}")
        if review["action"] is not None:
            raise GraphError(f"fork review already signed: {review_id}")
        fork_id: str | None = None
        log_source_id: str
        log_start: int
        log_end: int
        if action == "keep_both":
            fork_id = _hash_json(
                {
                    "review_id": review_id,
                    "branch_a": review["branch_a"],
                    "branch_b": review["branch_b"],
                    "reason": reason,
                    "signer": signer,
                }
            )
        log_source_id, log_start, log_end = self._append_decision_log(
            "DECISIONS.md Phase3 fork review",
            [
                f"## Phase 3 fork 审阅：{review_id}",
                "",
                f"- 决定：{action}",
                f"- request_id：{review['request_id']}",
                f"- fork_point：{review['fork_point_node_id']}",
                f"- 审阅人：{signer}",
                f"- 理由：{reason}",
                "- human_approved：true",
            ],
        )
        created_at = datetime.now(timezone.utc).isoformat()
        request = next(item for item in self.list_fork_reviews() if item["review_id"] == review_id)
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            connection.executescript(_PHASE3_SCHEMA)
            connection.execute("BEGIN IMMEDIATE")
            try:
                connection.execute(
                    """INSERT INTO fork_decisions
                       (review_id, action, human_approved, fork_id, signer, reason,
                        decision_log_source_id, decision_log_start, decision_log_end, created_at)
                       VALUES (?, ?, 1, ?, ?, ?, ?, ?, ?, ?)""",
                    (review_id, action, fork_id, signer, reason, log_source_id, log_start, log_end, created_at),
                )
                if action == "keep_both":
                    fork_payload = {
                        "review_id": review_id,
                        "fork_point_node_id": request["fork_point_node_id"],
                        "branch_a": request["branch_a"],
                        "branch_b": request["branch_b"],
                        "reason": reason,
                        "human_approved": True,
                        "signer": signer,
                        "decision_log_source_id": log_source_id,
                        "decision_log_char_range": [log_start, log_end],
                    }
                    connection.execute(
                        """INSERT INTO fork_records
                           (fork_id, review_id, fork_point_node_id, branch_a_json, branch_b_json,
                            reason, human_approved, signer, decision_log_source_id,
                            decision_log_start, decision_log_end, content_hash, created_at)
                           VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?)""",
                        (
                            fork_id,
                            review_id,
                            request["fork_point_node_id"],
                            _canonical_json(request["branch_a"]),
                            _canonical_json(request["branch_b"]),
                            reason,
                            signer,
                            log_source_id,
                            log_start,
                            log_end,
                            _hash_json(fork_payload),
                            created_at,
                        ),
                    )
                connection.execute("COMMIT")
            except Exception:
                if connection.in_transaction:
                    connection.execute("ROLLBACK")
                raise
        return {"review_id": review_id, "action": action, "fork_id": fork_id, "human_approved": True}

    def branch_status(self, fork_id: str) -> dict[str, Any]:
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            connection.executescript(_PHASE3_SCHEMA)
            fork = connection.execute("SELECT * FROM fork_records WHERE fork_id = ?", (fork_id,)).fetchone()
            if fork is None:
                raise GraphError(f"fork record not found: {fork_id}")
            operations = connection.execute(
                "SELECT * FROM branch_operations WHERE fork_id = ? ORDER BY created_at, operation_id",
                (fork_id,),
            ).fetchall()
        branches = {
            branch["branch_id"]: {**branch, "status": "active"}
            for branch in (json.loads(str(fork["branch_a_json"])), json.loads(str(fork["branch_b_json"])))
        }
        for operation in operations:
            targets = json.loads(str(operation["target_branch_ids_json"]))
            if operation["action"] == "delete":
                for target in targets:
                    branches[target]["status"] = "deleted_by_human_operation"
            else:
                result_branch = json.loads(str(operation["result_branch_json"]))
                for target in targets:
                    branches[target]["status"] = f"merged_into:{result_branch['branch_id']}"
                branches[result_branch["branch_id"]] = {**result_branch, "status": "active"}
        return {"fork_id": fork_id, "fork_point_node_id": str(fork["fork_point_node_id"]), "branches": branches}

    def operate_branches(
        self,
        fork_id: str,
        *,
        action: str,
        target_branch_ids: Sequence[str],
        signer: str,
        reason: str,
        human_approved: bool,
        result_branch: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        if human_approved is not True:
            raise GraphError("human_approved=true must be explicit for merge/delete")
        if action not in {"merge", "delete"}:
            raise GraphError("branch action must be merge or delete")
        signer = _signed_text(signer, "signer")
        reason = _signed_text(reason, "reason")
        if len(reason) < 20:
            raise GraphError("branch operation reason must contain at least 20 characters")
        if not isinstance(target_branch_ids, (list, tuple)) or any(
            not isinstance(branch_id, str) or not branch_id.strip() for branch_id in target_branch_ids
        ):
            raise GraphError("target_branch_ids must be non-empty branch identifiers")
        if action == "delete" and len(target_branch_ids) != 1:
            raise GraphError("delete targets exactly one branch")
        if action == "merge" and len(target_branch_ids) != 2:
            raise GraphError("merge requires exactly two branch ids")
        current = self.branch_status(fork_id)
        branches = current["branches"]
        if len(set(target_branch_ids)) != len(target_branch_ids) or any(target not in branches for target in target_branch_ids):
            raise GraphError("branch operation targets must be distinct branches of this fork")
        if any(branches[target]["status"] != "active" for target in target_branch_ids):
            raise GraphError("only active branches can be merged or deleted")
        if action == "merge":
            if not isinstance(result_branch, dict):
                raise GraphError("merge requires a human-supplied result_branch object")
            result_branch = dict(result_branch)
            result_id = result_branch.get("branch_id")
            if not isinstance(result_id, str) or not result_id.strip() or result_id in branches:
                raise GraphError("merged result needs a new branch_id")
            if not isinstance(result_branch.get("label"), str) or not result_branch["label"].strip():
                raise GraphError("merged result needs a human-supplied label")
            if not isinstance(result_branch.get("description"), str) or not result_branch["description"].strip():
                raise GraphError("merged result needs a human-authored description")
            with self.ledger._connect() as connection:
                fork_row = connection.execute(
                    "SELECT branch_a_json, branch_b_json FROM fork_records WHERE fork_id = ?",
                    (fork_id,),
                ).fetchone()
            if fork_row is None:
                raise GraphError(f"fork record not found: {fork_id}")
            left_branch = json.loads(str(fork_row["branch_a_json"]))
            right_branch = json.loads(str(fork_row["branch_b_json"]))
            allowed_refs = left_branch["source_refs"] + right_branch["source_refs"]
            result_branch["source_refs"] = self._resolve_refs(
                self.ledger,
                result_branch.get("source_refs", []),
                allowed_refs,
            )
        elif result_branch is not None:
            raise GraphError("delete does not accept a merged result branch")

        operation_id = _hash_json(
            {
                "fork_id": fork_id,
                "action": action,
                "target_branch_ids": list(target_branch_ids),
                "result_branch": result_branch,
                "signer": signer,
                "reason": reason,
            }
        )
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            connection.executescript(_PHASE3_SCHEMA)
            if connection.execute(
                "SELECT 1 FROM branch_operations WHERE operation_id = ?", (operation_id,)
            ).fetchone() is not None:
                raise GraphError(f"branch operation already recorded: {operation_id}")
        log_source_id, log_start, log_end = self._append_decision_log(
            "DECISIONS.md Phase3 branch operation",
            [
                f"## Phase 3 branch 操作：{operation_id}",
                "",
                f"- 决定：{action}",
                f"- fork_id：{fork_id}",
                f"- 目标分支：{', '.join(target_branch_ids)}",
                f"- 结果分支：{_canonical_json(result_branch) if result_branch is not None else '无'}",
                f"- 审阅人：{signer}",
                f"- 理由：{reason}",
                "- human_approved：true",
            ],
        )
        operation_body = {
            "operation_id": operation_id,
            "fork_id": fork_id,
            "action": action,
            "target_branch_ids": list(target_branch_ids),
            "result_branch": result_branch,
            "human_approved": True,
            "signer": signer,
            "reason": reason,
            "decision_log_source_id": log_source_id,
            "decision_log_char_range": [log_start, log_end],
        }
        created_at = datetime.now(timezone.utc).isoformat()
        with self.ledger._connect() as connection:
            connection.executescript(_PHASE1_SCHEMA)
            connection.executescript(_PHASE2_SCHEMA)
            connection.executescript(_PHASE3_SCHEMA)
            connection.execute("BEGIN IMMEDIATE")
            try:
                connection.execute(
                    """INSERT INTO branch_operations
                       (operation_id, fork_id, action, target_branch_ids_json, result_branch_json,
                        human_approved, signer, reason, decision_log_source_id,
                        decision_log_start, decision_log_end, content_hash, created_at)
                       VALUES (?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?)""",
                    (
                        operation_id,
                        fork_id,
                        action,
                        _canonical_json(list(target_branch_ids)),
                        None if result_branch is None else _canonical_json(result_branch),
                        signer,
                        reason,
                        log_source_id,
                        log_start,
                        log_end,
                        _hash_json(operation_body),
                        created_at,
                    ),
                )
                connection.execute("COMMIT")
            except Exception:
                if connection.in_transaction:
                    connection.execute("ROLLBACK")
                raise
        return {"operation_id": operation_id, "action": action, "human_approved": True, "branch_status": self.branch_status(fork_id)}
