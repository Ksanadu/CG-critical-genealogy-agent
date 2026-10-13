"""CLI for Phase-4 probe candidates, human timelines, and audited backtests."""

from __future__ import annotations

import argparse
import json
import sqlite3
import sys
from pathlib import Path
from typing import Sequence

from .ledger import CorpusLedger, LedgerError, DEFAULT_DB_PATH, DEFAULT_OBJECT_DIR
from .layering import DEFAULT_DECISIONS_PATH
from .residues import PROBE_TABLES, PhaseFourError, ResidueProbeAgent


def _build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="genealogy-phase4",
        description="Queue three independent probes and human-maintained timeline backtests.",
    )
    parser.add_argument("--db", type=Path, default=DEFAULT_DB_PATH)
    parser.add_argument("--objects", type=Path, default=DEFAULT_OBJECT_DIR)
    parser.add_argument("--decisions-file", type=Path, default=DEFAULT_DECISIONS_PATH)
    commands = parser.add_subparsers(dest="command", required=True)

    commands.add_parser("types", help="show the three independent probe ids")

    probe = commands.add_parser("probe", help="submit or review one probe candidate")
    probe_commands = probe.add_subparsers(dest="probe_command", required=True)
    probe_submit = probe_commands.add_parser("submit", help="submit a human-supplied probe candidate JSON")
    probe_submit.add_argument("probe_id", choices=tuple(PROBE_TABLES))
    probe_submit.add_argument("candidate_file", type=Path)
    probe_commands.add_parser("list", help="list probe review requests")
    probe_decide = probe_commands.add_parser("decide", help="keep or reject a probe candidate")
    probe_decide.add_argument("review_id")
    probe_decide.add_argument("--action", choices=("keep", "reject"), required=True)
    probe_decide.add_argument("--signer", required=True)
    probe_decide.add_argument("--reason", required=True)
    probe_decide.add_argument("--human-approved", action="store_true", required=True)

    timeline = commands.add_parser("timeline", help="maintain the human-labeled fracture timeline")
    timeline_commands = timeline.add_subparsers(dest="timeline_command", required=True)
    timeline_submit = timeline_commands.add_parser("submit", help="submit one human-authored event JSON")
    timeline_submit.add_argument("event_file", type=Path)
    timeline_commands.add_parser("list", help="list timeline review requests")
    timeline_decide = timeline_commands.add_parser("decide", help="approve or reject a timeline event")
    timeline_decide.add_argument("review_id")
    timeline_decide.add_argument("--action", choices=("approve", "reject"), required=True)
    timeline_decide.add_argument("--signer", required=True)
    timeline_decide.add_argument("--reason", required=True)
    timeline_decide.add_argument("--human-approved", action="store_true", required=True)

    backtest = commands.add_parser("backtest", help="run a human-configured temporal comparison")
    backtest_commands = backtest.add_subparsers(dest="backtest_command", required=True)
    run = backtest_commands.add_parser("run")
    run.add_argument("--graph-version-id", required=True)
    run.add_argument("--civilization", required=True)
    run.add_argument("--tolerance-years", type=int, required=True)
    run.add_argument("--signer", required=True)
    run.add_argument("--reason", required=True)
    run.add_argument("--human-approved", action="store_true", required=True)

    weight = commands.add_parser("weight", help="submit and sign a corpus-specific weight change")
    weight_commands = weight.add_subparsers(dest="weight_command", required=True)
    weight_submit = weight_commands.add_parser("submit", help="submit a human-proposed weight JSON")
    weight_submit.add_argument("draft_file", type=Path)
    weight_commands.add_parser("list", help="list weight review requests")
    weight_review = weight_commands.add_parser("decide", help="approve or reject a proposed weight vector")
    weight_review.add_argument("review_id")
    weight_review.add_argument("--action", choices=("approve", "reject"), required=True)
    weight_review.add_argument("--signer", required=True)
    weight_review.add_argument("--reason", required=True)
    weight_review.add_argument("--human-approved", action="store_true", required=True)
    weight_commands.add_parser("active", help="list signed weight sets")
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
    agent = ResidueProbeAgent(
        ledger=CorpusLedger(arguments.db, arguments.objects),
        decisions_path=arguments.decisions_file,
    )
    try:
        if arguments.command == "types":
            _print_json({"probes": list(PROBE_TABLES)})
        elif arguments.command == "probe" and arguments.probe_command == "submit":
            candidate = json.loads(arguments.candidate_file.read_text(encoding="utf-8"))
            _print_json(agent.submit_probe_candidate(arguments.probe_id, **candidate))
        elif arguments.command == "probe" and arguments.probe_command == "list":
            _print_json(agent.list_probe_reviews())
        elif arguments.command == "probe" and arguments.probe_command == "decide":
            _print_json(
                agent.decide_probe_candidate(
                    arguments.review_id,
                    action=arguments.action,
                    signer=arguments.signer,
                    reason=arguments.reason,
                    human_approved=arguments.human_approved,
                )
            )
        elif arguments.command == "timeline" and arguments.timeline_command == "submit":
            event = json.loads(arguments.event_file.read_text(encoding="utf-8"))
            _print_json(agent.submit_timeline_event(**event))
        elif arguments.command == "timeline" and arguments.timeline_command == "list":
            _print_json(agent.list_timeline_reviews())
        elif arguments.command == "timeline" and arguments.timeline_command == "decide":
            _print_json(
                agent.decide_timeline_event(
                    arguments.review_id,
                    action=arguments.action,
                    signer=arguments.signer,
                    reason=arguments.reason,
                    human_approved=arguments.human_approved,
                )
            )
        elif arguments.command == "backtest" and arguments.backtest_command == "run":
            _print_json(
                agent.run_backtest(
                    graph_version_id=arguments.graph_version_id,
                    civilization=arguments.civilization,
                    tolerance_years=arguments.tolerance_years,
                    signer=arguments.signer,
                    reason=arguments.reason,
                    human_approved=arguments.human_approved,
                )
            )
        elif arguments.command == "weight" and arguments.weight_command == "submit":
            draft = json.loads(arguments.draft_file.read_text(encoding="utf-8"))
            _print_json(agent.submit_weight_change(**draft))
        elif arguments.command == "weight" and arguments.weight_command == "list":
            _print_json(agent.list_weight_drafts())
        elif arguments.command == "weight" and arguments.weight_command == "decide":
            _print_json(
                agent.decide_weight_change(
                    arguments.review_id,
                    action=arguments.action,
                    signer=arguments.signer,
                    reason=arguments.reason,
                    human_approved=arguments.human_approved,
                )
            )
        elif arguments.command == "weight" and arguments.weight_command == "active":
            _print_json(agent.active_weights())
        else:
            raise AssertionError("unhandled command")
    except (PhaseFourError, LedgerError, OSError, sqlite3.Error, ValueError, KeyError, TypeError) as error:
        print(json.dumps({"ok": False, "error": str(error)}, ensure_ascii=False), file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
