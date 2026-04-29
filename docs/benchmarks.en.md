---
title: Benchmarks — retrieval quality on GerLeRB
description: >-
  Lawbster on the GerLeRB benchmark: 367 German legal questions, 58
  statute books. MRR@10 0.676. Transparent and reproducible, dataset on
  Zenodo.
keywords:
  - GerLeRB benchmark
  - legal retrieval benchmark
  - MRR@10 law
  - legal search benchmark
  - Lawbster quality
---

# Benchmarks

Lawbster is evaluated against the **GerLeRB** benchmark — currently the only openly available German legal-retrieval benchmark with ground-truth annotations.

## GerLeRB

**GerLeRB** (German Legal Retrieval Benchmark) is an open-source dataset with 367 carefully curated legal questions and a ground-truth mapping to norms from 58 German statute books.

- **Dataset:** published on Zenodo
- **Methodology:** Each question was authored by lawyers and mapped to one or more relevant norms. Retrieval systems are measured on MRR@10, nDCG@10 and Recall@10.

## Lawbster on GerLeRB

| Metric | Value |
| --- | --- |
| **MRR@10** | **0.676** |
| **Hit rate (LLM-QA)** | up to 90 % |
| **Direct-lookup rate** (citation → correct norm) | **98.4 %** |

In practice: when a bot asks a natural-language question, Lawbster finds the right norm within the first two or three hits in most cases. When a citation is already in the prompt, the direct lookup hits the exact correct norm on the first try in 98.4 % of cases.

## Reproducibility

Lawbster's benchmark numbers are **not "measured internally, not reproducible"** — they come with a public dataset and can be verified against any Lawbster instance. This is a deliberate differentiator versus commercial competitors who tend to hide their quality behind marketing claims.

## Where Lawbster is weaker today

Honesty is part of the product promise. Current weak spots:

- **Very old federal court decisions** (pre-~1990) are only partially digitised in the official source. Coverage depends on the source, not Lawbster.
- **Municipal law and professional-association rules** (chamber statutes, by-laws) are not part of the corpus.
- **Doctrinal writing, legal commentary, journals** is publisher-licensed material — Lawbster doesn't carry it.

Customers who need this use Lawbster as a base layer and combine with a publisher licence.
