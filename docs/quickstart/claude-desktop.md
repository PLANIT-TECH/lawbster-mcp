---
title: Claude Desktop mit Lawbster verbinden — deutsches Recht in Claude
description: >-
  Schritt-für-Schritt: Claude Desktop in zwei Minuten mit Lawbster verbinden,
  damit Claude verifizierte Antworten zu BGB, DSGVO, EU-Recht und
  Bundesgerichtsentscheidungen liefert.
keywords:
  - Claude Desktop MCP einrichten
  - Claude Desktop deutsches Recht
  - Claude Desktop BGB
  - Claude Desktop DSGVO
  - claude_desktop_config.json MCP
---

# Claude Desktop mit Lawbster verbinden

In zwei Minuten gibt **Claude Desktop** verifizierte, zitierfähige Antworten zu deutschem und europäischem Recht. Setup: ein JSON-Eintrag.

## Voraussetzungen

- **[Claude Desktop](https://claude.ai/download)** installiert (macOS / Windows / Linux)
- Lawbster-Account → [14 Tage kostenlos](https://lawbster.planitprima.com/pricing) (keine Kreditkarte)
- Ein **API-Key** (`sk-legal-…`) aus dem Portal unter **[Keys](https://lawbster.planitprima.com/keys)**

!!! tip "Klartext-Token nur einmal sichtbar"
    Sobald der Key erstellt ist, erscheint der Klartext **genau einmal**. Direkt in die Config kopieren — sonst neu erzeugen.

## Schritt 1 — Config-Datei öffnen

| Plattform | Pfad |
| --- | --- |
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json` |

Falls die Datei nicht existiert: anlegen mit Inhalt `{}`.

## Schritt 2 — Lawbster-Eintrag hinzufügen

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

Falls schon andere MCP-Server konfiguriert sind, einfach den `lawbster`-Block ergänzen.

## Schritt 3 — Claude Desktop neu starten

Claude Desktop **vollständig beenden** (nicht nur Fenster schließen) und neu öffnen. Das MCP-Icon in der Eingabezeile zeigt jetzt **Lawbster** mit acht Tools.

## Schritt 4 — Testen

Frag Claude:

> *Was sind die Voraussetzungen für eine Schmerzensgeldforderung nach § 253 BGB? Bitte Quellen angeben.*

Claude ruft `legal_search` auf, findet § 253 BGB im Volltext, liefert die zitierfähige Antwort und kann auf Wunsch über `legal_find_citing_decisions` zugehörige BGH-Entscheidungen ergänzen.

## Tipps für bessere Antworten

**Aktiviere alle Lawbster-Tools** im MCP-Menü — Claude entscheidet automatisch, welches Tool wann passt. Tool-Beschreibungen sind so geschrieben, dass Claude die richtige Wahl trifft, ohne explizite Anweisungen.

**Nutze die mitgelieferten Prompts**: `/legal_research`, `/citation_resolve`, `/compare_de_eu` erscheinen als Slash-Commands. Sie zwingen Claude in einen sauberen Recherche-Workflow mit Pflicht zur Tool-Nutzung und Verbot ausgedachter Zitate.

**Stelle Folgefragen**. Lawbster liefert nicht nur Treffer, sondern Kontext: über `legal_get_context` kann Claude die umliegenden Paragrafen mitzitieren, über `legal_find_citing_decisions` die Auslegungspraxis der Bundesgerichte.

## Troubleshooting

??? question "Claude zeigt Lawbster nicht im MCP-Menü"
    1. JSON syntaktisch korrekt? `python -m json.tool < claude_desktop_config.json`
    2. Claude Desktop **vollständig beendet** (Quit, nicht nur Fenster schließen)?
    3. Token korrekt mit `sk-legal-`-Prefix und ohne führende/nachfolgende Leerzeichen?

??? question "401 Unauthorized in den Logs"
    Token im Lawbster-Portal prüfen: ist er aktiv und ist die Subscription nicht abgelaufen? Im Zweifel neu erzeugen — alte Keys können widerrufen werden.

??? question "429 Rate-Limit"
    60 Anfragen/Minute pro Seat sind die Fair-Use-Grenze. Wenn Claude in einer langen Recherche viele Tool-Calls in Serie macht, kann das auflaufen. Lösung: zweiten Seat zubuchen oder kurz Pause einlegen.

??? question "Anderer MCP-Server bricht nach dem Hinzufügen"
    JSON syntaktisch geprüft? Häufiger Fehler: fehlendes Komma zwischen mehreren Servern. Beispiel mit zwei Servern:

    ```json
    {
      "mcpServers": {
        "lawbster": {
          "type": "http",
          "url": "https://lawbster.planitprima.com/mcp",
          "headers": { "Authorization": "Bearer sk-legal-..." }
        },
        "another-server": {
          "command": "npx",
          "args": ["-y", "@some/server"]
        }
      }
    }
    ```

---

**Nächste Schritte:** [Tool-Referenz](../tools/index.md) · [Resources & Prompts](../resources.md) · [Pricing & Seats](https://lawbster.planitprima.com/pricing)
