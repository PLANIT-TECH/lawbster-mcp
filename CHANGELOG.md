# Changelog

Strukturierter Überblick über die nennenswerten Änderungen seit dem Launch. Reine Bugfixes und Performance-Tunings sind hier nicht aufgelistet — die laufen kontinuierlich im Hintergrund.

Format orientiert an [Keep a Changelog](https://keepachangelog.com/de/1.1.0/).

## [Unreleased]

### Changed
- Repo-Layout im Stil von [context7](https://github.com/upstash/context7): fette Root-`README.md` mit Setup-Anleitungen, Tools und Skills/Rules. MkDocs-Doku-Site entfernt; technische Tiefen-Dokumentation als plain Markdown unter `docs/`.
- Englische Vollübersetzung der README unter `i18n/README.en.md`.

### Added
- npm-Wrapper-Paket `@planit-lawbster/lawbster-mcp` als stdio↔HTTPS-Bridge — `npx -y @planit-lawbster/lawbster-mcp setup --client <cursor|claude|vscode>`.
- Skills/Rules-Snippets: Cursor-Rule (`rules/cursor.md`), Claude-Code-Skill (`skills/legal-research/SKILL.md`), ChatGPT-Custom-GPT-System-Prompt (`prompts/chatgpt-custom-gpt.md`), GitHub-Copilot-Instructions-Vorlage (`prompts/copilot-instructions.md`).
- GitHub-Actions-Workflow `npm-publish.yml` — Build und Publish des Wrapper-Pakets bei Tag `v*.*.*`.

### Removed
- MkDocs-Setup komplett: `mkdocs.yml`, `requirements.txt`, `overrides/main.html`, alle `docs/*.en.md`-Suffix-Duplikate sowie die in die Root-README oder Marketing-Site migrierten Inhalte (`docs/index*`, `docs/quickstart/`, `docs/tools/`, `docs/changelog*`, `docs/compliance*`, `docs/data-sources*`, `docs/pricing*`, `docs/prompts*`, `docs/resources*`, `docs/search-pipeline*`, `docs/.nojekyll`, `docs/robots.txt`).
- GitHub-Pages-Deploy-Workflow `.github/workflows/deploy.yml`. Die alte Doku-Site unter `planit-tech.github.io/lawbster-mcp` wird mit dem nächsten Push offline genommen — Compliance- und Pricing-Inhalte liegen weiterhin auf [lawbster.planitprima.com](https://lawbster.planitprima.com), Setup- und Tool-Doku in der Root-`README.md`.

## 2026

### 29. April 2026
- **Öffentliche GitHub-Pages-Doku** unter [planit-tech.github.io/lawbster-mcp](https://planit-tech.github.io/lawbster-mcp/) live — DE und EN.

### 23. April 2026
- **Public Launch.** Lawbster wird öffentlich verfügbar.
- Initialer Funktionsumfang: deutsches Bundesrecht, EU-Recht und Bundesgerichtsentscheidungen, Hybrid-Suche mit AI-Reranking, acht MCP-Tools, drei Prompts, Resources, OAuth + API-Key, Pro-Seat-Quota, AVV inklusive.

---

**Bug oder Feature-Wunsch?** → `support@planitprima.com` oder [GitHub Issues](https://github.com/PLANIT-TECH/lawbster-mcp/issues).
