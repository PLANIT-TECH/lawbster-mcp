---
title: Compliance & Sicherheit — DSGVO, Hosting in Deutschland, Auth
description: >-
  Technischer Überblick zu Lawbster: Hosting bei Hetzner in Deutschland,
  AVV nach Art. 28 DSGVO, API-Key-Hashing mit SHA-256, Auth via API-Key
  oder OAuth 2.1, Abrechnung über Stripe.
keywords:
  - Lawbster DSGVO
  - Lawbster Auftragsverarbeitungsvertrag
  - MCP Server Datenschutz
  - Hetzner Hosting Recht
  - API Key Sicherheit
---

# Compliance & Sicherheit

Lawbster ist als produktionsreifer B2B-Dienst gebaut. Diese Seite gibt einen technischen Überblick über Architektur, Hosting und Sicherheitsmechanismen. Verbindliche Aussagen zu Datenschutz und Vertragsbeziehung stehen in der [Datenschutzerklärung](https://lawbster.planitprima.com/datenschutz) und in den [AGB / der Vertragslandschaft](https://lawbster.planitprima.com/agb).

## Hosting & Datenflüsse

- **Provider:** Hetzner Online GmbH, Rechenzentren in Deutschland.
- **Zahlungsabwicklung:** Stripe (siehe unten).

## Auftragsverarbeitungsvertrag (AVV / DPA)

Ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO ist Teil der Vertragsbeziehung.

### Standard-AVV

Unsere Standardvorlage ist in der [Vertragslandschaft](https://lawbster.planitprima.com/agb) abrufbar. Sie ist auf den tatsächlichen Datenfluss zugeschnitten (technische Telemetrie, keine Mandantengeheimnisse als Leistungsgegenstand) und reicht für die meisten Kunden — Kanzleien, Inhouse-Teams, SaaS-Anbieter — ohne Anpassungen aus.

### Individueller AVV auf Anfrage

Wenn interne Compliance-Vorgaben, branchenspezifische Anforderungen oder Konzernverträge eine Abweichung von unserer Standardvorlage verlangen, erstellen wir einen individuellen AVV. Typische Anlässe:

- **Eigene AVV-Vorlage des Kunden**, die wir prüfen und gegenzeichnen.
- **Erweiterte TOM-Nachweise** — z. B. ISO-27001-orientierte Kontrollkataloge, BSI-Grundschutz-Referenzen.
- **Engere Subunternehmer-Klauseln** mit Vorab-Zustimmung statt Widerspruchsrecht.
- **Branchenspezifische Zusätze** für Telkos, Sozialleistungsträger oder beaufsichtigte Branchen.
- **Konzern-AVVs** mit Joint-Controller-Anlagen.
- **NDA-Erweiterungen** und verschärfte Vertraulichkeitspflichten.

Anfrage formlos an `support@planitprima.com` — gerne mit Markup auf unserer Vorlage oder eurer eigenen Vorlage im Anhang. Wir melden uns kurz mit dem nächsten Schritt zurück, bevor wir in die Detailprüfung gehen.

## Datenfluss-Architektur

- **Index-Inhalte:** öffentliche Rechtstexte (Bundes- und Landesgesetze, EU-Recht, Bundesgerichtsurteile).
- **LLM-Pfad:** Wenn der Kunde ChatGPT, Claude.ai o. ä. nutzt, kommuniziert der Client direkt mit dem LLM-Anbieter. Lawbster sieht nur die Tool-Call-Argumente, keinen Prompt-Klartext.
- **Telemetrie:** technische Metadaten zu jeder Anfrage (Zeitstempel, Tool-Name, Latenz, Status, Quota-Hash). Details und Aufbewahrungsfristen siehe [Datenschutzerklärung](https://lawbster.planitprima.com/datenschutz).

## Authentifizierung

Lawbster unterstützt **zwei Auth-Pfade**:

| Methode | Anwendung |
| --- | --- |
| **API-Key** (`sk-legal-…`) | Server-to-Server, Skripte, Desktop-Clients |
| **OAuth 2.1** | Browser-Clients (ChatGPT, Claude.ai), kein Klartext-Token |

API-Keys werden serverseitig als SHA-256-Hash abgelegt — der Klartext ist nur einmal beim Erstellen sichtbar. Verlorene Keys werden neu erzeugt und der alte widerrufen.

## Quota und Rate-Limiting

- **Pro-Seat-Quota:** Jeder API-Key und jedes OAuth-Subject hat einen eigenen monatlichen Zähler.
- **Fair-Use:** 60 Anfragen pro Minute pro Seat (zeitliche Drossel).
- **Soft-Limits:** Bei Erreichen wird HTTP 429 mit `Retry-After` zurückgegeben — keine harten Verbindungsabbrüche.
- **Tools/call **und** resources/read** zählen gleich. Statische Resources (`legal://rechtsrahmen` etc.) sind quota-frei.

## Zahlungsabwicklung — Stripe

Stripe verarbeitet die Abrechnungsdaten (Name, E-Mail, Rechnungsanschrift, USt-IdNr.). Kartendaten werden über Stripe Elements direkt im Browser des Kunden an Stripe übergeben und nicht durch Lawbster geleitet.

- **Stripe Tax** für USt/Reverse-Charge automatisch (DE 19 %, FR-B2B 0 % mit USt-IdNr., US 0 %).
- Details zur Datenverarbeitung durch Stripe: siehe [Datenschutzerklärung](https://lawbster.planitprima.com/datenschutz).

## Logging und Monitoring

- **Stripe Webhooks** werden signiert verifiziert.
- **Strukturierte Logs** laufen ausschließlich auf der lokalen Infrastruktur; es ist keine Anbindung an externe Logging-Dienste konfiguriert.
- **Error-Tracking** ist optional aktivierbar und auf technische Fehlermeldungen ausgelegt.

## Backups

Backups werden verschlüsselt auf der Hosting-Infrastruktur abgelegt. Aufbewahrungsfristen und Wiederherstellungsprozesse: siehe [AGB](https://lawbster.planitprima.com/agb).

## Kontakt für Sicherheitsfragen

`support@planitprima.com`
