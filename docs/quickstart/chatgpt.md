---
title: ChatGPT & Claude.ai mit Lawbster verbinden — ohne Code
description: >-
  ChatGPT (Pro/Team/Enterprise) und Claude.ai (Web) per OAuth-Connector
  mit Lawbster verbinden. Verifizierte deutsche und EU-Rechtstexte direkt
  in der Browser-KI, ohne Code, ohne Klartext-Token.
keywords:
  - ChatGPT Connector deutsches Recht
  - Claude.ai Custom Connector
  - ChatGPT MCP OAuth
  - ChatGPT BGB
  - Claude.ai EU Recht
---

# ChatGPT & Claude.ai mit Lawbster verbinden

Browser-Clients wie **ChatGPT** und **Claude.ai** unterstützen MCP-Server nativ als „Custom Connectors" mit OAuth — kein Code, kein Klartext-Token, alles im Browser.

## Voraussetzungen

- **ChatGPT Pro / Team / Enterprise** *oder* **Claude.ai Pro / Max / Team / Enterprise**
- Lawbster-Account → [14 Tage kostenlos](https://lawbster.planitprima.com/pricing)
- Eingeloggt bei Lawbster im selben Browser (für den OAuth-Sign-in-Klick)

!!! info "Warum OAuth statt API-Key?"
    Browser-Clients sollen keine Klartext-Tokens speichern. Der OAuth-Flow holt sich ein kurzlebiges JWT, das automatisch erneuert wird. Sicherer und komfortabler. Kein API-Key-Handling nötig.

## ChatGPT (Pro / Team / Enterprise)

1. **Settings** → **Connectors** → **Add custom connector**
2. **Name:** `Lawbster`
3. **MCP Server URL:** `https://lawbster.planitprima.com/mcp`
4. **Authentication:** *OAuth*
5. *Save* → ein Browser-Tab öffnet sich → bei Lawbster anmelden → **Allow**

Fertig. Im neuen Chat erscheint Lawbster als Tool-Quelle. Im **Tools**-Dropdown auswählen — und ChatGPT nutzt `legal_search`, `legal_lookup` & Co. wann immer es Sinn ergibt.

## Claude.ai (Pro / Max / Team / Enterprise)

1. **Settings** → **Connectors** → **Add custom**
2. **Name:** `Lawbster`
3. **Remote MCP server URL:** `https://lawbster.planitprima.com/mcp`
4. **Sign in** → bei Lawbster anmelden → **Allow**

Im Chat: **Tools-Icon** → **Lawbster** aktivieren. Optional: **Resources** in Claude.ai unterstützt — `legal://rechtsrahmen` und Co. erscheinen als attachable references.

## Test

Frag ChatGPT oder Claude:

> *Welche Voraussetzungen stellt Art. 6 DSGVO an die Verarbeitung personenbezogener Daten? Bitte mit Norm-Zitaten.*

Der Assistent ruft `legal_lookup` mit `Art. 6 DSGVO` auf, liefert den Volltext mit allen Absätzen, ggf. ergänzt durch `legal_get_context` für Art. 5 und Art. 7.

## Was passiert bei OAuth?

Der Client wird durch einen Standard-OAuth-2.1-Authorization-Code-Flow mit dem Identity-Provider von Lawbster verbunden, prüft deine Anmeldung und holt ein kurzlebiges JWT-Access-Token (plus Refresh-Token). Das Token wandert verschlüsselt in den Connector-Storage und wird automatisch erneuert. Den Klartext bekommt niemand zu sehen.

Das JWT wird vor jedem `tools/call` an Lawbster geschickt, dort gegen den Public-Key-Satz des Identity-Providers validiert und gegen das Pro-Seat-Quota gezählt.

## Seats und OAuth

Jedes OAuth-Subject (= dein Login bei Lawbster) zählt als **eigener Seat** — analog zum API-Key. Wenn du Lawbster sowohl in ChatGPT als auch in Claude.ai mit derselben Lawbster-Identität verbindest, ist das **ein** Seat (selbe `subject_id` im Quota-Counter).

## Troubleshooting

??? question "Connector zeigt „Connection failed"
    OAuth-Flow nicht abgeschlossen — neu anmelden. Manchmal hilft es, im Browser bei Lawbster aus- und wieder einzuloggen.

??? question "Tools werden nicht gerufen"
    In ChatGPT: **Tools**-Dropdown öffnen, **Lawbster** aktivieren. ChatGPT ruft Tools nur, wenn sie explizit für die Session aktiviert sind (das ist seit November 2025 das Default-Verhalten von Custom Connectors).

??? question "401 nach längerer Zeit"
    Refresh-Token abgelaufen. Sign-in-Flow erneut durchlaufen.

---

**Nächste Schritte:** [Tool-Referenz](../tools/index.md) · [Resources](../resources.md) · [FAQ](../faq.md)
