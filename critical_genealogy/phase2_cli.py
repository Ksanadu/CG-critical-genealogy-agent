"""CLI for falsifiability checks and human-gated Phase-2 proposals."""

from __future__ import annotations

import argparse
import json
import sqlite3
import sys
from pathlib import Path
from typing import Sequence

from .falsifiability import build_falsifiability_condition, validate_falsifiability_condition
from .ledger import CorpusLedger, LedgerError, DEFAULT_DB_PATH, DEFAULT_OBJECT_DIR
from .layering import DEFAULT_DECISIONS_PATH
from .proposals import PhaseTwoAgent, PhaseTwoError


def _build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="genealogy-phase2",
        description="Validate observable conditions and queue human-authored reduction drafts.",
    )
    parser.add_argument("--db", type=Path, default=DEFAULT_DB_PATH)
    parser.add_argument("--objects", type=Path, default=DEFAULT_OBJECT_DIR)
    parser.add_argument("--decisions-file", type=Path, default=DEFAULT_DECISIONS_PATH)
    commands = parser.add_subparsers(dest="command", required=True)

    check = commands.add_parser("condition-check", help="mechanically validate an observation condition")
    check.add_argument("condition")

    build = commands.add_parser("condition-build", help="format a condition from explicit human-supplied fields")
    build.add_argument("--observation", required=True)
    build.add_argument("--location", required=True)
    build.add_argument("--time-window", required=True)
    build.add_argument("--impact", required=True)

    draft = commands.add_parser("draft", help="queue an unscored, human-authored proposal draft")
    draft.add_argument("--parent-hypothesis-id", action="append", required=True)
    draft.add_argument("--rule-id", required=True)
    draft.add_argument("--mapping", required=True)
    draft.add_argument("--condition", required=True)
    draft.add_argument("--reasoning-step", action="append", required=True)
    draft.add_argument("--source-id", required=True)
    draft.add_argument("--start", type=int, required=True)
    draft.add_argument("--end", type=int, required=True)

    sample = commands.add_parser("condition-sample", help="randomly select 20 conditions for human review")
    sample.add_argument("--seed", type=int, default=None)

    audit = commands.add_parser("condition-audit", help="inspect and record the human 20-condition audit")
    audit_commands = audit.add_subparsers(dest="audit_command", required=True)
    audit_list = audit_commands.add_parser("list", help="list one audit batch")
    audit_list.add_argument("batch_id")
    audit_status = audit_commands.add_parser("status", help="show the 20-condition gate")
    audit_status.add_argument("batch_id")
    audit_review = audit_commands.add_parser("review", help="record one human observability judgment")
    audit_review.add_argument("audit_id")
    observable_group = audit_review.add_mutually_exclusive_group(required=True)
    observable_group.add_argument("--observable", dest="observable", action="store_true")
    observable_group.add_argument("--unobservable", dest="observable", action="store_false")
    audit_review.add_argument("--reviewer", required=True)
    audit_review.add_argument("--reason", required=True)
    audit_review.add_argument("--human-approved", action="store_true", required=True)

    commands.add_parser("proposals", help="list only signed active Proposal records")

    review = commands.add_parser("review", help="inspect or sign proposal drafts")
    review_commands = review.add_subparsers(dest="review_command", required=True)
    review_commands.add_parser("list", help="list draft review requests")

    show = review_commands.add_parser("show", help="show one draft review request")
    show.add_argument("review_id")

    approve = review_commands.add_parser("approve", help="activate a Proposal after explicit human review")
    approve.add_argument("review_id")
    approve.add_argument("--signer", required=True)
    approve.add_argument("--reason", required=True)
    approve.add_argument("--confidence", type=float, required=True)
    approve.add_argument("--human-approved", action="store_true", required=True)

    reject = review_commands.add_parser("reject", help="reject a draft with explicit human review")
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
    agent = PhaseTwoAgent(ledger=ledger, decisions_path=arguments.decisions_file)

    try:
        if arguments.command == "condition-check":
            validation = validate_falsifiability_condition(arguments.condition)
            _print_json(validation.as_dict())
            return 0 if validation.valid else 1
        if arguments.command == "condition-build":
            condition = build_falsifiability_condition(
                observation=arguments.observation,
                location=arguments.location,
                time_window=arguments.time_window,
                impact=arguments.impact,
            )
            validation = validate_falsifiability_condition(condition)
            _print_json({"condition": condition, "validation": validation.as_dict()})
            return 0 if validation.valid else 1
        if arguments.command == "condition-sample":
            _print_json(agent.sample_conditions_for_human_review(seed=arguments.seed))
        elif arguments.command == "proposals":
            _print_json(agent.active_proposals())
        elif arguments.command == "condition-audit" and arguments.audit_command == "list":
            _print_json(agent.list_condition_audit(arguments.batch_id))
        elif arguments.command == "condition-audit" and arguments.audit_command == "status":
            _print_json(agent.condition_audit_status(arguments.batch_id))
        elif arguments.command == "condition-audit" and arguments.audit_command == "review":
            _print_json(
                agent.review_condition_audit(
                    arguments.audit_id,
                    observable=arguments.observable,
                    reviewer=arguments.reviewer,
                    reason=arguments.reason,
                    human_approved=arguments.human_approved,
                )
            )
        elif arguments.command == "draft":
            _print_json(
                agent.submit_draft(
                    parent_hypothesis_ids=arguments.parent_hypothesis_id,
                    rule_id=arguments.rule_id,
                    mapping=arguments.mapping,
                    falsifiability_condition=arguments.condition,
                    reasoning_chain=arguments.reasoning_step,
                    source_id=arguments.source_id,
                    source_refs=[
                        {"source_id": arguments.source_id, "char_range": [arguments.start, arguments.end]}
                    ],
                )
            )
        elif arguments.command == "review" and arguments.review_command == "list":
            _print_json(agent.list_reviews())
        elif arguments.command == "review" and arguments.review_command == "show":
            _print_json(agent.get_review(arguments.review_id))
        elif arguments.command == "review" and arguments.review_command == "approve":
            _print_json(
                agent.decide(
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
                agent.decide(
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
    except (PhaseTwoError, LedgerError, OSError, sqlite3.Error, ValueError) as error:
        print(json.dumps({"ok": False, "error": str(error)}, ensure_ascii=False), file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
