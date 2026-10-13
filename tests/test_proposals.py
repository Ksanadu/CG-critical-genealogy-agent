from __future__ import annotations

import contextlib
import io
import json
import sqlite3
import tempfile
import unittest
from pathlib import Path

from critical_genealogy import CorpusLedger
from critical_genealogy.falsifiability import (
    build_falsifiability_condition,
    validate_falsifiability_condition,
)
from critical_genealogy.layering import LayeringAgent
from critical_genealogy.proposals import (
    PhaseTwoAgent,
    PhaseTwoError,
    ProposalValidationError,
    ProposedReduction,
)


PROJECT_ROOT = Path(__file__).resolve().parents[1]
GENESIS_PATH = PROJECT_ROOT / "data" / "sources" / "genesis_1-3_kjv.txt"
LAYER_CANDIDATES = PROJECT_ROOT / "data" / "layers" / "genesis_1-3_candidates.json"


class PhaseTwoTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temporary_directory = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary_directory.name)
        self.ledger = CorpusLedger(
            db_path=self.root / "ledger.sqlite3",
            object_dir=self.root / "objects",
        )
        self.source = self.ledger.ingest_file(GENESIS_PATH, title="Genesis 1-3 (KJV)")
        self.decisions_path = self.root / "DECISIONS.md"
        self.decisions_path.write_text("# 人工决策日志\n\nPhase2 test baseline.\n", encoding="utf-8")
        self.layer_agent = LayeringAgent(
            ledger=self.ledger,
            candidate_path=LAYER_CANDIDATES,
            decisions_path=self.decisions_path,
        )
        output = io.StringIO()
        with contextlib.redirect_stdout(output):
            self.layer_result = self.layer_agent.run(source_id=self.source.source_id)
        self.parent_review = self.layer_agent.list_reviews()[0]
        self.parent_id = self.parent_review["hypothesis"]["layer_hypothesis_id"]
        self.agent = PhaseTwoAgent(ledger=self.ledger, decisions_path=self.decisions_path)
        self.condition = (
            "若在明确标定的铁器时代早期地层中出土与该提议相矛盾的铭文，"
            "则应重新评估这条提议。"
        )
        self.source_ref = {"source_id": self.source.source_id, "char_range": [16, 70]}

    def tearDown(self) -> None:
        self.temporary_directory.cleanup()

    def _submit(self, condition: str | None = None):
        output = io.StringIO()
        with contextlib.redirect_stdout(output):
            result = self.agent.submit_draft(
                parent_hypothesis_ids=[self.parent_id],
                rule_id="R3",
                mapping="A human-authored candidate mapping for a test fixture",
                falsifiability_condition=condition or self.condition,
                reasoning_chain=["This draft cites a concrete source span.", "The mapping remains pending review."],
                source_id=self.source.source_id,
                source_refs=[self.source_ref],
            )
        return result, output.getvalue()

    def test_observable_condition_passes_vague_condition_fails(self) -> None:
        valid = validate_falsifiability_condition(self.condition)
        invalid = validate_falsifiability_condition("If more counterexamples appear, reconsider.")

        self.assertTrue(valid.valid)
        self.assertIn("archaeological_context", valid.observable_classes)
        self.assertIn("epigraphic_or_textual", valid.observable_classes)
        self.assertFalse(invalid.valid)
        self.assertTrue(any("observable" in reason for reason in invalid.reasons))

    def test_condition_builder_requires_explicit_inputs(self) -> None:
        with self.assertRaises(ValueError):
            build_falsifiability_condition(
                observation="",
                location="site A",
                time_window="Iron Age strata",
                impact="review the proposal",
            )
        condition = build_falsifiability_condition(
            observation="an inscription with the named administrative title",
            location="site A",
            time_window="Iron Age strata",
            impact="the proposal should be reconsidered",
        )
        self.assertTrue(validate_falsifiability_condition(condition).valid)

    def test_active_proposal_contract_rejects_missing_fields_and_non_proposal_type(self) -> None:
        with self.assertRaises(ProposalValidationError):
            ProposedReduction.validate({"record_type": "proposal"})

        payload = {
            "proposal_id": "sha256:" + ("a" * 64),
            "record_type": "fact",
            "rule_id": "R3",
            "confidence": 0.5,
            "source_id": self.source.source_id,
            "reasoning_chain": ["step"],
            "mapping": "mapping",
            "falsifiability_condition": self.condition,
            "source_refs": [{"source_id": self.source.source_id, "char_range": [16, 70]}],
            "parent_hypothesis_ids": [self.parent_id],
            "human_approved": True,
        }
        with self.assertRaises(ProposalValidationError):
            ProposedReduction.validate(payload)

        payload["record_type"] = "proposal"
        payload["confidence"] = None
        with self.assertRaises(ProposalValidationError):
            ProposedReduction.validate(payload)

    def test_draft_is_queued_unscored_and_source_resolvable(self) -> None:
        result, output = self._submit()
        review = self.agent.get_review(result["review_id"])
        located = self.ledger.locate_span(self.source.source_id, 16, 70)

        self.assertIn("这是一个需要人工判断的决策点", output)
        self.assertTrue(result["condition_validation"]["valid"])
        self.assertEqual(result["status"], "pending_human_review")
        self.assertIsNone(result["confidence"])
        self.assertFalse(result["human_approved"])
        self.assertIsNone(review["decision"])
        self.assertEqual(review["draft"]["source_refs"][0]["text_span"], located.text_span)
        self.assertEqual(self.agent.active_proposals(), ())

    def test_vague_condition_is_queued_but_cannot_be_activated(self) -> None:
        result, _ = self._submit("If more counterexamples appear, reconsider the mapping.")
        review = self.agent.get_review(result["review_id"])
        before_log = self.decisions_path.read_text(encoding="utf-8")
        with self.assertRaises(PhaseTwoError):
            self.agent.decide(
                result["review_id"],
                action="approve",
                signer="reviewer",
                reason="This is a sufficiently long review reason.",
                confidence=0.5,
                human_approved=True,
            )
        self.assertEqual(review["draft"]["status"], "blocked_by_condition_format")
        self.assertEqual(self.decisions_path.read_text(encoding="utf-8"), before_log)
        self.assertEqual(self.agent.active_proposals(), ())

    def test_phase_two_cannot_activate_before_parent_layer_is_signed(self) -> None:
        result, _ = self._submit()
        before_log = self.decisions_path.read_text(encoding="utf-8")
        with self.assertRaises(PhaseTwoError):
            self.agent.decide(
                result["review_id"],
                action="approve",
                signer="reviewer",
                reason="This is a sufficiently long review reason.",
                confidence=0.5,
                human_approved=True,
            )
        self.assertEqual(self.decisions_path.read_text(encoding="utf-8"), before_log)
        self.assertEqual(self.agent.active_proposals(), ())

    def test_condition_sample_requires_twenty_and_tracks_human_failure_rate(self) -> None:
        with contextlib.redirect_stdout(io.StringIO()):
            with self.assertRaises(PhaseTwoError):
                self.agent.sample_conditions_for_human_review(seed=7)

        for index in range(20):
            with contextlib.redirect_stdout(io.StringIO()):
                self.agent.submit_draft(
                    parent_hypothesis_ids=[self.parent_id],
                    rule_id="R3",
                    mapping=f"Human-authored test candidate {index}",
                    falsifiability_condition=self.condition,
                    reasoning_chain=[f"Test reasoning step {index} confirms direct source reference."],
                    source_id=self.source.source_id,
                    source_refs=[self.source_ref],
                )

        with contextlib.redirect_stdout(io.StringIO()):
            first_batch = self.agent.sample_conditions_for_human_review(seed=11)
        self.assertEqual(first_batch["sample_size"], 20)
        self.assertEqual(self.agent.condition_audit_status(first_batch["batch_id"])["status"], "awaiting_human_review")
        first_items = self.agent.list_condition_audit(first_batch["batch_id"])
        for index, item in enumerate(first_items):
            self.agent.review_condition_audit(
                item["audit_id"],
                observable=index < 18,
                reviewer="auditor-test",
                reason=f"Manual condition review record {index} checked the named observable type.",
                human_approved=True,
            )
        passed = self.agent.condition_audit_status(first_batch["batch_id"])
        self.assertEqual(passed["reviewed"], 20)
        self.assertEqual(passed["failure_rate"], 0.1)
        self.assertEqual(passed["status"], "passed")
        self.assertTrue(passed["may_advance"])

        with contextlib.redirect_stdout(io.StringIO()):
            second_batch = self.agent.sample_conditions_for_human_review(seed=12)
        for index, item in enumerate(self.agent.list_condition_audit(second_batch["batch_id"])):
            self.agent.review_condition_audit(
                item["audit_id"],
                observable=index < 17,
                reviewer="auditor-test",
                reason=f"Manual condition review record {index} checked the named observable type.",
                human_approved=True,
            )
        blocked = self.agent.condition_audit_status(second_batch["batch_id"])
        self.assertEqual(blocked["failure_rate"], 0.15)
        self.assertEqual(blocked["status"], "blocked")
        self.assertFalse(blocked["may_advance"])

    def test_only_signed_review_after_parent_approval_creates_proposal(self) -> None:
        self.layer_agent.record_decision(
            self.parent_review["review_id"],
            action="approve",
            signer="reviewer-test",
            reason="Reviewed the phase-one source span and accept it for this isolated test.",
            confidence=0.62,
            human_approved=True,
        )
        draft, _ = self._submit()
        decision = self.agent.decide(
            draft["review_id"],
            action="approve",
            signer="reviewer-test",
            reason="Reviewed the mapping, condition, evidence, and parent hypothesis in this test.",
            confidence=0.41,
            human_approved=True,
        )
        proposals = self.agent.active_proposals()

        self.assertTrue(decision["human_approved"])
        self.assertEqual(decision["confidence"], 0.41)
        self.assertEqual(len(proposals), 1)
        proposal = proposals[0]
        self.assertEqual(proposal["record_type"], "proposal")
        self.assertEqual(proposal["rule_id"], "R3")
        self.assertEqual(proposal["confidence"], 0.41)
        self.assertEqual(proposal["source_id"], self.source.source_id)
        self.assertEqual(proposal["human_approved"], 1)
        self.assertIsInstance(json.loads(proposal["reasoning_chain_json"]), list)
        self.assertIsInstance(json.loads(proposal["source_refs_json"]), list)
        self.assertIsInstance(json.loads(proposal["parent_hypothesis_ids_json"]), list)
        self.assertEqual(self.ledger.verify().source_count, 3)
        log_span = self.ledger.locate_span(
            decision["decision_log_source_id"],
            decision["decision_log_char_range"][0],
            decision["decision_log_char_range"][1],
        )
        self.assertIn("human_approved：true", log_span.text_span)

        connection = sqlite3.connect(self.ledger.db_path)
        try:
            with self.assertRaises(sqlite3.IntegrityError):
                connection.execute(
                    "INSERT INTO proposals(record_type) VALUES ('proposal')"
                )
            with self.assertRaises(sqlite3.IntegrityError):
                connection.execute(
                    "INSERT INTO proposals(record_type) VALUES ('fact')"
                )
        finally:
            connection.close()


if __name__ == "__main__":
    unittest.main()
