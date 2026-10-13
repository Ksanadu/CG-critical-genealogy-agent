"""Deterministically format a book JSON from the KJV corpus repository."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any, Sequence


class BibleFormatError(ValueError):
    """Raised when an upstream book file does not match the expected structure."""


def format_book(data: dict[str, Any]) -> str:
    book = data.get("book")
    chapters = data.get("chapters")
    if not isinstance(book, str) or not book.strip():
        raise BibleFormatError("book name is missing")
    if not isinstance(chapters, list) or not chapters:
        raise BibleFormatError("chapters must be a non-empty list")

    chapter_lines: list[str] = []
    for chapter in chapters:
        chapter_number = str(chapter.get("chapter", ""))
        verses = chapter.get("verses")
        if not chapter_number.isdigit() or not isinstance(verses, list) or not verses:
            raise BibleFormatError("each chapter needs a numeric id and non-empty verses")
        lines = [f"[{book} {chapter_number}]"]
        for verse in verses:
            verse_number = str(verse.get("verse", ""))
            text = verse.get("text")
            if not verse_number.isdigit() or not isinstance(text, str) or not text:
                raise BibleFormatError(f"invalid verse in chapter {chapter_number}")
            if "\n" in text or "\r" in text:
                raise BibleFormatError("verse text contains a line break")
            lines.append(f"{chapter_number}:{verse_number} {text}")
        chapter_lines.append("\n".join(lines))
    return "\n\n".join(chapter_lines) + "\n"


def main(argv: Sequence[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Format KJV book JSON as stable verse lines.")
    parser.add_argument("input", type=Path)
    parser.add_argument("output", type=Path)
    arguments = parser.parse_args(argv)

    data = json.loads(arguments.input.read_text(encoding="utf-8"))
    formatted = format_book(data)
    arguments.output.parent.mkdir(parents=True, exist_ok=True)
    with arguments.output.open("w", encoding="utf-8", newline="\n") as output:
        output.write(formatted)
    print(
        json.dumps(
            {
                "book": data["book"],
                "chapter_count": len(data["chapters"]),
                "verse_count": sum(len(chapter["verses"]) for chapter in data["chapters"]),
                "char_count": len(formatted),
            },
            ensure_ascii=False,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
