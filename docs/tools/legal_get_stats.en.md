---
title: legal_get_stats — index and database statistics
description: >-
  Returns count of indexed laws, norms and federal court decisions plus the
  last update timestamp. Useful for bots that want to communicate their data state.
keywords:
  - legal_get_stats
  - Lawbster statistics
  - law data state
  - index coverage
---

# `legal_get_stats`

**Returns index and database statistics** — number of indexed laws, norms, federal court decisions and last update timestamp.

## When to use

- Bots that want to be transparent about their data state ("Lawbster 2026-04-29, X laws")
- Coverage reports for compliance audits
- Health checks in monitoring pipelines

## Parameters

None — the stats endpoint takes no arguments.

## Response (example)

```json
{
  "stats": {
    "law_count": 11247,
    "norm_count": 6234891,
    "decision_count": 142883,
    "last_ingest_run": "2026-04-29T01:32:14Z",
    "by_jurisdiction": {
      "de": 9874,
      "eu": 1186
    },
    "by_source_type": {
      "gii": 9874,
      "eurlex": 1186,
      "rechtsprechung": 142883
    }
  }
}
```

## Tips

**Cache it in the bot.** Data state changes only once per night — a bot can cache the stats value for 24 h instead of refetching before every render.
