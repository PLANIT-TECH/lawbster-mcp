---
title: MCP prompts — legal_research, citation_resolve, compare_de_eu
description: >-
  Three pre-configured prompts for clean legal-research workflows. Surface
  as slash commands in Claude Desktop, Claude.ai, Copilot Studio.
keywords:
  - MCP prompts
  - legal_research prompt
  - citation_resolve
  - compare_de_eu
  - legal AI prompts
---

# MCP prompts

**Prompts** are versioned, parameterised system-prompt templates that an MCP client surfaces as **slash commands**. They force the LLM workflow into a clean path — mandatory tool use, ban on invented citations, defined answer structure.

Lawbster ships three prompts. They are **public** — no auth, no quota — because they hold no customer data and trigger no DB calls.

## `/legal_research`

**Structured research answer with footnoted citations.**

| Parameter | Values | Default |
| --- | --- | --- |
| `jurisdiction` | `DE`, `EU`, `DE+EU` | `DE+EU` |
| `depth` | `thorough`, `quick` | `thorough` |

Enforces:

- at least one `legal_search` or `legal_lookup` call before any substantive claim
- footnote citations with norm shortcode and date
- explicit "no relevant norm found" marker when nothing matches
- ban on "to my knowledge" phrasings

**Example call in Claude Desktop**:

```
/legal_research jurisdiction=DE+EU depth=thorough

Question: What duties does a controller have following a data breach under GDPR?
```

## `/citation_resolve`

**Resolves a single citation to its verified full text.**

| Parameter | Values | Default |
| --- | --- | --- |
| `citation` | string | (required) |

Calls `legal_lookup` on the given citation and returns full text with hierarchy and version date — no interpretation. Perfect when the user wants "just the text".

**Example**:

```
/citation_resolve citation="§ 823 BGB"
```

## `/compare_de_eu`

**Contrasts German and EU regulation and names the relationship** (transposition, supplementation, gold-plating, standalone).

| Parameter | Values | Default |
| --- | --- | --- |
| `topic` | string | (required) |

Enforces:

- one `legal_search jurisdiction=de` and one `legal_search jurisdiction=eu`
- explicit **relationship** label: Does German law transpose an EU rule? Goes beyond it? Is it DE-only, EU-only, or two-sided?
- citations for both sides

**Example**:

```
/compare_de_eu topic="data retention of telecommunications metadata"
```

---

## Availability per client

| Client | Prompts |
| --- | --- |
| **Claude Desktop** | ✅ Show up as `/legal_research`, `/citation_resolve`, `/compare_de_eu` |
| **Claude.ai (web)** | ✅ Slash commands in the connector dropdown |
| **Copilot Studio** | ✅ Via custom connector |
| **Cursor** | ⚠️ Limited prompt support (copy manually) |
| **ChatGPT** | ⚠️ No native prompt support in custom connectors yet |

## Custom prompts?

Lawbster prompts are **public and static** — we don't host customer-specific prompts. To layer customer-specific system prompts on Lawbster, build them client-side (Cursor workflow, Copilot Studio topic trigger, …).
