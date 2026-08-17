# Architektur & Suchpipeline

Eine reine Volltext-Suche scheitert an juristischer Sprache: „Schuldrecht" steht nicht in jedem Paragrafen, der Schuldrecht regelt. Eine reine semantische Suche scheitert an Spezialbegriffen wie „Wegerecht" oder „Altenteil", die exakt erkannt werden müssen. **PRIMAMCP kombiniert beides** und schaltet einen **AI-Reranking-Schritt** dahinter, der die Top-Treffer noch einmal prüft, bevor sie an den Bot zurückgehen.

## Drei Stufen

1. **Semantische Suche** — versteht den Sinn der Anfrage, auch wenn die Worte nicht 1:1 in der Norm stehen.
2. **Keyword-Suche** — fängt Begriffe, die nur exakt richtig sind (Norm-Nummern, Rechtsbegriffe, Eigennamen).
3. **AI-Reranking** — bewertet die Top-Kandidaten erneut im Kontext der konkreten Frage und ordnet sie um.

## Filter wirken bereits in Stufe 1 + 2

Wenn ein Bot `jurisdiction=eu` setzt, sucht PRIMAMCP gar nicht erst im deutschen Bundesrecht. Das verkleinert den Suchraum, beschleunigt die Antwort und schließt Falschtreffer aus.

## Verifizierte Fundstellen, nicht nur „passt-vermutlich"

Jeder Treffer enthält:

- **Norm-ID + Zitat** (z. B. `§ 823 BGB`)
- **Volltext oder Snippet** der relevanten Passage
- **Hierarchie-Pfad** (Buch → Abschnitt → Titel → Norm)
- **Quelle** und **Stand** (letzte Änderung, Versionsdatum)
- **Direkt-URL** zur amtlichen Quelle

Damit kann das LLM jede Aussage mit Fundstelle untermauern — und Anwender können selbst nachschlagen.

## Qualität messbar

Auf dem öffentlichen [GerLeRB-Benchmark](benchmarks.md) erreicht PRIMAMCP **MRR@10 = 0,676**. Das ist Mehrwert, der sich rechnen lässt: in der Praxis findet das Modell die richtige Norm in den meisten Fällen unter den ersten zwei oder drei Treffern, statt dass das LLM sich durch zehn falsche durcharbeiten muss.

## Was nicht passieren darf

**Halluzinationen.** Treffer kommen ausschließlich aus dem indexierten Bestand — PRIMAMCP generiert keine Norm-Texte, sondern liefert die im Index vorhandenen Stellen. Wenn keine passende Norm gefunden wird, gibt das Tool das auch so zurück, statt etwas zu erfinden.

**Veraltete Daten.** PRIMAMCP aktualisiert sich täglich. Eine Gesetzesänderung von vorgestern ist heute im Index.

**Stille Qualitätsverluste.** Jede Änderung am Suchverfahren wird gegen den Benchmark validiert, bevor sie live geht.

## Datenquellen

PRIMAMCP speist sich ausschließlich aus **amtlichen, frei zugänglichen Quellen**. Keine Drittanbieter-Daten, keine Verlagslizenz nötig, keine intransparente Lizenzkette.

| Quelle | Inhalt | Aktualität |
| --- | --- | --- |
| **Deutsches Bundesrecht** | BGB, ZPO, HGB, AktG, GmbHG, StGB, StPO, AO, EStG, KStG, UStG, SGB I–XII, KSchG, ArbZG, MiLoG, AGG, BetrVG, TVG, BDSG, … | Täglich |
| **EU-Recht** | DSGVO, KI-VO, MiCA, DORA, NIS2, DSA, DMA, Data Act, Data Governance Act, Verordnungen, Richtlinien | Täglich |
| **EuGH-Rechtsprechung** | Verfahrensnummern wie `C-311/18`, `T-451/20` | Täglich |
| **Bundesgerichte** | BGH (Zivil/Straf), BVerfG (Verfassung), BAG (Arbeit), BSG (Sozial), BPatG (Patent/Marken), BFH (Steuer/Zoll) | Täglich |

Die Hierarchie wird mitindiziert — Buch, Abschnitt, Titel werden als Kontext mitgeführt, damit ein KI-Assistent eine Norm im Gesetzeskontext einordnen kann.

**Reverse-Index:** Welche Norm wurde von welcher Entscheidung zitiert? Diese Verknüpfung wird beim Indexieren aufgebaut und treibt das Tool [`legal_find_citing_decisions`](tools-reference.md#legal_find_citing_decisions).

## Update-Zyklus

Jede Nacht läuft ein automatisierter Ingest, der geänderte Dokumente erkennt, neu einliest und im Index aktualisiert. Bei einem Fehler bleibt die Datenbasis konsistent — der nächste Run holt fehlende Updates nach. Kein Datenverlust, kein manueller Eingriff.
