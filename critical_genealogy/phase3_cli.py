"""CLI for versioned proposal graphs and explicitly reviewed forks."""

from __future__ import annotations

import argparse
import json
import sqlite3
import sys
from pathlib import Path
from typing import Sequence

from .graph import EDGE_TYPES, NODE_TYPES, GraphError, PhaseThreeAgent
from .ledger import CorpusLedger, LedgerError, DEFAULT_DB_PATH, DEFAULT_OBJECT_DIR
from .layering import DEFAULT_DECISIONS_PATH


def _build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="genealogy-phase3",
        description="Build versioned proposal graphs and preserve human-reviewed branches.",
    )
    parser.add_argument("--db", type=Path, default=DEFAULT_DB_PATH)
    parser.add_argument("--objects", type=Path, default=DEFAULT_OBJECT_DIR)
    parser.add_argument("--decisions-file", type=Path, default=DEFAULT_DECISIONS_PATH)
    commands = parser.add_subparsers(dest="command", required=True)

    commands.add_parser("types", help="show the fixed node and edge types")

    snapshot = commands.add_parser("snapshot", help="show one graph version or the latest")
    snapshot.add_argument("--version-id", default=None)

    patch = commands.add_parser("patch", help="submit or review a human-authored graph patch")
    patch_commands = patch.add_subparsers(dest="patch_command", required=True)
    submit_patch = patch_commands.add_parser("submit", help="queue a graph patch JSON file")
    submit_patch.add_argument("patch_file", type=Path)
    patch_commands.add_parser("list", help="list graph patch review requests")
    patch_show = patch_commands.add_parser("show", help="show one graph patch request")
    patch_show.add_argument("review_id")

    patch_approve = patch_commands.add_parser("approve", help="activate a graph version after human review")
    patch_approve.add_argument("review_id")
    patch_approve.add_argument("--signer", required=True)
    patch_approve.add_argument("--reason", required=True)
    patch_approve.add_argument("--human-approved", action="store_true", required=True)

    patch_reject = patch_commands.add_parser("reject", help="reject a graph patch after human review")
    patch_reject.add_argument("review_id")
    patch_reject.add_argument("--signer", required=True)
    patch_reject.add_argument("--reason", required=True)
    patch_reject.add_argument("--human-approved", action="store_true", required=True)

    fork = commands.add_parser("fork", help="submit or review a fork request")
    fork_commands = fork.add_subparsers(dest="fork_command", required=True)
    submit_fork = fork_commands.add_parser("submit", help="queue a two-branch fork request JSON file")
    submit_fork.add_argument("request_file", type=Path)
    fork_commands.add_parser("list", help="list fork review requests")
    fork_approve = fork_commands.add_parser("keep-both", help="approve preservation of both branches")
    fork_approve.add_argument("review_id")
    fork_approve.add_argument("--signer", required=True)
    fork_approve.add_argument("--reason", required=True)
    fork_approve.add_argument("--human-approved", action="store_true", required=True)
    fork_reject = fork_commands.add_parser("reject", help="reject a fork request")
    fork_reject.add_argument("review_id")
    fork_reject.add_argument("--signer", required=True)
    fork_reject.add_argument("--reason", required=True)
    fork_reject.add_argument("--human-approved", action="store_true", required=True)

    branch = commands.add_parser("branch-op", help="explicitly record a human merge/delete operation")
    branch.add_argument("fork_id")
    branch.add_argument("--action", choices=("merge", "delete"), required=True)
    branch.add_argument("--target-branch-id", action="append", required=True)
    branch.add_argument("--result-branch-json", default=None)
    branch.add_argument("--signer", required=True)
    branch.add_argument("--reason", required=True)
    branch.add_argument("--human-approved", action="store_true", required=True)
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
    agent = PhaseThreeAgent(
        ledger=CorpusLedger(arguments.db, arguments.objects),
        decisions_path=arguments.decisions_file,
    )
    try:
        if arguments.command == "types":
            _print_json({"node_types": list(NODE_TYPES), "edge_types": list(EDGE_TYPES)})
        elif arguments.command == "snapshot":
            _print_json(agent.graph_snapshot(arguments.version_id))
        elif arguments.command == "patch" and arguments.patch_command == "submit":
            request = json.loads(arguments.patch_file.read_text(encoding="utf-8"))
            _print_json(
                agent.submit_patch(
                    request["proposal_id"],
                    request["patch"],
                    parent_version_id=request.get("parent_version_id"),
                )
            )
        elif arguments.command == "patch" and arguments.patch_command == "list":
            _print_json(agent.list_patch_reviews())
        elif arguments.command == "patch" and arguments.patch_command == "show":
            _print_json(agent.get_patch_review(arguments.review_id))
        elif arguments.command == "patch" and arguments.patch_command in {"approve", "reject"}:
            _print_json(
                agent.decide_patch(
                    arguments.review_id,
                    action="approve" if arguments.patch_command == "approve" else "reject",
                    signer=arguments.signer,
                    reason=arguments.reason,
                    human_approved=arguments.human_approved,
                )
            )
        elif arguments.command == "fork" and arguments.fork_command == "submit":
            request = json.loads(arguments.request_file.read_text(encoding="utf-8"))
            _print_json(agent.submit_fork_request(**request))
        elif arguments.command == "fork" and arguments.fork_command == "list":
            _print_json(agent.list_fork_reviews())
        elif arguments.command == "fork" and arguments.fork_command in {"keep-both", "reject"}:
            _print_json(
                agent.decide_fork(
                    arguments.review_id,
                    action="keep_both" if arguments.fork_command == "keep-both" else "reject",
                    signer=arguments.signer,
                    reason=arguments.reason,
                    human_approved=arguments.human_approved,
                )
            )
        elif arguments.command == "branch-op":
            result_branch = (
                None
                if arguments.result_branch_json is None
                else json.loads(arguments.result_branch_json)
            )
            _print_json(
                agent.operate_branches(
                    arguments.fork_id,
                    action=arguments.action,
                    target_branch_ids=arguments.target_branch_id,
                    signer=arguments.signer,
                    reason=arguments.reason,
                    human_approved=arguments.human_approved,
                    result_branch=result_branch,
                )
            )
        else:
            raise AssertionError("unhandled command")
    except (GraphError, LedgerError, OSError, sqlite3.Error, ValueError, KeyError, json.JSONDecodeError) as error:
        print(json.dumps({"ok": False, "error": str(error)}, ensure_ascii=False), file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
