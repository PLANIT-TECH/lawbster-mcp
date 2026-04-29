---
title: Connect ChatGPT & Claude.ai to Lawbster — no code
description: >-
  Connect ChatGPT (Pro/Team/Enterprise) and Claude.ai (web) to Lawbster via
  OAuth — verified German and EU legal texts in browser AI, no code, no
  plain-text token.
keywords:
  - ChatGPT connector German law
  - Claude.ai custom connector
  - ChatGPT MCP OAuth
  - ChatGPT BGB
  - Claude.ai EU law
---

# Connect ChatGPT & Claude.ai to Lawbster

Browser clients like **ChatGPT** and **Claude.ai** support MCP servers as "custom connectors" with OAuth out of the box — no code, no plain-text token, everything in the browser.

## Prerequisites

- **ChatGPT Pro / Team / Enterprise** *or* **Claude.ai Pro / Max / Team / Enterprise**
- A Lawbster account → [14 days free](https://lawbster.planitprima.com/pricing)
- Logged into Lawbster in the same browser (for the OAuth sign-in click)

!!! info "Why OAuth instead of an API key?"
    Browser clients shouldn't store plain-text tokens. The OAuth flow obtains a short-lived JWT that's auto-refreshed. Safer and more convenient — no API-key handling.

## ChatGPT (Pro / Team / Enterprise)

1. **Settings** → **Connectors** → **Add custom connector**
2. **Name:** `Lawbster`
3. **MCP Server URL:** `https://lawbster.planitprima.com/mcp`
4. **Authentication:** *OAuth*
5. *Save* → a browser tab opens → sign in to Lawbster → **Allow**

Done. Lawbster shows up as a tool source in any new chat. Toggle it on in the **Tools** dropdown — ChatGPT now calls `legal_search`, `legal_lookup` etc. whenever they fit.

## Claude.ai (Pro / Max / Team / Enterprise)

1. **Settings** → **Connectors** → **Add custom**
2. **Name:** `Lawbster`
3. **Remote MCP server URL:** `https://lawbster.planitprima.com/mcp`
4. **Sign in** → sign in to Lawbster → **Allow**

In any chat: **tools icon** → enable **Lawbster**. Bonus: Claude.ai supports **resources** — `legal://rechtsrahmen` and friends show up as attachable references.

## Test

Ask ChatGPT or Claude:

> *What does Art. 6 GDPR require for processing personal data? Please cite the provisions.*

The assistant calls `legal_lookup` with `Art. 6 GDPR`, returns the full text with all paragraphs, possibly enriched with `legal_get_context` for Art. 5 and Art. 7.

## What happens during OAuth?

The client runs a standard OAuth 2.1 authorization-code flow against Lawbster's identity provider, verifies your login and obtains a short-lived JWT access token (plus refresh token). The token is stored encrypted in the connector store and refreshed automatically — nobody sees the plain text.

Before each `tools/call`, the JWT is sent to Lawbster, validated against the identity provider's public key set, and counted against the per-seat quota.

## Seats and OAuth

Each OAuth subject (= your Lawbster login) counts as a **separate seat** — same as an API key. If you connect Lawbster in both ChatGPT and Claude.ai with the same Lawbster identity, that's **one** seat (same `subject_id` in the quota counter).

## Troubleshooting

??? question "Connector shows 'Connection failed'"
    OAuth flow incomplete — sign in again. Sometimes it helps to log out of Lawbster in the browser and back in.

??? question "Tools aren't being called"
    In ChatGPT: open the **Tools** dropdown, enable **Lawbster**. ChatGPT only calls tools that are explicitly enabled for the session (default behaviour for custom connectors since November 2025).

??? question "401 after a while"
    Refresh token expired. Run the sign-in flow again.

---

**Next steps:** [Tool reference](../tools/index.md) · [Resources](../resources.md) · [FAQ](../faq.md)
