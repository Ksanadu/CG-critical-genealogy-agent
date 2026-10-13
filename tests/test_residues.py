from __future__ import annotations

import contextlib
import io
import tempfile
import unittest
from pathlib import Path

from critical_genealogy import CorpusLedger
from critical_genealogy.graph import PhaseThreeAgent
from critical_genealogy.layering import LayeringAgent
from critical_genealogy.proposals import PhaseTwoAgent
from critical_genealogy.residues import PhaseFourError, ResidueProbeAgent


PROJECT_ROOT = Path(__file__).resolve().parents[1]
GENESIS_PATH = PROJECT_ROOT / "data" / "sources" / "genesis_1-3_kjv.txt"
LAYER_CANDIDATES = PROJECT_ROOT / "data" / "layers" / "genesis_1-3_candidates.json"
VALID_CONDITION = "If an inscription in the dated archaeological strata contradicts the proposal, review it."


class PhaseFourTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temporary_directory = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary_directory.name)
        self.ledger = CorpusLedger(
            db_path=self.root / "ledger.sqlite3",
            object_dir=self.root / "objects",
        )
        self.source = self.ledger.ingest_file(GENESIS_PATH, title="Genesis 1-3 (KJV)")
        self.decisions_path = self.root / "DECISIONS.md"
        self.decisions_path.write_text("# Human decision log\n\nPhase4 test baseline.\n", encoding="utf-8")

        self.layer = LayeringAgent(
            ledger=self.ledger,
            candidate_path=LAYER_CANDIDATES,
            decisions_path=self.decisions_path,
        )
        with contextlib.redirect_stdout(io.StringIO()):
            self.layer.run(source_id=self.source.source_id)
        parent = self.layer.list_reviews()[0]
        self.layer.record_decision(
            parent["review_id"],
            action="approve",
            signer="reviewer-test",
            reason="Reviewed this synthetic fixture's source span for test execution.",
            confidence=0.6,
            human_approved=True,
        )

        self.phase2 = PhaseTwoAgent(ledger=self.ledger, decisions_path=self.decisions_path)
        draft = self.phase2.submit_draft(
            parent_hypothesis_ids=[parent["hypothesis"]["layer_hypothesis_id"]],
            rule_id="R3",
            mapping="Synthetic test mapping; not a historical claim",
            falsifiability_condition=VALID_CONDITION,
            reasoning_chain=["Test-only explicit parent link to a source span."],
            source_id=self.source.source_id,
            source_refs=[{"source_id": self.source.source_id, "char_range": [16, 70]}],
        )
        proposal = self.phase2.decide(
            draft["review_id"],
            action="approve",
            signer="reviewer-test",
            reason="Approved only for an isolated Phase4 software test fixture.",
            confidence=0.5,
            human_approved=True,
        )
        self.phase3 = PhaseThreeAgent(self.ledger, self.decisions_path)
        graph_patch = {
            "nodes": [
                {
                    "key": "actor",
                    "node_type": "actor",
                    "label": "Synthetic actor",
                    "source_refs": [{"source_id": self.source.source_id, "char_range": [16, 70]}],
                }
            ],
            "edges": [],
        }
        patch, _ = self._submit_graph_patch(self.phase3, proposal["proposal_id"], graph_patch)
        graph_decision = self.phase3.decide_patch(
            patch["review_id"],
            action="approve",
            signer="reviewer-test",
            reason="Approved only the synthetic graph fixture for Phase4 tests.",
            human_approved=True,
        )
        self.graph_version_id = graph_decision["graph_version_id"]
        snapshot = self.phase3.graph_snapshot(self.graph_version_id)
        self.graph_refs = [{"ref_type": "node", "ref_id": snapshot["nodes"][0]["node_id"]}]
        self.source_refs = [{"source_id": self.source.source_id, "char_range": [16, 70]}]
        self.agent = ResidueProbeAgent(self.ledger, self.decisions_path)

    def _submit_graph_patch(self, phase3, proposal_id, patch):
        output = io.StringIO()
        with contextlib.redirect_stdout(output):
            result = phase3.submit_patch(proposal_id, patch)
        return result, output.getvalue()

    def tearDown(self) -> None:
        self.temporary_directory.cleanup()

    def test_three_probe_outputs_use_separate_pending_tables(self) -> None:
        candidates = {}
        for probe_id in ("lacan_residue", "deleuze_singularity", "badiou_event_site"):
            output = io.StringIO()
            with contextlib.redirect_stdout(output):
                candidates[probe_id] = self.agent.submit_probe_candidate(
                    probe_id,
                    graph_version_id=self.graph_version_id,
                    civilization="Test fixture",
                    signal=f"Synthetic {probe_id} signal",
                    rationale="Human-authored test rationale only; no historical annotation.",
                    year_start=-510,
                    year_end=-500,
                    graph_refs=self.graph_refs,
                    source_refs=self.source_refs,
                )
            self.assertIn("这是一个需要人工判断的决策点", output.getvalue())

        self.assertEqual(len(self.agent.list_probe_reviews()), 3)
        self.assertEqual(
            {review["probe_id"] for review in self.agent.list_probe_reviews()},
            {"lacan_residue", "deleuze_singularity", "badiou_event_site"},
        )
        self.assertTrue(all(review["action"] is None for review in self.agent.list_probe_reviews()))
        self.assertEqual(len(candidates), 3)

    def test_probe_candidate_requires_active_graph_and_human_keeps(self) -> None:
        with self.assertRaises(PhaseFourError):
            self.agent.submit_probe_candidate(
                "lacan_residue",
                graph_version_id="sha256:" + ("0" * 64),
                civilization="Test fixture",
                signal="signal",
                rationale="Human test rationale with sufficient detail.",
                year_start=-510,
                year_end=-500,
                graph_refs=self.graph_refs,
                source_refs=self.source_refs,
            )

        candidate = self.agent.submit_probe_candidate(
            "lacan_residue",
            graph_version_id=self.graph_version_id,
            civilization="Test fixture",
            signal="Synthetic repeated repair signal",
            rationale="Human-authored test rationale only; no historical annotation.",
            year_start=-510,
            year_end=-500,
            graph_refs=self.graph_refs,
            source_refs=self.source_refs,
        )
        with self.assertRaises(PhaseFourError):
            self.agent.decide_probe_candidate(
                candidate["review_id"],
                action="keep",
                signer="reviewer-test",
                reason="Reviewed a test probe candidate with no real historical claim.",
                human_approved=False,
            )
        kept = self.agent.decide_probe_candidate(
            candidate["review_id"],
            action="keep",
            signer="reviewer-test",
            reason="Reviewed a test probe candidate with no real historical claim.",
            human_approved=True,
        )
        self.assertTrue(kept["human_approved"])

    def test_human_timeline_and_backtest_do_not_adjust_weights(self) -> None:
        for index, probe_id in enumerate(("lacan_residue", "deleuze_singularity", "badiou_event_site")):
            candidate = self.agent.submit_probe_candidate(
                probe_id,
                graph_version_id=self.graph_version_id,
                civilization="Test fixture",
                signal=f"Synthetic {probe_id} signal",
                rationale="Human-authored test rationale only; no historical annotation.",
                year_start=-510 + index * 100,
                year_end=-500 + index * 100,
                graph_refs=self.graph_refs,
                source_refs=self.source_refs,
            )
            self.agent.decide_probe_candidate(
                candidate["review_id"],
                action="keep",
                signer="reviewer-test",
                reason="Reviewed this synthetic probe candidate for test coverage.",
                human_approved=True,
            )
        timeline = self.agent.submit_timeline_event(
            civilization="Test fixture",
            label="Synthetic rupture event",
            year_start=-490,
            year_end=-480,
            source_refs=self.source_refs,
        )
        with self.assertRaises(PhaseFourError):
            self.agent.decide_timeline_event(
                timeline["review_id"],
                action="approve",
                signer="reviewer-test",
                reason="Reviewed the synthetic timeline source in a test fixture.",
                human_approved=False,
            )
        self.agent.decide_timeline_event(
            timeline["review_id"],
            action="approve",
            signer="reviewer-test",
            reason="Reviewed the synthetic timeline source in a test fixture.",
            human_approved=True,
        )
        backtest = self.agent.run_backtest(
            graph_version_id=self.graph_version_id,
            civilization="Test fixture",
            tolerance_years=20,
            signer="reviewer-test",
            reason="Approved the explicit temporal tolerance for this test only.",
            human_approved=True,
        )

        self.assertEqual(set(backtest["metrics"]), {"lacan_residue", "deleuze_singularity", "badiou_event_site"})
        self.assertFalse(backtest["weights_updated"])
        self.assertEqual(self.agent.active_weights(), ())
        weight_draft = self.agent.submit_weight_change(
            backtest_id=backtest["backtest_id"],
            weights={"lacan_residue": 0.4, "deleuze_singularity": 0.3, "badiou_event_site": 0.3},
            rationale="Human-proposed test weights based on the raw temporal match report.",
        )
        self.assertEqual(len(self.agent.list_weight_drafts()), 1)
        with self.assertRaises(PhaseFourError):
            self.agent.decide_weight_change(
                weight_draft["review_id"],
                action="approve",
                signer="reviewer-test",
                reason="Reviewed the proposed weights for the isolated test fixture.",
                human_approved=False,
            )
        decision = self.agent.decide_weight_change(
            weight_draft["review_id"],
            action="approve",
            signer="reviewer-test",
            reason="Reviewed the proposed weights for the isolated test fixture.",
            human_approved=True,
        )
        self.assertTrue(decision["human_approved"])
        self.assertEqual(len(self.agent.active_weights("Test fixture")), 1)
        self.assertEqual(
            self.agent.active_weights("Test fixture")[0]["weights"],
            {"lacan_residue": 0.4, "deleuze_singularity": 0.3, "badiou_event_site": 0.3},
        )

    def test_weight_changes_are_human_submitted_and_signed(self) -> None:
        weights = {"lacan_residue": 0.4, "deleuze_singularity": 0.3, "badiou_event_site": 0.3}
        with self.assertRaises(PhaseFourError):
            self.agent.submit_weight_change(
                backtest_id="sha256:" + ("0" * 64),
                weights=weights,
                rationale="Human proposed weights for the isolated test.",
            )


if __name__ == "__main__":
    unittest.main()
