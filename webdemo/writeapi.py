"""Demo write API: replay a minimal end-to-end loop inside an isolated scratch ledger.

Phase 2 of the web demo. Every handler here operates on a scratch-database
ledger that is rebuilt by POST /api/demo/reset. The formal ledger is only
ever read (as the seed for the scratch copy) and never written by this module.
"""

from __future__ import annotations

import contextlib
import io
import json
import shutil
import sqlite3
import tempfile
from pathlib import Path
from typing import Any

from critical_genealogy import CorpusLedger
from critical_genealogy.graph import GraphError, PhaseThreeAgent
from critical_genealogy.layering import LayeringAgent, PhaseOneError
from critical_genealogy.ledger import LedgerError, SourceNotFoundError
from critical_genealogy.proposals import PhaseTwoAgent, PhaseTwoError
from critical_genealogy.residues import PhaseFourError, ResidueProbeAgent

DEMO_SIGNER = "webdemo"
DEMO_CONFIDENCE = 0.5
DEMO_REASON = "用户委托网页演示：占位签字（webdemo），置信度 0.5 为流程占位，待人工学术复核。"

GENESIS_TITLE = "Genesis 1-3 (KJV)"
DEUT_TITLE = "Deuteronomy (KJV)"

DEMO_CONDITION = (
    "若在上述跨度所指的考古遗址或陶片地层中发现与该层叙述次序相矛盾的物质文化序列，"
    "则本占位映射必须重审。"
)

DEMO_DIR = Path(tempfile.gettempdir()) / "cg-webdemo-scratch"


def _silence(func, *args, **kwargs):
    with contextlib.redirect_stdout(io.StringIO()):
        return func(*args, **kwargs)


class DemoWriteAPI:
    """Owns one scratch ledger; rebuilt on every reset()."""

    def __init__(self, seed_db: Path, seed_objects: Path, candidate_dir: Path) -> None:
        self.seed_db = Path(seed_db)
        self.seed_objects = Path(seed_objects)
        self.candidate_dir = Path(candidate_dir)
        self.db_path: Path | None = None
        self.object_dir: Path | None = None
        self.decisions_path: Path | None = None
        self.ledger: CorpusLedger | None = None
        self.state: dict[str, Any] = {"ready": False}

    # -- lifecycle ------------------------------------------------------
    def reset(self) -> dict[str, Any]:
        if DEMO_DIR.exists():
            shutil.rmtree(DEMO_DIR, ignore_errors=True)
        DEMO_DIR.mkdir(parents=True, exist_ok=True)
        self.db_path = DEMO_DIR / "ledger.sqlite3"
        self.object_dir = DEMO_DIR / "objects"
        self.decisions_path = DEMO_DIR / "DECISIONS.md"
        shutil.copy(self.seed_db, self.db_path)
        if self.seed_objects.exists():
            shutil.copytree(self.seed_objects, self.object_dir)
        self.decisions_path.write_text("# Web demo decision log（占位签字记录）\n", encoding="utf-8")
        self.ledger = CorpusLedger(self.db_path, self.object_dir)
        head = self.ledger.verify().head_hash
        self.state = {"ready": True, "ledger_head": head, "steps": []}
        return {"ok": True, "ready": True, "ledger_head": head}

    def _agents(self):
        if not self.state.get("ready") or self.ledger is None or self.decisions_path is None:
            raise LedgerError("demo ledger is not ready; call POST /api/demo/reset first")
        assert self.ledger is not None and self.decisions_path is not None
        layering = LayeringAgent(
            ledger=self.ledger,
            candidate_path=self.candidate_dir / "genesis_1-3_candidates.json",
            decisions_path=self.decisions_path,
        )
        phase2 = PhaseTwoAgent(ledger=self.ledger, decisions_path=self.decisions_path)
        phase3 = PhaseThreeAgent(ledger=self.ledger, decisions_path=self.decisions_path)
        phase4 = ResidueProbeAgent(ledger=self.ledger, decisions_path=self.decisions_path)
        return layering, phase2, phase3, phase4

    def _mark(self, step: str, payload: dict[str, Any]) -> dict[str, Any]:
        self.state.setdefault("steps", []).append(step)
        return {"ok": True, "step": step, **payload}

    # -- phase 1 ---------------------------------------------------------
    def approve_layers(self) -> dict[str, Any]:
        layering, _, _, _ = self._agents()
        approved: list[str] = []
        seen_approved: set[str] = set()
        for candidate in ("genesis_1-3_candidates.json", "deuteronomy_candidates.json"):
            layering.candidate_path = self.candidate_dir / candidate
            _silence(layering.run)
            for item in layering.list_reviews():
                if item["decision"] is None:
                    layering.record_decision(
                        item["review_id"], action="approve", signer=DEMO_SIGNER,
                        reason=DEMO_REASON, confidence=DEMO_CONFIDENCE, human_approved=True,
                    )
                    approved.append(item["review_id"])
                elif item["decision"] == "approve":
                    seen_approved.add(item["review_id"])
        total = len({item["review_id"] for item in layering.list_reviews()})
        return self._mark(
            "layers_approved",
            {"approved": approved, "newly_approved": len(approved),
             "already_approved": len(seen_approved), "count": len(approved) + len(seen_approved),
             "total": total},
        )

    def _source_id(self, title: str) -> str:
        assert self.ledger is not None
        for source in self.ledger.sources():
            if source["title"] == title:
                return str(source["source_id"])
        raise SourceNotFoundError(title)

    # -- phase 2 ---------------------------------------------------------
    def submit_draft(self, body: dict[str, Any]) -> dict[str, Any]:
        _, phase2, _, _ = self._agents()
        try:
            result = _silence(
                phase2.submit_draft,
                parent_hypothesis_ids=body["parent_hypothesis_ids"],
                rule_id=body["rule_id"],
                mapping=body["mapping"],
                falsifiability_condition=body.get("falsifiability_condition", DEMO_CONDITION),
                reasoning_chain=body.get("reasoning_chain", ["占位推理步骤一：演示构造。", "占位推理步骤二：待人工复核。"]),
                source_id=body["source_id"],
                source_refs=body["source_refs"],
            )
        except KeyError as error:
            raise PhaseTwoError(f"missing draft field: {error}") from error
        return self._mark("draft_submitted", result)

    def approve_proposal(self, body: dict[str, Any]) -> dict[str, Any]:
        _, phase2, _, _ = self._agents()
        try:
            result = phase2.decide(
                body["review_id"], action=body.get("action", "approve"),
                signer=body.get("signer", DEMO_SIGNER),
                reason=body.get("reason", DEMO_REASON),
                confidence=body.get("confidence", DEMO_CONFIDENCE),
                human_approved=body.get("human_approved", True),
            )
        except KeyError as error:
            raise PhaseTwoError(f"missing approval field: {error}") from error
        return self._mark("proposal_decided", result)

    def demo_draft_and_proposal(self) -> dict[str, Any]:
        layering, phase2, _, _ = self._agents()
        reviews = layering.list_reviews()
        assert reviews, "no layer reviews; approve layers first"
        parent = reviews[0]["hypothesis"]["layer_hypothesis_id"]
        genesis_id = self._source_id(GENESIS_TITLE)
        draft = self.submit_draft(
            {
                "parent_hypothesis_ids": [parent],
                "rule_id": "WEBDEMO-01",
                "mapping": "占位映射 WEBDEMO-01：演示用，待人工学术复核。",
                "source_id": genesis_id,
                "source_refs": [{"source_id": genesis_id, "char_range": [16, 70]}],
            }
        )
        proposal = self.approve_proposal({"review_id": draft["review_id"]})
        return self._mark("draft_and_proposal", {"draft": draft, "proposal": proposal})

    # -- phase 3 ----------------------------------------------------------
    def latest_version_id(self) -> str | None:
        _, _, phase3, _ = self._agents()
        snapshot = phase3.graph_snapshot()
        version = snapshot.get("version")
        return version["version_id"] if version else None

    def submit_patch(self, body: dict[str, Any]) -> dict[str, Any]:
        _, _, phase3, _ = self._agents()
        parent = body.get("parent_version_id")
        if parent is None:
            parent = self.latest_version_id()
        try:
            result = _silence(
                phase3.submit_patch, body["proposal_id"], body["patch"],
                parent_version_id=parent,
            )
        except KeyError as error:
            raise GraphError(f"missing patch field: {error}") from error
        return self._mark("patch_submitted", result)

    def decide_patch(self, body: dict[str, Any]) -> dict[str, Any]:
        _, _, phase3, _ = self._agents()
        try:
            result = phase3.decide_patch(
                body["review_id"], action=body.get("action", "approve"),
                signer=body.get("signer", DEMO_SIGNER),
                reason=body.get("reason", DEMO_REASON),
                human_approved=body.get("human_approved", True),
            )
        except KeyError as error:
            raise GraphError(f"missing patch decision field: {error}") from error
        return self._mark("patch_decided", result)

    def demo_graph(self, proposal_id: str) -> dict[str, Any]:
        _, _, phase3, _ = self._agents()
        assert self.ledger is not None
        genesis_id = self._source_id(GENESIS_TITLE)
        ref = {"source_id": genesis_id, "char_range": [16, 70]}
        patch = self.submit_patch(
            {
                "proposal_id": proposal_id,
                "patch": {
                    "nodes": [
                        {"key": "demo-agent", "node_type": "actor", "label": "演示行为者（占位）", "source_refs": [ref]},
                        {"key": "demo-order", "node_type": "office", "label": "演示秩序（占位）", "source_refs": [ref]},
                    ],
                    "edges": [
                        {"key": "demo-edge", "source": "demo-agent", "target": "demo-order",
                         "edge_type": "exchange", "label": "演示关系（占位）", "source_refs": [ref]},
                    ],
                },
            }
        )
        approval = self.decide_patch({"review_id": patch["review_id"]})
        return self._mark("graph_version", {"patch": patch, "approval": approval})

    def submit_fork(self, body: dict[str, Any]) -> dict[str, Any]:
        _, _, phase3, _ = self._agents()
        try:
            result = _silence(
                phase3.submit_fork_request,
                fork_point_node_id=body["fork_point_node_id"],
                branch_a=body["branch_a"], branch_b=body["branch_b"],
                reason=body.get("reason", DEMO_REASON),
            )
        except KeyError as error:
            raise GraphError(f"missing fork field: {error}") from error
        return self._mark("fork_submitted", result)

    def decide_fork(self, body: dict[str, Any]) -> dict[str, Any]:
        _, _, phase3, _ = self._agents()
        try:
            result = phase3.decide_fork(
                body["review_id"], action=body.get("action", "keep_both"),
                signer=body.get("signer", DEMO_SIGNER),
                reason=body.get("reason", DEMO_REASON),
                human_approved=body.get("human_approved", True),
            )
        except KeyError as error:
            raise GraphError(f"missing fork decision field: {error}") from error
        return self._mark("fork_decided", result)

    def branch_op(self, body: dict[str, Any]) -> dict[str, Any]:
        _, _, phase3, _ = self._agents()
        try:
            result = phase3.operate_branches(
                body["fork_id"], action=body["action"],
                target_branch_ids=body["target_branch_ids"],
                signer=body.get("signer", DEMO_SIGNER),
                reason=body.get("reason", DEMO_REASON),
                human_approved=body.get("human_approved", True),
                result_branch=body.get("result_branch"),
            )
        except KeyError as error:
            raise GraphError(f"missing branch-op field: {error}") from error
        return self._mark("branch_operated", result)

    def demo_fork(self, node_id: str) -> dict[str, Any]:
        genesis_id = self._source_id(GENESIS_TITLE)
        ref = {"source_id": genesis_id, "char_range": [16, 70]}
        fork = self.submit_fork(
            {
                "fork_point_node_id": node_id,
                "branch_a": {"branch_id": "demo-a", "label": "演示分支 A（占位）",
                             "description": "占位分支，待人工复核。", "source_refs": [ref]},
                "branch_b": {"branch_id": "demo-b", "label": "演示分支 B（占位）",
                             "description": "占位分支，待人工复核。", "source_refs": [ref]},
            }
        )
        kept = self.decide_fork({"review_id": fork["review_id"]})
        return self._mark("fork_kept", {"fork": fork, "kept": kept})

    # -- phase 4 ----------------------------------------------------------
    def submit_timeline(self, body: dict[str, Any]) -> dict[str, Any]:
        _, _, _, phase4 = self._agents()
        try:
            result = _silence(
                phase4.submit_timeline_event,
                civilization=body["civilization"], label=body["label"],
                year_start=body["year_start"], year_end=body["year_end"],
                source_refs=body["source_refs"],
            )
        except KeyError as error:
            raise PhaseFourError(f"missing timeline field: {error}") from error
        return self._mark("timeline_submitted", result)

    def decide_timeline(self, body: dict[str, Any]) -> dict[str, Any]:
        _, _, _, phase4 = self._agents()
        try:
            result = phase4.decide_timeline_event(
                body["review_id"], action=body.get("action", "approve"),
                signer=body.get("signer", DEMO_SIGNER),
                reason=body.get("reason", DEMO_REASON),
                human_approved=body.get("human_approved", True),
            )
        except KeyError as error:
            raise PhaseFourError(f"missing timeline decision field: {error}") from error
        return self._mark("timeline_decided", result)

    def submit_probe(self, probe_id: str, body: dict[str, Any]) -> dict[str, Any]:
        _, _, _, phase4 = self._agents()
        try:
            result = _silence(
                phase4.submit_probe_candidate,
                probe_id,
                graph_version_id=body["graph_version_id"],
                civilization=body["civilization"], signal=body["signal"],
                rationale=body.get("rationale", "占位理由：演示构造，待人工复核。"),
                year_start=body["year_start"], year_end=body["year_end"],
                graph_refs=body["graph_refs"], source_refs=body["source_refs"],
            )
        except KeyError as error:
            raise PhaseFourError(f"missing probe field: {error}") from error
        return self._mark("probe_submitted", result)

    def decide_probe(self, body: dict[str, Any]) -> dict[str, Any]:
        _, _, _, phase4 = self._agents()
        try:
            result = phase4.decide_probe_candidate(
                body["review_id"], action=body.get("action", "keep"),
                signer=body.get("signer", DEMO_SIGNER),
                reason=body.get("reason", DEMO_REASON),
                human_approved=body.get("human_approved", True),
            )
        except KeyError as error:
            raise PhaseFourError(f"missing probe decision field: {error}") from error
        return self._mark("probe_decided", result)

    def run_backtest(self, body: dict[str, Any]) -> dict[str, Any]:
        _, _, _, phase4 = self._agents()
        try:
            result = _silence(
                phase4.run_backtest,
                graph_version_id=body["graph_version_id"],
                civilization=body["civilization"],
                tolerance_years=body["tolerance_years"],
                signer=body.get("signer", DEMO_SIGNER),
                reason=body.get("reason", DEMO_REASON),
                human_approved=body.get("human_approved", True),
            )
        except KeyError as error:
            raise PhaseFourError(f"missing backtest field: {error}") from error
        return self._mark("backtest_run", result)

    def submit_weight(self, body: dict[str, Any]) -> dict[str, Any]:
        _, _, _, phase4 = self._agents()
        try:
            result = _silence(
                phase4.submit_weight_change,
                backtest_id=body["backtest_id"], weights=body["weights"],
                rationale=body.get("rationale", DEMO_REASON),
            )
        except KeyError as error:
            raise PhaseFourError(f"missing weight field: {error}") from error
        return self._mark("weight_submitted", result)

    def decide_weight(self, body: dict[str, Any]) -> dict[str, Any]:
        _, _, _, phase4 = self._agents()
        try:
            result = phase4.decide_weight_change(
                body["review_id"], action=body.get("action", "approve"),
                signer=body.get("signer", DEMO_SIGNER),
                reason=body.get("reason", DEMO_REASON),
                human_approved=body.get("human_approved", True),
            )
        except KeyError as error:
            raise PhaseFourError(f"missing weight decision field: {error}") from error
        return self._mark("weight_decided", result)


DEMO_ROUTES = [
    ("POST /api/demo/reset", "重建内存演示库"),
    ("POST /api/demo/layers/approve", "演示：批准全部分层"),
    ("POST /api/demo/draft", "演示：提交草稿"),
    ("POST /api/demo/proposal/approve", "演示：批准提案"),
    ("POST /api/demo/draft-and-proposal", "演示：一键草稿+提案"),
    ("POST /api/demo/patch/submit", "演示：提交图补丁"),
    ("POST /api/demo/patch/approve", "演示：批准图补丁"),
    ("POST /api/demo/graph", "演示：一键图版本"),
    ("POST /api/demo/fork/submit", "演示：提交 fork"),
    ("POST /api/demo/fork/keep-both", "演示：保留双分支"),
    ("POST /api/demo/branch-op", "演示：merge/delete"),
    ("POST /api/demo/fork-demo", "演示：一键 fork+keep"),
    ("POST /api/demo/timeline/submit", "演示：提交时间线事件"),
    ("POST /api/demo/timeline/decide", "演示：审批时间线事件"),
    ("POST /api/demo/probe/submit?probe_id=", "演示：提交探针候选"),
    ("POST /api/demo/probe/decide", "演示：keep/reject 探针"),
    ("POST /api/demo/backtest/run", "演示：运行回测"),
    ("POST /api/demo/weight/submit", "演示：提交权重"),
    ("POST /api/demo/weight/decide", "演示：审批权重"),
]


def dispatch_demo(api: DemoWriteAPI, path: str, body: dict[str, Any]) -> tuple[int, Any]:
    from urllib.parse import parse_qs, urlparse

    parsed = urlparse(path)
    route = parsed.path
    params = {key: values[-1] for key, values in parse_qs(parsed.query).items()}
    try:
        if route == "/api/demo/reset":
            return 200, api.reset()
        if route == "/api/demo/layers/approve":
            return 200, api.approve_layers()
        if route == "/api/demo/draft":
            return 200, api.submit_draft(body)
        if route == "/api/demo/proposal/approve":
            return 200, api.approve_proposal(body)
        if route == "/api/demo/draft-and-proposal":
            return 200, api.demo_draft_and_proposal()
        if route == "/api/demo/patch/submit":
            return 200, api.submit_patch(body)
        if route == "/api/demo/patch/approve":
            return 200, api.decide_patch(body)
        if route == "/api/demo/graph":
            return 200, api.demo_graph(body["proposal_id"])
        if route == "/api/demo/fork/submit":
            return 200, api.submit_fork(body)
        if route == "/api/demo/fork/keep-both":
            return 200, api.decide_fork({**body, "action": "keep_both"})
        if route == "/api/demo/branch-op":
            return 200, api.branch_op(body)
        if route == "/api/demo/fork-demo":
            return 200, api.demo_fork(body["node_id"])
        if route == "/api/demo/timeline/submit":
            return 200, api.submit_timeline(body)
        if route == "/api/demo/timeline/decide":
            return 200, api.decide_timeline(body)
        if route == "/api/demo/probe/submit":
            if "probe_id" not in params:
                raise PhaseFourError("missing probe_id query parameter")
            return 200, api.submit_probe(params["probe_id"], body)
        if route == "/api/demo/probe/decide":
            return 200, api.decide_probe(body)
        if route == "/api/demo/backtest/run":
            return 200, api.run_backtest(body)
        if route == "/api/demo/weight/submit":
            return 200, api.submit_weight(body)
        if route == "/api/demo/weight/decide":
            return 200, api.decide_weight(body)
        return 404, {"ok": False, "error": f"unknown path: {route}"}
    except (LedgerError, PhaseOneError, PhaseTwoError, GraphError, PhaseFourError,
            OSError, sqlite3.Error, ValueError, KeyError, AssertionError) as error:
        message = str(error) or type(error).__name__
        return 400, {"ok": False, "error": message}
