---
title: Cursor mit Lawbster verbinden — deutsches Recht im Composer
description: >-
  Cursor (Pro / Business) per .cursor/mcp.json mit Lawbster verbinden, um
  Rechtsrecherche-Tools direkt im Composer zu haben.
keywords:
  - Cursor MCP einrichten
  - Cursor deutsches Recht
  - .cursor/mcp.json
  - Cursor Composer Rechtsdaten
---

# Cursor mit Lawbster verbinden

**Cursor** unterstützt MCP-Server projekt-lokal über `.cursor/mcp.json` (Repo) oder global über `~/.cursor/mcp.json` (Benutzer).

## Voraussetzungen

- **[Cursor](https://cursor.sh)** ≥ 0.42 (Pro / Business für MCP)
- API-Key (`sk-legal-…`) aus dem [Lawbster-Portal](https://lawbster.planitprima.com/)

## Setup

`.cursor/mcp.json` im Projekt-Root anlegen:

```json
{
  "mcpServers": {
    "lawbster": {
      "type": "http",
      "url": "https://lawbster.planitprima.com/mcp",
      "headers": {
        "Authorization": "Bearer sk-legal-DEIN-API-KEY"
      }
    }
  }
}
```

Cursor neu laden (Cmd/Ctrl + Shift + P → *Reload Window*). In der **Composer**-Sidebar erscheint Lawbster mit acht Tools.

!!! warning "API-Key nicht ins Repo committen"
    `.cursor/mcp.json` in `.gitignore` aufnehmen. Alternativ das Token aus einer Umgebungsvariable beziehen — wird von Cursor unterstützt:

    ```json
    {
      "mcpServers": {
        "lawbster": {
          "type": "http",
          "url": "https://lawbster.planitprima.com/mcp",
          "headers": {
            "Authorization": "Bearer ${env:LAWBSTER_TOKEN}"
          }
        }
      }
    }
    ```

## Anwendungsfälle in Cursor

**AGB-Generierung mit echten Klauseln**: Cursor schreibt einen AGB-Entwurf, Lawbster liefert die einschlägigen BGB-Paragrafen (§§ 305–310, § 309 Nr. 7) im Composer-Kontext.

**DSGVO-Compliance-Check**: Bei der Implementierung von Datenverarbeitungs-Code zieht Cursor Art. 6 / Art. 9 DSGVO und prüft, ob die jeweilige Rechtsgrundlage abgedeckt ist.

**KI-VO-Risikoklassifikation**: Beim Bauen von ML-Pipelines fragt Cursor `legal_lookup Art. 6 KI-VO` ab und kommentiert den Code mit dem entsprechenden Risiko-Tier.

## Globale vs. projekt-lokale Config

| Pfad | Wirkung |
| --- | --- |
| `.cursor/mcp.json` (im Repo) | Nur dieses Projekt — sinnvoll für Legal-Tech-Repos |
| `~/.cursor/mcp.json` | Global, alle Cursor-Sessions |

Globale Config ist für einzelne Entwickler praktisch — projekt-lokale Config ist für Teams besser, sobald `.gitignore` das Token ausschließt.

## Troubleshooting

??? question "Cursor zeigt Lawbster nicht im Composer"
    Cursor neu laden, im Composer das **MCP**-Icon prüfen. Falls Lawbster fehlt: JSON-Syntax mit `python -m json.tool < .cursor/mcp.json`.

??? question "401 Unauthorized"
    Token-Prefix `sk-legal-` korrekt? Im [Portal](https://lawbster.planitprima.com/) prüfen, ob der Key aktiv ist.

---

**Nächste Schritte:** [Tool-Referenz](../tools/index.md) · [Suchpipeline](../search-pipeline.md)
