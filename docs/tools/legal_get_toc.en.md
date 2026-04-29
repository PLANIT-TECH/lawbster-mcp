---
title: legal_get_toc — table of contents of a law
description: >-
  Returns the norm list of a statute (norm keys, titles, hierarchy) in
  document order. Useful for bots that need to orient themselves before
  reading individual norms.
keywords:
  - legal_get_toc
  - table of contents law API
  - statute structure
  - BGB table of contents
---

# `legal_get_toc`

**Returns the table of contents of a law** with norm keys (`§ 1`, `Art. 3`), titles and chapter headings in document order.

## When to use

- Before the LLM loads full text of individual norms
- When the user wants to "browse" the statute
- For structural research ("What's in BGB Book 5 — succession law?")

## Parameters

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `law_abbreviation` | string | — | Law abbreviation (e.g. `bgb`, `dsgvo`, `stgb`) |
| `source_type` | enum | — | Optional. `gii`, `eurlex`, `eurlex_caselaw`, `rechtsprechung`. Empty = auto-detect |
| `offset` | int | 0 | Pagination offset |
| `limit` | int | 100 | Max entries per page (1–500) |

## Example

```json
{
  "tool": "legal_get_toc",
  "arguments": {
    "law_abbreviation": "bgb",
    "limit": 100
  }
}
```

The response carries norm keys, titles and hierarchy per entry — the LLM can pass the returned `norm_id` directly to `legal_get_context` to read the full text of a selected norm.

## Tips

**Use pagination.** Large statutes like BGB have over 2000 entries — combine `offset` and `limit` for clean slices.

**Resource alternative.** `legal://law/{source_type}/{abbreviation}` returns the same as a resource template (counts toward quota like a tool call).
