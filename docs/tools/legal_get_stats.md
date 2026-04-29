---
title: legal_get_stats — Index- und Datenbankstatistiken
description: >-
  Liefert Anzahl indexierter Gesetze, Normen und Bundesgerichtsentscheidungen
  sowie den letzten Update-Zeitpunkt. Wichtig für Bots, die ihren Datenstand nennen.
keywords:
  - legal_get_stats
  - Lawbster Statistiken
  - Datenstand Recht
  - Index-Coverage
---

# `legal_get_stats`

**Liefert Index- und Datenbankstatistiken** — Anzahl indexierter Gesetze, Normen, Bundesgerichts­entscheidungen und letzter Update-Zeitpunkt.

## Wann nutzen?

- Bots, die ihren Datenstand transparent machen wollen („Stand: Lawbster 2026-04-29, X Gesetze")
- Coverage-Reports für Compliance-Audits
- Health-Checks in Monitoring-Pipelines

## Parameter

Keine — der Stats-Endpoint nimmt keine Argumente.

## Antwort (Beispiel)

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

## Tipps

**Cache es im Bot.** Der Datenstand ändert sich nur einmal pro Nacht — ein Bot kann den Stats-Wert für 24 h cachen, statt vor jedem Antwort-Render erneut abzufragen.
