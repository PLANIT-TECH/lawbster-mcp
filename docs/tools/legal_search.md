---
title: legal_search — Hybrid-Suche über deutsches & EU-Recht
description: >-
  Lawbster-Suche über deutsches Bundesrecht, EU-Recht und Bundesgerichtsentscheidungen.
  Mit Filtern für source_type, law_abbreviation, court, decision_type und
  Datumsbereich.
keywords:
  - legal_search
  - juristische Suche
  - BGB API
  - DSGVO API Suche
  - EU-Recht Suche
---

# `legal_search`

**Hybrid-Suche** über alle Quellen — deutsches Bundesrecht, EU-Recht und Bundesgerichtsentscheidungen.

## Wann nutzen?

- Thematische Recherche („Welche Normen regeln Schmerzensgeld bei Persönlichkeitsverletzung?")
- Wenn die exakte Fundstelle unbekannt ist
- Als erster Schritt vor [`legal_lookup`](legal_lookup.md), um die richtige Norm zu finden

Wenn du **bereits ein Zitat hast** (z. B. „§ 823 BGB"), nutze direkt [`legal_lookup`](legal_lookup.md) — schneller, präziser, billiger.

→ [Wie Lawbster sucht](../search-pipeline.md)

## Parameter

| Parameter | Typ | Default | Beschreibung |
| --- | --- | --- | --- |
| `query` | string | — | Natürlichsprachliche Suchanfrage |
| `top_k` | int | 5 | Anzahl Treffer |
| `source_type` | enum | — | `gii`, `eurlex`, `eurlex_caselaw`, `rechtsprechung` |
| `law_abbreviation` | string | — | Abkürzung des Gesetzes (z. B. `bgb`, `dsgvo`) |
| `chapter` | string | — | Kapitel/Abschnitt innerhalb eines Gesetzes (selten nötig — kann Recall reduzieren) |
| `court` | enum | — | `BGH`, `BVerfG`, `BVerwG`, `BFH`, `BAG`, `BSG`, `BPatG` |
| `decision_type` | enum | — | `Urteil` oder `Beschluss` |
| `date_from` | ISO date | — | Untergrenze (`YYYY-MM-DD`) |
| `date_to` | ISO date | — | Obergrenze |

Alle Filter sind **AND**-verknüpft.

## Beispiele

### Thematisch über alle Quellen

```json
{
  "tool": "legal_search",
  "arguments": {
    "query": "Schmerzensgeld bei Persönlichkeitsverletzung",
    "top_k": 5
  }
}
```

Liefert wahrscheinlich §§ 823, 253 BGB plus einschlägige BGH-Entscheidungen — gemischter Treffer-Pool, gerankt nach Relevanz, nicht nach Quelltyp.

### Nur EU-Recht zur DSGVO-Drittlandübermittlung

```json
{
  "tool": "legal_search",
  "arguments": {
    "query": "Übermittlung personenbezogener Daten in Drittländer",
    "source_type": "eurlex",
    "top_k": 10
  }
}
```

### Nur BGH-Urteile zu § 280 BGB seit 2022

```json
{
  "tool": "legal_search",
  "arguments": {
    "query": "Schadensersatz Pflichtverletzung 280 BGB",
    "source_type": "rechtsprechung",
    "court": "BGH",
    "decision_type": "Urteil",
    "date_from": "2022-01-01",
    "top_k": 10
  }
}
```

## Antwort

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
      "hierarchy": "Buch 2 — Recht der Schuldverhältnisse · Abschnitt 8 · Titel 27 — Unerlaubte Handlungen"
    }
  ]
}
```

`norm_id` ist stabil und kann direkt an [`legal_get_context`](legal_get_context.md) übergeben werden. Für [`legal_lookup`](legal_lookup.md) und [`legal_find_citing_decisions`](legal_find_citing_decisions.md) wird stattdessen das Zitat aus `citation` verwendet.

## Tipps

**Natürliche Sprache schlägt Keyword-Listen.** Schreib Sätze, keine Schlagwortketten. „Welche Pflichten hat ein Verkäufer bei Mängeln?" liefert bessere Treffer als „Mangelhaftung Verkäufer".

**Nutze umgangssprachliche Synonyme.** Lawbster kennt typische Confusions (`Cookie` → `Einwilligung Speicherung Informationen Endeinrichtung`, `Kündigung` → `Beendigung Arbeitsverhältnis`).

**Filter zuerst.** Wenn du nur EU-Recht brauchst, setz `source_type=eurlex` — sauberere Treffer, schnellere Antwort.
