from __future__ import annotations

import json
import unittest
from pathlib import Path

from critical_genealogy.format_kjv import BibleFormatError, format_book


PROJECT_ROOT = Path(__file__).resolve().parents[1]
UPSTREAM_DEUTERONOMY = PROJECT_ROOT / "data" / "sources" / "deuteronomy_kjv_upstream.json"
FORMATTED_DEUTERONOMY = PROJECT_ROOT / "data" / "sources" / "deuteronomy_kjv.txt"


class KJVFormatterTests(unittest.TestCase):
    def test_format_book_preserves_verse_text_and_adds_stable_offsets(self) -> None:
        data = {
            "book": "Demo",
            "chapters": [
                {"chapter": "1", "verses": [{"verse": "1", "text": "First."}]},
                {"chapter": "2", "verses": [{"verse": "1", "text": "Second."}]},
            ],
        }
        self.assertEqual(
            format_book(data),
            "[Demo 1]\n1:1 First.\n\n[Demo 2]\n2:1 Second.\n",
        )

    def test_malformed_book_shape_is_rejected(self) -> None:
        with self.assertRaises(BibleFormatError):
            format_book({"book": "Demo", "chapters": []})
        with self.assertRaises(BibleFormatError):
            format_book(
                {
                    "book": "Demo",
                    "chapters": [{"chapter": "1", "verses": [{"verse": "1", "text": "bad\nline"}]}],
                }
            )

    def test_downloaded_deuteronomy_is_complete_and_reproducible(self) -> None:
        source = json.loads(UPSTREAM_DEUTERONOMY.read_text(encoding="utf-8"))
        formatted = FORMATTED_DEUTERONOMY.read_text(encoding="utf-8")
        self.assertEqual(source["book"], "Deuteronomy")
        self.assertEqual(len(source["chapters"]), 34)
        self.assertEqual(sum(len(chapter["verses"]) for chapter in source["chapters"]), 959)
        self.assertEqual(format_book(source), formatted)
        self.assertIn("1:1 These be the words", formatted)
        self.assertIn("34:12 And in all that mighty hand", formatted)


if __name__ == "__main__":
    unittest.main()
