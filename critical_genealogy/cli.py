"""Command-line interface for phase-0 corpus ingestion and audit."""

from __future__ import annotations

import argparse
import json
import sqlite3
import sys
from pathlib import Path
from typing import Sequence

from .ledger import (
    CorpusLedger,
    LedgerError,
    DEFAULT_DB_PATH,
    DEFAULT_OBJECT_DIR,
)


def _add_store_options(parser: argparse.ArgumentParser) -> None:
    parser.add_argument(
        "--db",
        type=Path,
        default=DEFAULT_DB_PATH,
        help=f"SQLite ledger path (default: {DEFAULT_DB_PATH})",
    )
    parser.add_argument(
        "--objects",
        type=Path,
        default=DEFAULT_OBJECT_DIR,
        help=f"content-addressed object directory (default: {DEFAULT_OBJECT_DIR})",
    )


def _build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="genealogy-ledger",
        description="Ingest exact UTF-8 corpus text into an append-only hash ledger.",
    )
    commands = parser.add_subparsers(dest="command", required=True)

    ingest = commands.add_parser("ingest", help="ingest one UTF-8 source file")
    ingest.add_argument("path", type=Path)
    ingest.add_argument("--title", default=None)
    _add_store_options(ingest)

    verify = commands.add_parser("verify", help="verify objects, spans, and hash chain")
    _add_store_options(verify)

    manifest = commands.add_parser("manifest", help="print one source manifest")
    manifest.add_argument("source_id")
    _add_store_options(manifest)

    locate = commands.add_parser("locate", help="resolve a half-open character range")
    locate.add_argument("source_id")
    locate.add_argument("start", type=int)
    locate.add_argument("end", type=int)
    _add_store_options(locate)

    search = commands.add_parser("search", help="find every exact excerpt occurrence")
    search.add_argument("excerpt")
    search.add_argument("--source-id", default=None)
    _add_store_options(search)

    sources = commands.add_parser("sources", help="list ingested sources")
    _add_store_options(sources)
    return parser


def _json_default(value: object) -> object:
    if isinstance(value, Path):
        return str(value)
    raise TypeError(f"cannot encode {type(value).__name__} as JSON")


def _print_json(value: object) -> None:
    print(json.dumps(value, ensure_ascii=False, indent=2, default=_json_default))


def _configure_utf8_output() -> None:
    for stream in (sys.stdout, sys.stderr):
        reconfigure = getattr(stream, "reconfigure", None)
        if reconfigure is not None:
            reconfigure(encoding="utf-8")


def main(argv: Sequence[str] | None = None) -> int:
    _configure_utf8_output()
    arguments = _build_parser().parse_args(argv)
    ledger = CorpusLedger(arguments.db, arguments.objects)

    try:
        if arguments.command == "ingest":
            result = ledger.ingest_file(arguments.path, title=arguments.title)
            _print_json(
                {
                    "source_id": result.source_id,
                    "title": result.title,
                    "byte_count": result.byte_count,
                    "char_count": result.char_count,
                    "unit_count": len(result.units),
                    "already_present": result.already_present,
                }
            )
        elif arguments.command == "verify":
            _print_json(ledger.verify().as_dict())
        elif arguments.command == "manifest":
            _print_json(
                [unit.as_manifest_item() for unit in ledger.manifest(arguments.source_id)]
            )
        elif arguments.command == "locate":
            _print_json(
                ledger.locate_span(
                    arguments.source_id,
                    arguments.start,
                    arguments.end,
                ).as_dict()
            )
        elif arguments.command == "search":
            _print_json(
                [
                    match.as_dict()
                    for match in ledger.search_excerpt(
                        arguments.excerpt,
                        source_id=arguments.source_id,
                    )
                ]
            )
        elif arguments.command == "sources":
            _print_json(ledger.sources())
        else:
            raise AssertionError(f"unhandled command: {arguments.command}")
    except (LedgerError, OSError, sqlite3.Error, ValueError) as error:
        print(
            json.dumps({"ok": False, "error": str(error)}, ensure_ascii=False),
            file=sys.stderr,
        )
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
