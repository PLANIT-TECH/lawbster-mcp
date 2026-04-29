---
title: MCP Resources — Rechtsrahmen, Filter, CELEX-Registry, Norm-Templates
description: >-
  Lawbster bietet drei statische und drei dynamische MCP Resources für
  bessere Bot-Orientierung — von der Domain-zu-Gesetz-Karte bis zu
  Einzelnorm-URIs.
keywords:
  - MCP Resources
  - legal Resource Templates
  - rechtsrahmen Resource
  - CELEX Registry MCP
---

# MCP Resources

Neben den acht Tools stellt Lawbster **MCP Resources** bereit. Resources sind URI-adressierbare Inhalte (`legal://…`), die Clients als Kontext-Quellen einbinden können — analog zu Datei-Anhängen, aber serverseitig kuratiert.

Zwei Kategorien:

| Kategorie | URIs | Quota |
| --- | --- | --- |
| **Statisch (öffentlich)** | `legal://rechtsrahmen`, `legal://filter_values`, `legal://eu_celex_registry` | Kein Quota-Verbrauch |
| **Dynamisch (Templates)** | `legal://norm/{norm_id}`, `legal://law/{source_type}/{abbreviation}`, `legal://eu/celex/{celex}` | Zählt aufs Pro-Seat-Quota wie ein Tool-Call |

---

## Statische Resources

### `legal://rechtsrahmen`

**Domain → einschlägige Gesetze.** Ein kuratiertes Mapping, das LLMs hilft, den richtigen Rechtsrahmen für eine Frage zu identifizieren.

Beispiele:

- **Datenschutz**: DSGVO, BDSG, TTDSG, KI-VO (Datenverarbeitungs-Aspekte)
- **Versicherungsrecht**: VVG (Spezialgesetz), BGB (Subsidiärrecht) — *nicht* nur BGB
- **Steuerrecht**: AO (Verfahrensrecht), EStG / KStG / UStG (Materielles Recht) — *nicht* BGB

Außerdem flagged das Resource bekannte Verwechslungs-Cluster („VVG vs BGB", „AO vs EStG"), damit das LLM nicht den Subsidiäransatz nimmt, wenn es ein Spezialgesetz gibt.

### `legal://filter_values`

**Gültige Werte für Filter** in `legal_search`, `legal_list_laws`, `legal_find_citing_decisions`. Ein Bot, der alle möglichen Werte vor dem ersten Tool-Call kennt, vermeidet `INVALID_FILTER`-Fehler.

### `legal://eu_celex_registry`

**Kuratierte CELEX-Identifier** für die wichtigsten EU-Rechtsakte (DSGVO, KI-VO, MiCA, NIS2, …). Mapping `name → CELEX ID → EUR-Lex URI`. Wertvoll, weil EUR-Lex' eigene Suche schwierig ist und CELEX-IDs häufig direkt zitiert werden.

---

## Dynamische Resource Templates

### `legal://norm/{norm_id}`

**Volltext einer Einzelnorm** per stabiler Norm-ID. Identisch zum Output von `legal_lookup`, aber als Resource adressierbar — manche MCP-Clients (Copilot Studio, Claude.ai) können Resources besser einbinden als Tool-Outputs.

### `legal://law/{source_type}/{abbreviation}`

**Inhaltsverzeichnis eines Gesetzes** als Resource. Identisch zum Output von `legal_get_toc`. Beispiel: `legal://law/gii/BGB`.

### `legal://eu/celex/{celex}`

**EU-Rechtsakt per CELEX-ID** mit TOC und Direkt-Links zu Artikeln. Beispiel: `legal://eu/celex/32016R0679` (DSGVO).

---

## Wann Resources statt Tools?

| Use Case | Empfehlung |
| --- | --- |
| Einmalige Lookups in einer Chat-Session | **Tools** (`legal_lookup`, `legal_get_toc`) |
| Wiederverwendbare Referenzen, die der Anwender „anhängt" | **Resources** (Templates) |
| Bot-Orientierung („was kann Lawbster?") | **Statische Resources** (`legal://rechtsrahmen`) |
| Coverage-Statistiken im Header | **Tool** (`legal_get_stats`) |

Faustregel: Statische Resources sind **immer** kostenlos und ein guter Default, sobald der Client sie unterstützt. Dynamische Resources kosten dasselbe wie Tools — nutze, was dein Client am besten kann.
