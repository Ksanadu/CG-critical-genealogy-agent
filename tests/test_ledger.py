from __future__ import annotations

import random
import re
import sqlite3
import tempfile
import unittest
from collections import Counter
from pathlib import Path

from critical_genealogy import CorpusLedger, LedgerError, LedgerIntegrityError


PROJECT_ROOT = Path(__file__).resolve().parents[1]
GENESIS_PATH = PROJECT_ROOT / "data" / "sources" / "genesis_1-3_kjv.txt"


class CorpusLedgerTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temporary_directory = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary_directory.name)
        self.ledger = CorpusLedger(
            db_path=self.root / "ledger.sqlite3",
            object_dir=self.root / "objects",
        )

    def tearDown(self) -> None:
        self.temporary_directory.cleanup()

    def test_ingest_creates_content_addressed_manifest_and_hash_chain(self) -> None:
        text = "alpha\nbeta\n"
        result = self.ledger.ingest_text(text, title="fixture")

        self.assertFalse(result.already_present)
        self.assertEqual(result.char_count, len(text))
        self.assertEqual(result.units[0].char_range, (0, 6))
        self.assertEqual(result.units[0].text_span, "alpha\n")
        self.assertEqual(result.units[-1].text_span, "beta\n")
        self.assertTrue(result.source_id.startswith("sha256:"))
        self.assertTrue(result.units[0].unit_id.startswith("sha256:"))
        self.assertEqual(
            self.ledger.verify().unit_count,
            len(result.units),
        )

        manifest = [unit.as_manifest_item() for unit in result.units]
        self.assertEqual(
            set(("source_id", "text_span", "char_range")) - set(manifest[0]),
            set(),
        )

    def test_ingesting_identical_content_is_idempotent(self) -> None:
        first = self.ledger.ingest_text("same\n", title="first title")
        second = self.ledger.ingest_text("same\n", title="another title")

        self.assertEqual(first.source_id, second.source_id)
        self.assertFalse(first.already_present)
        self.assertTrue(second.already_present)
        self.assertEqual(second.title, "first title")
        self.assertEqual(self.ledger.verify().unit_count, 1)

    def test_every_non_empty_character_range_round_trips(self) -> None:
        text = "A🙂B\nCé\n"
        result = self.ledger.ingest_text(text)

        for start in range(len(text)):
            for end in range(start + 1, len(text) + 1):
                located = self.ledger.locate_span(result.source_id, start, end)
                self.assertEqual(located.source_id, result.source_id)
                self.assertEqual(located.char_range, (start, end))
                self.assertEqual(located.text_span, text[start:end])
                self.assertTrue(located.unit_ids)

    def test_search_returns_each_occurrence_with_its_span(self) -> None:
        result = self.ledger.ingest_text("same\nsame\n")

        matches = self.ledger.search_excerpt("same", source_id=result.source_id)

        self.assertEqual([match.char_range for match in matches], [(0, 4), (5, 9)])
        self.assertTrue(all(match.source_id == result.source_id for match in matches))
        self.assertTrue(all(match.text_span == "same" for match in matches))

    def test_mutated_content_object_fails_verification(self) -> None:
        result = self.ledger.ingest_text("original\n")
        object_path = self.ledger._object_path(result.source_id)
        object_path.write_text("tampered\n", encoding="utf-8")

        with self.assertRaises(LedgerIntegrityError):
            self.ledger.verify()

    def test_ledger_rows_reject_update_and_delete(self) -> None:
        self.ledger.ingest_text("immutable\n")
        connection = sqlite3.connect(self.ledger.db_path)
        try:
            with self.assertRaises(sqlite3.IntegrityError):
                connection.execute(
                    "UPDATE ledger_entries SET text_span = 'changed' WHERE sequence = 1"
                )
            with self.assertRaises(sqlite3.IntegrityError):
                connection.execute("DELETE FROM ledger_entries WHERE sequence = 1")
        finally:
            connection.close()

    def test_corrupted_chain_head_fails_verification(self) -> None:
        self.ledger.ingest_text("head\n")
        connection = sqlite3.connect(self.ledger.db_path)
        try:
            connection.execute(
                "UPDATE ledger_meta SET value = ? WHERE key = 'head_hash'",
                ("sha256:" + ("f" * 64),),
            )
            connection.commit()
        finally:
            connection.close()

        with self.assertRaises(LedgerIntegrityError):
            self.ledger.verify()

    def test_empty_or_invalid_utf8_sources_are_rejected(self) -> None:
        with self.assertRaises(LedgerError):
            self.ledger.ingest_bytes(b"", title="empty")
        with self.assertRaises(LedgerError):
            self.ledger.ingest_bytes(b"\xff", title="invalid")

    def test_genesis_one_to_three_are_ingested_and_random_spans_resolve(self) -> None:
        text = GENESIS_PATH.read_text(encoding="utf-8")
        current_chapter: int | None = None
        verse_counts: Counter[int] = Counter()
        for line in text.splitlines():
            chapter_match = re.fullmatch(r"\[Genesis ([1-3])\]", line)
            if chapter_match:
                current_chapter = int(chapter_match.group(1))
                continue
            verse_match = re.match(r"([1-3]):\d+\s", line)
            if verse_match:
                verse_counts[int(verse_match.group(1))] += 1

        self.assertEqual(verse_counts, Counter({1: 31, 2: 25, 3: 24}))
        result = self.ledger.ingest_file(GENESIS_PATH, title="Genesis 1-3 (KJV)")
        self.assertEqual(result.char_count, len(text))
        self.assertEqual(len(result.units), len(text.splitlines(keepends=True)))

        generator = random.Random(20250308)
        for _ in range(100):
            start = generator.randrange(len(text))
            end = generator.randrange(start + 1, len(text) + 1)
            located = self.ledger.locate_span(result.source_id, start, end)
            self.assertEqual(located.source_id, result.source_id)
            self.assertEqual(located.char_range, (start, end))
            self.assertEqual(located.text_span, text[start:end])

        verified = self.ledger.verify()
        self.assertEqual(verified.source_count, 1)
        self.assertEqual(verified.unit_count, len(result.units))


if __name__ == "__main__":
    unittest.main()
