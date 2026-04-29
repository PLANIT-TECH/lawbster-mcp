---
title: Microsoft Copilot Studio mit Lawbster verbinden
description: >-
  Lawbster als Custom MCP Connector in Copilot Studio einbinden — mit voller
  Tool- und Resource-Unterstützung. Verifiziertes deutsches und EU-Recht
  in Microsoft 365 Copilot, Teams und Power Apps.
keywords:
  - Copilot Studio MCP
  - Copilot Studio Custom Connector
  - Microsoft 365 Copilot deutsches Recht
  - Power Platform MCP
---

# Microsoft Copilot Studio mit Lawbster verbinden

**Copilot Studio** unterstützt MCP-Server als „Custom Connectors" — und im Gegensatz zu vielen anderen Clients zieht Copilot Studio **auch MCP Resources** (nicht nur Tools), was für Lawbster besonders wertvoll ist (`legal://rechtsrahmen`, `legal://eu_celex_registry` und Co.).

## Voraussetzungen

- **Microsoft Copilot Studio** mit aktivierter MCP-Vorschau
- Lawbster-Account mit OAuth-Zugang oder API-Key

## Setup-Pfad A — OAuth (empfohlen)

1. **Copilot Studio** → **Tools** → **Add a tool** → **New tool** → **Model Context Protocol**
2. **Server URL:** `https://lawbster.planitprima.com/mcp`
3. **Authentication:** *OAuth 2.0*. Die genauen Endpoints (Authorization-URL, Token-URL, Scopes) bekommst du von uns — schreib uns kurz an `support@planitprima.com`, wir tragen dabei auch die Redirect-URI deines Tenants nach.
4. *Save & Test* → bei Lawbster anmelden → **Allow**

## Setup-Pfad B — API-Key (für Server-to-Server-Bots)

1. **Tools** → **New tool** → **Model Context Protocol**
2. **Server URL:** `https://lawbster.planitprima.com/mcp`
3. **Authentication:** *Bearer*
4. **Token:** `sk-legal-…` (aus dem [Lawbster-Portal](https://lawbster.planitprima.com/))

## Resources nutzen

In Copilot Studio kannst du nach dem Anlegen des Connectors die **Resources** auswählen, die der Bot zur Verfügung haben soll:

- `legal://rechtsrahmen` — Mapping „Rechtsdomäne → einschlägige Gesetze" (z. B. „Datenschutz" → DSGVO + BDSG + TTDSG)
- `legal://filter_values` — gültige Filter für `legal_search`
- `legal://eu_celex_registry` — kuratierte CELEX → URI-Karte für EU-Rechtsakte

Für **dynamische Resources** (`legal://norm/{id}`, `legal://law/{source}/{abk}`) kann der KI-Assistent diese bei Bedarf referenzieren — sie werden gegen das Pro-Seat-Quota gezählt wie Tool-Calls.

## Anwendungsfälle in Microsoft-Umgebungen

**Compliance-Bot in Teams**: Mitarbeiter fragen den Bot nach DSGVO-Anforderungen; der Bot ruft `legal_lookup Art. 6 DSGVO` und antwortet mit Volltext + Fundstelle.

**Vertragsprüfung in Word**: Ein Plug-in zieht über Lawbster die einschlägigen BGB-Paragrafen für eine markierte Klausel und kommentiert sie direkt im Dokument.

**Power Apps für Inhouse-Counsel**: Eine Low-Code-App mit Lawbster-Connector liefert eine zitierfähige Rechtsdatenbank ohne Eigenentwicklung.

## Troubleshooting

??? question "OAuth-Flow scheitert mit Redirect-Fehler"
    Die Redirect-URI deines Copilot-Studio-Tenants muss bei Lawbsters OAuth-Provider als erlaubte URI registriert sein. Bei Bedarf eine Mail an `support@planitprima.com` senden — wir hinterlegen die URI.

??? question "Resources werden nicht angezeigt"
    Nach dem Connector-Setup einmal **Refresh** klicken. Falls Resources weiterhin fehlen: Connector löschen und neu anlegen, dabei explizit *Include resources* anhaken.

---

**Nächste Schritte:** [Tool-Referenz](../tools/index.md) · [Resources](../resources.md) · [Compliance](../compliance.md)
