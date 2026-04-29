---
title: Lawbster MCP — Deutsches & EU-Recht für KI
description: >-
  Produktionsreifer MCP-Server, der Claude, ChatGPT und Copilot verifizierten,
  zitierfähigen Zugriff auf deutsches Bundesrecht, Rechtsprechung der
  Bundesgerichte und EU-Recht gibt. ~11 000 Gesetze, täglich aktualisiert,
  Hosting in Deutschland.
keywords:
  - MCP Server deutsches Recht
  - MCP Server EU Recht
  - Model Context Protocol Recht
  - Claude Desktop deutsches Recht
  - ChatGPT Rechtstexte API
  - BGB API
  - DSGVO API
  - EUR-Lex API
  - juristische KI
  - Legal RAG
hide:
  - navigation
  - toc
---

# KI halluziniert bei Rechtsfragen. Lawbster liefert die Fakten.

**Lawbster** ist der MCP-Server für **deutsches und europäisches Recht**. Er verbindet Claude, ChatGPT, Copilot und jeden anderen MCP-fähigen KI-Assistenten direkt mit ~11.000 Gesetzen, der Rechtsprechung der Bundesgerichte und dem vollständigen EU-Rechtskorpus — täglich aktualisiert aus amtlichen Quellen, jeder Treffer mit exakter Fundstelle.

Statt sich auf das Trainings-Wissen eines Sprachmodells zu verlassen — das veraltet, lückenhaft und nicht zitierfähig ist — sprechen LLMs über das offene **[Model Context Protocol](https://modelcontextprotocol.io)** mit Lawbster und geben Antworten mit Paragraf, Norm-Nummer und Datum der letzten Änderung zurück.

[:material-rocket-launch: In 2 Minuten verbunden](quickstart/claude-desktop.md){ .md-button .md-button--primary }
[:material-tools: Tool-Referenz](tools/index.md){ .md-button }
[:material-shield-check: Compliance](compliance.md){ .md-button }

---

## Die wichtigsten Vorteile

<div class="grid cards" markdown>

-   :material-database-check:{ .lg .middle } **Verifizierter Rechtskontext**

    ---

    Jeder Treffer kommt aus einer amtlichen Quelle: gesetze-im-internet.de, EUR-Lex, Rechtsprechung-im-Internet. Keine Halluzinationen, keine ausgedachten Paragrafen.

-   :material-clock-fast:{ .lg .middle } **Täglich aktualisiert**

    ---

    Kein Trainings-Cutoff. Lawbster lädt jede Nacht die offiziellen Quellen, parst Änderungen und re-indexiert betroffene Normen.

-   :material-magnify-scan:{ .lg .middle } **Hybrid-Suche mit AI-Reranking**

    ---

    Semantik plus Keyword-Suche, mit AI-Reranking-Schritt. **MRR@10 = 0,676** auf [GerLeRB](benchmarks.md) — transparenter, öffentlicher Benchmark.

-   :material-link-variant:{ .lg .middle } **Jede Antwort zitierfähig**

    ---

    `§ 823 BGB`, `Art. 6 DSGVO`, `BGH VI ZR 175/22` — exakte Paragrafen, korrekte Nummern, sauber getrennt zwischen Bundesrecht, EU-Recht und Rechtsprechung.

-   :material-server-security:{ .lg .middle } **Hosting in Deutschland**

    ---

    Hetzner-Server in Deutschland. AVV als Vertragsbestandteil. Details siehe AGB und Datenschutzerklärung.

-   :material-account-multiple:{ .lg .middle } **Pro-Seat-Modell, keine Vertragsbindung**

    ---

    19 € / Seat / Monat. 14 Tage kostenlos testen. Jederzeit kündbar. Beliebig viele Seats für Personen oder API-Keys zubuchbar.

</div>

---

## Was Lawbster abdeckt

| Quelle | Inhalt | Aktualität |
| --- | --- | --- |
| **Bundesrecht** | BGB, StGB, HGB, AO, EStG, GewO, AGG, KSchG, ArbZG, MiLoG, … | Täglich |
| **EU-Recht** | DSGVO, KI-VO, MiCA, NIS2, Verordnungen, Richtlinien | Täglich |
| **Rechtsprechung** | Entscheidungen von BGH, BVerfG, BAG, BSG, BPatG, BFH | Täglich |

→ [Vollständige Datenquellen-Übersicht](data-sources.md)

---

## Acht Tools, alle batch-fähig, alle asynchron

Jedes Tool ist für den Tool-Use-Loop von LLMs designt: knappe Antworten bei Discovery-Tools (~4 k Token), volle Texte bei Detail-Tools, Pagination via `count` / `total` / `offset` / `has_more` / `next_offset` / `hint`.

| Tool | Zweck |
| --- | --- |
| [`legal_search`](tools/legal_search.md) | Hybrid-Suche über alle Quellen mit Filtern |
| [`legal_lookup`](tools/legal_lookup.md) | Volltext einer einzelnen Norm per Zitat |
| `legal_lookup_batch` | Bis zu 20 Lookups in einem Call |
| [`legal_get_context`](tools/legal_get_context.md) | Umgebende Normen einer Fundstelle |
| [`legal_find_citing_decisions`](tools/legal_find_citing_decisions.md) | Bundesgerichtsentscheidungen, die eine Norm zitieren |
| [`legal_list_laws`](tools/legal_list_laws.md) | Verfügbare Gesetze mit Abkürzung & Aktualität |
| [`legal_get_toc`](tools/legal_get_toc.md) | Inhaltsverzeichnis eines Gesetzes |
| [`legal_get_stats`](tools/legal_get_stats.md) | Index- und Datenbankstatistiken |

Plus statische [Resources](resources.md) (`legal://rechtsrahmen`, `legal://filter_values`, `legal://eu_celex_registry`), dynamische Resource-Templates (`legal://norm/{id}`, `legal://law/{source}/{abk}`, `legal://eu/celex/{id}`) und drei [Prompts](prompts.md) (`legal_research`, `citation_resolve`, `compare_de_eu`).

---

## Quickstart — die häufigsten Clients

<div class="grid cards" markdown>

-   :material-robot:{ .lg .middle } **Claude Desktop**

    ---

    `mcpServers`-Eintrag in `claude_desktop_config.json` — fertig.

    [:octicons-arrow-right-24: Anleitung](quickstart/claude-desktop.md)

-   :simple-openai:{ .lg .middle } **ChatGPT & Claude.ai (Web)**

    ---

    OAuth-Flow, kein Code nötig.

    [:octicons-arrow-right-24: Anleitung](quickstart/chatgpt.md)

-   :material-cursor-default-click:{ .lg .middle } **Cursor**

    ---

    `.cursor/mcp.json` mit Bearer-Token.

    [:octicons-arrow-right-24: Anleitung](quickstart/cursor.md)

-   :material-microsoft:{ .lg .middle } **Copilot Studio**

    ---

    Custom-Connector inkl. Tools und Resources.

    [:octicons-arrow-right-24: Anleitung](quickstart/copilot-studio.md)

</div>

---

## Wer Lawbster nutzt

**Legal-Tech-Entwickler** integrieren Lawbster per API-Key in Compliance-Systeme, Document-Review-Pipelines und eigene Chatbots. **Anwaltskanzleien** verbinden ihre KI-Assistenten direkt mit verifizierten Rechtstexten. **Inhouse-Compliance-Teams** nutzen Lawbster für DSGVO-, KI-VO- und Arbeitsrecht-Recherche ohne ChatGPT-Halluzinationen.

> Lawbster ist nicht Harvey oder Noxtua — wir ersetzen kein Komplett-KI-Produkt. Lawbster ist die **darunterliegende Schicht**: der zitierfähige Rechtskontext-Provider. Eigenes LLM, eigener Workflow. **Wie Context7, aber für Recht.**

---

## Architektur & Sicherheit

- **Hosting** bei Hetzner Online GmbH in Deutschland.
- **Index-Inhalt:** ausschließlich öffentliche Rechtstexte (Gesetze, EU-Recht, Bundesgerichtsurteile).
- **Auth:** API-Keys werden als SHA-256-Hash gespeichert, Klartext ist nur einmal beim Erstellen sichtbar; alternativ OAuth 2.1.
- **Zahlungsabwicklung** über Stripe.
- **Transparente Benchmarks** auf [GerLeRB](benchmarks.md), öffentlich nachvollziehbar.
- **Fair-Use 60 Anfragen/min** pro Seat — kein Drosseln im normalen Betrieb.

→ [Technische Compliance-Übersicht](compliance.md) · Verbindliches in AGB und Datenschutzerklärung.

---

## Pricing

**Ein Plan, klare Abrechnung.**

- 19 € / Seat / Monat
- Unbegrenzte Anfragen pro Seat (Fair-Use 60 / min)
- Vollständiger Rechtskorpus inklusive
- Bevorzugter E-Mail-Support
- 14 Tage kostenlos testen — keine Kreditkarte
- Jederzeit kündbar

[Jetzt kostenlos testen :material-arrow-right:](https://lawbster.planitprima.com/pricing){ .md-button .md-button--primary }

---

## Ein Produkt von PLANIT // TECH GmbH

Made in Germany. Betrieben von [PLANIT // TECH GmbH](https://www.planitprima.com), spezialisiert auf Datenschutz- und Legal-Tech-Software.

[:material-web: Website](https://lawbster.planitprima.com){ .md-button }
[:material-github: GitHub](https://github.com/PLANIT-TECH/lawbster-mcp){ .md-button }
[:material-email: support@planitprima.com](mailto:support@planitprima.com){ .md-button }
