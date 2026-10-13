# Test corpus provenance

`genesis_1-3_kjv.txt` contains Genesis chapters 1–3 in the King James Version. The verse wording was transcribed from the `Genesis.json` file in the `angono/bible-kjv-json` repository:

- Raw source: https://raw.githubusercontent.com/angono/bible-kjv-json/master/Genesis.json
- Repository: https://github.com/angono/bible-kjv-json

The local text keeps the source verse wording and order, adding only chapter headings (`[Genesis N]`), verse labels (`N:M`), and line breaks so ingestion can preserve stable character spans. It was the phase-0 ingestion fixture; no interpretation was generated in that phase.

## Deuteronomy

`deuteronomy_kjv.txt` contains the full 34-chapter KJV Deuteronomy text, formatted reproducibly from [`deuteronomy_kjv_upstream.json`](deuteronomy_kjv_upstream.json) using [`critical_genealogy/format_kjv.py`](../../critical_genealogy/format_kjv.py).

- Raw source: https://raw.githubusercontent.com/angono/bible-kjv-json/master/Deuteronomy.json
- Repository: https://github.com/angono/bible-kjv-json
- Upstream JSON: 174,327 bytes; SHA-256 `82116f948cbbec3e5bc893a9d3da9b04f91eb91e2037aadc786d2793363eb5fb`
- Formatted text: 34 chapters, 959 verses; 152,190 Unicode code points before ledger ingestion

Formatting adds chapter headings (`[Deuteronomy N]`), verse labels (`N:M`), blank lines between chapters, and a final newline; verse wording and order are preserved. This is a phase-1 source fixture. D-related assignments remain proposals pending human review.
