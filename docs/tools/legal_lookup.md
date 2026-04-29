---
title: legal_lookup — Volltext einer Norm per Zitat
description: >-
  Einzelne Norm direkt per Zitat (§ 823 BGB, Art. 6 DSGVO, C-311/18)
  abrufen. Schneller, präziser und billiger als legal_search bei
  bekannter Fundstelle.
keywords:
  - legal_lookup
  - § 823 BGB API
  - Art. 6 DSGVO API
  - Zitat-Lookup Recht
  - Volltext Paragraf
---

# `legal_lookup`

**Volltext einer einzelnen Norm per Zitat.** Direkter ID-basierter Lookup ohne Embedding/Reranking — schneller und präziser als [`legal_search`](legal_search.md), wenn die Fundstelle bekannt ist.

## Wann nutzen?

- Zitat ist im Prompt bereits genannt: „Erkläre mir § 823 BGB"
- Aus einem `legal_search`-Hit das Volltext-Detail holen
- Aus einer Antwort eines anderen Tools (z. B. `legal_find_citing_decisions`) ein Zitat auflösen

## Akzeptierte Zitierformen

Lawbsters Citation-Parser akzeptiert die in deutscher und EU-Rechtspraxis üblichen Formen:

| Form | Beispiel |
| --- | --- |
| Bundes-Paragraf | `§ 823 BGB`, `§ 1 Abs. 1 GG`, `§ 280 Abs. 1 Satz 1 BGB` |
| EU-Artikel | `Art. 6 DSGVO`, `Art. 6 Abs. 1 lit. a DSGVO`, `Art. 5 Abs. 1 EU 2024/1689` |
| EuGH-Verfahren | `C-311/18`, `T-451/20` |
| Bundes-Gerichts-Aktenzeichen | `BGH VI ZR 175/22`, `BVerfG 1 BvR 16/13` |

## Parameter

| Parameter | Typ | Default | Beschreibung |
| --- | --- | --- | --- |
| `citation` | string | — | Zitat in einer der oben genannten Formen |

Der Parameter `citation` ist der **einzige** Eingabeparameter — alles andere wird vom Parser inferiert.

## Beispiele

### Klassischer BGB-Lookup

```json
{
  "tool": "legal_lookup",
  "arguments": { "citation": "§ 823 BGB" }
}
```

### Bestimmter Absatz und Satz

```json
{
  "tool": "legal_lookup",
  "arguments": { "citation": "§ 280 Abs. 1 Satz 1 BGB" }
}
```

Liefert nur den genau zitierten Satz mit Hierarchie-Pfad — perfekt für präzise Zitation in einem LLM-Output.

### EU-Artikel mit Buchstabe

```json
{
  "tool": "legal_lookup",
  "arguments": { "citation": "Art. 6 Abs. 1 lit. a DSGVO" }
}
```

### EuGH-Entscheidung

```json
{
  "tool": "legal_lookup",
  "arguments": { "citation": "C-311/18" }
}
```

Schrems II. Liefert die Entscheidung im Volltext mit Randnummern und Tenor.

## Antwort

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
      "buch": "Buch 2 — Recht der Schuldverhältnisse",
      "abschnitt": "Abschnitt 8",
      "titel": "Titel 27 — Unerlaubte Handlungen"
    },
    "source_url": "https://...amtliche-quelle.../...",
    "last_changed": "2002-01-02"
  },
  "hint": "Use legal_get_context to retrieve neighbouring norms (§§ 821–826)."
}
```

## Fehlerfälle

| Fehler | Bedeutung | Reaktion |
| --- | --- | --- |
| `INVALID_CITATION` | Zitat nicht parsbar | Format prüfen — gültige Formen siehe oben |
| `NORM_NOT_FOUND` | Zitat parsbar, aber nicht im Index | Tippfehler? Mit `legal_search` alternative Formulierung versuchen |
| `LAW_NOT_FOUND` | Gesetz unbekannt | `legal_list_laws` aufrufen, um die korrekte Abkürzung zu finden |

## Tipps

**Klartext statt Sonderzeichen.** Sowohl `§ 823 BGB` als auch `Paragraf 823 BGB` und `823 BGB` funktionieren — der Parser ist tolerant.

**Bei mehreren Lookups: `legal_lookup_batch`.** Wenn das LLM 5+ Normen gleichzeitig braucht, ist der Batch-Endpoint deutlich effizienter (1 statt 5 Tool-Roundtrips).

**Folgeaktion: `legal_get_context`.** Nach einem Lookup oft sinnvoll: die umgebenden Normen mitnehmen, um Auslegungs-Kontext zu liefern.

**Folgeaktion: `legal_find_citing_decisions`.** Was sagt der BGH zu § 823? Ein zweiter Tool-Call genügt.
