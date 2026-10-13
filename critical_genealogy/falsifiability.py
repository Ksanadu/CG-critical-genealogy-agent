"""Mechanical observability checks for falsifiability-condition drafts."""

from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Any


_OBSERVABLE_CLASSES: dict[str, tuple[str, ...]] = {
    "archaeological_context": (
        "考古", "遗址", "地层", "出土", "遗迹", "陶片", "墓葬", "建筑遗迹",
        "archaeolog", "excavation", "stratigraph", "artifact", "pottery", "burial",
    ),
    "epigraphic_or_textual": (
        "铭文", "碑文", "碑刻", "泥版", "文书", "手稿", "抄本", "古文字", "档案",
        "inscription", "tablet", "manuscript", "document", "archive", "written record",
    ),
    "dating_measurement": (
        "放射性碳", "碳十四", "测年", "年代测定", "同位素", "树轮",
        "radiocarbon", "carbon-14", "radiometric", "dendrochronolog", "isotope dating",
    ),
    "administrative_material": (
        "税簿", "税额", "行政记录", "户籍", "契约", "收据", "粮仓账目",
        "tax record", "census record", "administrative record", "contract", "receipt",
    ),
}

_VAGUE_PHRASES = (
    "更多反例",
    "更多证据",
    "更多材料",
    "更多研究",
    "如果有更多",
    "more counterexamples",
    "more evidence",
    "further research",
    "additional evidence",
)
_CONDITIONAL_MARKERS = (
    "若",
    "如果",
    "倘若",
    "一旦",
    "if ",
    "when ",
    "were found",
    "would be falsified",
    "would undermine",
)


@dataclass(frozen=True)
class FalsifiabilityValidation:
    valid: bool
    observable_classes: tuple[str, ...]
    matched_terms: tuple[str, ...]
    reasons: tuple[str, ...]

    def as_dict(self) -> dict[str, Any]:
        return {
            "valid": self.valid,
            "observable_classes": list(self.observable_classes),
            "matched_terms": list(self.matched_terms),
            "reasons": list(self.reasons),
        }


def validate_falsifiability_condition(condition: str) -> FalsifiabilityValidation:
    if not isinstance(condition, str):
        return FalsifiabilityValidation(False, (), (), ("condition must be text",))

    normalized = condition.casefold().strip()
    reasons: list[str] = []
    if len(normalized) < 20:
        reasons.append("condition is too short to identify a testable observation")

    matched_classes: list[str] = []
    matched_terms: list[str] = []
    for observable_class, terms in _OBSERVABLE_CLASSES.items():
        hits = [term for term in terms if term.casefold() in normalized]
        if hits:
            matched_classes.append(observable_class)
            matched_terms.extend(hits)

    if not matched_classes:
        reasons.append("condition does not name a recognized observable evidence type")
    if any(phrase.casefold() in normalized for phrase in _VAGUE_PHRASES) and not matched_classes:
        reasons.append("condition relies on a vague appeal to future evidence")
    if not any(marker.casefold() in normalized for marker in _CONDITIONAL_MARKERS):
        reasons.append("condition does not state a conditional falsification test")

    return FalsifiabilityValidation(
        valid=not reasons,
        observable_classes=tuple(matched_classes),
        matched_terms=tuple(matched_terms),
        reasons=tuple(reasons),
    )


def build_falsifiability_condition(
    *,
    observation: str,
    location: str,
    time_window: str,
    impact: str,
) -> str:
    fields = {
        "observation": observation,
        "location": location,
        "time_window": time_window,
        "impact": impact,
    }
    missing = [name for name, value in fields.items() if not isinstance(value, str) or not value.strip()]
    if missing:
        raise ValueError(f"missing human-supplied condition fields: {', '.join(missing)}")
    return f"若在{location.strip()}的{time_window.strip()}中发现{observation.strip()}，则{impact.strip()}。"
