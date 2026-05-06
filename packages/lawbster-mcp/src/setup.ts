import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { homedir, platform } from "node:os";

export type SupportedClient = "claude" | "cursor" | "vscode" | "windsurf";

export interface SetupOptions {
  client: SupportedClient;
  apiKey: string;
  endpoint?: string;
  scope?: "global" | "project";
  projectDir?: string;
}

export interface SetupResult {
  client: SupportedClient;
  configPath: string;
  scope: "global" | "project";
  created: boolean;
  serverName: string;
}

const DEFAULT_ENDPOINT = "https://lawbster.planitprima.com/mcp";
const SERVER_NAME = "lawbster";

export function runSetup(options: SetupOptions): SetupResult {
  const endpoint = options.endpoint ?? DEFAULT_ENDPOINT;
  const scope = options.scope ?? "global";
  const projectDir = options.projectDir ?? process.cwd();

  const configPath = resolveConfigPath(options.client, scope, projectDir);
  const existing = existsSync(configPath);

  ensureDir(configPath);
  const merged = mergeConfig(options.client, configPath, endpoint, options.apiKey);
  writeFileSync(configPath, JSON.stringify(merged, null, 2) + "\n", "utf8");

  return {
    client: options.client,
    configPath,
    scope,
    created: !existing,
    serverName: SERVER_NAME,
  };
}

function resolveConfigPath(
  client: SupportedClient,
  scope: "global" | "project",
  projectDir: string,
): string {
  switch (client) {
    case "claude":
      return claudeConfigPath();
    case "cursor":
      return scope === "project"
        ? join(projectDir, ".cursor", "mcp.json")
        : join(homedir(), ".cursor", "mcp.json");
    case "vscode":
      return scope === "project"
        ? join(projectDir, ".vscode", "mcp.json")
        : vscodeUserMcpPath();
    case "windsurf":
      return join(homedir(), ".codeium", "windsurf", "mcp_config.json");
    default: {
      const exhaustive: never = client;
      throw new Error(`Unsupported client: ${String(exhaustive)}`);
    }
  }
}

function claudeConfigPath(): string {
  const home = homedir();
  switch (platform()) {
    case "darwin":
      return join(home, "Library", "Application Support", "Claude", "claude_desktop_config.json");
    case "win32": {
      const appData = process.env.APPDATA ?? join(home, "AppData", "Roaming");
      return join(appData, "Claude", "claude_desktop_config.json");
    }
    default:
      return join(home, ".config", "Claude", "claude_desktop_config.json");
  }
}

function vscodeUserMcpPath(): string {
  const home = homedir();
  switch (platform()) {
    case "darwin":
      return join(home, "Library", "Application Support", "Code", "User", "mcp.json");
    case "win32": {
      const appData = process.env.APPDATA ?? join(home, "AppData", "Roaming");
      return join(appData, "Code", "User", "mcp.json");
    }
    default:
      return join(home, ".config", "Code", "User", "mcp.json");
  }
}

function ensureDir(filePath: string): void {
  mkdirSync(dirname(filePath), { recursive: true });
}

interface ClientConfigBase {
  mcpServers?: Record<string, unknown>;
  servers?: Record<string, unknown>;
  [k: string]: unknown;
}

function readJsonOrEmpty(path: string): ClientConfigBase {
  if (!existsSync(path)) return {};
  try {
    const raw = readFileSync(path, "utf8").trim();
    if (raw === "") return {};
    const parsed = JSON.parse(raw) as unknown;
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("config root is not a JSON object");
    }
    return parsed as ClientConfigBase;
  } catch (err) {
    throw new Error(
      `Existing config at ${path} is not valid JSON (${err instanceof Error ? err.message : String(err)}). ` +
      `Refusing to overwrite — fix the file manually or remove it before running setup again.`,
    );
  }
}

function mergeConfig(
  client: SupportedClient,
  configPath: string,
  endpoint: string,
  apiKey: string,
): ClientConfigBase {
  const existing = readJsonOrEmpty(configPath);
  const entry = {
    type: "http" as const,
    url: endpoint,
    headers: { Authorization: `Bearer ${apiKey}` },
  };

  // VS Code uses the `servers` key, every other client uses `mcpServers`.
  const key = client === "vscode" ? "servers" : "mcpServers";
  const existingServers = (existing[key] ?? {}) as Record<string, unknown>;

  return {
    ...existing,
    [key]: {
      ...existingServers,
      [SERVER_NAME]: entry,
    },
  };
}
