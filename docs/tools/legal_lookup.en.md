---
title: legal_lookup — full text of a single norm by citation
description: >-
  Retrieve a single norm directly by citation (§ 823 BGB, Art. 6 GDPR,
  C-311/18). Faster, more precise and cheaper than legal_search when the
  citation is known.
keywords:
  - legal_lookup
  - § 823 BGB API
  - Art. 6 GDPR API
  - citation lookup law
  - paragraph full text
---

# `legal_lookup`

**Full text of a single norm by citation.** Direct ID-based lookup with no embedding/reranking — faster and more precise than [`legal_search`](legal_search.md) when the citation is known.

## When to use

- The citation is already mentioned in the prompt: "Explain § 823 BGB"
- Pulling the full-text detail from a `legal_search` hit
- Resolving a citation returned by another tool (e.g. `legal_find_citing_decisions`)

## Accepted citation formats

Lawbster's citation parser accepts the forms common in German and EU legal practice:

| Format | Example |
| --- | --- |
| German paragraph | `§ 823 BGB`, `§ 1 Abs. 1 GG`, `§ 280 Abs. 1 Satz 1 BGB` |
| EU article | `Art. 6 GDPR`, `Art. 6 (1) (a) GDPR`, `Art. 5 (1) EU 2024/1689` |
| CJEU case | `C-311/18`, `T-451/20` |
| German court file numbers | `BGH VI ZR 175/22`, `BVerfG 1 BvR 16/13` |

## Parameters

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `citation` | string | — | Citation in any of the formats above |

`citation` is the **only** input — everything else is inferred by the parser.

## Examples

### Classic BGB lookup

```json
{
  "tool": "legal_lookup",
  "arguments": { "citation": "§ 823 BGB" }
}
```

### Specific paragraph and sentence

```json
{
  "tool": "legal_lookup",
  "arguments": { "citation": "§ 280 Abs. 1 Satz 1 BGB" }
}
```

Returns only the cited sentence with hierarchy path — perfect for precise quoting in an LLM output.

### EU article with letter

```json
{
  "tool": "legal_lookup",
  "arguments": { "citation": "Art. 6 (1) (a) GDPR" }
}
```

### CJEU decision

```json
{
  "tool": "legal_lookup",
  "arguments": { "citation": "C-311/18" }
}
```

Schrems II. Returns the full decision with paragraph numbers and operative part.

## Response

```json
{
  "norm": {
    "norm_id": 123456,
    "citation": "§ 823 BGB",
    "title": "Schadensersatzpflicht",
    "content": "(1) Wer vorsätzlich oder fahrlässig das Leben, den Körper, …",
    "law": {
      "abbreviation": "BGB",
      "title": "Bürgerliches Gesetzbuch",
      "jurisdiction": "de",
      "version_date": "2024-10-01",
      "is_current": true
    },
    "hierarchy": {
      "buch": "Book 2 — Law of Obligations",
      "abschnitt": "Section 8",
      "titel": "Title 27 — Torts"
    },
    "source_url": "https://...official-source.../...",
    "last_changed": "2002-01-02"
  },
  "hint": "Use legal_get_context to retrieve neighbouring norms (§§ 821–826)."
}
```

## Errors

| Error | Meaning | Action |
| --- | --- | --- |
| `INVALID_CITATION` | Citation can't be parsed | Check format — see accepted formats above |
| `NORM_NOT_FOUND` | Citation parses but not in index | Typo? Try `legal_search` for an alternative phrasing |
| `LAW_NOT_FOUND` | Unknown law | Call `legal_list_laws` to find the correct abbreviation |

## Tips

**Plain text beats special characters.** `§ 823 BGB`, `Paragraf 823 BGB` and `823 BGB` all work — the parser is tolerant.

**Multiple lookups: use `legal_lookup_batch`.** When the LLM needs 5+ norms at once, the batch endpoint is much more efficient (1 instead of 5 tool roundtrips).

**Follow-up: `legal_get_context`.** Often useful after a lookup: pull surrounding norms for interpretive context.

**Follow-up: `legal_find_citing_decisions`.** What does BGH say about § 823? One more tool call.
