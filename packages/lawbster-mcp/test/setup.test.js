import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { runSetup } from "../dist/setup.js";

function freshDir() {
  return mkdtempSync(join(tmpdir(), "lawbster-setup-"));
}

test("creates a cursor project config with the lawbster entry", () => {
  const dir = freshDir();
  try {
    const res = runSetup({ client: "cursor", apiKey: "sk-legal-test", scope: "project", projectDir: dir });
    assert.equal(res.created, true);
    assert.equal(res.serverName, "lawbster");
    const cfg = JSON.parse(readFileSync(join(dir, ".cursor", "mcp.json"), "utf8"));
    assert.equal(cfg.mcpServers.lawbster.type, "http");
    assert.equal(cfg.mcpServers.lawbster.headers.Authorization, "Bearer sk-legal-test");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("merges into an existing config without dropping other servers", () => {
  const dir = freshDir();
  try {
    mkdirSync(join(dir, ".cursor"), { recursive: true });
    writeFileSync(
      join(dir, ".cursor", "mcp.json"),
      JSON.stringify({ mcpServers: { other: { type: "http", url: "https://example.com" } } }),
    );
    const res = runSetup({ client: "cursor", apiKey: "sk-legal-test", scope: "project", projectDir: dir });
    assert.equal(res.created, false);
    const cfg = JSON.parse(readFileSync(join(dir, ".cursor", "mcp.json"), "utf8"));
    assert.ok(cfg.mcpServers.other, "existing server preserved");
    assert.ok(cfg.mcpServers.lawbster, "lawbster server added");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("vscode uses the 'servers' key, not 'mcpServers'", () => {
  const dir = freshDir();
  try {
    runSetup({ client: "vscode", apiKey: "sk-legal-test", scope: "project", projectDir: dir });
    const cfg = JSON.parse(readFileSync(join(dir, ".vscode", "mcp.json"), "utf8"));
    assert.ok(cfg.servers.lawbster, "vscode writes under servers");
    assert.equal(cfg.mcpServers, undefined);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("refuses to overwrite a config that is not valid JSON", () => {
  const dir = freshDir();
  try {
    mkdirSync(join(dir, ".cursor"), { recursive: true });
    writeFileSync(join(dir, ".cursor", "mcp.json"), "{ not valid json");
    assert.throws(
      () => runSetup({ client: "cursor", apiKey: "sk-legal-test", scope: "project", projectDir: dir }),
      /not valid JSON/,
    );
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
