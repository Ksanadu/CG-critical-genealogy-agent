"""Content-addressed corpus storage and an append-only hash-chain ledger."""

from __future__ import annotations

import hashlib
import json
import os
import sqlite3
import tempfile
from contextlib import contextmanager
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterator


PROJECT_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_DB_PATH = PROJECT_ROOT / "data" / "ledger.sqlite3"
DEFAULT_OBJECT_DIR = PROJECT_ROOT / "data" / "objects"
HASH_PREFIX = "sha256:"
GENESIS_HASH = HASH_PREFIX + ("0" * 64)


class LedgerError(Exception):
    """Raised when a source cannot be safely recorded or retrieved."""


class LedgerIntegrityError(LedgerError):
    """Raised when stored source data or the ledger chain fails verification."""


class SourceNotFoundError(LedgerError):
    """Raised when a requested content-addressed source is absent."""


@dataclass(frozen=True)
class SourceUnit:
    source_id: str
    unit_id: str
    ordinal: int
    text_span: str
    char_range: tuple[int, int]
    content_hash: str
    previous_hash: str
    entry_hash: str

    def as_manifest_item(self) -> dict[str, object]:
        """Return the contract fields plus stable unit and chain identifiers."""
        return {
            "source_id": self.source_id,
            "text_span": self.text_span,
            "char_range": list(self.char_range),
            "unit_id": self.unit_id,
            "content_hash": self.content_hash,
            "previous_hash": self.previous_hash,
            "entry_hash": self.entry_hash,
        }


@dataclass(frozen=True)
class IngestResult:
    source_id: str
    title: str
    byte_count: int
    char_count: int
    units: tuple[SourceUnit, ...]
    already_present: bool


@dataclass(frozen=True)
class LocatedSpan:
    source_id: str
    char_range: tuple[int, int]
    text_span: str
    unit_ids: tuple[str, ...]

    def as_dict(self) -> dict[str, object]:
        return {
            "source_id": self.source_id,
            "char_range": list(self.char_range),
            "text_span": self.text_span,
            "unit_ids": list(self.unit_ids),
        }


@dataclass(frozen=True)
class VerificationResult:
    source_count: int
    unit_count: int
    head_hash: str

    def as_dict(self) -> dict[str, object]:
        return {
            "ok": True,
            "source_count": self.source_count,
            "unit_count": self.unit_count,
            "head_hash": self.head_hash,
        }


_SCHEMA = """
CREATE TABLE IF NOT EXISTS documents (
    source_id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    byte_count INTEGER NOT NULL CHECK (byte_count > 0),
    char_count INTEGER NOT NULL CHECK (char_count > 0),
    unit_count INTEGER NOT NULL CHECK (unit_count > 0),
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS ledger_entries (
    sequence INTEGER PRIMARY KEY,
    source_id TEXT NOT NULL REFERENCES documents(source_id),
    ordinal INTEGER NOT NULL CHECK (ordinal >= 0),
    char_start INTEGER NOT NULL CHECK (char_start >= 0),
    char_end INTEGER NOT NULL CHECK (char_end > char_start),
    text_span TEXT NOT NULL,
    unit_id TEXT NOT NULL UNIQUE,
    content_hash TEXT NOT NULL,
    previous_hash TEXT NOT NULL,
    entry_hash TEXT NOT NULL UNIQUE,
    UNIQUE (source_id, ordinal)
);

CREATE TABLE IF NOT EXISTS ledger_meta (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);

CREATE TRIGGER IF NOT EXISTS documents_no_update
BEFORE UPDATE ON documents
BEGIN
    SELECT RAISE(ABORT, 'documents are immutable');
END;

CREATE TRIGGER IF NOT EXISTS documents_no_delete
BEFORE DELETE ON documents
BEGIN
    SELECT RAISE(ABORT, 'documents are immutable');
END;

CREATE TRIGGER IF NOT EXISTS ledger_entries_no_update
BEFORE UPDATE ON ledger_entries
BEGIN
    SELECT RAISE(ABORT, 'ledger entries are immutable');
END;

CREATE TRIGGER IF NOT EXISTS ledger_entries_no_delete
BEFORE DELETE ON ledger_entries
BEGIN
    SELECT RAISE(ABORT, 'ledger entries are immutable');
END;
"""


class CorpusLedger:
    """Persist exact UTF-8 sources and line-based, offset-addressable units."""

    def __init__(
        self,
        db_path: str | Path = DEFAULT_DB_PATH,
        object_dir: str | Path = DEFAULT_OBJECT_DIR,
    ) -> None:
        self.db_path = Path(db_path)
        self.object_dir = Path(object_dir)

    @contextmanager
    def _connect(self) -> Iterator[sqlite3.Connection]:
        self.db_path.parent.mkdir(parents=True, exist_ok=True)
        self.object_dir.mkdir(parents=True, exist_ok=True)
        connection = sqlite3.connect(
            self.db_path,
            timeout=30,
            isolation_level=None,
        )
        connection.row_factory = sqlite3.Row
        connection.execute("PRAGMA foreign_keys = ON")
        connection.execute("PRAGMA busy_timeout = 30000")
        connection.execute("PRAGMA journal_mode = WAL")
        connection.executescript(_SCHEMA)
        connection.execute(
            "INSERT OR IGNORE INTO ledger_meta(key, value) VALUES ('head_hash', ?)",
            (GENESIS_HASH,),
        )
        try:
            yield connection
        finally:
            connection.close()

    @staticmethod
    def _digest_bytes(value: bytes) -> str:
        return HASH_PREFIX + hashlib.sha256(value).hexdigest()

    @classmethod
    def _digest_json(cls, value: dict[str, object]) -> str:
        encoded = json.dumps(
            value,
            ensure_ascii=False,
            sort_keys=True,
            separators=(",", ":"),
        ).encode("utf-8")
        return cls._digest_bytes(encoded)

    @staticmethod
    def _validate_hash_id(value: str) -> str:
        if not value.startswith(HASH_PREFIX):
            raise LedgerError("hash identifier must use the sha256: prefix")
        digest = value[len(HASH_PREFIX) :]
        if len(digest) != 64 or any(char not in "0123456789abcdef" for char in digest):
            raise LedgerError("malformed SHA-256 identifier")
        return digest

    def _object_path(self, source_id: str) -> Path:
        digest = self._validate_hash_id(source_id)
        return self.object_dir / digest[:2] / f"{digest}.txt"

    @staticmethod
    def _unit_specs(source_id: str, text: str) -> list[dict[str, object]]:
        if not text:
            raise LedgerError("empty source text is not ingestible")

        specs: list[dict[str, object]] = []
        cursor = 0
        for ordinal, line in enumerate(text.splitlines(keepends=True)):
            start = cursor
            end = start + len(line)
            content_hash = CorpusLedger._digest_bytes(line.encode("utf-8"))
            char_range = [start, end]
            unit_id = CorpusLedger._digest_json(
                {
                    "version": 1,
                    "kind": "source-span",
                    "source_id": source_id,
                    "ordinal": ordinal,
                    "char_range": char_range,
                    "content_hash": content_hash,
                }
            )
            specs.append(
                {
                    "source_id": source_id,
                    "ordinal": ordinal,
                    "char_start": start,
                    "char_end": end,
                    "text_span": line,
                    "unit_id": unit_id,
                    "content_hash": content_hash,
                }
            )
            cursor = end

        if cursor != len(text) or not specs:
            raise LedgerError("source segmentation did not cover the complete text")
        return specs

    @staticmethod
    def _entry_payload(
        sequence: int,
        source_id: str,
        ordinal: int,
        char_start: int,
        char_end: int,
        unit_id: str,
        content_hash: str,
        previous_hash: str,
    ) -> dict[str, object]:
        return {
            "version": 1,
            "sequence": sequence,
            "source_id": source_id,
            "ordinal": ordinal,
            "char_range": [char_start, char_end],
            "unit_id": unit_id,
            "content_hash": content_hash,
            "previous_hash": previous_hash,
        }

    @staticmethod
    def _write_object(path: Path, data: bytes) -> None:
        path.parent.mkdir(parents=True, exist_ok=True)
        if path.exists():
            if path.read_bytes() != data:
                raise LedgerIntegrityError(f"content-addressed object mismatch: {path}")
            return

        temporary_path: Path | None = None
        try:
            with tempfile.NamedTemporaryFile(
                mode="wb",
                prefix=".pending-",
                dir=path.parent,
                delete=False,
            ) as temporary:
                temporary.write(data)
                temporary.flush()
                os.fsync(temporary.fileno())
                temporary_path = Path(temporary.name)
            os.replace(temporary_path, path)
        finally:
            if temporary_path is not None and temporary_path.exists():
                temporary_path.unlink()

    def ingest_file(self, path: str | Path, title: str | None = None) -> IngestResult:
        source_path = Path(path)
        return self.ingest_bytes(
            source_path.read_bytes(),
            title=title or source_path.name,
        )

    def ingest_text(self, text: str, title: str = "inline source") -> IngestResult:
        return self.ingest_bytes(text.encode("utf-8"), title=title)

    def ingest_bytes(self, data: bytes, title: str) -> IngestResult:
        if not data:
            raise LedgerError("empty source bytes are not ingestible")
        if not title.strip():
            raise LedgerError("source title must not be empty")
        try:
            text = data.decode("utf-8")
        except UnicodeDecodeError as error:
            raise LedgerError("sources must be valid UTF-8") from error

        source_id = self._digest_bytes(data)
        specs = self._unit_specs(source_id, text)
        object_path = self._object_path(source_id)
        self._write_object(object_path, data)

        with self._connect() as connection:
            connection.execute("BEGIN IMMEDIATE")
            try:
                self._verify_connection(connection)
                existing = connection.execute(
                    "SELECT * FROM documents WHERE source_id = ?",
                    (source_id,),
                ).fetchone()
                if existing is not None:
                    if (
                        int(existing["byte_count"]) != len(data)
                        or int(existing["char_count"]) != len(text)
                        or int(existing["unit_count"]) != len(specs)
                    ):
                        raise LedgerIntegrityError(
                            f"document metadata mismatch for {source_id}"
                        )
                    units = self._validated_source_units(connection, source_id, text)
                    connection.execute("ROLLBACK")
                    return IngestResult(
                        source_id=source_id,
                        title=str(existing["title"]),
                        byte_count=len(data),
                        char_count=len(text),
                        units=units,
                        already_present=True,
                    )

                created_at = datetime.now(timezone.utc).isoformat()
                connection.execute(
                    """INSERT INTO documents
                       (source_id, title, byte_count, char_count, unit_count, created_at)
                       VALUES (?, ?, ?, ?, ?, ?)""",
                    (source_id, title, len(data), len(text), len(specs), created_at),
                )
                head_row = connection.execute(
                    "SELECT value FROM ledger_meta WHERE key = 'head_hash'"
                ).fetchone()
                previous_hash = str(head_row["value"])
                sequence_row = connection.execute(
                    "SELECT COALESCE(MAX(sequence), 0) AS max_sequence FROM ledger_entries"
                ).fetchone()
                sequence = int(sequence_row["max_sequence"]) + 1

                records: list[SourceUnit] = []
                for spec in specs:
                    payload = self._entry_payload(
                        sequence=sequence,
                        source_id=source_id,
                        ordinal=int(spec["ordinal"]),
                        char_start=int(spec["char_start"]),
                        char_end=int(spec["char_end"]),
                        unit_id=str(spec["unit_id"]),
                        content_hash=str(spec["content_hash"]),
                        previous_hash=previous_hash,
                    )
                    entry_hash = self._digest_json(payload)
                    connection.execute(
                        """INSERT INTO ledger_entries
                           (sequence, source_id, ordinal, char_start, char_end,
                            text_span, unit_id, content_hash, previous_hash, entry_hash)
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                        (
                            sequence,
                            source_id,
                            spec["ordinal"],
                            spec["char_start"],
                            spec["char_end"],
                            spec["text_span"],
                            spec["unit_id"],
                            spec["content_hash"],
                            previous_hash,
                            entry_hash,
                        ),
                    )
                    records.append(
                        SourceUnit(
                            source_id=source_id,
                            unit_id=str(spec["unit_id"]),
                            ordinal=int(spec["ordinal"]),
                            text_span=str(spec["text_span"]),
                            char_range=(
                                int(spec["char_start"]),
                                int(spec["char_end"]),
                            ),
                            content_hash=str(spec["content_hash"]),
                            previous_hash=previous_hash,
                            entry_hash=entry_hash,
                        )
                    )
                    sequence += 1
                    previous_hash = entry_hash

                connection.execute(
                    "UPDATE ledger_meta SET value = ? WHERE key = 'head_hash'",
                    (previous_hash,),
                )
                connection.execute("COMMIT")
                return IngestResult(
                    source_id=source_id,
                    title=title,
                    byte_count=len(data),
                    char_count=len(text),
                    units=tuple(records),
                    already_present=False,
                )
            except Exception:
                if connection.in_transaction:
                    connection.execute("ROLLBACK")
                raise

    @staticmethod
    def _row_to_unit(row: sqlite3.Row) -> SourceUnit:
        return SourceUnit(
            source_id=str(row["source_id"]),
            unit_id=str(row["unit_id"]),
            ordinal=int(row["ordinal"]),
            text_span=str(row["text_span"]),
            char_range=(int(row["char_start"]), int(row["char_end"])),
            content_hash=str(row["content_hash"]),
            previous_hash=str(row["previous_hash"]),
            entry_hash=str(row["entry_hash"]),
        )

    def _validated_source_units(
        self,
        connection: sqlite3.Connection,
        source_id: str,
        text: str,
    ) -> tuple[SourceUnit, ...]:
        expected = self._unit_specs(source_id, text)
        rows = connection.execute(
            "SELECT * FROM ledger_entries WHERE source_id = ? ORDER BY ordinal",
            (source_id,),
        ).fetchall()
        if len(rows) != len(expected):
            raise LedgerIntegrityError(f"unit count mismatch for {source_id}")

        records: list[SourceUnit] = []
        for spec, row in zip(expected, rows, strict=True):
            fields_match = (
                str(row["source_id"]) == str(spec["source_id"])
                and int(row["ordinal"]) == int(spec["ordinal"])
                and int(row["char_start"]) == int(spec["char_start"])
                and int(row["char_end"]) == int(spec["char_end"])
                and str(row["text_span"]) == str(spec["text_span"])
                and str(row["unit_id"]) == str(spec["unit_id"])
                and str(row["content_hash"]) == str(spec["content_hash"])
            )
            if not fields_match:
                raise LedgerIntegrityError(
                    f"source span mismatch for {source_id} unit {spec['ordinal']}"
                )
            records.append(self._row_to_unit(row))
        return tuple(records)

    def _read_document_text(
        self,
        row: sqlite3.Row,
    ) -> tuple[str, bytes]:
        source_id = str(row["source_id"])
        object_path = self._object_path(source_id)
        try:
            data = object_path.read_bytes()
        except FileNotFoundError as error:
            raise LedgerIntegrityError(f"missing content object for {source_id}") from error
        if self._digest_bytes(data) != source_id:
            raise LedgerIntegrityError(f"content hash mismatch for {source_id}")
        if len(data) != int(row["byte_count"]):
            raise LedgerIntegrityError(f"byte count mismatch for {source_id}")
        try:
            text = data.decode("utf-8")
        except UnicodeDecodeError as error:
            raise LedgerIntegrityError(f"invalid UTF-8 object for {source_id}") from error
        if len(text) != int(row["char_count"]):
            raise LedgerIntegrityError(f"character count mismatch for {source_id}")
        return text, data

    def _verify_connection(self, connection: sqlite3.Connection) -> VerificationResult:
        documents = connection.execute(
            "SELECT * FROM documents ORDER BY source_id"
        ).fetchall()
        document_units: dict[str, tuple[SourceUnit, ...]] = {}
        expected_unit_count = 0
        for document in documents:
            source_id = str(document["source_id"])
            text, _ = self._read_document_text(document)
            specs = self._unit_specs(source_id, text)
            if len(specs) != int(document["unit_count"]):
                raise LedgerIntegrityError(f"document unit count mismatch for {source_id}")
            document_units[source_id] = self._validated_source_units(
                connection,
                source_id,
                text,
            )
            expected_unit_count += len(specs)

        rows = connection.execute(
            "SELECT * FROM ledger_entries ORDER BY sequence"
        ).fetchall()
        if len(rows) != expected_unit_count:
            raise LedgerIntegrityError("ledger entry count does not match source manifests")

        previous_hash = GENESIS_HASH
        for expected_sequence, row in enumerate(rows, start=1):
            sequence = int(row["sequence"])
            if sequence != expected_sequence:
                raise LedgerIntegrityError(
                    f"ledger sequence gap: expected {expected_sequence}, got {sequence}"
                )
            if str(row["previous_hash"]) != previous_hash:
                raise LedgerIntegrityError(f"broken previous-hash link at sequence {sequence}")
            payload = self._entry_payload(
                sequence=sequence,
                source_id=str(row["source_id"]),
                ordinal=int(row["ordinal"]),
                char_start=int(row["char_start"]),
                char_end=int(row["char_end"]),
                unit_id=str(row["unit_id"]),
                content_hash=str(row["content_hash"]),
                previous_hash=previous_hash,
            )
            expected_hash = self._digest_json(payload)
            if str(row["entry_hash"]) != expected_hash:
                raise LedgerIntegrityError(f"entry hash mismatch at sequence {sequence}")
            previous_hash = expected_hash

        meta = connection.execute(
            "SELECT value FROM ledger_meta WHERE key = 'head_hash'"
        ).fetchone()
        stored_head = str(meta["value"]) if meta is not None else GENESIS_HASH
        if stored_head != previous_hash:
            raise LedgerIntegrityError("stored ledger head does not match verified chain")

        return VerificationResult(
            source_count=len(documents),
            unit_count=len(rows),
            head_hash=previous_hash,
        )

    def verify(self) -> VerificationResult:
        with self._connect() as connection:
            connection.execute("BEGIN")
            try:
                result = self._verify_connection(connection)
                connection.execute("COMMIT")
                return result
            except Exception:
                if connection.in_transaction:
                    connection.execute("ROLLBACK")
                raise

    def units(self, source_id: str | None = None) -> tuple[SourceUnit, ...]:
        with self._connect() as connection:
            if source_id is None:
                rows = connection.execute(
                    "SELECT * FROM ledger_entries ORDER BY sequence"
                ).fetchall()
            else:
                rows = connection.execute(
                    "SELECT * FROM ledger_entries WHERE source_id = ? ORDER BY ordinal",
                    (source_id,),
                ).fetchall()
            return tuple(self._row_to_unit(row) for row in rows)

    def sources(self) -> tuple[dict[str, object], ...]:
        with self._connect() as connection:
            rows = connection.execute(
                """SELECT source_id, title, byte_count, char_count, unit_count, created_at
                   FROM documents ORDER BY created_at, source_id"""
            ).fetchall()
            return tuple(dict(row) for row in rows)

    def locate_span(self, source_id: str, start: int, end: int) -> LocatedSpan:
        self.verify()
        with self._connect() as connection:
            document = connection.execute(
                "SELECT * FROM documents WHERE source_id = ?",
                (source_id,),
            ).fetchone()
            if document is None:
                raise SourceNotFoundError(source_id)
            text, _ = self._read_document_text(document)
            if start < 0 or end <= start or end > len(text):
                raise LedgerError(
                    f"invalid half-open character range [{start}, {end}) "
                    f"for source length {len(text)}"
                )
            records = self._validated_source_units(connection, source_id, text)
            overlapping = tuple(
                record
                for record in records
                if record.char_range[0] < end and record.char_range[1] > start
            )
            cursor = start
            for record in overlapping:
                unit_start, unit_end = record.char_range
                if unit_start > cursor:
                    raise LedgerIntegrityError(
                        f"uncovered character range [{cursor}, {unit_start})"
                    )
                cursor = max(cursor, unit_end)
            if cursor < end:
                raise LedgerIntegrityError(f"uncovered character range [{cursor}, {end})")
            return LocatedSpan(
                source_id=source_id,
                char_range=(start, end),
                text_span=text[start:end],
                unit_ids=tuple(record.unit_id for record in overlapping),
            )

    def search_excerpt(
        self,
        excerpt: str,
        source_id: str | None = None,
    ) -> tuple[LocatedSpan, ...]:
        if not excerpt:
            raise LedgerError("search excerpt must not be empty")
        self.verify()

        matches: list[LocatedSpan] = []
        with self._connect() as connection:
            if source_id is None:
                documents = connection.execute(
                    "SELECT * FROM documents ORDER BY source_id"
                ).fetchall()
            else:
                documents = connection.execute(
                    "SELECT * FROM documents WHERE source_id = ?",
                    (source_id,),
                ).fetchall()
                if not documents:
                    raise SourceNotFoundError(source_id)

            for document in documents:
                current_source_id = str(document["source_id"])
                text, _ = self._read_document_text(document)
                self._validated_source_units(connection, current_source_id, text)
                offset = 0
                while True:
                    found = text.find(excerpt, offset)
                    if found < 0:
                        break
                    end = found + len(excerpt)
                    records = self._validated_source_units(
                        connection,
                        current_source_id,
                        text,
                    )
                    unit_ids = tuple(
                        record.unit_id
                        for record in records
                        if record.char_range[0] < end and record.char_range[1] > found
                    )
                    matches.append(
                        LocatedSpan(
                            source_id=current_source_id,
                            char_range=(found, end),
                            text_span=text[found:end],
                            unit_ids=unit_ids,
                        )
                    )
                    offset = found + 1
        return tuple(matches)

    def manifest(self, source_id: str) -> tuple[SourceUnit, ...]:
        if not any(item["source_id"] == source_id for item in self.sources()):
            raise SourceNotFoundError(source_id)
        return self.units(source_id)
