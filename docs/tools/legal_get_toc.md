---
title: legal_get_toc — Inhaltsverzeichnis eines Gesetzes
description: >-
  Liefert die Norm-Liste eines Gesetzes (Norm-Schlüssel, Titel, Hierarchie)
  in Dokumenten-Reihenfolge. Wichtig für Bots, die sich erst orientieren müssen.
keywords:
  - legal_get_toc
  - Inhaltsverzeichnis Gesetz API
  - Gesetzesstruktur
  - BGB Inhaltsverzeichnis
---

# `legal_get_toc`

**Liefert das Inhaltsverzeichnis eines Gesetzes** mit Norm-Schlüsseln (`§ 1`, `Art. 3`), Titeln und Kapitel-Überschriften in Dokumenten-Reihenfolge.

## Wann nutzen?

- Bevor das LLM den Volltext einzelner Normen lädt
- Wenn der Anwender sich „durch das Gesetz klicken" möchte
- Für strukturelle Recherche („Was steht alles in Buch 5 BGB — Erbrecht?")

## Parameter

| Parameter | Typ | Default | Beschreibung |
| --- | --- | --- | --- |
| `law_abbreviation` | string | — | Abkürzung des Gesetzes (z. B. `bgb`, `dsgvo`, `stgb`) |
| `source_type` | enum | — | Optional. `gii`, `eurlex`, `eurlex_caselaw`, `rechtsprechung`. Leer = Auto-Detect |
| `offset` | int | 0 | Pagination-Offset |
| `limit` | int | 100 | Maximalzahl Einträge pro Seite (1–500) |

## Beispiel

```json
{
  "tool": "legal_get_toc",
  "arguments": {
    "law_abbreviation": "bgb",
    "limit": 100
  }
}
```

Antwort enthält Norm-Schlüssel, Titel und Hierarchie pro Eintrag — das LLM kann mit der zurückgegebenen `norm_id` direkt `legal_get_context` aufrufen, um den Volltext einer ausgewählten Norm zu lesen.

## Tipps

**Pagination nutzen.** Große Gesetze wie das BGB haben über 2000 Einträge — kombiniere `offset` und `limit` für saubere Slices.

**Resource-Alternative.** `legal://law/{source_type}/{abbreviation}` liefert dasselbe als Resource Template (zählt aufs Quota wie ein Tool-Call).
