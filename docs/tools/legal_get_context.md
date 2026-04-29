---
title: legal_get_context — Umgebende Normen einer Fundstelle
description: >-
  Liefert die Normen vor und nach einer Fundstelle, um Auslegungs-Kontext
  in eine LLM-Antwort einzubauen. Beispiel: § 823 BGB plus §§ 821–826.
keywords:
  - legal_get_context
  - umliegende Paragrafen
  - Auslegungs-Kontext Recht
  - Norm Kontext
---

# `legal_get_context`

**Liefert die Normen vor und nach einer Fundstelle.** Wichtig, weil Recht selten in Einzelnormen verstanden wird — Schadensersatz aus § 823 BGB ergibt sich erst im Kontext der §§ 821–826 (deliktische Haftung).

## Wann nutzen?

- Nach einem `legal_search` für interpretativen Kontext (die `norm_id` aus dem Treffer wiederverwenden)
- Wenn das LLM die Position einer Norm im Gesetz verstehen soll
- Bei Querverweisen („siehe § 280 BGB" → drei Normen davor und danach mitliefern)

## Parameter

| Parameter | Typ | Default | Beschreibung |
| --- | --- | --- | --- |
| `norm_id` | int | — | Stabile Norm-ID aus einem vorherigen `legal_search`-Treffer |
| `before` | int | 2 | Anzahl Normen vor der Fundstelle (0–10) |
| `after` | int | 2 | Anzahl Normen nach der Fundstelle (0–10) |

## Beispiel

```json
{
  "tool": "legal_get_context",
  "arguments": {
    "norm_id": 123456,
    "before": 2,
    "after": 3
  }
}
```

Liefert die zwei Normen vor und drei Normen nach der angegebenen Fundstelle, mit voller Hierarchie und Volltext.

## Tipps

**Spar dir die einzelnen Lookups.** Statt fünf einzelne `legal_lookup`-Calls zu machen, ist `legal_get_context` mit `before=2, after=2` ein einzelner Call mit identischem Output.

**Nutze für „siehe auch"-Bezüge.** Wenn ein Gesetzestext „siehe § 826" sagt, kann das LLM mit `legal_get_context` automatisch den Kontext einbinden.

**Resource-Alternative.** `legal://norm/{norm_id}` liefert die Einzelnorm als Resource — sinnvoll bei Clients, die Resources besser einbinden als Tool-Outputs.
