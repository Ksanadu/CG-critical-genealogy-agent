"""Read-only query API for the CG web demo (Phase 1).

All handlers delegate to the existing critical_genealogy agents/ledger and
only reshape their outputs for HTTP. Nothing here writes to any database.
"""

from __future__ import annotations

import json
import sqlite3
from typing import Any
from urllib.parse import parse_qs, urlparse

from critical_genealogy.graph import PhaseThreeAgent
from critical_genealogy.layering import LayeringAgent
from critical_genealogy.ledger import CorpusLedger, LedgerError, SourceNotFoundError
from critical_genealogy.proposals import PhaseTwoAgent
from critical_genealogy.residues import ResidueProbeAgent

MANIFEST_PREVIEW_CHARS = 200
SEARCH_DEFAULT_LIMIT = 50
SEARCH_MAX_LIMIT = 200


def _query(path: str) -> dict[str, str]:
    return {key: values[-1] for key, values in parse_qs(urlparse(path).query).items()}


def _require(params: dict[str, str], *names: str) -> None:
    missing = [name for name in names if not params.get(name)]
    if missing:
        raise LedgerError(f"missing query parameters: {', '.join(missing)}")


def _int_param(params: dict[str, str], name: str, default: int | None = None) -> int:
    raw = params.get(name)
    if raw is None or raw == "":
        if default is None:
            raise LedgerError(f"missing integer query parameter: {name}")
        return default
    try:
        return int(raw)
    except ValueError as error:
        raise LedgerError(f"query parameter {name!r} must be an integer") from error


class ReadAPI:
    """Stateless read handlers bound to one ledger (plus agent views over it)."""

    def __init__(self, ledger: CorpusLedger) -> None:
        self.ledger = ledger
        self.layering = LayeringAgent(ledger=ledger)
        self.phase2 = PhaseTwoAgent(ledger=ledger)
        self.phase3 = PhaseThreeAgent(ledger=ledger)
        self.phase4 = ResidueProbeAgent(ledger=ledger)

    # -- ledger -----------------------------------------------------------
    def sources(self) -> list[dict[str, Any]]:
        return [dict(row) for row in self.ledger.sources()]

    def manifest(self, params: dict[str, str]) -> list[dict[str, Any]]:
        _require(params, "source_id")
        full = params.get("full") == "1"
        items = []
        for unit in self.ledger.manifest(params["source_id"]):
            item = unit.as_manifest_item()
            if not full and len(item["text_span"]) > MANIFEST_PREVIEW_CHARS:
                item["text_span"] = item["text_span"][:MANIFEST_PREVIEW_CHARS]
                item["text_truncated"] = True
            items.append(item)
        return items

    def locate(self, params: dict[str, str]) -> dict[str, Any]:
        _require(params, "source_id")
        start = _int_param(params, "start")
        end = _int_param(params, "end")
        return self.ledger.locate_span(params["source_id"], start, end).as_dict()

    def search(self, params: dict[str, str]) -> list[dict[str, Any]]:
        _require(params, "q")
        limit = _int_param(params, "limit", SEARCH_DEFAULT_LIMIT)
        if limit < 1 or limit > SEARCH_MAX_LIMIT:
            raise LedgerError(f"limit must be within [1, {SEARCH_MAX_LIMIT}]")
        source_id = params.get("source_id") or None
        matches = self.ledger.search_excerpt(params["q"], source_id=source_id)
        return [match.as_dict() for match in matches[:limit]]

    # -- layers / proposals ----------------------------------------------
    def layers(self) -> list[dict[str, Any]]:
        output = []
        for item in self.layering.list_reviews():
            hypothesis = item["hypothesis"]
            output.append(
                {
                    "review_id": item["review_id"],
                    "layer_hypothesis_id": hypothesis["layer_hypothesis_id"],
                    "model_id": hypothesis["model_id"],
                    "label": hypothesis["label"],
                    "source_id": hypothesis["source_id"],
                    "decision": item["decision"],
                    "human_approved": item["human_approved"],
                    "confidence": item["confidence"],
                    "signer": item["signer"],
                }
            )
        return output

    def proposals(self) -> list[dict[str, Any]]:
        return [dict(row) for row in self.phase2.active_proposals()]

    # -- graph ------------------------------------------------------------
    def graph_snapshot(self, params: dict[str, str]) -> dict[str, Any]:
        return self.phase3.graph_snapshot(params.get("version_id") or None)

    def forks(self) -> list[dict[str, Any]]:
        output = []
        for review in self.phase3.list_fork_reviews():
            entry: dict[str, Any] = dict(review)
            if review.get("action") == "keep_both":
                with self.ledger._connect() as connection:
                    row = connection.execute(
                        "SELECT fork_id FROM fork_records WHERE review_id = ?",
                        (review["review_id"],),
                    ).fetchone()
                if row is not None:
                    entry["fork_id"] = row["fork_id"]
                    entry["branches"] = self.phase3.branch_status(row["fork_id"])["branches"]
            output.append(entry)
        return output

    # -- phase 4 ----------------------------------------------------------
    def timeline(self) -> list[dict[str, Any]]:
        with self.ledger._connect() as connection:
            rows = connection.execute(
                "SELECT event_id, civilization, label, year_start, year_end,"
                " human_approved, signer, created_at FROM fracture_events"
                " ORDER BY year_start, event_id"
            ).fetchall()
        return [dict(row) for row in rows]

    def probes(self, params: dict[str, str]) -> list[dict[str, Any]]:
        probe_id = params.get("probe_id") or None
        return [dict(item) for item in self.phase4.list_probe_reviews(probe_id)]

    def backtests(self) -> list[dict[str, Any]]:
        with self.ledger._connect() as connection:
            rows = connection.execute(
                "SELECT backtest_id, graph_version_id, civilization, tolerance_years,"
                " metrics_json, human_approved, signer, created_at FROM backtest_runs"
                " ORDER BY created_at"
            ).fetchall()
        output = []
        for row in rows:
            item = dict(row)
            item["metrics"] = json.loads(str(item.pop("metrics_json")))
            item["weights_updated"] = False
            output.append(item)
        return output

    def weights(self) -> list[dict[str, Any]]:
        return [dict(item) for item in self.phase4.active_weights()]

    # -- metrics ----------------------------------------------------------
    def metrics(self) -> dict[str, Any]:
        with self.ledger._connect() as connection:
            unit_count = connection.execute("SELECT COUNT(*) FROM ledger_entries").fetchone()[0]
            residue_count = sum(
                connection.execute(f"SELECT COUNT(*) FROM {table}").fetchone()[0]
                for table in ("residue_candidates", "singularity_candidates", "event_site_candidates")
            )
            forks = connection.execute("SELECT COUNT(*) FROM fork_records").fetchone()[0]
            ops = connection.execute("SELECT COUNT(*) FROM branch_operations").fetchone()[0]
            confidences = [
                row[0]
                for row in connection.execute(
                    "SELECT confidence FROM proposals UNION ALL "
                    "SELECT confidence FROM review_decisions WHERE action='approve'"
                ).fetchall()
                if row[0] is not None
            ]
        return {
            "residue_mark_ratio": (residue_count / unit_count) if unit_count else "N/A",
            "residue_records": residue_count,
            "unit_count": unit_count,
            "approved_fork_count": forks,
            "branch_operation_count": ops,
            "mean_confidence": (sum(confidences) / len(confidences)) if confidences else "N/A",
            "confidence_samples": len(confidences),
            "note": "缺失记 N/A；残余下降不是进步，无新证据时置信度上升是告警信号。",
        }

    # -- trace ------------------------------------------------------------
    def trace(self, params: dict[str, str]) -> dict[str, Any]:
        _require(params, "proposal_id")
        proposal_id = params["proposal_id"]
        with self.ledger._connect() as connection:
            proposal = connection.execute(
                "SELECT * FROM proposals WHERE proposal_id = ?", (proposal_id,)
            ).fetchone()
            if proposal is None:
                raise LedgerError(f"unknown proposal_id: {proposal_id}")
            parents = json.loads(str(proposal["parent_hypothesis_ids_json"]))
            hypotheses = []
            for parent_id in parents:
                row = connection.execute(
                    "SELECT h.hypothesis_id, h.model_id, h.source_id, d.confidence, d.signer"
                    " FROM layer_hypotheses AS h"
                    " JOIN human_review_queue AS q ON q.subject_id = h.hypothesis_id"
                    " JOIN review_decisions AS d ON d.review_id = q.review_id"
                    " WHERE h.hypothesis_id = ? AND d.action = 'approve'",
                    (parent_id,),
                ).fetchone()
                if row is None:
                    raise LedgerError(f"parent hypothesis is not approved: {parent_id}")
                hypotheses.append(dict(row))
            source_refs = json.loads(str(proposal["source_refs_json"]))
            spans = []
            for reference in source_refs:
                located = self.ledger.locate_span(
                    reference["source_id"], reference["char_range"][0], reference["char_range"][1]
                ).as_dict()
                with self.ledger._connect() as inner:
                    entries = inner.execute(
                        "SELECT entry_hash, previous_hash, sequence FROM ledger_entries"
                        " WHERE source_id = ? AND char_start < ? AND char_end > ?"
                        " ORDER BY ordinal",
                        (reference["source_id"], reference["char_range"][1], reference["char_range"][0]),
                    ).fetchall()
                spans.append({**located, "ledger_entries": [dict(entry) for entry in entries]})
                if not spans[-1]["ledger_entries"]:
                    raise LedgerError("trace broken: span has no ledger entries")
        return {
            "proposal": dict(proposal),
            "parent_hypotheses": hypotheses,
            "source_spans": spans,
            "unbroken": True,
        }


ROUTE_TABLE = [
    ("GET /api/health", "存活与版本"),
    ("GET /api/verify", "账本完整性"),
    ("GET /api/sources", "语料清单"),
    ("GET /api/sources/manifest?source_id=&full?", "逐单元清单（默认截断）"),
    ("GET /api/locate?source_id=&start=&end=", "字符区间定位"),
    ("GET /api/search?q=&source_id?&limit?", "全文检索"),
    ("GET /api/layers", "分层候选与批准状态"),
    ("GET /api/proposals", "活动 Proposal 列表"),
    ("GET /api/graph/snapshot?version_id?", "图版本快照"),
    ("GET /api/forks", "fork 记录与分支状态"),
    ("GET /api/timeline", "断裂时间线事件"),
    ("GET /api/probes?probe_id?", "三探针候选与状态"),
    ("GET /api/backtests", "回测记录与原始指标"),
    ("GET /api/weights", "已激活权重集"),
    ("GET /api/metrics", "三条健康度指标"),
    ("GET /api/trace?proposal_id=", "终端结论完整回溯链"),
    ("GET /", "演示前端单页"),
    ("GET /api/docs", "API 文档页"),
]


def dispatch(api: ReadAPI, path: str) -> tuple[int, Any]:
    parsed = urlparse(path)
    route, params = parsed.path, _query(path)
    try:
        if route == "/api/sources":
            return 200, api.sources()
        if route == "/api/sources/manifest":
            return 200, api.manifest(params)
        if route == "/api/locate":
            return 200, api.locate(params)
        if route == "/api/search":
            return 200, api.search(params)
        if route == "/api/layers":
            return 200, api.layers()
        if route == "/api/proposals":
            return 200, api.proposals()
        if route == "/api/graph/snapshot":
            return 200, api.graph_snapshot(params)
        if route == "/api/forks":
            return 200, api.forks()
        if route == "/api/timeline":
            return 200, api.timeline()
        if route == "/api/probes":
            return 200, api.probes(params)
        if route == "/api/backtests":
            return 200, api.backtests()
        if route == "/api/weights":
            return 200, api.weights()
        if route == "/api/metrics":
            return 200, api.metrics()
        if route == "/api/trace":
            return 200, api.trace(params)
        return 404, {"ok": False, "error": f"unknown path: {route}"}
    except SourceNotFoundError as error:
        return 400, {"ok": False, "error": f"unknown source_id: {error}"}
    except (LedgerError, OSError, sqlite3.Error, ValueError) as error:
        message = str(error)
        client_error = message.startswith(
            ("missing ", "query parameter", "limit must", "unknown ")
        ) or "not found" in message or "not approved" in message or "trace broken" in message
        return (400 if client_error else 500), {"ok": False, "error": message}
