<div align="center">

# Lawbster — German & EU Law as an MCP Server

**Verifizierter, zitierfähiger Rechtskontext für Claude, ChatGPT, Copilot, Cursor und jede andere KI.**

*Verified, citable legal context for any LLM that speaks the [Model Context Protocol](https://modelcontextprotocol.io).*

[![Docs](https://img.shields.io/badge/docs-lawbster--mcp-1f6feb?style=flat-square&logo=readthedocs&logoColor=white)](https://planit-tech.github.io/lawbster-mcp/)
[![Website](https://img.shields.io/badge/website-lawbster.planitprima.com-0a7c3e?style=flat-square)](https://lawbster.planitprima.com)
[![MCP](https://img.shields.io/badge/protocol-MCP-8a2be2?style=flat-square)](https://modelcontextprotocol.io)
[![Made in Germany](https://img.shields.io/badge/hosting-Germany%20%F0%9F%87%A9%F0%9F%87%AA-000000?style=flat-square)](https://lawbster.planitprima.com/datenschutz)
[![GDPR](https://img.shields.io/badge/compliance-GDPR-005bbb?style=flat-square)](https://lawbster.planitprima.com/datenschutz)

[**Quickstart**](https://planit-tech.github.io/lawbster-mcp/quickstart/claude-desktop/) ·
[**Tools**](https://planit-tech.github.io/lawbster-mcp/tools/) ·
[**Datenquellen**](https://planit-tech.github.io/lawbster-mcp/data-sources/) ·
[**Benchmarks**](https://planit-tech.github.io/lawbster-mcp/benchmarks/) ·
[**Pricing**](https://lawbster.planitprima.com/pricing) ·
[**FAQ**](https://planit-tech.github.io/lawbster-mcp/faq/)

</div>

---

## KI halluziniert bei Rechtsfragen. Lawbster liefert die Fakten.

> *AI hallucinates on legal questions. Lawbster delivers the facts.*

Lawbster ist ein **produktionsreifer MCP-Server**, der KI-Assistenten verifizierten Zugriff auf das deutsche und europäische Recht gibt — täglich aktualisiert aus amtlichen Quellen, durchsuchbar mit dreistufiger Hybrid-Suche, jeder Treffer mit exakter Fundstelle.

Anstatt sich auf das Trainings-Wissen eines Sprachmodells zu verlassen (das veraltet, lückenhaft und nicht-zitierfähig ist), sprechen Claude, ChatGPT & Co. über das offene **Model Context Protocol** direkt mit unserem Index — und liefern Antworten mit Paragraf, Norm-Nummer und Datum der letzten Änderung.

---

## Was ist drin

| Quelle | Inhalt | Stand |
| --- | --- | --- |
| **Bundesrecht** | BGB, StGB, HGB, AO, EStG, GewO, AGG, KSchG, ArbZG, MiLoG, … | Täglich |
| **EU-Recht** | DSGVO, KI-VO, MiCA, NIS2, EU-Verordnungen & -Richtlinien | Täglich |
| **Rechtsprechung** | Entscheidungen von BGH, BVerfG, BAG, BSG, BPatG, BFH | Täglich |

**Vollständiges deutsches Bundesrecht · vollständiges EU-Recht · Bundesgerichtsentscheidungen · jede Norm einzeln zitierbar.**

---

## Acht Tools — alle batch-fähig, alle asynchron, alle zitierfähig

| Tool | Beschreibung |
| --- | --- |
| `legal_search` | Hybrid-Suche mit AI-Reranking über alle Quellen mit Filtern (`source_type`, `law_abbreviation`, `chapter`, `court`, `decision_type`, Datumsbereich). |
| `legal_lookup` | Volltext einer einzelnen Norm per Zitat (`§ 823 BGB`, `Art. 6 DSGVO`, `C-311/18`). |
| `legal_lookup_batch` | Bis zu 20 Lookups in einem Call — perfekt für Tool-Use-Loops. |
| `legal_get_context` | Umgebende Normen einer Fundstelle (z.B. „§ 823 BGB plus die zwei davor und drei danach"). |
| `legal_find_citing_decisions` | Bundesgerichtsentscheidungen, die eine konkrete Norm zitieren. |
| `legal_list_laws` | Verfügbare Gesetze mit Abkürzung, Titel, Quelle, Aktualität. |
| `legal_get_toc` | Inhaltsverzeichnis eines Gesetzes mit Norm-Schlüsseln, Titeln und Hierarchie. |
| `legal_get_stats` | Index- und Datenbankstatistiken (Anzahl Gesetze, Normen, Bundesgerichtsentscheidungen, Update-Stand). |

Plus **MCP Resources** (`legal://rechtsrahmen`, `legal://norm/{id}`, `legal://eu/celex/{id}`, …) und **MCP Prompts** (`/legal_research`, `/citation_resolve`, `/compare_de_eu`).

→ [Vollständige Tool-Referenz mit Beispielen](https://planit-tech.github.io/lawbster-mcp/tools/)

---

## Quickstart in zwei Minuten

### Claude Desktop

```json
{
  "mcpServers": {
    "lawbster": {
      "type": "http",
      "url": "https://lawbster.planitprima.com/mcp",
      "headers": {
        "Authorization": "Bearer sk-legal-..."
      }
    }
  }
}
```

### ChatGPT / Claude.ai (Web)

OAuth-Flow, kein Code: **Settings → Connectors → Add custom** → URL `https://lawbster.planitprima.com/mcp` → Sign in.

→ [Cursor, Copilot Studio, eigene Apps](https://planit-tech.github.io/lawbster-mcp/quickstart/)

---

## Warum Lawbster?

**Gegenüber LLM-Direktnutzung:** Kein Trainings-Cutoff, exakte Paragrafen statt geraten, jede Antwort mit Fundstelle, sauber getrennt zwischen BGB / DSGVO / BGH-Urteilen. KI halluziniert bei Rechtsfragen regelmäßig — mit Lawbster nicht mehr.

**Gegenüber anderen Legal-MCP-Servern:** Produktionsreif statt Hobby-Projekt. Hybrid-Suche mit AI-Reranking (MRR@10 0,676 auf [GerLeRB](https://planit-tech.github.io/lawbster-mcp/benchmarks/)). Pro-Seat-Quota, OAuth + API-Key, kommerzieller Support, tägliche Aktualisierung aus amtlichen Quellen.

**Gegenüber Komplett-KI-Lösungen (Harvey, Noxtua):** Lawbster ist die **darunterliegende Schicht** — der zitierfähige Rechtskontext-Provider. Eigenes LLM, eigener Workflow. Wie Context7, aber für deutsches und europäisches Recht.

---

## Compliance & Sicherheit

- **Hosting in Deutschland.** Alle Daten ausschließlich auf Hetzner-Servern in Deutschland verarbeitet und gespeichert.
- **DSGVO-konform.** Auftragsverarbeitungsvertrag (AVV) nach Art. 28 DSGVO inklusive.
- **Keine automatisierte Entscheidungsfindung** über Betroffene (Art. 22 DSGVO).
- **Stripe für Zahlungsabwicklung** unter EU-US Data Privacy Framework (Art. 45 DSGVO).
- **API-Keys SHA-256-gehasht** in der Datenbank, Klartext nur einmal sichtbar.
- **Dual-Auth:** API-Key (`sk-legal-…`) für Server-to-Server, OAuth 2.1 mit JWT für Web-Clients.
- **Pro-Seat-Quota** mit Fair-Use-Limit (60 Anfragen/min).

→ [Vollständige Compliance-Übersicht](https://planit-tech.github.io/lawbster-mcp/compliance/)

---

## Pricing

**Ein Plan, klare Abrechnung.** 19 € pro Seat / Monat. 14 Tage kostenlos testen, keine Kreditkarte erforderlich, jederzeit kündbar.

→ [Pricing-Details](https://lawbster.planitprima.com/pricing)

---

## Über dieses Repository

Dieses Repository hostet die **öffentliche Dokumentation** für Lawbster MCP. Der Server-Quellcode ist nicht Open Source — Lawbster ist ein gemanagter SaaS-Dienst, betrieben von **PLANIT // TECH GmbH** in Deutschland.

- **Live-Service:** [lawbster.planitprima.com](https://lawbster.planitprima.com)
- **Hauptdokumentation:** [planit-tech.github.io/lawbster-mcp](https://planit-tech.github.io/lawbster-mcp/)
- **Dokumentation auf Englisch:** [planit-tech.github.io/lawbster-mcp/en/](https://planit-tech.github.io/lawbster-mcp/en/)
- **Status & Changelog:** [Changelog](https://planit-tech.github.io/lawbster-mcp/changelog/)
- **Benchmarks:** [GerLeRB Retrieval-Qualität](https://planit-tech.github.io/lawbster-mcp/benchmarks/)
- **Datenschutz / Impressum / AGB:** [auf der Website](https://lawbster.planitprima.com/datenschutz)

Pull Requests an die Doku sind willkommen — Tippfehler, fehlende Beispiele, Übersetzungen, neue Quickstart-Guides für weitere MCP-Clients.

---

## Schlagworte / Topics

`mcp` · `model-context-protocol` · `claude` · `chatgpt` · `legal-tech` · `german-law` · `eu-law` · `bgb` · `dsgvo` · `gdpr` · `eur-lex` · `rag` · `retrieval-augmented-generation` · `hybrid-search` · `legal-ai` · `juristische-ki` · `rechtsdatenbank`

---

<sub>© 2026 PLANIT // TECH GmbH · [Impressum](https://lawbster.planitprima.com/impressum) · [Datenschutz](https://lawbster.planitprima.com/datenschutz) · [AGB](https://lawbster.planitprima.com/agb)</sub>
