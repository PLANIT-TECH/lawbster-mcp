---
title: Connect Cursor to Lawbster — German law in the Composer
description: >-
  Connect Cursor (Pro / Business) via .cursor/mcp.json to Lawbster and get
  legal-research tools right in the Composer.
keywords:
  - Cursor MCP setup
  - Cursor German law
  - .cursor/mcp.json
  - Cursor Composer legal
---

# Connect Cursor to Lawbster

**Cursor** supports MCP servers either project-locally via `.cursor/mcp.json` or globally via `~/.cursor/mcp.json`.

## Prerequisites

- **[Cursor](https://cursor.sh)** ≥ 0.42 (Pro / Business for MCP)
- An API key (`sk-legal-…`) from the [Lawbster portal](https://lawbster.planitprima.com/)

## Setup

Create `.cursor/mcp.json` in the project root:

```json
{
  "mcpServers": {
    "lawbster": {
      "type": "http",
      "url": "https://lawbster.planitprima.com/mcp",
      "headers": {
        "Authorization": "Bearer sk-legal-YOUR-API-KEY"
      }
    }
  }
}
```

Reload Cursor (Cmd/Ctrl + Shift + P → *Reload Window*). The **Composer** sidebar now shows Lawbster with eight tools.

!!! warning "Don't commit the API key"
    Add `.cursor/mcp.json` to `.gitignore`. Or pull the token from an env variable — Cursor supports it:

    ```json
    {
      "mcpServers": {
        "lawbster": {
          "type": "http",
          "url": "https://lawbster.planitprima.com/mcp",
          "headers": {
            "Authorization": "Bearer ${env:LAWBSTER_TOKEN}"
          }
        }
      }
    }
    ```

## Use cases in Cursor

**Drafting T&Cs with real clauses**: Cursor drafts terms, Lawbster supplies the relevant BGB paragraphs (§§ 305–310, § 309 Nr. 7) into the Composer context.

**GDPR compliance check**: While implementing data-processing code, Cursor pulls Art. 6 / Art. 9 GDPR and flags whether your legal basis is covered.

**EU AI Act risk classification**: When building ML pipelines, Cursor calls `legal_lookup Art. 6 AI Act` and annotates the code with the matching risk tier.

## Global vs. project-local config

| Path | Effect |
| --- | --- |
| `.cursor/mcp.json` (in repo) | This project only — useful for legal-tech repos |
| `~/.cursor/mcp.json` | Global, all Cursor sessions |

Global config is convenient for solo devs — project-local is better for teams once `.gitignore` keeps the token out.

## Troubleshooting

??? question "Cursor doesn't show Lawbster in the Composer"
    Reload Cursor, check the **MCP** icon in the Composer. If Lawbster is missing: validate JSON with `python -m json.tool < .cursor/mcp.json`.

??? question "401 Unauthorized"
    Token prefix `sk-legal-` correct? Check in the [portal](https://lawbster.planitprima.com/) whether the key is still active.

---

**Next steps:** [Tool reference](../tools/index.md) · [Search pipeline](../search-pipeline.md)
