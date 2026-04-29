---
title: legal_get_context — surrounding norms of a reference
description: >-
  Returns the norms before and after a reference to provide interpretive
  context in an LLM answer. Example: § 823 BGB plus §§ 821–826.
keywords:
  - legal_get_context
  - surrounding paragraphs
  - interpretive context law
  - norm context
---

# `legal_get_context`

**Returns the norms before and after a reference.** Important because law is rarely understood from a single provision — damages under § 823 BGB only make sense in the context of §§ 821–826 (tort liability).

## When to use

- After a `legal_search` for interpretive context (reuse the `norm_id` from the hit)
- When the LLM should understand a norm's position within the statute
- For cross-references ("see § 280 BGB" → pull three before, three after)

## Parameters

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `norm_id` | int | — | Stable norm ID from a previous `legal_search` hit |
| `before` | int | 2 | Number of norms before the reference (0–10) |
| `after` | int | 2 | Number of norms after the reference (0–10) |

## Example

```json
{
  "tool": "legal_get_context",
  "arguments": {
    "norm_id": 123456,
    "before": 2,
    "after": 3
  }
}
```

Returns the two norms before and three norms after the given reference, with full hierarchy and full text.

## Tips

**Skip the round-trips.** Instead of five separate `legal_lookup` calls, `legal_get_context` with `before=2, after=2` is a single call with the same output.

**Use for "see also" references.** When a statute text says "see § 826", the LLM can pull surrounding context automatically with `legal_get_context`.

**Resource alternative.** `legal://norm/{norm_id}` returns the single norm as a resource — useful when the client integrates resources better than tool outputs.
