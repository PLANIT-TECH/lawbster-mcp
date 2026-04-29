---
title: Wie Lawbster sucht — Semantik, Keyword, Reranking
description: >-
  Lawbster kombiniert semantische und Keyword-Suche mit einem AI-Reranking-Schritt
  und liefert deutlich präzisere Treffer als Volltext-Suche allein.
keywords:
  - juristische Suche
  - semantische Suche Recht
  - AI Reranking Recht
  - Lawbster Suche
---

# Wie Lawbster sucht

Eine reine Volltext-Suche scheitert an juristischer Sprache: „Schuldrecht" steht nicht in jedem Paragrafen, der Schuldrecht regelt. Eine reine semantische Suche scheitert an Spezialbegriffen wie „Wegerecht" oder „Altenteil", die exakt erkannt werden müssen. **Lawbster kombiniert beides** und schaltet einen **AI-Reranking-Schritt** dahinter, der die Top-Treffer noch einmal prüft, bevor sie an den Bot zurückgehen.

## Drei Stufen

1. **Semantische Suche** — versteht den Sinn der Anfrage, auch wenn die Worte nicht 1:1 in der Norm stehen.
2. **Keyword-Suche** — fängt Begriffe, die nur exakt richtig sind (Norm-Nummern, Rechtsbegriffe, Eigennamen).
3. **AI-Reranking** — bewertet die Top-Kandidaten erneut im Kontext der konkreten Frage und ordnet sie um.

## Filter wirken bereits in Stufe 1 + 2

Wenn ein Bot `jurisdiction=eu` setzt, sucht Lawbster gar nicht erst im deutschen Bundesrecht. Das verkleinert den Suchraum, beschleunigt die Antwort und schließt Falschtreffer aus.

## Verifizierte Fundstellen, nicht nur „passt-vermutlich"

Jeder Treffer enthält:

- **Norm-ID + Zitat** (z. B. `§ 823 BGB`)
- **Volltext oder Snippet** der relevanten Passage
- **Hierarchie-Pfad** (Buch → Abschnitt → Titel → Norm)
- **Quelle** und **Stand** (letzte Änderung, Versionsdatum)
- **Direkt-URL** zur amtlichen Quelle

Damit kann das LLM jede Aussage mit Fundstelle untermauern — und Anwender können selbst nachschlagen.

## Qualität messbar

Auf dem öffentlichen [GerLeRB-Benchmark](benchmarks.md) erreicht Lawbster **MRR@10 = 0,676**. Das ist Mehrwert, der sich rechnen lässt: in der Praxis findet das Modell die richtige Norm in den meisten Fällen unter den ersten zwei oder drei Treffern, statt dass das LLM sich durch zehn falsche durcharbeiten muss.

## Was nicht passieren darf

**Halluzinationen.** Lawbster gibt **niemals** einen Treffer zurück, den es nicht im Index hat. Wenn keine passende Norm existiert, sagt das Tool das ehrlich — KI-Assistenten können dann den Anwender darüber informieren, statt etwas zu erfinden.

**Veraltete Daten.** Lawbster aktualisiert sich täglich. Eine Gesetzesänderung von vorgestern ist heute im Index.

**Stille Qualitätsverluste.** Jede Änderung am Suchverfahren wird gegen den Benchmark validiert, bevor sie live geht.
