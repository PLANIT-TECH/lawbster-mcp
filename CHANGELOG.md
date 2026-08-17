# Changelog

Strukturierter Überblick über die nennenswerten Änderungen seit dem Launch. Reine Bugfixes und Performance-Tunings sind hier nicht aufgelistet — die laufen kontinuierlich im Hintergrund.

Format orientiert an [Keep a Changelog](https://keepachangelog.com/de/1.1.0/).

## 2026

### August 2026

**Umbenennung: Lawbster heißt jetzt PRIMAMCP**
- **Neue Adresse** — der Dienst läuft ab sofort unter [mcp.planitprima.com](https://mcp.planitprima.com); die bisherige Adresse `lawbster.planitprima.com` wird abgelöst. API-Keys, Abos und Kontingente bleiben unverändert.
- **Neues npm-Paket** `@planit-tech/primamcp` (Binary `primamcp`) ersetzt `@planit-lawbster/lawbster-mcp`. Einrichtung: `npx -y @planit-tech/primamcp setup --client <claude|cursor|vscode|windsurf>`.
- **Neue Umgebungsvariablen** `PRIMAMCP_API_KEY` und `PRIMAMCP_MCP_URL` ersetzen `LAWBSTER_API_KEY` / `LAWBSTER_MCP_URL` — **ohne Fallback**. Bestehende Konfigurationen müssen einmalig angepasst werden.
- **Neuer Server-Eintragsname** in MCP-Client-Konfigurationen: `primamcp` statt `lawbster`. Der alte Eintrag kann nach dem Setup entfernt werden.

### Juni 2026

**Neue Quellen**
- **Historische Leitentscheidungen** — Leitentscheidungen des Bundesverfassungsgerichts aus der amtlichen Sammlung (inkl. Klassiker wie Lüth und Elfes) sowie Urteile des Bundesverwaltungsgerichts, jeweils der Bestand bis 2009. Schließt die Lücke unterhalb der ab 2010 verfügbaren Bundesrechtsprechung.
- **Bundes-Verwaltungsvorschriften** — allgemeine Verwaltungsvorschriften des Bundes (z. B. TA Luft, Anwendungserlasse).
- **Datenschutz-Guidance** — Leitlinien, Empfehlungen und Beschlüsse des Europäischen Datenschutzausschusses (EDSA/EDPB) und der deutschen Datenschutzkonferenz (DSK): die maßgebliche behördliche Auslegung zu DSGVO und BDSG.
- **NRW-Rechtsprechung** — Entscheidungen der nordrhein-westfälischen Obergerichte (OVG, OLG/LAG/FG Düsseldorf·Hamm·Köln·Münster, LSG NRW, Verfassungsgerichtshof NRW).
- **Gesetzesmaterialien** — amtliche Gesetzesbegründungen aus den BT-Drucksachen des Deutschen Bundestages.

**Neue Funktionen**
- **Neues Tool `legal_get_materials`** — die amtliche Begründung zu einer Norm direkt abrufbar (Grundlage der historischen Auslegung, „Wille des Gesetzgebers"). Damit jetzt neun Tools.
- **Neuer Filter `cited_norm` für `legal_search`** — findet gezielt Entscheidungen, die eine konkrete Norm zitieren; mit einer fallspezifischen Frage kombiniert liefert das die passende Rechtsprechung zu einem Sachverhalt.
- **Öffentlicher Gesetzes-Browser** — rund 235.000 frei zugängliche Norm-Seiten zu deutschem Bundesrecht und EU-Recht auf [mcp.planitprima.com](https://mcp.planitprima.com), jeweils mit verlinkter einschlägiger Rechtsprechung und — wo vorhanden — erläuternden Beschreibungen. Kein Login, voll indexierbar.
- **Abdeckungs-Suche auf der Startseite** („Ist mein Gesetz dabei?") — eine Freitextsuche, die über alle Gesetzes-Quellen sofort beantwortet, ob die für dich relevanten Gesetze in PRIMAMCP indexiert sind.

### Mai 2026

**Neue Quellen**
- **Landesrecht Bayern und Nordrhein-Westfalen** — Landesgesetze und Verordnungen beider Länder.
- **Sächsische Rechtsprechung** — Urteile und Beschlüsse des Sächsischen Oberverwaltungsgerichts (Bautzen).

**Neue Funktionen**
- **Erweiterte Filter** — Filter nach Gericht (`court`) und nach Jurisdiktion (`de` umfasst jetzt Bund **und** Länder). Die neue Resource `legal://filter_values` dokumentiert alle gültigen Filterwerte samt Abgrenzungen.
- **Mehrsprachigkeit** — sprach-bewusste Suche per `language`-Filter und ein englischsprachiger Korpus (EUR-Lex, Datenschutz-Guidance) zusätzlich zum deutschen.
- **Confidence-Scores & Hinweise** — Such- und Lookup-Antworten enthalten eine Vertrauenseinstufung und Hinweise zur nächsten sinnvollen Aktion; geführter Setup-Assistent für die MCP-Client-Einrichtung.

**Verteilung & Integration**
- **npm-Wrapper-Paket** `@planit-tech/primamcp` — stdio↔HTTPS-Bridge für lokale MCP-Clients; Einrichtung per `npx -y @planit-tech/primamcp setup --client <claude|cursor|vscode|windsurf>`.
- **Fertige Integrations-Snippets** für Cursor, Claude Code, ChatGPT (Custom GPT) und GitHub Copilot.
- **README-first-Dokumentation** in Deutsch und Englisch; die frühere separate Doku-Website wurde abgelöst.

### 29. April 2026
- **Öffentliche GitHub-Pages-Doku** unter [planit-tech.github.io/primamcp](https://planit-tech.github.io/primamcp/) live — DE und EN.

### 23. April 2026
- **Public Launch.** PRIMAMCP wird öffentlich verfügbar.
- Initialer Funktionsumfang: deutsches Bundesrecht, EU-Recht und Bundesgerichtsentscheidungen, Hybrid-Suche mit AI-Reranking, acht MCP-Tools, drei Prompts, Resources, OAuth + API-Key, Pro-Seat-Quota, AVV inklusive.

---

**Bug oder Feature-Wunsch?** → `support@planitprima.com` oder [GitHub Issues](https://github.com/PLANIT-TECH/primamcp/issues).
