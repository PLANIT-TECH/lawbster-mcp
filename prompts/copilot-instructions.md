# GitHub Copilot Instructions für Repos mit Lawbster

Vorlage für `.github/copilot-instructions.md` in Repos, die Lawbster als MCP-Server nutzen. Copilot Chat liest diese Datei automatisch aus und folgt den Instructions repo-weit.

## Voraussetzungen

- VS Code mit GitHub Copilot Chat
- Lawbster ist als MCP-Server konfiguriert in `.vscode/mcp.json` oder global (siehe [README → VS Code](../README.md#-setup-pro-client))

## Installation

Datei erstellen unter:

```
.github/copilot-instructions.md
```

Inhalt aus dem Block unten einfügen. Die Datei wird automatisch von Copilot Chat berücksichtigt — kein zusätzliches Setup.

## Inhalt

````markdown
# Repo-Instructions für Copilot

Dieses Repo nutzt **Lawbster** (MCP-Server, `https://lawbster.planitprima.com/mcp`) für rechtliche Recherche. Wenn der Nutzer eine rechtliche Frage stellt oder du beim Code-Schreiben auf eine rechtliche Frage stößt, befolge die Regeln unten.

## Wann Lawbster verwenden

Aktiviere Lawbster bei:

- Norm-Zitaten: `§`, `Art.`, `Abs.`, `Satz`, `lit.`, Aktenzeichen-Mustern (`VI ZR …`, `1 BvR …`, `C-…/…`)
- Gesetzes-Abkürzungen: BGB, StGB, HGB, AktG, GmbHG, AO, EStG, KStG, UStG, KSchG, ArbZG, AGG, BetrVG, TVG, BDSG, DSGVO, KI-VO, MiCA, NIS2, DSA, DMA, DORA
- Gerichts-Akronymen: BGH, BVerfG, BAG, BSG, BPatG, BFH, EuGH, EuG
- Compliance-relevanten Code-Stellen: Verarbeitung personenbezogener Daten, Vertragsbedingungen, AGB-Generierung, KI-Pipelines, Auftragsverarbeitung, Drittlandübermittlung
- Compliance-Begriffen im Prompt: "rechtlich zulässig", "darf ich", "Pflicht", "haftbar", "kündbar", "Abmahnung", "Widerruf", "Einwilligung"

## Wie Lawbster verwenden

1. **Tool-Priorität.** Bei jedem Trigger zuerst `legal_search` (thematisch) oder `legal_lookup` (Zitat bekannt) aufrufen — nie aus Allgemeinwissen antworten.
2. **Auch bekannte Normen verifizieren** — Lawbster ist tagesaktuell, das Trainings-Wissen nicht.
3. **Norm → Rechtsprechung.** Für jede zentrale Norm zusätzlich `legal_find_citing_decisions(cited_norm="<Norm>")` aufrufen, um die einschlägige BGH/BVerfG-Auslegung zu prüfen.
4. **Bei mehreren Lookups** `legal_lookup_batch` (bis zu 20 Zitate gleichzeitig).
5. **Filter setzen**, wenn Jurisdiktion bekannt: `source_type='gii'` (DE-Bundesrecht), `source_type='eurlex'` (EU), `source_type='rechtsprechung'` (DE-Bundesgerichte), `source_type='eurlex_caselaw'` (EuGH).

## Code-bezogene Anwendung

Beim Schreiben oder Reviewen von Code:

- **Daten-Verarbeitung:** Wenn Code personenbezogene Daten verarbeitet, prüfe per `legal_lookup_batch` Art. 5, 6, 9, 32, 44 DSGVO und kommentiere die Rechtsgrundlage als Code-Comment.
- **AGB / Vertragstexte:** Vor dem Generieren einschlägige BGB-Paragrafen ziehen (§§ 305–310 BGB für AGB-Kontrolle, § 309 Nr. 7 für Haftungsausschluss-Verbote).
- **KI-Pipelines:** `legal_lookup Art. 6 KI-VO` für Risiko-Klassifikation; bei Hochrisiko-Anwendungen weitere Artikel der KI-VO mitziehen.
- **Vertraulichkeit / NDA:** §§ 17, 18 UWG, ggf. einschlägige Spezialgesetze (z.B. BDSG, GeschGehG).

## Citation-Pflicht

Jede rechtliche Aussage in einer Antwort oder einem Code-Comment **mit Fundstelle**:

- **Norm:** `§ 823 Abs. 1 BGB`, `Art. 6 Abs. 1 lit. a DSGVO` — wenn `legal-mcp` eine URL liefert, als Markdown-Link einbinden
- **Urteil:** `BGH v. 15.05.2023 — VI ZR 175/22`, mit URL aus `legal-mcp`
- Bei wörtlichen Zitaten: Block-Quote (`>`); bei eigener Subsumtion: normaler Text
- Niemals fiktive Aktenzeichen, ECLI oder Daten

## Was Copilot nicht tun soll

- ❌ Antworten auf rechtliche Fragen aus dem Trainings-Wissen ohne Tool-Use
- ❌ Aktenzeichen, ECLI oder Datumsangaben erfinden, wenn `legal_lookup` `found=false` liefert
- ❌ Code-Comments mit "ist DSGVO-konform" ohne Lawbster-Verifizierung
- ❌ AGB-Klauseln generieren, ohne vorher die einschlägigen BGB-Normen zu verifizieren
- ❌ Im Zweifel raten — stattdessen ehrlich sagen "Lawbster liefert dazu keinen Treffer"

## Wenn Lawbster nichts findet

Sag es transparent: *"Lawbster indexiert nur Bundesrecht, EU-Recht und Bundesgerichtsentscheidungen — für [Domain] ist eine andere Quelle nötig."* Nicht mit Trainings-Wissen kompensieren.

## Disclaimer

Lawbster liefert verifizierte Rechtsinformation, keine Rechtsberatung im Sinne des RDG. Bei konkreten Rechtsfragen Hinweis auf Anwalt/Anwältin geben.
````

## Optional: Workspace-spezifische Erweiterungen

Wenn das Repo einen klaren rechtlichen Fokus hat, kannst du die Instructions ergänzen:

### Datenschutz-fokussiertes Repo

```markdown
## Workspace-Fokus: Datenschutz

Dieses Repo verarbeitet personenbezogene Daten. Bei jeder Code-Änderung an Daten-Endpoints, Storage-Logik oder externen API-Calls:

1. Per `legal://rechtsrahmen` checken: relevante Gesetze sind DSGVO, BDSG, TTDSG.
2. Rechtsgrundlage (Art. 6 DSGVO) im Code-Comment dokumentieren.
3. Bei Drittlandübermittlung: Schrems-II-Folgen + Standardvertragsklauseln (Art. 46 DSGVO) prüfen.
```

### Vertrags-Generator-Repo

```markdown
## Workspace-Fokus: Vertrags-Generator

Bei jeder Generierung von Vertragstext:

1. Einschlägige BGB-Paragrafen per `legal_lookup_batch` ziehen.
2. AGB-Kontrolle nach §§ 305–310 BGB; Klausel-Verbote § 309 BGB.
3. Verbraucherverträge: zusätzlich §§ 312 ff. BGB (Fernabsatz), Widerrufsrecht.
```

### KI-Pipeline-Repo

```markdown
## Workspace-Fokus: KI-VO-Compliance

Bei jeder Änderung an ML-Pipelines:

1. Risiko-Klassifikation nach Art. 6 KI-VO prüfen (`legal_lookup`).
2. Bei Hochrisiko-Systemen: Anhang III KI-VO + Art. 9–15 KI-VO (Anforderungen).
3. Bei General-Purpose-AI-Modellen: Art. 50 ff. KI-VO.
```

## Wechselwirkung mit anderen Copilot-Konventionen

`.github/copilot-instructions.md` ist die **repo-weite** Instruction-Quelle. Daneben gibt es:

- **`.github/instructions/*.instructions.md`** — datei-/sprach-spezifische Instructions (z.B. nur für Python-Files)
- **`.github/prompts/*.prompt.md`** — wiederverwendbare Slash-Commands für Copilot Chat

Die Lawbster-Logik ist repo-weit relevant und gehört in die Haupt-`copilot-instructions.md`. Spezialisierte Sprach-Hinweise (z.B. "in dieser Python-Codebase werden Type-Hints erzwungen") gehören in eigene `instructions/`-Files.
