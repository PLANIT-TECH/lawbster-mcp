---
title: Quickstart — Lawbster mit jedem MCP-Client verbinden
description: >-
  Schritt-für-Schritt-Anleitungen, um Lawbster mit Claude Desktop, ChatGPT,
  Claude.ai, Cursor, Copilot Studio und eigenen Apps zu verbinden.
keywords:
  - MCP Client einrichten
  - Claude Desktop MCP
  - ChatGPT Connector
  - Cursor MCP
  - Copilot Studio MCP
---

# Quickstart

Lawbster spricht das **Model Context Protocol (MCP)** über **Streamable HTTP**. Jeder Client, der MCP versteht, kann Lawbster in zwei Minuten als Tool-Quelle hinzufügen.

## Authentifizierung — zwei Wege

| Methode | Wann benutzen | Token-Form |
| --- | --- | --- |
| **API-Key** | Server-to-Server, Skripte, eigene Apps, Cursor, Claude Desktop | `sk-legal-…` |
| **OAuth 2.1** | Browser-Clients (ChatGPT, Claude.ai), kein Klartext-Token nötig | JWT, automatisch |

Der API-Key wird im Lawbster-Portal unter **[Keys](https://lawbster.planitprima.com/keys)** angelegt. Klartext erscheint **nur einmal** — direkt in den Client-Config kopieren.

## MCP-Endpoint

```
https://lawbster.planitprima.com/mcp
```

Stateless Streamable HTTP — kein Session-Tracking, jeder Request unabhängig.

## Anleitungen pro Client

<div class="grid cards" markdown>

-   :material-robot:{ .lg .middle } **[Claude Desktop](claude-desktop.md)**

    ---

    Die einfachste Variante. JSON-Eintrag in der Config — fertig. Funktioniert auf macOS, Windows und Linux.

-   :simple-openai:{ .lg .middle } **[ChatGPT & Claude.ai (Web)](chatgpt.md)**

    ---

    OAuth-Flow im Browser, kein Token in der Config. Native Connector-Unterstützung.

-   :material-cursor-default-click:{ .lg .middle } **[Cursor](cursor.md)**

    ---

    `.cursor/mcp.json` im Projekt-Root. Lawbster-Tools direkt im Cursor-Composer.

-   :material-microsoft:{ .lg .middle } **[Copilot Studio](copilot-studio.md)**

    ---

    Custom Connector mit voller Tool- und **Resource**-Unterstützung — perfekt für Microsoft-Umgebungen.

</div>

## Eigene App / SDK

Für eigene Anwendungen empfehlen wir das offizielle Python- oder TypeScript-MCP-SDK. Endpoint, Bearer-Token, Streamable HTTP — sonst nichts. Tool-Schemas werden automatisch ausgelesen.

→ [MCP Python SDK](https://github.com/modelcontextprotocol/python-sdk) · [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)

## Test ohne Client

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

Antwort enthält die acht Tools mit JSON-Schema, sofort einsatzbereit.
