---
title: legal_find_citing_decisions — Bundesgerichtsentscheidungen zu einer Norm
description: >-
  Reverse-Lookup: Welche Bundesgerichtsentscheidungen zitieren eine bestimmte
  Norm? Liefert Auslegungspraxis zu einer Vorschrift.
keywords:
  - legal_find_citing_decisions
  - BGH Urteile zu Paragraf
  - Rechtsprechung Reverse-Lookup
  - Auslegungspraxis
---

# `legal_find_citing_decisions`

**Reverse-Lookup**: Welche Bundesgerichtsentscheidungen zitieren eine konkrete Norm? Beantwortet die zentrale juristische Frage „Wie hat der BGH § 280 BGB ausgelegt?" — die `legal_search` allein nicht direkt beantwortet, weil sie ranking-, nicht zitierungs-orientiert sucht.

## Wann nutzen?

- Auslegungspraxis zu einer Norm einsehen
- Aktuelle Rechtsprechung zu einer Compliance-Frage finden
- Prüfen, ob eine Norm überhaupt jemals höchstrichterlich behandelt wurde

## Parameter

| Parameter | Typ | Default | Beschreibung |
| --- | --- | --- | --- |
| `cited_norm` | string | — | Zitat der Norm (z. B. `§ 823 BGB`, `Art. 6 DSGVO`) |
| `limit` | int | 10 | Maximalzahl der Treffer (1–100) |

## Beispiel

```json
{
  "tool": "legal_find_citing_decisions",
  "arguments": {
    "cited_norm": "§ 280 BGB",
    "limit": 5
  }
}
```

## Antwort

```json
{
  "count": 5,
  "decisions": [
    {
      "court": "BGH",
      "case_number": "VI ZR 175/22",
      "decision_date": "2023-05-15",
      "title": "Schadensersatzanspruch wegen Verletzung des allgemeinen Persönlichkeitsrechts",
      "snippet": "Die Pflichtverletzung im Sinne des § 280 Abs. 1 BGB …",
      "cited_norms": ["§ 280 BGB", "§ 823 BGB", "Art. 2 GG"]
    }
  ]
}
```

## Tipps

**Kombiniere mit `legal_get_context`.** Erst die Norm + Kontext lesen (über `legal_search` + `legal_get_context`), dann die zitierende Rechtsprechung holen — das LLM kann so eine vollständige juristische Auswertung erstellen.
