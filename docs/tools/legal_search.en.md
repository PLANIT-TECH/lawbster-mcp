---
title: legal_search — hybrid search across German & EU law
description: >-
  Lawbster search across German federal law, EU law and federal court
  decisions. With filters for source_type, law_abbreviation, court,
  decision_type and date range.
keywords:
  - legal_search
  - legal search
  - BGB API
  - GDPR API search
  - EU law search
---

# `legal_search`

**Hybrid search** across all sources — German federal law, EU law and federal court decisions.

## When to use

- Topical research ("Which provisions cover non-pecuniary damages for personality-rights violations?")
- When the exact citation is unknown
- As a first step before [`legal_lookup`](legal_lookup.md), to find the right norm

If you **already have a citation** (e.g. "§ 823 BGB"), call [`legal_lookup`](legal_lookup.md) directly — faster, more precise, cheaper.

→ [How Lawbster searches](../search-pipeline.md)

## Parameters

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `query` | string | — | Natural-language query |
| `top_k` | int | 5 | Number of hits |
| `source_type` | enum | — | `gii`, `eurlex`, `eurlex_caselaw`, `rechtsprechung` |
| `law_abbreviation` | string | — | Law abbreviation (e.g. `bgb`, `dsgvo`) |
| `chapter` | string | — | Chapter/section within a law (rarely needed — can reduce recall) |
| `court` | enum | — | `BGH`, `BVerfG`, `BVerwG`, `BFH`, `BAG`, `BSG`, `BPatG` |
| `decision_type` | enum | — | `Urteil` or `Beschluss` |
| `date_from` | ISO date | — | Lower bound (`YYYY-MM-DD`) |
| `date_to` | ISO date | — | Upper bound |

All filters are **AND**-combined.

## Examples

### Topical, across all sources

```json
{
  "tool": "legal_search",
  "arguments": {
    "query": "non-pecuniary damages personality rights",
    "top_k": 5
  }
}
```

Likely returns §§ 823, 253 BGB plus relevant BGH decisions — mixed pool, ranked by relevance, not source type.

### EU law only — GDPR third-country transfers

```json
{
  "tool": "legal_search",
  "arguments": {
    "query": "transfers of personal data to third countries",
    "source_type": "eurlex",
    "top_k": 10
  }
}
```

### BGH judgments on § 280 BGB since 2022

```json
{
  "tool": "legal_search",
  "arguments": {
    "query": "damages breach of duty 280 BGB",
    "source_type": "rechtsprechung",
    "court": "BGH",
    "decision_type": "Urteil",
    "date_from": "2022-01-01",
    "top_k": 10
  }
}
```

## Response

```json
{
  "count": 5,
  "total": 142,
  "has_more": true,
  "hint": "Increase top_k or apply filters to narrow results.",
  "hits": [
    {
      "norm_id": 123456,
      "citation": "§ 823 BGB",
      "title": "Schadensersatzpflicht",
      "snippet": "Wer vorsätzlich oder fahrlässig …",
      "law": {
        "abbreviation": "BGB",
        "title": "Bürgerliches Gesetzbuch"
      },
      "hierarchy": "Book 2 — Law of Obligations · Section 8 · Title 27 — Torts"
    }
  ]
}
```

`norm_id` is stable and can be passed straight to [`legal_get_context`](legal_get_context.md). [`legal_lookup`](legal_lookup.md) and [`legal_find_citing_decisions`](legal_find_citing_decisions.md) take the citation string from `citation` instead.

## Tips

**Natural sentences beat keyword lists.** Write sentences, not keyword strings. "What duties does a seller have for defective goods?" works better than "seller defect liability".

**Use colloquial synonyms freely.** Lawbster handles typical confusions (`Cookie` → `consent storage information terminal device`, `notice` → `termination of employment`).

**Filter first.** If you only need EU law, set `source_type=eurlex` — cleaner hits, faster response.
