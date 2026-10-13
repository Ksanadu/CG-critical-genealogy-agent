from __future__ import annotations

import contextlib
import io
import json
import sqlite3
import tempfile
import unittest
from pathlib import Path

from critical_genealogy import CorpusLedger
from critical_genealogy.graph import EDGE_TYPES, NODE_TYPES, GraphError, PhaseThreeAgent
from critical_genealogy.layering import LayeringAgent
from critical_genealogy.proposals import PhaseTwoAgent


PROJECT_ROOT = Path(__file__).resolve().parents[1]
GENESIS_PATH = PROJECT_ROOT / "data" / "sources" / "genesis_1-3_kjv.txt"
LAYER_CANDIDATES = PROJECT_ROOT / "data" / "layers" / "genesis_1-3_candidates.json"
VALID_CONDITION = "If an inscription in the dated archaeological strata contradicts the proposal, the mapping must be reviewed."


class PhaseThreeTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temporary_directory = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary_directory.name)
        self.ledger = CorpusLedger(
            db_path=self.root / "ledger.sqlite3",
            object_dir=self.root / "objects",
        )
        self.source = self.ledger.ingest_file(GENESIS_PATH, title="Genesis 1-3 (KJV)")
        self.decisions_path = self.root / "DECISIONS.md"
        self.decisions_path.write_text("# Human decision log\n\nPhase3 test baseline.\n", encoding="utf-8")
        self.layer_agent = LayeringAgent(
            ledger=self.ledger,
            candidate_path=LAYER_CANDIDATES,
            decisions_path=self.decisions_path,
        )
        with contextlib.redirect_stdout(io.StringIO()):
            self.layer_agent.run(source_id=self.source.source_id)
        self.parent_review = self.layer_agent.list_reviews()[0]
        self.parent_id = self.parent_review["hypothesis"]["layer_hypothesis_id"]
        self.layer_agent.record_decision(
            self.parent_review["review_id"],
            action="approve",
            signer="reviewer-test",
            reason="Reviewed the linked source span for this isolated graph fixture.",
            confidence=0.62,
            human_approved=True,
        )
        self.phase2 = PhaseTwoAgent(ledger=self.ledger, decisions_path=self.decisions_path)
        draft = self.phase2.submit_draft(
            parent_hypothesis_ids=[self.parent_id],
            rule_id="R3",
            mapping="Human-authored test mapping candidate",
            falsifiability_condition=VALID_CONDITION,
            reasoning_chain=["This is a test-only reasoning step tied to the cited source."],
            source_id=self.source.source_id,
            source_refs=[{"source_id": self.source.source_id, "char_range": [16, 70]}],
        )
        self.proposal = self.phase2.decide(
            draft["review_id"],
            action="approve",
            signer="reviewer-test",
            reason="Reviewed the phase-two test candidate and its falsifiability condition.",
            confidence=0.41,
            human_approved=True,
        )
        self.graph = PhaseThreeAgent(self.ledger, self.decisions_path)
        self.reference = {"source_id": self.source.source_id, "char_range": [16, 70]}

    def tearDown(self) -> None:
        self.temporary_directory.cleanup()

    def _patch(self, node_type: str = "actor", edge_type: str = "exchange") -> dict:
        return {
            "nodes": [
                {"key": "a", "node_type": node_type, "label": "Test actor", "source_refs": [self.reference]},
                {"key": "b", "node_type": "office", "label": "Test office", "source_refs": [self.reference]},
            ],
            "edges": [
                {
                    "key": "e",
                    "source": "a",
                    "target": "b",
                    "edge_type": edge_type,
                    "label": "Test relation",
                    "source_refs": [self.reference],
                }
            ],
        }

    def _submit_patch(self, patch: dict | None = None):
        output = io.StringIO()
        with contextlib.redirect_stdout(output):
            result = self.graph.submit_patch(self.proposal["proposal_id"], patch or self._patch())
        return result, output.getvalue()

    def test_fixed_graph_type_catalogue(self) -> None:
        self.assertEqual(
            NODE_TYPES,
            ("actor", "office", "resource", "ritual_symbolic_capital"),
        )
        self.assertEqual(
            EDGE_TYPES,
            ("coercion", "exchange", "fictive_kinship", "ritual_authorization"),
        )

    def test_invalid_node_or_edge_type_is_rejected_without_graph_mutation(self) -> None:
        invalid_node = self._patch(node_type="person")
        invalid_edge = self._patch(edge_type="authority")
        for patch in (invalid_node, invalid_edge):
            with contextlib.redirect_stdout(io.StringIO()):
                with self.assertRaises(GraphError):
                    self.graph.submit_patch(self.proposal["proposal_id"], patch)
        self.assertIsNone(self.graph.graph_snapshot()["version"])
        self.assertEqual(self.graph.list_patch_reviews(), ())

    def test_patch_is_pending_until_human_approval_and_all_spans_resolve(self) -> None:
        result, output = self._submit_patch()
        self.assertIn("这是一个需要人工判断的决策点", output)
        self.assertEqual(len(self.graph.list_patch_reviews()), 1)
        self.assertIsNone(self.graph.graph_snapshot()["version"])
        review = self.graph.get_patch_review(result["review_id"])
        source_ref = review["patch"]["nodes"][0]["source_refs"][0]
        located = self.ledger.locate_span(
            source_ref["source_id"], source_ref["char_range"][0], source_ref["char_range"][1]
        )
        self.assertEqual(source_ref["text_span"], located.text_span)

    def test_patch_approval_requires_explicit_human_flag_and_reason(self) -> None:
        result, _ = self._submit_patch()
        with self.assertRaises(GraphError):
            self.graph.decide_patch(
                result["review_id"],
                action="approve",
                signer="reviewer",
                reason="This review reason is long enough for testing.",
                human_approved=False,
            )
        with self.assertRaises(GraphError):
            self.graph.decide_patch(
                result["review_id"],
                action="approve",
                signer="reviewer",
                reason="short",
                human_approved=True,
            )
        self.assertIsNone(self.graph.graph_snapshot()["version"])

    def test_signed_patch_creates_a_versioned_directed_graph(self) -> None:
        result, _ = self._submit_patch()
        approval = self.graph.decide_patch(
            result["review_id"],
            action="approve",
            signer="reviewer-test",
            reason="Reviewed node types, edge types, references, and the exact graph scope.",
            human_approved=True,
        )
        snapshot = self.graph.graph_snapshot(approval["graph_version_id"])

        self.assertEqual(approval["version_number"], 1)
        self.assertEqual(len(snapshot["nodes"]), 2)
        self.assertEqual(len(snapshot["edges"]), 1)
        self.assertEqual(snapshot["edges"][0]["record_type"], "proposal_graph_edge")
        self.assertEqual(snapshot["version"]["human_approved"], 1)
        self.assertTrue(set(node["node_type"] for node in snapshot["nodes"]).issubset(NODE_TYPES))
        self.assertTrue(set(edge["edge_type"] for edge in snapshot["edges"]).issubset(EDGE_TYPES))
        self.assertEqual(self.ledger.verify().source_count, 4)

    def test_fork_request_keeps_both_branches_pending_then_records_both(self) -> None:
        patch, _ = self._submit_patch()
        version = self.graph.decide_patch(
            patch["review_id"],
            action="approve",
            signer="reviewer-test",
            reason="Approved this graph patch for the isolated fork test fixture.",
            human_approved=True,
        )
        node_id = self.graph.graph_snapshot(version["graph_version_id"])["nodes"][0]["node_id"]
        branch_a = {
            "branch_id": "branch-a",
            "label": "Interpretation A",
            "description": "First human-authored alternative.",
            "source_refs": [self.reference],
        }
        branch_b = {
            "branch_id": "branch-b",
            "label": "Interpretation B",
            "description": "Second human-authored alternative.",
            "source_refs": [self.reference],
        }
        output = io.StringIO()
        with contextlib.redirect_stdout(output):
            request = self.graph.submit_fork_request(
                fork_point_node_id=node_id,
                branch_a=branch_a,
                branch_b=branch_b,
                reason="Keep these rival paths visible for a human comparison.",
            )
        self.assertIn("这是一个需要人工判断的决策点", output.getvalue())
        self.assertEqual(len(self.graph.list_fork_reviews()), 1)
        with self.assertRaises(GraphError):
            self.graph.decide_fork(
                request["review_id"],
                action="keep_both",
                signer="reviewer",
                reason="This is a sufficiently long human review reason.",
                human_approved=False,
            )
        kept = self.graph.decide_fork(
            request["review_id"],
            action="keep_both",
            signer="reviewer-test",
            reason="Reviewed both evidence paths and explicitly retain them in parallel.",
            human_approved=True,
        )
        status = self.graph.branch_status(kept["fork_id"])
        self.assertEqual(set(status["branches"]), {"branch-a", "branch-b"})
        self.assertTrue(all(branch["status"] == "active" for branch in status["branches"].values()))

    def test_merge_and_delete_require_explicit_human_approval_and_preserve_history(self) -> None:
        patch, _ = self._submit_patch()
        version = self.graph.decide_patch(
            patch["review_id"],
            action="approve",
            signer="reviewer-test",
            reason="Approved this graph patch for the branch-operation fixture.",
            human_approved=True,
        )
        node_id = self.graph.graph_snapshot(version["graph_version_id"])["nodes"][0]["node_id"]
        branch_a = {"branch_id": "left", "label": "Left", "description": "Left branch.", "source_refs": [self.reference]}
        branch_b = {"branch_id": "right", "label": "Right", "description": "Right branch.", "source_refs": [self.reference]}
        with contextlib.redirect_stdout(io.StringIO()):
            fork = self.graph.submit_fork_request(
                fork_point_node_id=node_id,
                branch_a=branch_a,
                branch_b=branch_b,
                reason="Keep both alternatives until their evidence is reviewed.",
            )
        kept = self.graph.decide_fork(
            fork["review_id"],
            action="keep_both",
            signer="reviewer-test",
            reason="Reviewed the two alternative paths and approve preservation of both.",
            human_approved=True,
        )
        with self.assertRaises(GraphError):
            self.graph.operate_branches(
                kept["fork_id"],
                action="delete",
                target_branch_ids=["left"],
                signer="reviewer",
                reason="This delete reason is long enough for a test.",
                human_approved=False,
            )
        with self.assertRaises(GraphError):
            self.graph.operate_branches(
                kept["fork_id"],
                action="delete",
                target_branch_ids=["left"],
                signer="reviewer",
                reason="short",
                human_approved=True,
            )
        self.assertEqual(self.graph.branch_status(kept["fork_id"])["branches"]["left"]["status"], "active")

        merged = self.graph.operate_branches(
            kept["fork_id"],
            action="merge",
            target_branch_ids=["left", "right"],
            result_branch={
                "branch_id": "merged",
                "label": "Human-authored reconciliation",
                "description": "A reviewer-authored result; no automatic content merge occurs.",
                "source_refs": [self.reference],
            },
            signer="reviewer-test",
            reason="Reviewed both branches and explicitly authored this reconciliation.",
            human_approved=True,
        )
        self.assertEqual(merged["action"], "merge")
        after = self.graph.branch_status(kept["fork_id"])["branches"]
        self.assertEqual(after["left"]["status"], "merged_into:merged")
        self.assertEqual(after["right"]["status"], "merged_into:merged")
        self.assertEqual(after["merged"]["status"], "active")
        deleted = self.graph.operate_branches(
            kept["fork_id"],
            action="delete",
            target_branch_ids=["merged"],
            signer="reviewer-test",
            reason="Reviewed the merged branch and explicitly archive it from active presentation.",
            human_approved=True,
        )
        self.assertEqual(deleted["action"], "delete")
        self.assertEqual(
            self.graph.branch_status(kept["fork_id"])["branches"]["merged"]["status"],
            "deleted_by_human_operation",
        )
        self.assertEqual(len(self.graph.list_fork_reviews()), 1)
        self.ledger.verify()

    def test_fork_branch_spans_must_stay_within_fork_point_proposal_refs(self) -> None:
        patch, _ = self._submit_patch()
        version = self.graph.decide_patch(
            patch["review_id"],
            action="approve",
            signer="reviewer-test",
            reason="Approved this graph patch for the fork containment fixture.",
            human_approved=True,
        )
        node_id = self.graph.graph_snapshot(version["graph_version_id"])["nodes"][0]["node_id"]
        genesis = self.ledger.sources()
        genesis_source_id = genesis[0]["source_id"]
        outside_ref = {
            "source_id": genesis_source_id,
            "char_range": [int(genesis[0]["char_count"]) - 40, int(genesis[0]["char_count"]) - 1],
        }
        branch_a = {
            "branch_id": "contained-a",
            "label": "Contained A",
            "description": "Branch whose spans stay inside the fork point refs.",
            "source_refs": [self.reference],
        }
        branch_b = {
            "branch_id": "contained-b",
            "label": "Contained B",
            "description": "Second branch whose spans stay inside the fork point refs.",
            "source_refs": [self.reference],
        }
        with self.assertRaises(GraphError):
            with contextlib.redirect_stdout(io.StringIO()):
                self.graph.submit_fork_request(
                    fork_point_node_id=node_id,
                    branch_a=dict(branch_a, source_refs=[outside_ref]),
                    branch_b=dict(branch_b, source_refs=[outside_ref]),
                    reason="A fork request whose spans escape the approved Proposal.",
                )
        self.assertEqual(len(self.graph.list_fork_reviews()), 0)
        with contextlib.redirect_stdout(io.StringIO()):
            self.graph.submit_fork_request(
                fork_point_node_id=node_id,
                branch_a=branch_a,
                branch_b=branch_b,
                reason="A fork request whose spans stay inside the approved Proposal.",
            )
        self.assertEqual(len(self.graph.list_fork_reviews()), 1)


if __name__ == "__main__":
    unittest.main()
