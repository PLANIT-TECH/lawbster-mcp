---
description: Strukturierte juristische Recherche mit Fußnoten-Zitaten via PRIMAMCP.
argument-hint: <Frage> [jurisdiction=DE|EU|DE+EU] [depth=quick|thorough]
---

# /primamcp:research

Führt eine strukturierte Rechtsrecherche durch — mit Pflicht zur Tool-Nutzung, Fußnoten-Zitaten und sauberer Trennung von wörtlichem Zitat (Block-Quote) und eigener Subsumtion.

## Nutzung

```
/primamcp:research <Frage> [jurisdiction=DE+EU] [depth=thorough]
```

- **Frage**: natürlichsprachlich. Z. B. „Welche Pflichten hat ein Verantwortlicher bei einem Datenleck nach DSGVO?"
- **jurisdiction**: `DE` (nur deutsches Bundesrecht), `EU` (nur EU-Recht), `DE+EU` (beides — Default).
- **depth**: `thorough` (Default — volle Kommentierung) oder `quick` (3–5 Sätze Kernaussagen).

## Beispiele

```
/primamcp:research Voraussetzungen für eine Schmerzensgeldforderung nach § 253 BGB
/primamcp:research Drittlandübermittlung personenbezogener Daten jurisdiction=EU
/primamcp:research Widerrufsrecht bei Fernabsatzverträgen jurisdiction=DE+EU depth=thorough
```

## Workflow (was PRIMAMCP im Hintergrund macht)

1. **Frage zerlegt** — relevante Rechtsdomäne identifiziert; bei Unsicherheit `legal://rechtsrahmen` konsultiert (Domain → Gesetze).
2. **Suche** — `legal_search` mit natürlichsprachlicher Query; `source_type` passt zur `jurisdiction` (`gii` = DE-Bundesrecht, `eurlex` = EU, `eurlex_caselaw` = EuGH).
3. **Verifikation** — jede Norm, die zitiert werden soll, mit `legal_lookup` (oder `legal_lookup_batch` für 2+) auf den Volltext geprüft.
4. **Kontext** — bei zentralen Normen `legal_get_context` für umliegende Paragrafen (Auslegungs-Kontext).
5. **Auslegungspraxis** — `legal_find_citing_decisions` für DE-Bundesgerichte; für EuGH stattdessen `legal_search source_type=eurlex_caselaw`.
6. **Antwort** — strukturiert in *Zusammenfassung* / *Rechtliche Würdigung* / *Quellen*, Fußnoten `[1]`, `[2]` mit Norm-Kürzel + Stand + URL.

## Hard rules

- **Keine fiktiven Quellen.** Wenn `legal_lookup` `found=false` liefert, mit `legal_search` als Fallback suchen — sonst „Fundstelle nicht auffindbar" sagen.
- **Keine ungesicherten Aussagen.** Was nicht im Tool-Output steht, kommt nicht in die Antwort.
- **Keine Rechtsberatung.** PRIMAMCP liefert verifizierte Rechtsinformation, nicht Rechtsberatung im Sinne des RDG. Bei konkreter Beratung Hinweis auf Anwalt/Anwältin.
