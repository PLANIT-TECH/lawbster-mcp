---
title: Connect Claude Desktop to Lawbster — German law in Claude
description: >-
  Step-by-step: connect Claude Desktop to Lawbster in two minutes so Claude
  can answer questions about BGB, GDPR, EU law and German federal court
  decisions with verified citations.
keywords:
  - Claude Desktop MCP setup
  - Claude Desktop German law
  - Claude Desktop BGB
  - Claude Desktop GDPR
  - claude_desktop_config.json MCP
---

# Connect Claude Desktop to Lawbster

In two minutes, **Claude Desktop** answers questions about German and European law with verified, citable references. Setup: one JSON entry.

## Prerequisites

- **[Claude Desktop](https://claude.ai/download)** installed (macOS / Windows / Linux)
- A Lawbster account → [14 days free](https://lawbster.planitprima.com/pricing) (no credit card)
- An **API key** (`sk-legal-…`) from the portal under **[Keys](https://lawbster.planitprima.com/)**

!!! tip "Plain-text token shown only once"
    When you create the key, the plain text appears **exactly once**. Copy it straight into the config — otherwise rotate.

## Step 1 — Open the config file

| Platform | Path |
| --- | --- |
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json` |

Create the file with `{}` if it doesn't exist.

## Step 2 — Add the Lawbster entry

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

If you already have other MCP servers configured, just add the `lawbster` block.

## Step 3 — Restart Claude Desktop

**Fully quit** Claude Desktop (not just close the window) and reopen. The MCP icon in the input bar now shows **Lawbster** with eight tools.

## Step 4 — Test it

Ask Claude:

> *What are the prerequisites for a non-pecuniary damages claim under § 253 BGB? Please cite sources.*

Claude calls `legal_search`, retrieves the full text of § 253 BGB, returns a citable answer and can — on request — pull related BGH decisions via `legal_find_citing_decisions`.

## Tips for better answers

**Enable all Lawbster tools** in the MCP menu — Claude picks the right tool automatically. Tool descriptions are written so Claude makes the right choice without explicit instructions.

**Use the bundled prompts**: `/legal_research`, `/citation_resolve`, `/compare_de_eu` show up as slash commands. They force Claude into a clean research workflow with mandatory tool use and a ban on invented citations.

**Ask follow-ups**. Lawbster gives more than hits — it gives context: `legal_get_context` lets Claude pull surrounding paragraphs, `legal_find_citing_decisions` shows how federal courts interpret a provision.

## Troubleshooting

??? question "Claude doesn't show Lawbster in the MCP menu"
    1. JSON syntactically valid? `python -m json.tool < claude_desktop_config.json`
    2. Claude Desktop **fully quit** (Quit, not just window-close)?
    3. Token starts with `sk-legal-` and has no leading/trailing whitespace?

??? question "401 Unauthorized in the logs"
    Check the token in the Lawbster portal: is it active, and is the subscription still valid? When in doubt, rotate — old keys can be revoked.

??? question "429 Rate limit"
    60 requests/minute per seat is the fair-use limit. If Claude fires many tool calls in a long research run, it can hit. Fix: add a second seat or take a short break.

??? question "Another MCP server breaks after adding Lawbster"
    JSON validated? Common mistake: missing comma between multiple servers. Example with two servers:

    ```json
    {
      "mcpServers": {
        "lawbster": {
          "type": "http",
          "url": "https://lawbster.planitprima.com/mcp",
          "headers": { "Authorization": "Bearer sk-legal-..." }
        },
        "another-server": {
          "command": "npx",
          "args": ["-y", "@some/server"]
        }
      }
    }
    ```

---

**Next steps:** [Tool reference](../tools/index.md) · [Resources & prompts](../resources.md) · [Pricing & seats](https://lawbster.planitprima.com/pricing)
