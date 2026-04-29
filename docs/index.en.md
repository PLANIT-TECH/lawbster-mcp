---
title: Lawbster MCP — German & EU Law for AI
description: >-
  Production-grade MCP server giving Claude, ChatGPT and Copilot verified,
  citable access to German federal law, federal court decisions and EU law.
  ~11 000 laws, daily updates, hosted in Germany.
hide:
  - navigation
  - toc
keywords:
  - MCP server German law
  - MCP server EU law
  - Model Context Protocol law
  - Claude Desktop legal API
  - ChatGPT legal database
  - BGB API
  - GDPR API
  - EUR-Lex API
  - legal AI
  - legal RAG
---

# AI hallucinates on legal questions. Lawbster delivers the facts.

**Lawbster** is the MCP server for **German and European law**. It connects Claude, ChatGPT, Copilot and any other MCP-capable AI assistant directly to ~11,000 statutes, federal court decisions and the entire EU legal corpus — updated daily from official sources, every match returned with an exact reference.

Instead of relying on a language model's training data — which is outdated, incomplete and not citable — LLMs talk to Lawbster over the open **[Model Context Protocol](https://modelcontextprotocol.io)** and answer with paragraph numbers, article numbers and the date of the last amendment.

[:material-rocket-launch: Get connected in 2 minutes](quickstart/claude-desktop.md){ .md-button .md-button--primary }
[:material-tools: Tool reference](tools/index.md){ .md-button }
[:material-shield-check: Compliance](compliance.md){ .md-button }

---

## Headline benefits

<div class="grid cards" markdown>

-   :material-database-check:{ .lg .middle } **Verified legal context**

    ---

    Every match comes from an official source: gesetze-im-internet.de, EUR-Lex, Rechtsprechung-im-Internet. No hallucinations, no fabricated paragraph numbers.

-   :material-clock-fast:{ .lg .middle } **Updated daily**

    ---

    No training cutoff. Lawbster pulls from official sources nightly, parses changes and re-indexes affected provisions.

-   :material-magnify-scan:{ .lg .middle } **Hybrid search with AI reranking**

    ---

    Semantic plus keyword search, with an AI reranking step. **MRR@10 = 0.676** on [GerLeRB](benchmarks.md) — transparent public benchmark.

-   :material-link-variant:{ .lg .middle } **Every answer is citable**

    ---

    `§ 823 BGB`, `Art. 6 GDPR`, `BGH VI ZR 175/22` — exact paragraphs, correct numbers, cleanly separated between federal law, EU law and case law.

-   :material-server-security:{ .lg .middle } **Hosted in Germany**

    ---

    Hetzner servers in Germany. No data transfer to third countries. Art. 28 GDPR DPA included.

-   :material-account-multiple:{ .lg .middle } **Per-seat model, no lock-in**

    ---

    €19 / seat / month. 14-day free trial. Cancel any time. Add as many seats as you need — for people or standalone API keys.

</div>

---

## What Lawbster covers

| Source | Content | Updated |
| --- | --- | --- |
| **German federal law** | BGB, StGB, HGB, AO, EStG, GewO, AGG, KSchG, ArbZG, MiLoG, … | Daily |
| **EU law** | GDPR, AI Act, MiCA, NIS2, regulations, directives | Daily |
| **Case law** | Decisions of BGH, BVerfG, BAG, BSG, BPatG, BFH | Daily |

→ [Full data sources overview](data-sources.md)

---

## Eight tools — all batch-capable, all async

Every tool is designed for the LLM tool-use loop: compact responses on discovery tools (~4 k tokens), full text on detail tools, pagination via `count` / `total` / `offset` / `has_more` / `next_offset` / `hint`.

| Tool | Purpose |
| --- | --- |
| [`legal_search`](tools/legal_search.md) | Hybrid search across all sources with filters |
| [`legal_lookup`](tools/legal_lookup.md) | Full text of a single norm by citation |
| `legal_lookup_batch` | Up to 20 lookups in one call |
| [`legal_get_context`](tools/legal_get_context.md) | Surrounding norms of a reference |
| [`legal_find_citing_decisions`](tools/legal_find_citing_decisions.md) | Federal court decisions citing a specific norm |
| [`legal_list_laws`](tools/legal_list_laws.md) | Available laws with abbreviation and currency |
| [`legal_get_toc`](tools/legal_get_toc.md) | Table of contents of a law |
| [`legal_get_stats`](tools/legal_get_stats.md) | Index and database statistics |

Plus static [resources](resources.md) (`legal://rechtsrahmen`, `legal://filter_values`, `legal://eu_celex_registry`), dynamic resource templates (`legal://norm/{id}`, `legal://law/{source}/{abbr}`, `legal://eu/celex/{id}`) and three [prompts](prompts.md) (`legal_research`, `citation_resolve`, `compare_de_eu`).

---

## Quickstart — most common clients

<div class="grid cards" markdown>

-   :material-robot:{ .lg .middle } **Claude Desktop**

    ---

    Add an `mcpServers` entry to `claude_desktop_config.json` — done.

    [:octicons-arrow-right-24: Walk-through](quickstart/claude-desktop.md)

-   :simple-openai:{ .lg .middle } **ChatGPT & Claude.ai (web)**

    ---

    OAuth flow — no code required.

    [:octicons-arrow-right-24: Walk-through](quickstart/chatgpt.md)

-   :material-cursor-default-click:{ .lg .middle } **Cursor**

    ---

    `.cursor/mcp.json` with bearer token.

    [:octicons-arrow-right-24: Walk-through](quickstart/cursor.md)

-   :material-microsoft:{ .lg .middle } **Copilot Studio**

    ---

    Custom connector with full tool & resource support.

    [:octicons-arrow-right-24: Walk-through](quickstart/copilot-studio.md)

</div>

---

## Who uses Lawbster

**Legal-tech engineers** plug Lawbster into compliance systems, document-review pipelines and custom chatbots via API key. **Law firms** connect their AI assistants directly to verified legal texts. **In-house compliance teams** use Lawbster for GDPR, AI Act and labour-law research without ChatGPT hallucinations.

> Lawbster is **not** Harvey or Noxtua — we don't replace a full-stack legal AI product. Lawbster is the **layer underneath**: the citable legal-context provider. Bring your own LLM, bring your own workflow. **Like Context7, but for law.**

---

## Trust & compliance

- **GDPR-compliant**, Art. 28 DPA included, hosting at Hetzner Online GmbH (Germany).
- **No processing of personal data** in normal operation — the index contains only public legal texts, tool-call payloads are not persisted.
- **API keys SHA-256-hashed** in the database, plain text shown only once.
- **Stripe** (payment processing) under the EU-US Data Privacy Framework.
- **Transparent benchmarks** on [GerLeRB](benchmarks.md), publicly reproducible.
- **Fair use: 60 requests/min** per seat — no throttling under normal use.

→ [Full compliance overview](compliance.md)

---

## Pricing

**One plan, simple billing.**

- €19 / seat / month
- Unlimited requests per seat (fair use 60 / min)
- Full legal corpus included
- Priority email support
- 14-day free trial — no credit card
- Cancel any time

[Start your free trial :material-arrow-right:](https://lawbster.planitprima.com/pricing){ .md-button .md-button--primary }

---

## A product by PLANIT // TECH GmbH

Made in Germany. Operated by [PLANIT // TECH GmbH](https://www.planitprima.com), specialised in privacy and legal-tech software.

[:material-web: Website](https://lawbster.planitprima.com){ .md-button }
[:material-github: GitHub](https://github.com/PLANIT-TECH/lawbster-mcp){ .md-button }
[:material-email: support@planitprima.com](mailto:support@planitprima.com){ .md-button }
