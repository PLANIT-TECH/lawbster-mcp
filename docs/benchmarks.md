# Benchmarks

PRIMAMCP wird gegen den **GerLeRB**-Benchmark evaluiert — den (aktuell) einzigen offen verfügbaren deutschen Legal-Retrieval-Benchmark mit Ground-Truth-Annotationen.

## GerLeRB

**GerLeRB** (German Legal Retrieval Benchmark) ist ein Open-Source-Datensatz mit 367 sorgfältig kuratierten Rechtsfragen und Ground-Truth-Mapping auf Normen aus 58 deutschen Gesetzbüchern.

- **Datensatz:** publiziert auf Zenodo
- **Methodik:** Jede Frage wurde von Jurist:innen erstellt und auf eine oder mehrere einschlägige Normen gemappt. Retrieval-Systeme werden gemessen an MRR@10, nDCG@10 und Recall@10.

## PRIMAMCP auf GerLeRB

| Metrik | Wert |
| --- | --- |
| **MRR@10** | **0,676** |
| **Hit-Rate (LLM-QA)** | bis zu 90 % |
| **Lookup-Direktrate** (Zitat → korrekte Norm) | **98,4 %** |

In der Praxis: Wenn ein Bot eine natürlichsprachliche Frage stellt, findet PRIMAMCP die richtige Norm in den meisten Fällen unter den ersten zwei oder drei Treffern. Wenn ein Zitat im Prompt steht, trifft der Direkt-Lookup in 98,4 % der Fälle die exakt korrekte Norm im ersten Versuch.

## Reproduzierbarkeit

Die Benchmark-Werte von PRIMAMCP sind **nicht „intern gemessen, nicht reproduzierbar"** — sie kommen mit öffentlichem Datensatz und sind in jeder PRIMAMCP-Instanz nachprüfbar. Das ist bewusste Differenzierung gegenüber kommerziellen Konkurrenten, die ihre Qualität meistens hinter Marketing-Aussagen verstecken.

## Wo PRIMAMCP heute schwächer ist

Ehrlichkeit gehört zum Produktversprechen. Aktuelle Schwachstellen:

- **Sehr alte Bundesgerichtsentscheidungen** (vor ~1990) sind in der amtlichen Quelle teils nur unvollständig digitalisiert. Die Coverage hängt also von der Quelle ab, nicht von PRIMAMCP.
- **Kommunalrecht und Berufsständisches Recht** (Kammergesetze, Satzungen) sind nicht Teil des Korpus.
- **Lehrmeinungen, Kommentarliteratur, Fachzeitschriften** sind verlagslizenziertes Material — PRIMAMCP hat sie nicht.

Wer das braucht, nutzt PRIMAMCP als Basis-Layer und kombiniert mit einer Verlagslizenz.
