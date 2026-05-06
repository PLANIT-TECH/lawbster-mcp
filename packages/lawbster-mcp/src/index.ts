#!/usr/bin/env node
import { Command } from "commander";
import { runBridge } from "./bridge.js";
import { runSetup, type SupportedClient } from "./setup.js";

const PKG_VERSION = "0.1.0";
const SUPPORTED_CLIENTS: readonly SupportedClient[] = ["claude", "cursor", "vscode", "windsurf"];

const program = new Command();

program
  .name("lawbster-mcp")
  .description(
    "Local MCP bridge for Lawbster — verified, citable German & EU law for any MCP-capable AI assistant. " +
    "Forwards stdio MCP traffic to https://lawbster.planitprima.com/mcp.",
  )
  .version(PKG_VERSION);

program
  .command("serve", { isDefault: true })
  .description("Run the stdio↔HTTPS bridge (default). Used by MCP clients that spawn this binary.")
  .option(
    "--api-key <key>",
    "Lawbster API key (sk-legal-…). Falls back to LAWBSTER_API_KEY env var.",
  )
  .option(
    "--endpoint <url>",
    "MCP endpoint URL. Defaults to https://lawbster.planitprima.com/mcp; override via LAWBSTER_MCP_URL env.",
  )
  .action(async (opts: { apiKey?: string; endpoint?: string }) => {
    try {
      await runBridge({
        apiKey: opts.apiKey,
        endpoint: opts.endpoint,
      });
    } catch (err) {
      process.stderr.write(`lawbster-mcp: bridge failed to start: ${formatError(err)}\n`);
      process.exit(1);
    }
  });

program
  .command("setup")
  .description("Write a Lawbster MCP server entry into a client's config file.")
  .requiredOption(
    "--client <name>",
    `Target client. One of: ${SUPPORTED_CLIENTS.join(", ")}.`,
  )
  .option(
    "--api-key <key>",
    "Lawbster API key (sk-legal-…). Falls back to LAWBSTER_API_KEY env var.",
  )
  .option(
    "--endpoint <url>",
    "MCP endpoint URL. Defaults to https://lawbster.planitprima.com/mcp.",
  )
  .option(
    "--scope <scope>",
    "Either 'global' (default — user-level config) or 'project' (writes into the current directory). " +
    "Only relevant for cursor/vscode; claude is always global, windsurf is always global.",
    "global",
  )
  .action((opts: {
    client: string;
    apiKey?: string;
    endpoint?: string;
    scope: string;
  }) => {
    if (!isSupportedClient(opts.client)) {
      process.stderr.write(
        `lawbster-mcp: unsupported --client '${opts.client}'. ` +
        `Use one of: ${SUPPORTED_CLIENTS.join(", ")}.\n`,
      );
      process.exit(2);
    }
    if (opts.scope !== "global" && opts.scope !== "project") {
      process.stderr.write(`lawbster-mcp: --scope must be 'global' or 'project'.\n`);
      process.exit(2);
    }

    const apiKey = opts.apiKey ?? process.env.LAWBSTER_API_KEY;
    if (!apiKey) {
      process.stderr.write(
        "lawbster-mcp: missing API key. Pass --api-key sk-legal-… or set LAWBSTER_API_KEY.\n" +
        "             Get a key at https://lawbster.planitprima.com (14-day free trial).\n",
      );
      process.exit(2);
    }

    try {
      const result = runSetup({
        client: opts.client,
        apiKey,
        endpoint: opts.endpoint,
        scope: opts.scope,
      });
      const verb = result.created ? "Created" : "Updated";
      process.stdout.write(
        `${verb} ${result.client} config: ${result.configPath}\n` +
        `Server entry: '${result.serverName}'.\n` +
        nextStepHint(result.client),
      );
    } catch (err) {
      process.stderr.write(`lawbster-mcp: setup failed: ${formatError(err)}\n`);
      process.exit(1);
    }
  });

program.parseAsync(process.argv).catch((err: unknown) => {
  process.stderr.write(`lawbster-mcp: ${formatError(err)}\n`);
  process.exit(1);
});

function isSupportedClient(value: string): value is SupportedClient {
  return (SUPPORTED_CLIENTS as readonly string[]).includes(value);
}

function nextStepHint(client: SupportedClient): string {
  switch (client) {
    case "claude":
      return "Restart Claude Desktop (Quit, not just close the window) to pick up the new server.\n";
    case "cursor":
      return "Reload Cursor (Cmd/Ctrl+Shift+P → Reload Window) to pick up the new server.\n";
    case "vscode":
      return "Reload VS Code (Cmd/Ctrl+Shift+P → Developer: Reload Window) to pick up the new server.\n";
    case "windsurf":
      return "Restart Windsurf to pick up the new server.\n";
  }
}

function formatError(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}
