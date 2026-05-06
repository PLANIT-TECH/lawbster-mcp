# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in Lawbster — either in the hosted service (`https://lawbster.planitprima.com`) or in the contents of this repository (npm wrapper package, client snippets) — please report it responsibly.

**Do not open a public GitHub issue for security vulnerabilities.**

### How to report

Email: **`security@planitprima.com`** (preferred) — encrypt with our PGP key on request.

Alternative: `support@planitprima.com` with the subject prefixed by `[SECURITY]`.

### What to include

- A clear description of the issue and its impact
- Steps to reproduce (proof-of-concept welcome)
- Affected component (hosted service, npm wrapper, specific snippet, …)
- Your contact details for follow-up
- Whether you would like to be credited (and how) in a public advisory

### What to expect

- **Acknowledgement** within 2 business days
- **Initial assessment** within 5 business days
- **Fix or mitigation timeline** depending on severity:
  - Critical (auth bypass, data exfiltration, RCE) → patched within 7 days
  - High → 30 days
  - Medium / Low → next regular release
- **Public disclosure** coordinated with you, typically after the fix has been deployed and customers have had time to update

We will credit reporters in the changelog and (with consent) in a public security advisory.

## Scope

**In scope:**

- Vulnerabilities in the hosted Lawbster API (`https://lawbster.planitprima.com/mcp` and related endpoints)
- Authentication / authorization issues (API key handling, OAuth flow, JWT validation)
- Quota / rate-limit bypass
- Data leaks (cross-tenant access to indexed content metadata or quota counters)
- Vulnerabilities in the npm wrapper package (`@planit-tech/lawbster-mcp`) — credential exfiltration, code injection in setup CLI, etc.
- Security issues in the rules / skills / prompts shipped from this repo (e.g. injection vectors when loaded by client editors)

**Out of scope:**

- Issues in third-party MCP clients (Claude Desktop, Cursor, ChatGPT, etc.) — please report those upstream
- The contents of indexed legal documents (these are public)
- Denial-of-service attempts beyond the documented rate limit
- Social engineering of employees

## Coordinated Disclosure

We follow a coordinated-disclosure model. Please give us reasonable time to fix issues before publishing details. We do not pursue researchers acting in good faith.

## Hall of Fame

Security researchers who have responsibly disclosed issues to us will be listed here (with consent).

_(none yet)_

---

**Contact:** `security@planitprima.com` · **Website:** [lawbster.planitprima.com](https://lawbster.planitprima.com)
