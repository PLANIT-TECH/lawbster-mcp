---
title: legal_list_laws — list available laws
description: >-
  Lists all indexed laws with abbreviation, title, source and currency.
  Filterable by source_type and search term.
keywords:
  - legal_list_laws
  - available laws
  - laws overview API
  - Lawbster coverage
---

# `legal_list_laws`

**Lists all indexed laws.** Discovery tool for the "what's actually in there?" question — useful when the LLM is unsure whether a special-law citation is part of Lawbster's index.

## When to use

- Before a `legal_lookup` if the abbreviation is uncertain
- During bot onboarding to know the available corpus

## Parameters

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `source_type` | enum | — | `gii`, `eurlex`, `eurlex_caselaw`, `rechtsprechung` |
| `search` | string | — | Case-insensitive search over abbreviation and title (e.g. `bgb`, `datenschutz`) |
| `limit` | int | 50 | Max results per page (1–500) |
| `offset` | int | 0 | Pagination offset |

!!! tip
    Always set at least `source_type` or `search` — the unfiltered list is thousands of entries and too large for tool-use loops.

## Examples

### All EU regulations

```json
{
  "tool": "legal_list_laws",
  "arguments": {
    "source_type": "eurlex",
    "limit": 100
  }
}
```

### Search for "data"

```json
{
  "tool": "legal_list_laws",
  "arguments": {
    "search": "data"
  }
}
```

Returns GDPR, BDSG, TTDSG and friends.

## Response

```json
{
  "count": 50,
  "total": 11247,
  "has_more": true,
  "next_offset": 50,
  "laws": [
    {
      "abbreviation": "BGB",
      "title": "Bürgerliches Gesetzbuch",
      "source_type": "gii",
      "version_date": "2024-10-01"
    }
  ]
}
```

## Tips

**`offset` for pagination.** For large result sets, pass `next_offset` to the next call — `has_more` indicates more pages.

**Resource alternative.** `legal://eu_celex_registry` provides curated EU acts with CELEX IDs as a static resource (no quota cost).
