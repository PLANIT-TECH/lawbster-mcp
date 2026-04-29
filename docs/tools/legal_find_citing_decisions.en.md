---
title: legal_find_citing_decisions — federal court decisions citing a norm
description: >-
  Reverse lookup: which federal court decisions cite a specific norm?
  Provides judicial interpretation of a provision.
keywords:
  - legal_find_citing_decisions
  - BGH judgments paragraph
  - case law reverse lookup
  - judicial interpretation
---

# `legal_find_citing_decisions`

**Reverse lookup**: which federal court decisions cite a specific norm? Answers the core legal question "How has BGH interpreted § 280 BGB?" — which `legal_search` alone can't, because it's ranking-based, not citation-based.

## When to use

- Reviewing judicial interpretation of a norm
- Finding case law on a compliance question
- Checking whether a norm has ever been treated by a federal court

## Parameters

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `cited_norm` | string | — | Citation of the norm (e.g. `§ 823 BGB`, `Art. 6 GDPR`) |
| `limit` | int | 10 | Maximum decisions to return (1–100) |

## Example

```json
{
  "tool": "legal_find_citing_decisions",
  "arguments": {
    "cited_norm": "§ 280 BGB",
    "limit": 5
  }
}
```

## Response

```json
{
  "count": 5,
  "decisions": [
    {
      "court": "BGH",
      "case_number": "VI ZR 175/22",
      "decision_date": "2023-05-15",
      "title": "Damages for violation of general personality rights",
      "snippet": "The breach of duty under § 280 (1) BGB …",
      "cited_norms": ["§ 280 BGB", "§ 823 BGB", "Art. 2 GG"]
    }
  ]
}
```

## Tips

**Pair with `legal_get_context`.** Read norm + context first (via `legal_search` + `legal_get_context`), then the citing case law — the LLM can then produce a full legal analysis.
