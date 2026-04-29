---
title: Datenquellen — woher Lawbster die Rechtstexte bezieht
description: >-
  Lawbster bezieht alle Inhalte aus amtlichen, frei zugänglichen Quellen:
  deutsches Bundesrecht, EU-Recht, Bundesgerichtsentscheidungen. Tägliches
  Update, transparente Provenienz, jeder Treffer mit Direkt-Link zur Quelle.
keywords:
  - Datenquellen Recht
  - Bundesrecht API
  - EU-Recht API
  - Rechtsprechung Datenbank
  - amtliche Rechtstexte
---

# Datenquellen

Lawbster speist sich ausschließlich aus **amtlichen, frei zugänglichen Quellen**. Keine Drittanbieter-Daten, keine Verlagslizenz nötig, keine intransparente Lizenzkette — und das Update läuft täglich automatisch.

## Übersicht

| Quelle | Inhalt | Aktualität |
| --- | --- | --- |
| **Deutsches Bundesrecht** | BGB, StGB, HGB, AO, EStG, GewO, AGG, KSchG, ArbZG, MiLoG, … | Täglich |
| **EU-Recht** | DSGVO, KI-VO, MiCA, NIS2, Verordnungen, Richtlinien | Täglich |
| **Rechtsprechung** | Entscheidungen der Bundesgerichte | Täglich |

---

## Deutsches Bundesrecht

**Quelle:** amtliches Gesetzes-Portal des Bundes.
**Coverage:**

- Zivilrecht: BGB, ZPO, HGB, AktG, GmbHG
- Strafrecht: StGB, StPO
- Steuerrecht: AO, EStG, KStG, UStG, GewStG
- Sozialrecht: SGB I bis SGB XII
- Arbeitsrecht: KSchG, ArbZG, MiLoG, AGG, BetrVG, TVG
- Datenschutz: BDSG (DSGVO selbst kommt aus dem EU-Korpus)
- Verkehrs-, IT-, Miet- und Erbrecht

**Die Hierarchie wird mitindiziert** — Buch, Abschnitt, Titel werden als Kontext mitgeführt, damit ein KI-Assistent eine Norm im Gesetzeskontext einordnen kann.

---

## EU-Recht

**Quelle:** offizielle Datenbank der Europäischen Union.
**Coverage:**

- DSGVO, KI-VO, MiCA, DORA, NIS2
- Digital Services Act, Digital Markets Act
- Data Act, Data Governance Act
- weitere Verordnungen, Richtlinien, Beschlüsse

**Sprache:** Lawbster indexiert die deutsche Fassung des EU-Rechts.

**EuGH-Rechtsprechung** ist als eigene Quelle abrufbar (Verfahrensnummern wie `C-311/18`, `T-451/20`).

---

## Rechtsprechung der Bundesgerichte

**Quelle:** amtliches Rechtsprechungs-Portal.
**Coverage:**

| Gericht | Abkürzung | Bereich |
| --- | --- | --- |
| Bundesgerichtshof | BGH | Zivil- und Strafsachen |
| Bundesverfassungsgericht | BVerfG | Verfassungsrecht |
| Bundesarbeitsgericht | BAG | Arbeitsrecht |
| Bundessozialgericht | BSG | Sozialrecht |
| Bundespatentgericht | BPatG | Patent- und Markenrecht |
| Bundesfinanzhof | BFH | Steuer- und Zollrecht |

**Reverse-Index:** Welche Norm wurde von welcher Entscheidung zitiert? Diese Verknüpfung wird beim Indexieren aufgebaut und treibt das Tool [`legal_find_citing_decisions`](tools/legal_find_citing_decisions.md).

---

## Was bei jedem Treffer mitkommt

- **Volltext** der Norm bzw. Entscheidung
- **Stabile Norm-ID** und Zitat
- **Hierarchie-Pfad** im Gesetz
- **Versionsdatum** und Datum der letzten Änderung
- **Direkt-URL** zur amtlichen Quelle — der Anwender kann jederzeit nachprüfen

---

## Update-Zyklus

Jede Nacht läuft ein automatisierter Ingest, der geänderte Dokumente erkennt, neu einliest und im Index aktualisiert. Bei einem Fehler bleibt die Datenbasis konsistent — der nächste Run holt fehlende Updates nach. Kein Datenverlust, kein manueller Eingriff.

→ [Wie Lawbster sucht](search-pipeline.md) · [Benchmarks](benchmarks.md)
