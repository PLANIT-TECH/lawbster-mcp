---
title: FAQ — Häufige Fragen zu Lawbster
description: >-
  Antworten auf die häufigsten Fragen zu Lawbster: Was ist MCP, welche Daten
  sind verfügbar, was kostet es, ist es DSGVO-konform, brauchen meine
  Kollegen ein eigenes Konto?
keywords:
  - Lawbster FAQ
  - MCP FAQ
  - was ist MCP
  - Lawbster Datenschutz
  - Lawbster kosten
---

# FAQ

## Allgemein

??? question "Welche Rechtstexte sind verfügbar?"
    Lawbster indiziert deutsches Bundesrecht (BGB, StGB, HGB, AO, EStG, KSchG, AGG, …), das gesamte EU-Recht (DSGVO, KI-VO, MiCA, NIS2, …) und die Entscheidungen der Bundesgerichte (BGH, BVerfG, BAG, BSG, BPatG, BFH). Tägliche Aktualisierung aus amtlichen Quellen.

    → [Vollständige Coverage](data-sources.md)

??? question "Was ist MCP?"
    **Model Context Protocol** — ein offenes Protokoll, das KI-Assistenten standardisierten Zugriff auf externe Datenquellen und Tools gibt. Entwickelt von Anthropic, mittlerweile breit unterstützt: Claude Desktop, Claude.ai, ChatGPT, Cursor, Copilot Studio, plus offene SDKs in Python und TypeScript.

    Lawbster ist ein **MCP-Server** für Recht. Du musst MCP nicht selbst implementieren — wenn dein Client MCP unterstützt, kann er Lawbster in zwei Minuten anbinden.

??? question "Wie aktuell sind die Daten?"
    Tägliche Aktualisierung aus den amtlichen Quellen. Eine Gesetzesänderung von vorgestern ist heute im Index. **Kein Trainings-Cutoff** wie bei reinen LLM-Antworten.

??? question "Ersetzt Lawbster eine Rechtsberatung?"
    Nein. Lawbster liefert verifizierte Rechtsinformation — keine Rechtsberatung im Sinne des RDG. Für eine konkrete Rechtsberatung wende dich an eine Rechtsanwältin oder einen Rechtsanwalt.

??? question "Warum nicht einfach ChatGPT fragen?"
    ChatGPT (und jede andere KI) hat einen Trainings-Cutoff, kennt nicht jede Spezialnorm und halluziniert bei Rechtsfragen regelmäßig — Paragrafen, die es nicht gibt; Norm-Nummern, die nicht stimmen; Aussagen ohne Fundstelle. Lawbster löst genau das: ChatGPT antwortet weiterhin in seinem gewohnten Stil, aber mit verifiziertem Rechtskontext.

## Setup & Nutzung

??? question "Welche Clients werden unterstützt?"
    Alles, was MCP spricht. Direkt mit Anleitung dokumentiert: **Claude Desktop**, **ChatGPT** (Pro/Team/Enterprise), **Claude.ai** (Pro/Max/Team), **Cursor**, **Copilot Studio**. Eigene Apps via offizielle MCP-SDKs.

    → [Quickstart-Anleitungen](quickstart/index.md)

??? question "Brauchen meine Kollegen ein eigenes Konto?"
    Nein, ein eigenes **Seat** reicht. Pro Seat ist entweder eine Person oder ein eigenständiger API-Key abgerechnet. Mehrere Kollegen können unter einer gemeinsamen Lawbster-Organisation arbeiten — jeder mit eigenem Login, jeder als eigenem Seat.

??? question "Brauchen ChatGPT, Claude oder Copilot einen eigenen Plan?"
    Nein. Du brauchst dort dein normales Abo (z. B. ChatGPT Pro). Lawbster ist eine **Custom Connector**-Quelle, die dort hinzugefügt wird. Lawbsters Quota gilt unabhängig vom LLM-Anbieter.

??? question "Was zählt als Seat?"
    Eine Person oder ein eigenständiger API-Key. Wenn ein API-Key einer Person zugeordnet ist, zählt er auf den Seat dieser Person — kein zusätzlicher Seat. Server-to-Server-API-Keys ohne Personenbindung sind eigene Seats.

??? question "Wie funktioniert die 14-tägige Testphase?"
    Anmeldung im Portal, Lawbster ohne Kreditkarte testen — kein automatischer Übergang in einen kostenpflichtigen Plan. Wenn du nach 14 Tagen bleiben möchtest, schließt du aktiv ein Abonnement ab.

??? question "Kann ich jederzeit kündigen?"
    Ja, jederzeit. Die Kündigung wird zum Ende der laufenden Abrechnungsperiode wirksam — keine Mindestlaufzeit, keine Mindestbindung.

## Technik & Qualität

??? question "Wie gut funktioniert die Suche?"
    MRR@10 = 0,676 auf dem öffentlichen GerLeRB-Benchmark. In der Praxis: die richtige Norm meist unter den ersten zwei oder drei Treffern bei natürlichsprachlicher Frage; 98,4 % Treffer-Genauigkeit beim Direkt-Lookup mit Zitat.

    → [Benchmarks](benchmarks.md)

??? question "Halluziniert Lawbster?"
    Nein. Lawbster liefert nur, was im Index steht. Findet sich keine passende Norm, sagt das Tool das ehrlich — der KI-Assistent kann den Anwender informieren, statt etwas zu erfinden.

??? question "Welche Sprachen werden unterstützt?"
    Index-Inhalte sind deutschsprachig (deutsches Bundesrecht, deutsche Fassung des EU-Rechts, deutsche Entscheidungen). Anfragen funktionieren auch auf Englisch.

??? question "Gibt es ein Rate-Limit?"
    Fair-Use: 60 Anfragen pro Minute pro Seat. Im normalen Betrieb erreichst du das nicht. Bei automatisierten Pipelines, die das Limit treffen: zweiten Seat zubuchen.

## Compliance & Sicherheit

??? question "Wo wird Lawbster gehostet?"
    Bei Hetzner Online GmbH in Deutschland. Zahlungsabwicklung läuft über Stripe.

    → [Technische Compliance-Übersicht](compliance.md) · Verbindliches in AGB und Datenschutzerklärung.

??? question "Welcher Vertrag liegt der Nutzung zugrunde?"
    Ein Auftragsverarbeitungsvertrag ist Teil der Vertragsbeziehung. Standardvorlage in der [Vertragslandschaft](https://lawbster.planitprima.com/agb), individueller AVV auf Anfrage über `support@planitprima.com`.

??? question "Was sieht Lawbster von meinen Anfragen?"
    Technisch: die Tool-Call-Argumente plus Metadaten (Zeitstempel, Tool-Name, Latenz, Status, Quota-Hash). Konkrete Aufbewahrungsfristen und Löschkonzept stehen in der [Datenschutzerklärung](https://lawbster.planitprima.com/datenschutz).

??? question "Kann ich Lawbster on-premise betreiben?"
    Aktuell nicht im Standardangebot. On-Premise- und Single-Tenant-Deployments sind für Enterprise-Kunden möglich — Kontakt: `support@planitprima.com`.

??? question "Wie sieht der Datenfluss bei Mandantengesprächen aus?"
    Architektonisch: Der LLM-Anbieter (Claude, ChatGPT) ist die Schnittstelle zum Mandantengespräch. Lawbster bekommt nur die Tool-Call-Argumente vom LLM, also typischerweise entkontextualisierte juristische Fragen — keinen Prompt-Klartext. Eine berufsrechtliche Beurteilung im Einzelfall ist jedoch Sache deiner Kammer und nicht etwas, das wir hier zusichern.

## Verträge & Pricing

??? question "Was kostet Lawbster?"
    19 € pro Seat und Monat. Vollständige Coverage, unbegrenzte Anfragen pro Seat (Fair-Use 60/min), bevorzugter E-Mail-Support. 14 Tage kostenlos testen.

    → [Pricing](pricing.md)

??? question "Gibt es einen Custom-Plan für viele Seats?"
    Ab 50 Seats sprechen wir gern über einen Mengenrabatt und individuelle Vertragsbedingungen — `support@planitprima.com`.

??? question "Bekomme ich eine Rechnung mit USt-Ausweis?"
    Ja. Stripe Tax ermittelt automatisch die korrekte USt: 19 % für deutsche Kunden, 0 % Reverse-Charge für EU-B2B mit USt-IdNr., 0 % Export außerhalb der EU.

---

**Frage nicht beantwortet?** → `support@planitprima.com`
