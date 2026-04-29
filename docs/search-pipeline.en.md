---
title: How Lawbster searches — semantic, keyword, reranking
description: >-
  Lawbster combines semantic and keyword search with an AI reranking step
  and delivers far more precise hits than full-text search alone.
keywords:
  - legal search
  - semantic search law
  - AI reranking law
  - Lawbster search
---

# How Lawbster searches

A pure full-text search fails on legal language: "obligations law" doesn't appear in every paragraph that regulates obligations law. A pure semantic search fails on special terms like "easement" or "Altenteil" that must match exactly. **Lawbster combines both** and adds an **AI reranking step** that reviews the top hits before returning them to the bot.

## Three stages

1. **Semantic search** — understands the intent of the query even when the wording doesn't match the norm verbatim.
2. **Keyword search** — catches terms that must match precisely (paragraph numbers, legal terms of art, proper names).
3. **AI reranking** — re-evaluates the top candidates in the context of the actual question and reorders.

## Filters apply during stages 1 + 2

When a bot sets `jurisdiction=eu`, Lawbster doesn't even search German federal law. That shrinks the search space, speeds up the answer and rules out false matches.

## Verified references, not just "probably matches"

Every hit includes:

- **Norm ID + citation** (e.g. `§ 823 BGB`)
- **Full text or snippet** of the relevant passage
- **Hierarchy path** (book → section → title → norm)
- **Source** and **version** (last change, version date)
- **Direct URL** to the official source

That lets the LLM back every statement with a citation — and users can verify it themselves.

## Quality is measurable

On the public [GerLeRB benchmark](benchmarks.md), Lawbster scores **MRR@10 = 0.676**. In practice this means the model finds the right norm within the first two or three hits in most cases, instead of the LLM wading through ten wrong ones.

## What must not happen

**Hallucinations.** Lawbster **never** returns a hit it doesn't have in the index. When no relevant norm exists, the tool says so honestly — bots can then tell the user, instead of inventing something.

**Stale data.** Lawbster updates daily. A change from two days ago is in the index today.

**Silent quality drift.** Every change to the search method is validated against the benchmark before going live.
