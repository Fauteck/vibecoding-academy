# CLAUDE.md — Verbindliche Regeln für KI-gestützte Entwicklung

> **Geltung:** Dieses Dokument ist die **alleinstehende, verbindliche Regelbasis** dieses Repositories.
> Es ersetzt zusätzliche KI-/Design-/README-Regeldateien.

---

## Projektübersicht

**Vibecoding Academy** ist ein Workshop- und Showcase-Projekt für KI-gestütztes Web-Coding.
Es zeigt den Weg von der Idee bis zur fertigen Web-Anwendung mit KI-Tools.

- **Typ:** Rein statische Website (HTML, CSS, JavaScript) — kein Backend, keine Datenbank
- **Deployment:** GitHub Pages (automatisch bei Push auf `main`)
- **Live:** https://fauteck.github.io/vibecoding-academy/
- **Inhalt:** Landing Page, fertige Spiele (Pong, GTA-Parodie), Spielkonzepte, Workshop-Handout

### Architektur

Jedes Projekt ist eine **selbstständige HTML-Datei** in einem eigenen Unterordner:

```
vibecoding-academy/
├── index.html              # Landing Page (Single-Page mit Sektionen)
├── robots.txt              # Crawler-Blocking
├── apps/                   # Umgesetzte Projekte
│   ├── pong/index.html
│   ├── gta/index.html
│   └── wochenendplanung/index.html
├── ideen/                  # Spielkonzepte (Markdown + Viewer)
│   ├── index.html          # Ideen-Übersicht
│   ├── viewer.html         # Markdown-Viewer
│   └── *.md                # Konzeptdateien
└── wiki/                   # Dokumentation
    ├── index.html          # Wiki-Übersicht
    ├── handout/index.html  # Workshop-Handout
    └── claude-md/index.html # Beispiel CLAUDE.md
```

- Kein Build-Prozess, kein Bundler, kein Package-Manager
- CSS und JavaScript sind inline in den HTML-Dateien
- Externe Abhängigkeiten ausschließlich via CDN (Bootstrap 5.3.2, Font Awesome 6.4.2)

### Neues Projekt hinzufügen

1. Unterordner in `apps/` anlegen mit eigener `index.html` (z. B. `apps/snake/index.html`)
2. Projekt-Card in der Haupt-`index.html` im Bereich „Ergebnisse" eintragen
3. Navigation in der neuen Datei mit dem einheitlichen Nav-Pattern versehen
4. Committen & pushen — GitHub Pages deployt automatisch

---

## Inhaltsverzeichnis

1. [Grundprinzipien](#1-grundprinzipien)
2. [Erlaubt / Nicht erlaubt](#2-erlaubt--nicht-erlaubt)
3. [Branching, Merge, Reviews](#3-branching-merge-reviews)
4. [Qualitätsanforderungen (Gates)](#4-qualitätsanforderungen-gates)
5. [Security & Secrets](#5-security--secrets)
6. [OWASP Top 10](#6-owasp-top-10)
7. [robots.txt](#7-robotstxt)
8. [Build & Deployment](#8-build--deployment)
9. [Definition of Done](#9-definition-of-done)
10. [Dokumentationspflicht](#10-dokumentationspflicht)
11. [README-Struktur (Vorlage)](#11-readme-struktur-vorlage)
12. [Design System](#12-design-system)

---

## 1. Grundprinzipien

- **GitOps first**: Die Live-Website wird ausschließlich über Git-Pushes auf `main` aktualisiert (GitHub Pages).
- **Keine manuellen Deployments**: Änderungen gehen immer über Code-Change → Commit → Push.
- **Reproduzierbarkeit**: Der `main`-Branch spiegelt stets den Live-Stand wider.
- **Selbstständige Projekte**: Jedes Spiel/Projekt ist eine eigenständige HTML-Datei — keine geteilten Build-Artefakte.

---

## 2. Erlaubt / Nicht erlaubt

### Die KI darf

- Code ändern und refactoren (im Rahmen bestehender Architektur)
- Neue Projekte als selbstständige HTML-Dateien in Unterordnern anlegen
- Dateien erstellen/ändern (inkl. Doku)
- Bestehende Spielkonzepte (Markdown in `ideen/`) erweitern

### Die KI darf NICHT

- Build-Tools, Package-Manager oder Bundler einführen (kein npm, webpack, Vite etc.)
- Externe JavaScript-/CSS-Dateien anlegen, die projektübergreifend geteilt werden (jedes Projekt bleibt selbstständig)
- Frameworks einführen (kein React, Vue, Angular etc.)
- Serverseitige Komponenten vorschlagen (kein Node.js, Python etc.)
- CDN-Links ohne Subresource Integrity (SRI) Hashes einbinden

---

## 3. Branching, Merge, Reviews

- Entwicklung auf Feature-/Fix-Branches
- Merge via Pull Request
- `main` ist releasefähig/produktionsnah und geschützt
- GitHub Pages deployt automatisch aus `main`

Empfohlene Branch-Benennung: `feature/...`, `fix/...`, `chore/...`

PR enthält: Zweck, Scope, betroffene Projekte/Spiele

---

## 4. Qualitätsanforderungen (Gates)

Vor einem Merge in `main` muss gelten:

- HTML ist valide und wohlgeformt
- Keine kaputten Links (interne Navigation)
- Responsive Design funktioniert (Desktop + Mobil)
- Keine Debug-Ausgaben (`console.log`, `alert`) im finalen Code
- Keine temporären Workarounds
- CDN-Links haben Integrity-Attribute (SRI)
- Zugänglichkeit: `alt`-Attribute bei Bildern, `aria-label` bei Icon-Buttons

> **Hinweis:** Es gibt kein CI — Prüfung erfolgt manuell vor dem Merge.

---

## 5. Security & Secrets

- Keine Secrets im Code oder Repo (dieses Projekt benötigt keine)
- Keine `.env`-Dateien (rein statisches Projekt)
- CDN-Einbindungen immer mit `integrity` und `crossorigin="anonymous"`
- Externe Links mit `rel="noopener"` versehen

---

## 6. OWASP Top 10

Dieses Repo hat kein Backend und keine API. OWASP gilt **sinngemäß**:

- **Input-Validation**: Benutzereingaben in Spielen clientseitig validieren
- **Supply Chain**: CDN-Abhängigkeiten mit SRI-Hashes absichern
- **XSS-Prävention**: Kein `innerHTML` mit unkontrollierten Daten, `textContent` bevorzugen
- **Secrets**: Keine API-Keys oder Credentials im Frontend-Code

---

## 7. robots.txt

Die `robots.txt` ist vorhanden und blockiert alle Suchmaschinen sowie KI-Crawler:

- Datei ist versioniert im Repository-Root
- Keine manuellen Änderungen außerhalb von Git
- Blockierte Crawler: `*` (alle), sowie explizit GPTBot, ChatGPT-User, Google-Extended, anthropic-ai, ClaudeBot, Claude-Web, CCBot, Bytespider, PerplexityBot u. a.

> `robots.txt` ist **kein Sicherheitsmechanismus** — es ist eine höfliche Bitte an Crawler.

---

## 8. Build & Deployment

### Deployment

- **Kein Build-Prozess** — die HTML-Dateien werden direkt ausgeliefert
- **GitHub Pages** deployt automatisch bei Push auf `main`
- Kein Docker, kein GHCR, kein Self-Hosted Runner

### Rollback

- Rollback durch Revert-Commit auf `main` oder Rücksetzen auf vorherigen Commit
- GitHub Pages aktualisiert sich automatisch

---

## 9. Definition of Done

Eine Änderung ist „done", wenn:

- Code umgesetzt und in HTML-Datei eingebettet
- Manuell getestet (Desktop + Mobil, verschiedene Browser)
- Responsive Design intakt
- README aktualisiert (falls neues Projekt oder strukturelle Änderung)
- Haupt-`index.html` aktualisiert (falls neues Projekt)
- PR reviewed und gemerged
- GitHub Pages Deployment erfolgreich (Seite erreichbar)

---

## 10. Dokumentationspflicht

Bei jeder Änderung, die in Produktion gehen kann:

- README prüfen/aktualisieren
- Änderungen nachvollziehbar im PR beschreiben
- Bei neuen Projekten: Projekt-Card in `index.html` eintragen

---

## 11. README-Struktur (Vorlage)

Jede `README.md` in diesem Repository folgt dieser Gliederung. Abschnitte, die nicht zutreffen, werden weggelassen — die Reihenfolge bleibt gleich.

### Grundprinzipien für READMEs

- **Deutsch** — alle READMEs auf Deutsch
- **Selbsterklärend** — Setup & Betrieb müssen ohne Zusatzdoku möglich sein
- **Kein Fülltext** — jeder Abschnitt hat einen klaren Zweck
- **Tabellen > Fließtext**
- **ASCII-Diagramme > Keine Diagramme** — keine externen Bilder

### Verbindliche Gliederung

| # | Abschnitt | Pflicht | Bedingung für Optional |
|---|-----------|---------|------------------------|
| 1 | Header mit Badges | **Ja** | — |
| 2 | Benutzeroberfläche | Nein | Nur bei Apps mit UI |
| 3 | Feature-Übersicht | **Ja** | — |
| 4 | Architektur | **Ja** | — |
| 5 | Voraussetzungen | **Ja** | — |
| 6 | Installation / Schnellstart | **Ja** | — |
| 7 | Reverse-Proxy-Einrichtung | Nein | Nur bei spezieller Proxy-Config |
| 8 | Konfiguration | **Ja** | — |
| 9 | API-Referenz | Nein | Pflicht bei eigenen APIs |
| 10 | Datenbankschema | Nein | Empfohlen bei eigenen DBs |
| 11 | Sicherheitsaspekte | **Ja** | — |
| 12 | Technologie-Stack | **Ja** | — |
| 13 | Projektstruktur | Nein | Empfohlen bei Monorepos |
| 14 | Entwicklung | **Ja** | — |
| 15 | Versionierung | Nein | Empfohlen |
| 16 | Lizenz | **Ja** | — |

---

## 12. Design System

> **Zweck:** Einheitliches Design aller Fauteck-Webanwendungen.
> Dieses Projekt nutzt Bootstrap 5.3 mit anwendungsspezifischem CSS.

### Externe Abhängigkeiten

Jede HTML-Datei bindet im `<head>` ein:

```html
<!-- Bootstrap 5.3.2 -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
      crossorigin="anonymous">

<!-- Font Awesome 6.4.2 -->
<link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
      crossorigin="anonymous" referrerpolicy="no-referrer">
```

Vor `</body>`:

```html
<!-- Bootstrap JS Bundle (inkl. Popper.js) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
        crossorigin="anonymous"></script>
```

### Farbpalette (Design Tokens)

```css
:root {
    --primary-color:   #5B8BD6;   /* Akzentfarbe, Links, Borders (passend zu content-bg.jpg) */
    --secondary-color: #3D5A8C;   /* Navbar, Footer */
    --success-color:   #5CC6A7;   /* Positive Werte, Erfolg (Türkis-Grün) */
    --danger-color:    #D46B6B;   /* Fehler, Negative Werte */
    --warning-color:   #D4A55B;   /* Warnungen */
    --info-color:      #6BB8D4;   /* Info-Hinweise (Cyan/Türkis) */
    --bg-page:         #EEF2F7;   /* Seitenhintergrund (Blau-Weiß) */
    --bg-card:         rgba(255, 255, 255, 0.85); /* Kartenhintergrund (halbtransparent) */
    --text-primary:    #2D3748;   /* Primärer Text */
    --text-muted:      #7A8599;   /* Gedimmter Text (Blau-Grau) */
    --border-color:    #D4DCE8;   /* Rahmenfarbe (bläulich) */
    --border-radius-card: 10px;
    --border-radius-kpi:  12px;
}
```

### Typografie

```css
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
```

### Responsive Breakpoints

| Breakpoint | Breite | Verhalten |
|---|---|---|
| Desktop | > 992 px | Desktop-Navbar sichtbar; Mobile-Elemente ausgeblendet |
| Tablet/Mobil | <= 992 px | Mobile Top Bar + Bottom Nav sichtbar |
| Tablet | <= 768 px | Buttons: min 44 px Touch-Ziele; reduziertes Padding |
| Smartphone | <= 576 px | Engeres Layout, kleinere Überschriften |

### Navigation

- **Desktop (> 992 px):** Sticky Navbar mit Gradient (`#5B8BD6` → `#3D5A8C`)
- **Mobil (<= 992 px):** Fixed Top Bar (56 px) + Fixed Bottom Nav (60 px)
- Body erhält automatisch `padding-top: 56px` und `padding-bottom: 60px` auf Mobilgeräten

### Komponenten

| Klasse | Einsatzort |
|---|---|
| `.navbar` | Desktop-Navbar (Gradient-Hintergrund) |
| `.mobile-topbar` | Mobile Kopfleiste |
| `.bottom-nav` | Mobile Bottom-Navigation |
| `.bottom-nav-item.active` | Aktiver Tab |
| `.fab-btn` | Floating Action Button (mobil) |
| `.flash-messages` | Toast-Benachrichtigungen |
| `.footer` | Footer-Bereich |
| `.kpi-grid` | Responsives KPI-Raster |
| `.kpi-card` | KPI-Karte |
| `.section-header` | Abschnittsüberschrift mit Akzent-Linie |
| `.card` | Standard-Karte |

---

## Kompatibilität mit anderen KI-Tools

Diese Datei heißt `CLAUDE.md` und wird von Claude Code automatisch erkannt.

| Tool | Erwarteter Pfad |
|---|---|
| Claude Code | `CLAUDE.md` (Repository-Root) |
| GitHub Copilot | `.github/copilot-instructions.md` |
| Cursor | `.cursor/rules` oder `.cursorrules` |
| Windsurf | `.windsurfrules` |
| Cline | `.clinerules` |

Empfehlung: Symlinks oder Kopien der `CLAUDE.md` unter den jeweiligen Pfaden anlegen, damit alle Tools dieselben Regeln verwenden.
