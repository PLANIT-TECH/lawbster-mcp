---
title: Quickstart — connect Lawbster to any MCP client
description: >-
  Step-by-step guides for connecting Lawbster to Claude Desktop, ChatGPT,
  Claude.ai, Cursor, Copilot Studio and custom apps.
keywords:
  - MCP client setup
  - Claude Desktop MCP
  - ChatGPT connector
  - Cursor MCP
  - Copilot Studio MCP
---

# Quickstart

Lawbster speaks the **Model Context Protocol (MCP)** over **Streamable HTTP**. Any client that understands MCP can add Lawbster as a tool source in two minutes.

## Authentication — two paths

| Method | Use it for | Token shape |
| --- | --- | --- |
| **API key** | Server-to-server, scripts, custom apps, Cursor, Claude Desktop | `sk-legal-…` |
| **OAuth 2.1** | Browser clients (ChatGPT, Claude.ai), no plain-text token | JWT, automatic |

API keys are created in the Lawbster portal under **[Keys](https://lawbster.planitprima.com/keys)**. The plain-text key is shown **only once** — copy it straight into the client config.

## MCP endpoint

```
https://lawbster.planitprima.com/mcp
```

Stateless Streamable HTTP — no session tracking, each request is fresh.

## Per-client guides

<div class="grid cards" markdown>

-   :material-robot:{ .lg .middle } **[Claude Desktop](claude-desktop.md)**

    ---

    The simplest path. JSON entry in the config file — done. Works on macOS, Windows, Linux.

-   :simple-openai:{ .lg .middle } **[ChatGPT & Claude.ai (web)](chatgpt.md)**

    ---

    Browser-based OAuth flow, no plain-text token. Native connector support.

-   :material-cursor-default-click:{ .lg .middle } **[Cursor](cursor.md)**

    ---

    `.cursor/mcp.json` in the project root. Lawbster tools available right in the Cursor Composer.

-   :material-microsoft:{ .lg .middle } **[Copilot Studio](copilot-studio.md)**

    ---

    Custom connector with full tool **and resource** support — perfect for Microsoft stacks.

</div>

## Custom app / SDK

For custom apps we recommend the official Python or TypeScript MCP SDKs. Endpoint, bearer token, Streamable HTTP — nothing else. Tool schemas are auto-discovered.

→ [MCP Python SDK](https://github.com/modelcontextprotocol/python-sdk) · [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)

## Test without a client

```bash
curl -X POST https://lawbster.planitprima.com/mcp \
  -H "Authorization: Bearer sk-legal-..." \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list"
  }'
```

Response contains all eight tools with JSON schema, ready to use.
