"""CG web demo: read-only HTTP API over the content-addressed ledger (Phase 0)."""

from __future__ import annotations

import argparse
import json
import sqlite3
import tempfile
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

from critical_genealogy import CorpusLedger
from critical_genealogy.ledger import LedgerError
from webdemo.readapi import ROUTE_TABLE, ReadAPI, dispatch
from webdemo.writeapi import DEMO_ROUTES, DemoWriteAPI, dispatch_demo

SERVICE_NAME = "cg-webdemo"
SERVICE_VERSION = "0.1.0-phase0"
DEFAULT_PORT = 8077

PROJECT_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_DB_PATH = PROJECT_ROOT / "data" / "ledger.sqlite3"
DEFAULT_OBJECT_DIR = PROJECT_ROOT / "data" / "objects"


def _json_body(handler: BaseHTTPRequestHandler, limit: int = 1 << 20) -> dict:
    length = int(handler.headers.get("Content-Length") or 0)
    if length <= 0:
        return {}
    if length > limit:
        raise LedgerError("request body too large")
    raw = handler.rfile.read(length)
    try:
        payload = json.loads(raw.decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError) as error:
        raise LedgerError(f"invalid JSON body: {error}") from error
    if not isinstance(payload, dict):
        raise LedgerError("JSON body must be an object")
    return payload


class DemoHandler(BaseHTTPRequestHandler):
    server_version = "CGWebDemo/0.1"

    def log_message(self, format: str, *args: object) -> None:  # noqa: A002 - stdlib signature
        pass

    @property
    def demo(self) -> "DemoServer":
        server = self.server
        assert isinstance(server, DemoServer)
        return server

    def _send(self, status: int, payload: object) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _send_html(self, status: int, html: str) -> None:
        body = html.encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _ok(self, payload: object) -> None:
        self._send(200, payload)

    def _fail(self, status: int, message: str) -> None:
        self._send(status, {"ok": False, "error": message})

    def _active_read_api(self) -> ReadAPI:
        write_api = self.demo.write_api
        if write_api.state.get("ready") and write_api.ledger is not None:
            if self.demo.scratch_api is None or self.demo.scratch_api.ledger is not write_api.ledger:
                self.demo.scratch_api = ReadAPI(write_api.ledger)
            assert self.demo.scratch_api is not None
            return self.demo.scratch_api
        return self.demo.read_api

    def do_GET(self) -> None:  # noqa: N802 - stdlib handler name
        parsed = urlparse(self.path)
        try:
            if parsed.path == "/api/health":
                head = self.demo.ledger.verify().head_hash
                scratch = self.demo.write_api.state.get("ready", False)
                self._ok({"ok": True, "service": SERVICE_NAME, "version": SERVICE_VERSION,
                          "ledger_head": head, "demo_ready": scratch})
            elif parsed.path == "/api/verify":
                self._ok(self.demo.ledger.verify().as_dict())
            elif parsed.path == "/api/docs":
                rows = "".join(f"<tr><td><code>{r}</code></td><td>{d}</td></tr>" for r, d in ROUTE_TABLE)
                demo_rows = "".join(f"<tr><td><code>{r}</code></td><td>{d}</td></tr>" for r, d in DEMO_ROUTES)
                self._send_html(200, "<!doctype html><html lang='zh-CN'><head><meta charset='utf-8'>"
                                     "<title>CG Web Demo API</title></head><body>"
                                     "<h1>CG Web Demo API (v1)</h1>"
                                     "<h2>只读</h2>"
                                     f"<table border='1'><tr><th>路由</th><th>用途</th></tr>{rows}</table>"
                                     "<h2>演示写入（仅内存库，不碰正式账本）</h2>"
                                     f"<table border='1'><tr><th>路由</th><th>用途</th></tr>{demo_rows}</table>"
                                     "<p>错误体统一为 <code>{\"ok\": false, \"error\": \"...\"}</code>。</p>"
                                     "</body></html>")
            elif parsed.path == "/":
                try:
                    html = (PROJECT_ROOT / "webdemo" / "index.html").read_text(encoding="utf-8")
                except OSError:
                    html = ("<!doctype html><html lang='zh-CN'><head><meta charset='utf-8'>"
                            "<title>CG Web Demo</title></head><body><h1>CG Web Demo</h1>"
                            "<p>前端文件缺失。</p></body></html>")
                self._send_html(200, html)
            else:
                status, payload = dispatch(self._active_read_api(), self.path)
                self._send(status, payload)
        except (LedgerError, OSError, sqlite3.Error, ValueError) as error:
            self._fail(500, str(error))

    def do_POST(self) -> None:  # noqa: N802 - stdlib handler name
        parsed = urlparse(self.path)
        try:
            body = _json_body(self)
            if parsed.path.startswith("/api/demo/"):
                status, payload = dispatch_demo(self.demo.write_api, self.path, body)
                self._send(status, payload)
            else:
                self._fail(404, f"unknown path: {parsed.path}")
        except (LedgerError, OSError, sqlite3.Error, ValueError) as error:
            self._fail(400, str(error))


class DemoServer(ThreadingHTTPServer):
    allow_reuse_address = True
    daemon_threads = True

    def __init__(
        self,
        address: tuple[str, int],
        db_path: Path = DEFAULT_DB_PATH,
        object_dir: Path = DEFAULT_OBJECT_DIR,
    ) -> None:
        super().__init__(address, DemoHandler)
        self.db_path = Path(db_path)
        self.object_dir = Path(object_dir)
        self.ledger = CorpusLedger(self.db_path, self.object_dir)
        self.read_api = ReadAPI(self.ledger)
        self.write_api = DemoWriteAPI(self.db_path, self.object_dir, PROJECT_ROOT / "data" / "layers")
        self.scratch_api: ReadAPI | None = None
        self.scratch = Path(tempfile.mkdtemp(prefix="cg-webdemo-"))


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="CG critical-genealogy web demo server.")
    parser.add_argument("--port", type=int, default=DEFAULT_PORT)
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--db", type=Path, default=DEFAULT_DB_PATH)
    parser.add_argument("--objects", type=Path, default=DEFAULT_OBJECT_DIR)
    return parser


def main(argv: list[str] | None = None) -> int:
    arguments = build_parser().parse_args(argv)
    server = DemoServer((arguments.host, arguments.port), arguments.db, arguments.objects)
    print(f"{SERVICE_NAME} listening on http://{arguments.host}:{arguments.port}", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
