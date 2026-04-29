---
title: FAQ — Frequently asked questions about Lawbster
description: >-
  Answers to the most common questions about Lawbster: what is MCP, what
  data is available, what does it cost, is it GDPR-compliant, do my
  colleagues need their own account?
keywords:
  - Lawbster FAQ
  - MCP FAQ
  - what is MCP
  - Lawbster privacy
  - Lawbster cost
---

# FAQ

## General

??? question "Which legal texts are available?"
    Lawbster indexes German federal law (BGB, StGB, HGB, AO, EStG, KSchG, AGG, …), all EU law (GDPR, AI Act, MiCA, NIS2, …) and the decisions of the federal courts (BGH, BVerfG, BAG, BSG, BPatG, BFH). Daily updates from official sources.

    → [Full coverage](data-sources.md)

??? question "What is MCP?"
    **Model Context Protocol** — an open protocol giving AI assistants standardised access to external data sources and tools. Originally developed by Anthropic, now broadly supported: Claude Desktop, Claude.ai, ChatGPT, Cursor, Copilot Studio, plus open SDKs in Python and TypeScript.

    Lawbster is an **MCP server** for law. You don't need to implement MCP yourself — if your client supports MCP, it can connect to Lawbster in two minutes.

??? question "How current is the data?"
    Daily updates from official sources. A change from two days ago is in the index today. **No training cutoff** like with raw LLM answers.

??? question "Does Lawbster replace legal advice?"
    No. Lawbster delivers verified legal information — not legal advice in the meaning of the German RDG. For specific legal advice, consult a qualified lawyer.

??? question "Why not just ask ChatGPT?"
    ChatGPT (and any LLM) has a training cutoff, doesn't know every special-law provision, and routinely hallucinates on legal questions — paragraphs that don't exist, wrong norm numbers, claims without sources. Lawbster fixes exactly that: ChatGPT keeps answering in its usual style, but with verified legal context.

## Setup & usage

??? question "Which clients are supported?"
    Anything that speaks MCP. Documented walk-throughs: **Claude Desktop**, **ChatGPT** (Pro/Team/Enterprise), **Claude.ai** (Pro/Max/Team), **Cursor**, **Copilot Studio**. Custom apps via the official MCP SDKs.

    → [Quickstart guides](quickstart/index.md)

??? question "Do my colleagues need their own account?"
    No, just their own **seat**. Per seat, you pay either for one person or one standalone API key. Multiple colleagues can work under one Lawbster organisation — each with their own login, each as a separate seat.

??? question "Do ChatGPT, Claude or Copilot need a separate plan?"
    No. You need your normal subscription there (e.g. ChatGPT Pro). Lawbster is a **custom connector** source you add. Lawbster's quota is independent of the LLM provider.

??? question "What counts as a seat?"
    One person or one standalone API key. If an API key belongs to a person, it counts toward that person's seat — not an extra one. Server-to-server API keys without a person attached are seats of their own.

??? question "How does the 14-day free trial work?"
    Sign up in the portal, try Lawbster without a credit card — no automatic conversion to a paid plan. After 14 days you actively choose to subscribe.

??? question "Can I cancel at any time?"
    Yes, any time. Cancellation takes effect at the end of the current billing period — no minimum term, no commitment.

## Technology & quality

??? question "How well does the search work?"
    MRR@10 = 0.676 on the public GerLeRB benchmark. In practice: the right norm is usually in the top two or three hits for natural-language questions; 98.4 % accuracy on direct citation lookups.

    → [Benchmarks](benchmarks.md)

??? question "Does Lawbster hallucinate?"
    No. Lawbster only returns what's in the index. If no matching norm exists, the tool says so honestly — the bot can tell the user instead of inventing something.

??? question "Which languages are supported?"
    Index content is in German (German federal law, German version of EU law, German decisions). Queries also work in English.

??? question "Is there a rate limit?"
    Fair use: 60 requests per minute per seat. You won't hit this in normal use. For automated pipelines that exceed it: add a second seat.

## Compliance & security

??? question "Is Lawbster GDPR-compliant?"
    Yes. Hosting exclusively in Germany, data processing agreement (EU standard contractual clauses under Art. 28 GDPR) is part of the contract — it applies in case personal data is processed. In normal operation, no personal data flows to Lawbster.

    → [Full compliance overview](compliance.md)

??? question "Where is data stored?"
    Exclusively on servers in Germany (Hetzner). Backups don't leave the EU. The only third-country component: Stripe for payment processing — under the EU-US Data Privacy Framework (Art. 45 GDPR).

??? question "Are my queries stored?"
    No. Tool-call payloads are not persisted. Per request, only telemetry metadata (timestamp, tool name, latency, status, quota hash) is kept for 30 days, then deleted. Lawbster's index content is public (statutes, decisions) — no personal data in the response.

??? question "Can I run Lawbster on-premise?"
    Not in the standard plan today. On-premise and single-tenant deployments are possible for enterprise customers — contact: `support@planitprima.com`.

??? question "Is this § 203 StGB-compliant for German law firms?"
    Lawbster is built so that no plain-text client confidence has to reach the Lawbster server. The LLM provider (Claude, ChatGPT) is the interface to the client conversation — Lawbster only receives tool-call arguments, typically a decontextualised legal question. For case-by-case assessment, please coordinate with your bar association.

## Contracts & pricing

??? question "What does Lawbster cost?"
    €19 per seat per month. Full coverage, unlimited queries per seat (fair use 60/min), priority email support. 14-day free trial.

    → [Pricing](pricing.md)

??? question "Is there a custom plan for many seats?"
    Above 50 seats we're happy to discuss volume discounts and custom contract terms — `support@planitprima.com`.

??? question "Do I get a VAT-compliant invoice?"
    Yes. Stripe Tax determines the correct VAT automatically: 19 % for German customers, 0 % reverse charge for EU B2B with VAT ID, 0 % export outside the EU.

---

**Question not answered?** → `support@planitprima.com`
