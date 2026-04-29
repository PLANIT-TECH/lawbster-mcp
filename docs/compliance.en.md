---
title: Compliance & security — GDPR, hosting in Germany, auth
description: >-
  Lawbster is GDPR-compliant, hosts exclusively in Germany, ships an Art. 28
  GDPR DPA, hashes API keys, and uses Stripe under the EU-US Data Privacy
  Framework.
keywords:
  - Lawbster GDPR
  - Lawbster DPA
  - MCP server privacy
  - hosting Germany law
  - API key security
---

# Compliance & security

Lawbster is built **production-grade** as a B2B service — compliance is not "later", it's a precondition. We serve lawyers, compliance teams and in-house counsel; if we don't take GDPR seriously, no-one buys.

## Hosting & data flows

**All data is processed and stored exclusively on servers in Germany.**

- **Provider:** Hetzner Online GmbH.
- **No transfer to third countries**, with the single exception of payment processing via Stripe (see below).

## Data Processing Agreement (DPA)

**Art. 28 GDPR**: a DPA is part of the contractual relationship. Standard template available in the [contract docs](https://lawbster.planitprima.com/agb); custom DPAs on request (`support@planitprima.com`).

## Privacy details

- **No automated decision-making** affecting data subjects within the meaning of Art. 22 GDPR. Lawbster doesn't make legally binding decisions — we deliver information.
- **Logs are anonymised after 30 days.** Query plain text is deleted; only a hash remains for telemetry and quota counting. See [privacy notice](https://lawbster.planitprima.com/datenschutz).
- **Lawbster does not forward queries to LLM providers.** When a customer uses ChatGPT, queries go directly to OpenAI — Lawbster only sees tool-call arguments, not the user prompt's plain text.
- **Lawbster index content is public** (statutes, EU law, federal court decisions) — no personal data in the response.

## Authentication

Lawbster supports **two auth paths**:

| Method | Use it for |
| --- | --- |
| **API key** (`sk-legal-…`) | Server-to-server, scripts, desktop clients |
| **OAuth 2.1** | Browser clients (ChatGPT, Claude.ai), no plain-text token |

API keys are **never stored in plain text** — at creation the plain text is shown exactly once; afterwards only a hash exists. Lost keys → rotate, revoke the old one.

## Quota & rate limiting

- **Per-seat quota:** every API key and every OAuth subject has its own monthly counter.
- **Fair use:** 60 requests per minute per seat (rate throttle).
- **Soft limits:** when reached we return HTTP 429 with `Retry-After` — no hard drops.
- **Tools/call **and** resources/read** count equally. Static resources (`legal://rechtsrahmen` etc.) are quota-free.

## Payment processing — Stripe

Stripe receives **only billing data** (name, email, billing address, VAT ID; card data captured directly by Stripe Elements — Lawbster sees **no** card details).

- **Third-country transfer basis:** EU-US Data Privacy Framework (Commission adequacy decision of 10 July 2023, Art. 45 GDPR).
- **Stripe Tax** for VAT/reverse-charge automatic (DE 19 %, FR-B2B 0 % with VAT ID, US 0 %).

## Telemetry

- **Stripe webhooks** verified with signature.
- **Structured logs** local, no PII to external logging services.
- Optional error tracking without PII.

## Data residency & backup

- **Encrypted backups** on German servers.
- **Backups don't leave the EU.**

## Compliance-relevant laws we follow ourselves

| Law | What we do |
| --- | --- |
| **GDPR** | DPA, privacy notice, data-subject rights, deletion concept |
| **TTDSG** | No tracking cookies without consent; Lawbster MCP itself sets no cookies |
| **§ 203 StGB** | We're not a bound professional, but our law-firm customers are. Lawbster is built so that plain-text client confidence does **not** need to flow to our server — the LLM provider is the interface, Lawbster only sees tool-call arguments. |

## Security contact

`support@planitprima.com`
