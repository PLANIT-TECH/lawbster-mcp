---
title: MCP Prompts — legal_research, citation_resolve, compare_de_eu
description: >-
  Drei vorkonfigurierte Prompts für saubere juristische Recherche-Workflows.
  Erscheinen als Slash-Commands in Claude Desktop, Claude.ai, Copilot Studio.
keywords:
  - MCP Prompts
  - legal_research Prompt
  - citation_resolve
  - compare_de_eu
  - juristische KI Prompts
---

# MCP Prompts

**Prompts** sind versionierte, parametrisierbare System-Prompt-Templates, die ein MCP-Client als **Slash-Commands** anbietet. Sie zwingen den LLM-Workflow in eine saubere Bahn — Pflicht zur Tool-Nutzung, Verbot ausgedachter Zitate, definierte Antwort-Struktur.

Lawbster liefert drei Prompts mit. Sie sind **public** — kein Auth, kein Quota — weil sie keine Kundendaten enthalten und keine DB-Calls auslösen.

## `/legal_research`

**Strukturierte Recherche-Antwort mit Fußnoten-Zitaten.**

| Parameter | Werte | Default |
| --- | --- | --- |
| `jurisdiction` | `DE`, `EU`, `DE+EU` | `DE+EU` |
| `depth` | `thorough`, `quick` | `thorough` |

Erzwingt:

- mindestens einen `legal_search` oder `legal_lookup`-Aufruf vor jeder substantiellen Aussage
- Fußnoten-Zitate mit Norm-Kürzel und Datum
- explizite Markierung, wenn keine einschlägige Norm gefunden wurde
- Verbot von „nach meinem Wissen"-Formulierungen

**Beispiel-Aufruf in Claude Desktop**:

```
/legal_research jurisdiction=DE+EU depth=thorough

Frage: Welche Pflichten hat ein Verantwortlicher bei einem Datenleck nach DSGVO?
```

## `/citation_resolve`

**Resolves a single citation to its verified full text.**

| Parameter | Werte | Default |
| --- | --- | --- |
| `citation` | string | (erforderlich) |

Ruft `legal_lookup` auf das angegebene Zitat und liefert ausschließlich den Volltext mit Hierarchie und Stand — keine Interpretation, keine Auslegung. Perfekt, wenn der Anwender „nur den Wortlaut" will.

**Beispiel**:

```
/citation_resolve citation="§ 823 BGB"
```

## `/compare_de_eu`

**Stellt deutsche und EU-Regelung gegenüber und benennt das Verhältnis** (Umsetzung, Ergänzung, Goldplating, Eigenständig).

| Parameter | Werte | Default |
| --- | --- | --- |
| `topic` | string | (erforderlich) |

Erzwingt:

- ein `legal_search jurisdiction=de` und ein `legal_search jurisdiction=eu`
- Ausweisung des **Verhältnisses**: Setzt das deutsche Recht eine EU-Vorgabe um? Geht es darüber hinaus? Existiert nur DE-, nur EU- oder beidseitige Regelung?
- Quellen für beide Seiten

**Beispiel**:

```
/compare_de_eu topic="Vorratsdatenspeicherung von Telekommunikationsdaten"
```

---

## Verfügbarkeit pro Client

| Client | Prompts |
| --- | --- |
| **Claude Desktop** | ✅ Erscheinen als `/legal_research`, `/citation_resolve`, `/compare_de_eu` |
| **Claude.ai (Web)** | ✅ Slash-Befehle im Connector-Dropdown |
| **Copilot Studio** | ✅ Über den Custom Connector |
| **Cursor** | ⚠️ Eingeschränkte Prompt-Unterstützung (manuell kopieren) |
| **ChatGPT** | ⚠️ Aktuell keine native Prompt-Unterstützung in Custom Connectors |

## Eigene Prompts?

Lawbster-Prompts sind **public und statisch** — wir hosten keine kunden-spezifischen Prompts. Wer kunden-spezifische System-Prompts auf Lawbster aufsetzen möchte, baut sie clientseitig (z. B. als Cursor-Workflow oder Copilot-Studio-Topic-Trigger).
