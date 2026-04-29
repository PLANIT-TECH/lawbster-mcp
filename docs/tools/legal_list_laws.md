---
title: legal_list_laws — Verfügbare Gesetze auflisten
description: >-
  Listet alle indizierten Gesetze mit Abkürzung, Titel, Quelle, Stand.
  Filterbar nach source_type und Suchbegriff.
keywords:
  - legal_list_laws
  - verfügbare Gesetze
  - Gesetze Übersicht API
  - Lawbster Coverage
---

# `legal_list_laws`

**Listet alle indizierten Gesetze.** Discovery-Tool für die Frage „Was ist überhaupt drin?" — z. B. wenn das LLM unsicher ist, ob die zitierte Spezialnorm Teil des Lawbster-Index ist.

## Wann nutzen?

- Vor einem `legal_lookup`, wenn die Abkürzung unsicher ist
- Beim Onboarding eines Bots, um den verfügbaren Korpus zu kennen

## Parameter

| Parameter | Typ | Default | Beschreibung |
| --- | --- | --- | --- |
| `source_type` | enum | — | `gii`, `eurlex`, `eurlex_caselaw`, `rechtsprechung` |
| `search` | string | — | Case-insensitive Suche über Abkürzung und Titel (z. B. `bgb`, `datenschutz`) |
| `limit` | int | 50 | Maximalzahl Treffer pro Seite (1–500) |
| `offset` | int | 0 | Pagination-Offset |

!!! tip
    Mindestens `source_type` oder `search` setzen — der ungefilterte Abruf liefert tausende Einträge und ist für Tool-Use-Loops zu groß.

## Beispiele

### Alle EU-Verordnungen

```json
{
  "tool": "legal_list_laws",
  "arguments": {
    "source_type": "eurlex",
    "limit": 100
  }
}
```

### Suche nach „Daten"

```json
{
  "tool": "legal_list_laws",
  "arguments": {
    "search": "Daten"
  }
}
```

Liefert DSGVO, BDSG, TTDSG und weitere.

## Antwort

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

## Tipps

**`offset` für Pagination.** Bei großen Treffermengen den `next_offset`-Wert übernehmen — `has_more` zeigt, ob noch Seiten kommen.

**Resource-Alternative.** `legal://eu_celex_registry` liefert kuratierte EU-Rechtsakte mit CELEX-IDs als statische Resource (kein Quota-Verbrauch).
