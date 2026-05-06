# @planit-lawbster/lawbster-mcp

Local MCP bridge for [Lawbster](https://lawbster.planitprima.com) — verified, citable German & EU law for any MCP-capable AI assistant.

This package is a thin **stdio↔HTTPS bridge**. It runs on your machine, exposes Lawbster as a local stdio MCP server to your client, and forwards every JSON-RPC frame to the hosted endpoint at `https://lawbster.planitprima.com/mcp` with your API key. Useful for clients that don't yet support remote HTTP MCP servers natively.

> Most modern clients (Claude Desktop, Cursor, ChatGPT, Claude.ai, Copilot Studio, VS Code) talk Streamable HTTP MCP directly and **don't need this wrapper** — point them at `https://lawbster.planitprima.com/mcp` with a Bearer header instead. See the [main README](https://github.com/PLANIT-TECH/lawbster-mcp#readme) for direct-connect snippets.

## Install

No global install required — use `npx`:

```bash
npx -y @planit-lawbster/lawbster-mcp setup --client claude
```

Supported `--client` values: `claude` · `cursor` · `vscode` · `windsurf`

The `setup` command writes a properly-formatted MCP server entry into the right config file for the chosen client and prints the path it touched.

You'll be prompted for an API key — get one (14-day free trial, no credit card) at [lawbster.planitprima.com](https://lawbster.planitprima.com). Or pass it explicitly:

```bash
npx -y @planit-lawbster/lawbster-mcp setup --client cursor --api-key sk-legal-...
# or via env:
LAWBSTER_API_KEY=sk-legal-... npx -y @planit-lawbster/lawbster-mcp setup --client cursor
```

## Run as a server

The default subcommand (`serve`) is what MCP clients invoke when they spawn this binary:

```bash
LAWBSTER_API_KEY=sk-legal-... npx -y @planit-lawbster/lawbster-mcp
# equivalent to:
LAWBSTER_API_KEY=sk-legal-... npx -y @planit-lawbster/lawbster-mcp serve
```

It reads JSON-RPC frames from stdin and writes them back on stdout, while shuttling everything over HTTPS to Lawbster.

## Manual config (without `setup`)

If you'd rather edit the client config yourself, the entry looks like this:

```json
{
  "mcpServers": {
    "lawbster": {
      "command": "npx",
      "args": ["-y", "@planit-lawbster/lawbster-mcp"],
      "env": {
        "LAWBSTER_API_KEY": "sk-legal-..."
      }
    }
  }
}
```

VS Code uses `servers` instead of `mcpServers` — otherwise identical.

## Options

| Flag / env var | Default | Purpose |
| --- | --- | --- |
| `--api-key` / `LAWBSTER_API_KEY` | — (required) | Lawbster API key (`sk-legal-…`) |
| `--endpoint` / `LAWBSTER_MCP_URL` | `https://lawbster.planitprima.com/mcp` | Override only for staging or self-hosted |
| `--scope` (setup only) | `global` | `global` (user config) or `project` (current dir, cursor/vscode only) |

## What the bridge does

The bridge does **not** parse, reinterpret, or rewrite MCP messages. It just connects two transports back-to-back:

```
client (Claude / Cursor / …)  ⇄  stdio  ⇄  this bridge  ⇄  HTTPS  ⇄  Lawbster
```

That means any future MCP method (tools, resources, prompts, sampling, …) works without code changes here — Lawbster server-side is the single source of truth for capabilities.

## Why use this instead of direct HTTP?

- **Older client versions** that only spawn stdio subprocesses
- **Air-gapped or proxied networks** where you want a single outbound endpoint and per-process auth
- **Fewer config knobs** for users who'd rather paste a binary name than a URL + Bearer header
- **Discovery via npm** — Awesome-MCP lists, Reddit threads, and the npm registry index it as `@planit-lawbster/lawbster-mcp`

If your client speaks Streamable HTTP MCP natively, prefer the direct connection — one fewer process, no Node.js install required.

## Source

- Repo: [github.com/PLANIT-TECH/lawbster-mcp](https://github.com/PLANIT-TECH/lawbster-mcp)
- License: MIT (see [LICENSE](https://github.com/PLANIT-TECH/lawbster-mcp/blob/main/LICENSE))
- Bug reports & feature requests: [GitHub Issues](https://github.com/PLANIT-TECH/lawbster-mcp/issues)
- Security disclosure: `support@planitprima.com`

The hosted Lawbster service itself is closed-source SaaS operated by **PLANIT // TECH GmbH** in Germany.
