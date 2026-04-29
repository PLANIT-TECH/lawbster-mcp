---
title: Data sources — where Lawbster pulls legal texts from
description: >-
  Lawbster pulls exclusively from official, publicly available sources:
  German federal law, EU law, federal court decisions. Daily updates,
  transparent provenance, every hit with a direct link to the source.
keywords:
  - legal data sources
  - German federal law API
  - EU law API
  - case law database
  - official legal texts
---

# Data sources

Lawbster pulls exclusively from **official, publicly available sources**. No third-party data, no publisher licence required, no opaque licence chain — and the update runs nightly, automated.

## Overview

| Source | Content | Updates |
| --- | --- | --- |
| **German federal law** | BGB, StGB, HGB, AO, EStG, GewO, AGG, KSchG, ArbZG, MiLoG, … | Daily |
| **EU law** | GDPR, AI Act, MiCA, NIS2, regulations, directives | Daily |
| **Case law** | Decisions of the federal courts | Daily |

---

## German federal law

**Source:** the official federal-law portal.
**Coverage:**

- Civil: BGB, ZPO, HGB, AktG, GmbHG
- Criminal: StGB, StPO
- Tax: AO, EStG, KStG, UStG, GewStG
- Social: SGB I to SGB XII
- Labour: KSchG, ArbZG, MiLoG, AGG, BetrVG, TVG
- Data protection: BDSG (GDPR itself sits in the EU corpus)
- Traffic, IT, tenancy, succession

**Hierarchy is co-indexed** — book, section, title are carried along as context so a bot can locate a norm within its statutory context.

---

## EU law

**Source:** the official EU legal database.
**Coverage:**

- GDPR, AI Act, MiCA, DORA, NIS2
- Digital Services Act, Digital Markets Act
- Data Act, Data Governance Act
- many more regulations, directives, decisions

**Language:** Lawbster indexes the German version of EU law.

**CJEU case law** is queryable as its own source (case numbers like `C-311/18`, `T-451/20`).

---

## Federal court decisions

**Source:** the official federal case-law portal.
**Coverage:**

| Court | Abbr | Subject |
| --- | --- | --- |
| Federal Court of Justice | BGH | Civil & criminal |
| Federal Constitutional Court | BVerfG | Constitutional |
| Federal Labour Court | BAG | Labour |
| Federal Social Court | BSG | Social security |
| Federal Patent Court | BPatG | Patent & trademark |
| Federal Fiscal Court | BFH | Tax & customs |

**Reverse index:** which norm was cited by which decision? This link is built at index time and powers the [`legal_find_citing_decisions`](tools/legal_find_citing_decisions.md) tool.

---

## What every hit carries

- **Full text** of the norm or decision
- **Stable norm ID** and citation
- **Hierarchy path** within the statute
- **Version date** and date of last change
- **Direct URL** to the official source — the user can always verify

---

## Update cycle

A nightly automated ingest picks up changed documents, re-reads and updates the index. On error, the data stays consistent — the next run picks up missing updates. No data loss, no manual intervention.

→ [How Lawbster searches](search-pipeline.md) · [Benchmarks](benchmarks.md)
