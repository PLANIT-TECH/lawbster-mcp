---
title: Compliance & Sicherheit — DSGVO, Hosting in Deutschland, Auth
description: >-
  Lawbster ist DSGVO-konform, hostet ausschließlich in Deutschland (Hetzner),
  bietet AVV nach Art. 28 DSGVO, hashed API-Keys mit SHA-256, und nutzt
  Stripe unter dem EU-US Data Privacy Framework.
keywords:
  - Lawbster DSGVO
  - Lawbster Auftragsverarbeitungsvertrag
  - MCP Server Datenschutz
  - Hetzner Hosting Recht
  - API Key Sicherheit
---

# Compliance & Sicherheit

Lawbster ist als **produktionsreifer** B2B-Dienst gebaut — Compliance ist kein Nachgedanke, sondern Voraussetzung. Wir bedienen Anwälte, Compliance-Teams und Inhouse-Counsel; wer DSGVO nicht ernst nimmt, verkauft hier nichts.

## Hosting & Datenflüsse

**Alle Daten werden ausschließlich auf Servern in Deutschland verarbeitet und gespeichert.**

- **Provider:** Hetzner Online GmbH.
- **Keine Datenübertragung in Drittländer**, mit der einen Ausnahme der Zahlungsabwicklung über Stripe (siehe unten).

## Auftragsverarbeitungsvertrag (AVV / DPA)

**Art. 28 DSGVO**: Ein Auftragsverarbeitungsvertrag ist Teil der Vertragsbeziehung. Standardvorlage in der [Vertragslandschaft](https://lawbster.planitprima.com/agb) abrufbar; individueller AVV auf Anfrage (`support@planitprima.com`).

## Datenschutz im Detail

- **Keine automatisierte Entscheidungsfindung** über Betroffene im Sinne von Art. 22 DSGVO. Lawbster trifft keine rechtsverbindlichen Entscheidungen — wir liefern Information.
- **Logs werden nach 30 Tagen anonymisiert.** Query-Klartexte werden gelöscht; nur ein SHA-256-Hash bleibt für Telemetrie und Quota-Zählung. Siehe [Datenschutz](https://lawbster.planitprima.com/datenschutz).
- **Keine Übermittlung der Anfragen an LLM-Anbieter durch Lawbster.** Wenn ein Kunde ChatGPT nutzt, gehen die Anfragen direkt an OpenAI — Lawbster bekommt nur die Tool-Call-Argumente, keinen User-Prompt-Klartext.
- **Inhalte des Lawbster-Index sind öffentlich** (Gesetze, EU-Recht, Bundesgerichts­urteile) — keine personenbezogenen Daten in der gelieferten Antwort.

## Authentifizierung

Lawbster unterstützt **zwei Auth-Pfade**:

| Methode | Anwendung |
| --- | --- |
| **API-Key** (`sk-legal-…`) | Server-to-Server, Skripte, Desktop-Clients |
| **OAuth 2.1** | Browser-Clients (ChatGPT, Claude.ai), kein Klartext-Token |

API-Keys werden **niemals im Klartext gespeichert** — beim Erstellen ist der Klartext genau einmal sichtbar; danach existiert nur ein Hash. Verlorene Keys werden neu erzeugt und der alte widerrufen.

## Quota und Rate-Limiting

- **Pro-Seat-Quota:** Jeder API-Key und jedes OAuth-Subject hat einen eigenen monatlichen Zähler.
- **Fair-Use:** 60 Anfragen pro Minute pro Seat (zeitliche Drossel).
- **Soft-Limits:** Bei Erreichen wird HTTP 429 mit `Retry-After` zurückgegeben — keine harten Verbindungsabbrüche.
- **Tools/call **und** resources/read** zählen gleich. Statische Resources (`legal://rechtsrahmen` etc.) sind quota-frei.

## Zahlungsabwicklung — Stripe

Stripe erhält **nur Abrechnungsdaten** (Name, E-Mail, Rechnungsanschrift, USt-IdNr., Kartendaten direkt von Stripe Elements aufgenommen — Lawbster sieht **keine** Karteninformationen).

- **Rechtsgrundlage Drittlandtransfer:** EU-US Data Privacy Framework (Adäquanzbeschluss der EU-Kommission vom 10. Juli 2023, Art. 45 DSGVO).
- **Stripe Tax** für USt/Reverse-Charge automatisch (DE 19 %, FR-B2B 0 % mit USt-IdNr., US 0 %).

## Telemetrie

- **Stripe Webhooks** signiert verifiziert.
- **Strukturierte Logs** lokal, keine PII an externe Logging-Dienste.
- Optional aktivierbares Error-Tracking ohne PII.

## Datenresidenz und Backup

- **Verschlüsselte Backups** auf deutschen Servern.
- **Backups verlassen die EU nicht.**

## Compliance-relevante Gesetze, die wir selbst beachten

| Gesetz | Was wir tun |
| --- | --- |
| **DSGVO** | AVV, Datenschutzerklärung, Auskunftsrechte, Löschkonzept |
| **TTDSG** | Keine Tracking-Cookies ohne Einwilligung; Lawbster MCP setzt selbst keine Cookies |
| **§ 203 StGB** | Wir sind kein Berufsgeheimnisträger, aber unsere Anwaltskunden sind. Lawbster ist so gebaut, dass Klartext-Mandantengeheimnisse **nicht** an unseren Server fließen müssen — der LLM-Anbieter ist die Schnittstelle, Lawbster bekommt nur Tool-Call-Argumente. |

## Kontakt für Sicherheitsfragen

`support@planitprima.com`
