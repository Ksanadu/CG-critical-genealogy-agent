from __future__ import annotations

import contextlib
import io
import sqlite3
import tempfile
import unittest
from pathlib import Path

from critical_genealogy import CorpusLedger
from critical_genealogy.layering import LayeringAgent, PhaseOneError
from critical_genealogy.ledger import SourceNotFoundError


PROJECT_ROOT = Path(__file__).resolve().parents[1]
GENESIS_PATH = PROJECT_ROOT / "data" / "sources" / "genesis_1-3_kjv.txt"
CANDIDATE_PATH = PROJECT_ROOT / "data" / "layers" / "genesis_1-3_candidates.json"
DEUTERONOMY_PATH = PROJECT_ROOT / "data" / "sources" / "deuteronomy_kjv.txt"
DEUTERONOMY_CANDIDATE_PATH = PROJECT_ROOT / "data" / "layers" / "deuteronomy_candidates.json"


class LayeringAgentTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temporary_directory = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary_directory.name)
        self.ledger = CorpusLedger(
            db_path=self.root / "ledger.sqlite3",
            object_dir=self.root / "objects",
        )
        self.source = self.ledger.ingest_file(
            GENESIS_PATH,
            title="Genesis 1-3 (KJV)",
        )
        self.decisions_path = self.root / "DECISIONS.md"
        self.decisions_path.write_text(
            "# 人工决策日志\n\n阶段 1 人工审阅测试基线。\n",
            encoding="utf-8",
        )
        self.agent = LayeringAgent(
            ledger=self.ledger,
            candidate_path=CANDIDATE_PATH,
            decisions_path=self.decisions_path,
        )

    def tearDown(self) -> None:
        self.temporary_directory.cleanup()

    def _run(self):
        output = io.StringIO()
        with contextlib.redirect_stdout(output):
            result = self.agent.run(source_id=self.source.source_id)
        return result, output.getvalue()

    def test_run_queues_distinct_parallel_hypotheses_without_confidence(self) -> None:
        result, output = self._run()
        reviews = self.agent.list_reviews()

        self.assertIn("这是一个需要人工判断的决策点", output)
        self.assertEqual(result.generated_count, 2)
        self.assertEqual(result.inserted_count, 2)
        self.assertEqual(result.pending_count, 2)
        self.assertEqual(len(reviews), 2)
        self.assertEqual(
            {item["hypothesis"]["model_id"] for item in reviews},
            {"classical_documentary_p_j", "priestly_plus_non_j_traditions"},
        )
        self.assertTrue(all(item["decision"] is None for item in reviews))
        self.assertTrue(all(item["confidence"] is None for item in reviews))
        self.assertTrue(all(item["human_approved"] is False for item in reviews))
        self.assertTrue(
            all(item["hypothesis"]["status"] == "pending_human_review" for item in reviews)
        )

    def test_all_layer_spans_resolve_to_exact_source_characters(self) -> None:
        self._run()
        reviews = self.agent.list_reviews()
        all_labels: set[str] = set()
        for item in reviews:
            hypothesis = item["hypothesis"]
            for assignment in hypothesis["assignments"]:
                all_labels.add(assignment["layer_label"])
                for reference in assignment["spans"]:
                    located = self.ledger.locate_span(
                        reference["source_id"],
                        reference["char_range"][0],
                        reference["char_range"][1],
                    )
                    self.assertEqual(located.text_span, reference["text_span"])
                    self.assertEqual(list(located.unit_ids), reference["unit_ids"])

        self.assertNotIn("D", all_labels)
        self.assertIn("J?", all_labels)
        self.assertIn("非 P／传统材料（J 归属未定）", all_labels)

    def test_genesis_2_4a_b_split_is_adjacent_and_lossless(self) -> None:
        self._run()
        review = next(
            item
            for item in self.agent.list_reviews()
            if item["hypothesis"]["model_id"] == "classical_documentary_p_j"
        )
        assignments = review["hypothesis"]["assignments"]
        p_span = assignments[0]["spans"][1]
        j_span = assignments[1]["spans"][0]

        self.assertEqual(p_span["char_range"][1], j_span["char_range"][0])
        self.assertTrue(p_span["text_span"].endswith(" "))
        self.assertTrue(j_span["text_span"].startswith("in the day"))

    def test_repeated_run_is_idempotent_and_keeps_pending_items(self) -> None:
        first, _ = self._run()
        second, output = self._run()

        self.assertIn("这是一个需要人工判断的决策点", output)
        self.assertEqual(first.inserted_count, 2)
        self.assertEqual(second.inserted_count, 0)
        self.assertEqual(len(self.agent.list_reviews()), 2)
        self.assertEqual(sum(item["decision"] is None for item in self.agent.list_reviews()), 2)

    def test_deuteronomy_models_queue_full_book_refs_without_auto_approval(self) -> None:
        text = DEUTERONOMY_PATH.read_text(encoding="utf-8")
        source = self.ledger.ingest_file(
            DEUTERONOMY_PATH,
            title="Deuteronomy (KJV)",
        )
        deuteronomy_agent = LayeringAgent(
            ledger=self.ledger,
            candidate_path=DEUTERONOMY_CANDIDATE_PATH,
            decisions_path=self.decisions_path,
        )
        output = io.StringIO()
        with contextlib.redirect_stdout(output):
            result = deuteronomy_agent.run(source_id=source.source_id)

        reviews = deuteronomy_agent.list_reviews()
        self.assertIn("这是一个需要人工判断的决策点", output.getvalue())
        self.assertEqual(result.generated_count, 3)
        self.assertEqual(result.pending_count, 3)
        self.assertEqual(
            {item["hypothesis"]["model_id"] for item in reviews},
            {
                "classical_documentary_d_source",
                "noth_single_deuteronomistic_history",
                "multi_stage_deuteronomistic_redaction",
            },
        )
        self.assertTrue(all(item["confidence"] is None for item in reviews))
        self.assertTrue(all(item["human_approved"] is False for item in reviews))
        for item in reviews:
            reference = item["hypothesis"]["assignments"][0]["spans"][0]
            self.assertEqual(reference["source_id"], source.source_id)
            self.assertEqual(reference["text_span"], text[reference["char_range"][0]:reference["char_range"][1]])
            self.assertTrue(reference["text_span"].startswith("1:1 "))
            self.assertEqual(reference["char_range"][1], len(text))
            self.assertIn("34:12 ", reference["text_span"])
        self.assertEqual(self.ledger.verify().source_count, 2)

    def test_wrong_corpus_is_not_interpreted_as_genesis(self) -> None:
        decision_source = next(
            source for source in self.ledger.sources() if source["title"] == "Genesis 1-3 (KJV)"
        )
        wrong_source_id = "sha256:" + ("0" * 64)
        self.assertNotEqual(wrong_source_id, decision_source["source_id"])
        with self.assertRaises(SourceNotFoundError):
            self.agent.run(source_id=wrong_source_id)
        self.assertEqual(self.agent.list_reviews(), ())

    def test_approval_requires_explicit_human_flag_reason_and_confidence(self) -> None:
        self._run()
        review_id = self.agent.list_reviews()[0]["review_id"]
        before_text = self.decisions_path.read_text(encoding="utf-8")
        with self.assertRaises(PhaseOneError):
            self.agent.record_decision(
                review_id,
                action="approve",
                signer="reviewer",
                reason="This reason is sufficiently long for a test.",
                confidence=0.6,
                human_approved=False,
            )
        with self.assertRaises(PhaseOneError):
            self.agent.record_decision(
                review_id,
                action="approve",
                signer="reviewer",
                reason="short",
                confidence=0.6,
                human_approved=True,
            )
        with self.assertRaises(PhaseOneError):
            self.agent.record_decision(
                review_id,
                action="approve",
                signer="reviewer",
                reason="This reason is sufficiently long for a test.",
                confidence=None,
                human_approved=True,
            )
        self.assertEqual(self.decisions_path.read_text(encoding="utf-8"), before_text)
        self.assertIsNone(self.agent.get_review(review_id)["decision"])

    def test_signed_approval_is_traced_in_decisions_log_and_locked(self) -> None:
        self._run()
        review_id = self.agent.list_reviews()[0]["review_id"]
        decision = self.agent.record_decision(
            review_id,
            action="approve",
            signer="reviewer-test",
            reason="Reviewed the cited source ranges and approve this test fixture.",
            confidence=0.61,
            human_approved=True,
        )

        self.assertTrue(decision["human_approved"])
        self.assertEqual(decision["confidence"], 0.61)
        self.assertIn(review_id, self.decisions_path.read_text(encoding="utf-8"))
        log_span = self.ledger.locate_span(
            decision["decision_log_source_id"],
            decision["decision_log_char_range"][0],
            decision["decision_log_char_range"][1],
        )
        self.assertIn("reviewer-test", log_span.text_span)
        self.assertIn("human_approved：true", log_span.text_span)
        self.assertEqual(self.agent.get_review(review_id)["decision"], "approve")
        self.assertEqual(self.agent.get_review(review_id)["confidence"], 0.61)

        connection = sqlite3.connect(self.ledger.db_path)
        try:
            with self.assertRaises(sqlite3.IntegrityError):
                connection.execute(
                    "UPDATE review_decisions SET reason = 'changed' WHERE review_id = ?",
                    (review_id,),
                )
        finally:
            connection.close()
        self.ledger.verify()


if __name__ == "__main__":
    unittest.main()
