"""CLI for phase-1 layer candidates and their signed review queue."""

from __future__ import annotations

import argparse
import json
import sqlite3
import sys
from pathlib import Path
from typing import Sequence

from .layering import (
    DEFAULT_CANDIDATE_PATH,
    DEFAULT_DECISIONS_PATH,
    LayeringAgent,
    PhaseOneError,
)
from .ledger import CorpusLedger, LedgerError, DEFAULT_DB_PATH, DEFAULT_OBJECT_DIR


def _build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="genealogy-phase1",
        description="Propose parallel source-layer hypotheses; require signed review.",
    )
    parser.add_argument("--db", type=Path, default=DEFAULT_DB_PATH)
    parser.add_argument("--objects", type=Path, default=DEFAULT_OBJECT_DIR)
    parser.add_argument("--candidates", type=Path, default=DEFAULT_CANDIDATE_PATH)
    parser.add_argument("--decisions-file", type=Path, default=DEFAULT_DECISIONS_PATH)
    commands = parser.add_subparsers(dest="command", required=True)

    propose = commands.add_parser("propose", help="generate pending layer hypotheses")
    propose.add_argument("--source-id", default=None)

    review = commands.add_parser("review", help="inspect or sign pending decisions")
    review_commands = review.add_subparsers(dest="review_command", required=True)
    review_commands.add_parser("list", help="list review requests")

    show = review_commands.add_parser("show", help="show one review request")
    show.add_argument("review_id")

    approve = review_commands.add_parser("approve", help="approve with explicit confidence and signature")
    approve.add_argument("review_id")
    approve.add_argument("--signer", required=True)
    approve.add_argument("--reason", required=True)
    approve.add_argument("--confidence", type=float, required=True)
    approve.add_argument("--human-approved", action="store_true", required=True)

    reject = review_commands.add_parser("reject", help="reject with explicit signature")
    reject.add_argument("review_id")
    reject.add_argument("--signer", required=True)
    reject.add_argument("--reason", required=True)
    reject.add_argument("--human-approved", action="store_true", required=True)
    return parser


def _configure_utf8_output() -> None:
    for stream in (sys.stdout, sys.stderr):
        reconfigure = getattr(stream, "reconfigure", None)
        if reconfigure is not None:
            reconfigure(encoding="utf-8")


def _print_json(value: object) -> None:
    print(json.dumps(value, ensure_ascii=False, indent=2))


def main(argv: Sequence[str] | None = None) -> int:
    _configure_utf8_output()
    arguments = _build_parser().parse_args(argv)
    ledger = CorpusLedger(arguments.db, arguments.objects)
    agent = LayeringAgent(
        ledger=ledger,
        candidate_path=arguments.candidates,
        decisions_path=arguments.decisions_file,
    )

    try:
        if arguments.command == "propose":
            result = agent.run(source_id=arguments.source_id)
            _print_json(result.as_dict())
        elif arguments.command == "review" and arguments.review_command == "list":
            _print_json(
                [
                    {
                        "review_id": item["review_id"],
                        "decision": item["decision"],
                        "human_approved": item["human_approved"],
                        "confidence": item["confidence"],
                        "layer_hypothesis_id": item["hypothesis"]["layer_hypothesis_id"],
                        "model_id": item["hypothesis"]["model_id"],
                        "label": item["hypothesis"]["label"],
                        "source_id": item["hypothesis"]["source_id"],
                    }
                    for item in agent.list_reviews()
                ]
            )
        elif arguments.command == "review" and arguments.review_command == "show":
            _print_json(agent.get_review(arguments.review_id))
        elif arguments.command == "review" and arguments.review_command == "approve":
            _print_json(
                agent.record_decision(
                    arguments.review_id,
                    action="approve",
                    signer=arguments.signer,
                    reason=arguments.reason,
                    confidence=arguments.confidence,
                    human_approved=arguments.human_approved,
                )
            )
        elif arguments.command == "review" and arguments.review_command == "reject":
            _print_json(
                agent.record_decision(
                    arguments.review_id,
                    action="reject",
                    signer=arguments.signer,
                    reason=arguments.reason,
                    confidence=None,
                    human_approved=arguments.human_approved,
                )
            )
        else:
            raise AssertionError("unhandled command")
    except (PhaseOneError, LedgerError, OSError, sqlite3.Error, ValueError) as error:
        print(json.dumps({"ok": False, "error": str(error)}, ensure_ascii=False), file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
