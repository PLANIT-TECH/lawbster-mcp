---
title: Tool reference — all eight Lawbster MCP tools
description: >-
  Full reference for the eight Lawbster tools for German and European law:
  legal_search, legal_lookup, legal_lookup_batch, legal_get_context,
  legal_find_citing_decisions, legal_list_laws, legal_get_toc, legal_get_stats.
keywords:
  - Lawbster tools
  - MCP tools German law
  - legal_search
  - legal_lookup
  - legal API
---

# Tool reference

Lawbster ships **eight MCP tools** for research, lookup and discovery — plus three [prompts](../prompts.md) and six [resources](../resources.md).

All tools are **batch-capable**, **async** and return **typed result objects** with pagination fields (`count`, `total`, `offset`, `has_more`, `next_offset`, `hint`).

## Discovery vs. detail

A deliberate design choice: **discovery tools** return compact responses (~4 k tokens) so the LLM can chain many of them in a session. **Detail tools** return full text — they're called when the full text is genuinely needed.

| Category | Tools | Token budget |
| --- | --- | --- |
| **Discovery** | `legal_search`, `legal_list_laws`, `legal_get_toc`, `legal_get_stats` | ~4 k |
| **Detail** | `legal_lookup`, `legal_lookup_batch`, `legal_get_context`, `legal_find_citing_decisions` | Full text |

## Overview

### `legal_search`
**Hybrid search** across all sources with filters (`source_type`, `law_abbreviation`, `chapter`, `court`, `decision_type`, date range). Semantic plus keyword with an AI reranking step.

→ [Details & examples](legal_search.md)

### `legal_lookup`
**Full text of a single norm by citation.** Accepts `§ 823 BGB`, `Art. 6 GDPR`, `Art. 6 (1) (a) GDPR`, `C-311/18` (CJEU case number), `BGH VI ZR 175/22`. Returns the norm in full, with all paragraphs, sentences and hierarchy path.

→ [Details & examples](legal_lookup.md)

### `legal_lookup_batch`
**Up to 20 lookups in one call.** Saves tool-use roundtrips when the LLM needs multiple norms at once (e.g. "the five GDPR articles relevant to third-country transfers").

### `legal_get_context`
**Surrounding norms of a reference.** Parameters: `norm_id` plus window size (before / after). Useful when the LLM wants not just § 823 BGB but also §§ 821–826 for interpretive context.

→ [Details & examples](legal_get_context.md)

### `legal_find_citing_decisions`
**Federal court decisions citing a specific norm.** Reverse lookup: "Which BGH rulings interpret § 280 BGB?" Parameters: the citation itself (`cited_norm`) plus `limit`.

→ [Details & examples](legal_find_citing_decisions.md)

### `legal_list_laws`
**Available laws** with abbreviation, title, source and currency. Filters: `source_type` and `search` (case-insensitive over abbreviation and title).

→ [Details & examples](legal_list_laws.md)

### `legal_get_toc`
**Table of contents of a law** with norm keys, titles and hierarchy in document order. Pagination via `offset`/`limit`.

→ [Details & examples](legal_get_toc.md)

### `legal_get_stats`
**Index and database statistics**: number of indexed laws, norms, federal court decisions, and last update timestamp. Useful for bots that want to communicate their data state.

→ [Details & examples](legal_get_stats.md)

## Response conventions

Every tool returns a **frozen dataclass** as JSON, with these standard fields:

| Field | Meaning |
| --- | --- |
| `count` | Items in this response |
| `total` | Total count (across pagination) |
| `offset` | Current offset |
| `has_more` | Boolean — more pages available? |
| `next_offset` | Value for the next call (when `has_more` true) |
| `hint` | Human-readable hint to the LLM ("increase top_k for broader results") |

Plus tool-specific fields (`hits`, `norm`, `decisions`, `laws`, `toc`, `stats`).

## Errors

Lawbster returns clearly typed errors with:

- **Invalid citation format** in `legal_lookup` / `legal_lookup_batch` → clear error with the accepted formats (`§ 823 BGB`, `Art. 6 GDPR`).
- **Norm not in the index** → tool returns `{ "found": false, "citation": "..." }`.
- **Quota reached** → HTTP 429 with `Retry-After`.
- **Fair-use limit (60 req/min)** → HTTP 429, brief pause and retry.
