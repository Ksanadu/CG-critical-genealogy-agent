"""Mechanical corpus ingestion and provenance ledger for phase 0."""

from .ledger import (
    CorpusLedger,
    IngestResult,
    LedgerError,
    LedgerIntegrityError,
    LocatedSpan,
    SourceUnit,
    VerificationResult,
)

__all__ = [
    "CorpusLedger",
    "IngestResult",
    "LedgerError",
    "LedgerIntegrityError",
    "LocatedSpan",
    "SourceUnit",
    "VerificationResult",
]
