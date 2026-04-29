---
title: MCP resources — legal framework map, filters, CELEX registry, norm templates
description: >-
  Lawbster ships three static and three dynamic MCP resources for better
  bot orientation — from the domain-to-law map to single-norm URIs.
keywords:
  - MCP resources
  - legal resource templates
  - legal framework resource
  - CELEX registry MCP
---

# MCP resources

Beyond the eight tools, Lawbster exposes **MCP resources**. Resources are URI-addressable content (`legal://…`) that clients can use as context sources — like file attachments, but server-curated.

Two categories:

| Category | URIs | Quota |
| --- | --- | --- |
| **Static (public)** | `legal://rechtsrahmen`, `legal://filter_values`, `legal://eu_celex_registry` | Free, no quota cost |
| **Dynamic (templates)** | `legal://norm/{norm_id}`, `legal://law/{source_type}/{abbreviation}`, `legal://eu/celex/{celex}` | Counts toward per-seat quota like a tool call |

---

## Static resources

### `legal://rechtsrahmen`

**Domain → relevant laws.** A curated mapping that helps LLMs identify the right legal framework for a question.

Examples:

- **Data protection**: GDPR, BDSG, TTDSG, AI Act (processing aspects)
- **Insurance law**: VVG (special statute), BGB (subsidiary) — *not* just BGB
- **Tax law**: AO (procedural), EStG / KStG / UStG (substantive) — *not* BGB

The resource also flags known confusion clusters ("VVG vs BGB", "AO vs EStG"), so the LLM doesn't fall back to general law when a specialised statute applies.

### `legal://filter_values`

**Valid values for filters** in `legal_search`, `legal_list_laws`, `legal_find_citing_decisions`. A bot that knows all valid values upfront avoids `INVALID_FILTER` errors.

### `legal://eu_celex_registry`

**Curated CELEX identifiers** for major EU acts (GDPR, AI Act, MiCA, NIS2, …). Mapping `name → CELEX ID → EUR-Lex URI`. Valuable because EUR-Lex's own search is finicky and CELEX IDs are often cited directly.

---

## Dynamic resource templates

### `legal://norm/{norm_id}`

**Full text of a single norm** by stable norm ID. Same output as `legal_lookup`, but resource-addressable — some MCP clients (Copilot Studio, Claude.ai) integrate resources better than tool outputs.

### `legal://law/{source_type}/{abbreviation}`

**Table of contents of a law** as a resource. Same output as `legal_get_toc`. Example: `legal://law/gii/BGB`.

### `legal://eu/celex/{celex}`

**EU act by CELEX ID** with TOC and direct article links. Example: `legal://eu/celex/32016R0679` (GDPR).

---

## When resources vs. tools?

| Use case | Recommendation |
| --- | --- |
| One-off lookups in a chat session | **Tools** (`legal_lookup`, `legal_get_toc`) |
| Reusable references the user "attaches" | **Resources** (templates) |
| Bot orientation ("what can Lawbster do?") | **Static resources** (`legal://rechtsrahmen`) |
| Coverage stats in a header | **Tool** (`legal_get_stats`) |

Rule of thumb: static resources are **always** free and a good default once the client supports them. Dynamic resources cost the same as tools — use whichever your client integrates best.
