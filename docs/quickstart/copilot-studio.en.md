---
title: Connect Microsoft Copilot Studio to Lawbster
description: >-
  Add Lawbster as a custom MCP connector in Copilot Studio — with full tool
  and resource support. Verified German and EU law in Microsoft 365 Copilot,
  Teams and Power Apps.
keywords:
  - Copilot Studio MCP
  - Copilot Studio custom connector
  - Microsoft 365 Copilot German law
  - Power Platform MCP
---

# Connect Microsoft Copilot Studio to Lawbster

**Copilot Studio** supports MCP servers as "custom connectors" — and unlike many other clients, Copilot Studio also pulls **MCP resources** (not just tools), which is particularly valuable for Lawbster (`legal://rechtsrahmen`, `legal://eu_celex_registry`, etc.).

## Prerequisites

- **Microsoft Copilot Studio** with the MCP preview enabled
- A Lawbster account with OAuth access or an API key

## Setup path A — OAuth (recommended)

1. **Copilot Studio** → **Tools** → **Add a tool** → **New tool** → **Model Context Protocol**
2. **Server URL:** `https://lawbster.planitprima.com/mcp`
3. **Authentication:** *OAuth 2.0*. The exact endpoints (authorization URL, token URL, scopes) are provided by us — drop a line to `support@planitprima.com`, and we'll also register your tenant's redirect URI in the same step.
4. *Save & Test* → sign in to Lawbster → **Allow**

## Setup path B — API key (server-to-server bots)

1. **Tools** → **New tool** → **Model Context Protocol**
2. **Server URL:** `https://lawbster.planitprima.com/mcp`
3. **Authentication:** *Bearer*
4. **Token:** `sk-legal-…` (from the [Lawbster portal](https://lawbster.planitprima.com/keys))

## Using resources

After creating the connector you can pick which **resources** the bot has available:

- `legal://rechtsrahmen` — domain → relevant laws mapping (e.g. "data protection" → GDPR + BDSG + TTDSG)
- `legal://filter_values` — valid filters for `legal_search`
- `legal://eu_celex_registry` — curated CELEX → URI map for EU acts

For **dynamic resources** (`legal://norm/{id}`, `legal://law/{source}/{abbr}`) the bot references them on demand — they count against the per-seat quota like tool calls.

## Use cases in Microsoft stacks

**Compliance bot in Teams**: employees ask the bot about GDPR requirements; the bot calls `legal_lookup Art. 6 GDPR` and answers with the full text plus reference.

**Contract review in Word**: an add-in pulls relevant BGB paragraphs for a highlighted clause via Lawbster and annotates inline.

**Power Apps for in-house counsel**: a low-code app with the Lawbster connector delivers a citable legal database without bespoke development.

## Troubleshooting

??? question "OAuth flow fails with a redirect error"
    Your Copilot Studio tenant's redirect URI must be registered as an allowed URI with Lawbster's OAuth provider. Email `support@planitprima.com` and we'll add it.

??? question "Resources don't show up"
    After connector setup, click **Refresh** once. If resources still missing, delete and recreate the connector and explicitly tick *Include resources*.

---

**Next steps:** [Tool reference](../tools/index.md) · [Resources](../resources.md) · [Compliance](../compliance.md)
