---
title: Tool-Referenz — alle acht Lawbster-MCP-Tools
description: >-
  Vollständige Referenz der acht Lawbster-Tools für deutsches und europäisches
  Recht: legal_search, legal_lookup, legal_lookup_batch, legal_get_context,
  legal_find_citing_decisions, legal_list_laws, legal_get_toc, legal_get_stats.
keywords:
  - Lawbster Tools
  - MCP Tools deutsches Recht
  - legal_search
  - legal_lookup
  - juristische API
---

# Tool-Referenz

Lawbster bietet **acht MCP-Tools** für Recherche, Lookup und Discovery — plus drei [Prompts](../prompts.md) und sechs [Resources](../resources.md).

Alle Tools sind **batch-fähig**, **async** und liefern **typisierte Result-Objekte** mit Pagination-Feldern (`count`, `total`, `offset`, `has_more`, `next_offset`, `hint`).

## Discovery vs. Detail

Eine bewusste Designentscheidung: **Discovery-Tools** liefern kompakte Antworten (~4 k Token), damit das LLM viele davon in einer Session ausführen kann. **Detail-Tools** liefern vollen Text, weil sie dann wirklich gebraucht werden.

| Kategorie | Tools | Token-Budget |
| --- | --- | --- |
| **Discovery** | `legal_search`, `legal_list_laws`, `legal_get_toc`, `legal_get_stats` | ~4 k |
| **Detail** | `legal_lookup`, `legal_lookup_batch`, `legal_get_context`, `legal_find_citing_decisions` | Voller Text |

## Übersicht

### `legal_search`
**Hybrid-Suche** über alle Quellen mit Filtern (`source_type`, `law_abbreviation`, `chapter`, `court`, `decision_type`, Datumsbereich). Semantik plus Keyword mit AI-Reranking-Schritt.

→ [Details & Beispiele](legal_search.md)

### `legal_lookup`
**Volltext einer einzelnen Norm per Zitat.** Akzeptiert `§ 823 BGB`, `Art. 6 DSGVO`, `Art. 6 Abs. 1 lit. a DSGVO`, `C-311/18` (EuGH-Verfahrensnummer), `BGH VI ZR 175/22`. Liefert die Norm in voller Länge mit allen Absätzen, Sätzen und Hierarchie-Pfad.

→ [Details & Beispiele](legal_lookup.md)

### `legal_lookup_batch`
**Bis zu 20 Lookups in einem Call.** Spart Tool-Use-Roundtrips, wenn das LLM mehrere Normen gleichzeitig braucht (z. B. „die fünf einschlägigen DSGVO-Artikel zur Drittlandübermittlung").

### `legal_get_context`
**Umgebende Normen einer Fundstelle.** Parameter: `norm_id` + Fenstergröße (vorher / nachher). Perfekt, wenn das LLM nicht nur § 823 BGB, sondern auch §§ 821–826 zur Auslegung braucht.

→ [Details & Beispiele](legal_get_context.md)

### `legal_find_citing_decisions`
**Bundesgerichtsentscheidungen, die eine konkrete Norm zitieren.** Reverse-Lookup: „Welche BGH-Urteile interpretieren § 280 BGB?" Parameter: das Zitat selbst (`cited_norm`) plus `limit`.

→ [Details & Beispiele](legal_find_citing_decisions.md)

### `legal_list_laws`
**Verfügbare Gesetze** mit Abkürzung, Titel, Quelle und Stand. Filter: `source_type` und `search` (case-insensitive über Abkürzung und Titel).

→ [Details & Beispiele](legal_list_laws.md)

### `legal_get_toc`
**Inhaltsverzeichnis eines Gesetzes** mit Norm-Schlüsseln, Titeln und Hierarchie in Dokumenten-Reihenfolge. Pagination via `offset`/`limit`.

→ [Details & Beispiele](legal_get_toc.md)

### `legal_get_stats`
**Index- und Datenbankstatistiken**: Anzahl indexierter Gesetze, Normen und Bundesgerichtsentscheidungen sowie der letzte Update-Zeitpunkt. Wichtig für Bots, die ihren Datenstand kommunizieren wollen.

→ [Details & Beispiele](legal_get_stats.md)

## Antwort-Konventionen

Alle Tools liefern ein **frozen dataclass** als JSON, mit folgenden Standardfeldern:

| Feld | Bedeutung |
| --- | --- |
| `count` | Anzahl Items in dieser Antwort |
| `total` | Gesamtanzahl (auch über Pagination hinaus) |
| `offset` | Aktuelles Offset |
| `has_more` | Boolean — gibt es weitere Seiten? |
| `next_offset` | Wert für den nächsten Call (wenn `has_more` true) |
| `hint` | Menschenlesbarer Tipp ans LLM („increase top_k for broader results") |

Plus tool-spezifische Felder (`hits`, `norm`, `decisions`, `laws`, `toc`, `stats`).

## Fehler

Lawbster liefert klar typisierte Fehler mit:

- **Ungültiges Zitat-Format** in `legal_lookup` / `legal_lookup_batch` → klare Fehlermeldung mit Hinweis auf akzeptierte Formate (`§ 823 BGB`, `Art. 6 DSGVO`).
- **Norm nicht im Index** → Tool gibt `{ "found": false, "citation": "..." }` zurück.
- **Quota erreicht** → HTTP 429 mit `Retry-After`.
- **Fair-Use-Limit (60 Anfragen/min)** → HTTP 429 kurz pausieren und neu probieren.
