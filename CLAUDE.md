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
- **Inhalt:** Landing Page, fertige Apps (Pong, GTA-Parodie, Wochenendplanung), Spielkonzepte, Wiki/Handout

### Architektur

Jedes Projekt ist eine **selbstständige HTML-Datei** in einem eigenen Unterordner:

```
vibecoding-academy/
├── index.html              # Landing Page
├── robots.txt              # Crawler-Blocking
├── css/                    # Gemeinsame Stylesheets
│   ├── tokens.css          # Design Tokens, Reset, Basis-Styles
│   ├── nav.css             # Navigation-Styles
│   └── footer.css          # Footer-Styles
├── js/                     # Gemeinsame Skripte
│   └── components.js       # Navigation & Footer (JS-Injection)
├── apps/                   # Fertige Projekte
│   ├── pong/index.html     # Pong-Spiel
│   ├── gta/index.html      # GTA-Parodie
│   └── wochenendplanung/index.html  # Wochenendplanung
├── wiki/                   # Workshop-Materialien
│   ├── index.html          # Workshop-Handout
│   └── beispiel-claude.md  # Beispiel CLAUDE.md
└── ideen/                  # Spielkonzepte (Markdown)
```

- Kein Build-Prozess, kein Bundler, kein Package-Manager
- **Gemeinsame Layout-Assets** (`css/`, `js/`) für Navigation, Footer, Design Tokens und Basis-Styles
- Seitenspezifische Styles bleiben inline in den HTML-Dateien
- Spiel-/App-Logik bleibt selbstständig inline in der jeweiligen HTML-Datei
- Externe Abhängigkeiten lokal im `/vendor`-Verzeichnis (Bootstrap 5.3.2, Font Awesome 6.4.2)
- Jede Seite setzt `<html data-depth="0|1|2">` für die korrekte relative Pfadauflösung durch `js/components.js`

### Weiterführende Dokumentation

Detaillierte Architektur- und Workflow-Dokumentation (LLM-optimiert mit absoluten Pfaden und Code-Beispielen):

| Dokument | Inhalt |
|----------|--------|
| [docs/INDEX.md](docs/INDEX.md) | Dokumentations-Hub, Datei-Schnellreferenz, Verzeichnisstruktur |
| [docs/architektur.md](docs/architektur.md) | Shared Components, Pfadauflösung, CSS-Kette, Design Tokens |
| [docs/arbeitsablaeufe.md](docs/arbeitsablaeufe.md) | Schritt-für-Schritt-Anleitungen, HTML-Templates, häufige Aufgaben |

### Neues Projekt hinzufügen

1. Unterordner in `apps/` anlegen mit eigener `index.html` (z. B. `apps/snake/index.html`)
2. `<html data-depth="2">` setzen, `css/tokens.css`, `css/nav.css`, `css/footer.css` einbinden (relative Pfade: `../../css/...`)
3. `<nav id="site-nav"></nav>` und `<footer id="site-footer"></footer>` als Platzhalter einfügen
4. `js/components.js` vor `</body>` einbinden (`../../js/components.js`)
5. Projekt-Card in der Haupt-`index.html` im Bereich „Ergebnisse" eintragen
6. Committen & pushen — GitHub Pages deployt automatisch

---

## Inhaltsverzeichnis

1. [Grundprinzipien](#1-grundprinzipien)
2. [Arbeitsweise bei langen Sessions (API-Stabilität)](#2-arbeitsweise-bei-langen-sessions-api-stabilität)
3. [Erlaubt / Nicht erlaubt](#3-erlaubt--nicht-erlaubt)
4. [Branching, Merge, Reviews](#4-branching-merge-reviews)
5. [Qualitätsanforderungen (Gates)](#5-qualitätsanforderungen-gates)
6. [Security & Secrets](#6-security--secrets)
7. [OWASP Top 10](#7-owasp-top-10)
8. [robots.txt](#8-robotstxt)
9. [Build & Deployment](#9-build--deployment)
10. [Definition of Done](#10-definition-of-done)
11. [Dokumentationspflicht](#11-dokumentationspflicht)
12. [README-Struktur (Vorlage)](#12-readme-struktur-vorlage)
13. [Design System](#13-design-system)

---

## 1. Grundprinzipien

- **GitOps first**: Die Live-Website wird ausschließlich über Git-Pushes auf `main` aktualisiert (GitHub Pages).
- **Keine manuellen Deployments**: Änderungen gehen immer über Code-Change → Commit → Push.
- **Reproduzierbarkeit**: Der `main`-Branch spiegelt stets den Live-Stand wider.
- **Selbstständige Projekte**: Jedes Spiel/Projekt ist eine eigenständige HTML-Datei — keine geteilten Build-Artefakte.

---

## 2. Arbeitsweise bei langen Sessions (API-Stabilität)

> Ziel: Stream-Timeouts (`Stream idle timeout — partial response received`)
> vermeiden. Ursache sind einzelne lange Operationen ohne Zwischenoutput,
> nicht die Anzahl paralleler Tool-Calls.

### Output klein halten

- Bash-Ausgaben filtern: `head -n 100`, `tail -n 100`, `grep -E '...'`,
  `wc -l` statt vollständiger Logs/Dumps.
- Große Dateien segmentweise lesen (`Read` mit `offset`/`limit`),
  nicht komplett.
- Keine `find . | ...`-Dumps ganzer Projektbäume — gezielte
  `find`/`rg`-Queries mit Pfadfiltern.

### Lange Läufe nicht synchron blockieren

- Builds, Tests, Installationen als Background-Task starten
  (`run_in_background: true`), nicht im Vordergrund abwarten.
- Für Bash-Calls realistische Timeouts setzen; hängende Prozesse sollen
  schnell abbrechen statt still den Stream zu blockieren.
- Keine `sleep`-Schleifen oder Poll-Busy-Waits im Hauptstrang.

### Kontext schützen

- Für breite Codebase-Recherche (>3 Queries, unklarer Scope) den
  `Explore`-Subagent nutzen — er kapselt große Suchergebnisse und liefert
  nur eine Zusammenfassung zurück.
- Für Design-Entscheidungen den `Plan`-Subagent nutzen, bevor umfangreich
  editiert wird.

### Effizient statt vorsichtig

- Unabhängige Tool-Calls in einer Nachricht parallel ausführen (z. B.
  mehrere `Read`s oder `grep`s) — das reduziert die Gesamtzeit und damit
  die Timeout-Wahrscheinlichkeit.
- Sequentiell nur, wenn ein Call vom Ergebnis des vorherigen abhängt.

### Große Aufgaben strukturieren

- Aufgaben mit vielen Dateiänderungen (>10 Dateien oder >3 logisch
  getrennte Teilschritte) in nachvollziehbare Teilschritte zerlegen,
  jeden Schritt als abgeschlossene Einheit mit Zwischenergebnis.
- `TodoWrite` verwenden, um Fortschritt sichtbar zu halten und nach
  Unterbrechungen nahtlos weiterarbeiten zu können.

---

## 3. Erlaubt / Nicht erlaubt

### Die KI darf

- Code ändern und refactoren (im Rahmen bestehender Architektur)
- Neue Projekte als selbstständige HTML-Dateien in Unterordnern anlegen
- Dateien erstellen/ändern (inkl. Doku)
- Bestehende Spielkonzepte (Markdown in `ideen/`) erweitern

### Die KI darf NICHT

- Build-Tools, Package-Manager oder Bundler einführen (kein npm, webpack, Vite etc.)
- Frameworks einführen (kein React, Vue, Angular etc.)
- Serverseitige Komponenten vorschlagen (kein Node.js, Python etc.)
- Externe CDN-Links einbinden (alle Abhängigkeiten werden lokal aus `/vendor` geladen)
- Spiel-/App-Logik in geteilte Dateien auslagern (Spiele bleiben selbstständig)

> **Hinweis:** Gemeinsame Layout-Assets (Navigation, Footer, Design Tokens) liegen zentral in `css/` und `js/`.
> Nur Spiel-/App-spezifische Logik und Styles bleiben inline in der jeweiligen HTML-Datei.

---

## 4. Branching, Merge, Reviews

- Entwicklung auf Feature-/Fix-Branches
- Merge via Pull Request
- `main` ist releasefähig/produktionsnah und geschützt
- GitHub Pages deployt automatisch aus `main`

Empfohlene Branch-Benennung: `feature/...`, `fix/...`, `chore/...`

PR enthält: Zweck, Scope, betroffene Projekte/Spiele

---

## 5. Qualitätsanforderungen (Gates)

Vor einem Merge in `main` muss gelten:

- HTML ist valide und wohlgeformt
- Keine kaputten Links (interne Navigation)
- Responsive Design funktioniert (Desktop + Mobil)
- Keine Debug-Ausgaben (`console.log`, `alert`) im finalen Code
- Keine temporären Workarounds
- Abhängigkeiten werden aus `/vendor` geladen (keine externen CDN-Aufrufe)
- Zugänglichkeit: `alt`-Attribute bei Bildern, `aria-label` bei Icon-Buttons

> **Hinweis:** Es gibt kein CI — Prüfung erfolgt manuell vor dem Merge.

---

## 6. Security & Secrets

- Keine Secrets im Code oder Repo (dieses Projekt benötigt keine)
- Keine `.env`-Dateien (rein statisches Projekt)
- Keine externen CDN-Einbindungen — Abhängigkeiten liegen lokal im `/vendor`-Verzeichnis
- Externe Links mit `rel="noopener"` versehen

---

## 7. OWASP Top 10

Dieses Repo hat kein Backend und keine API. OWASP gilt **sinngemäß**:

- **Input-Validation**: Benutzereingaben in Spielen clientseitig validieren
- **Supply Chain**: Abhängigkeiten lokal im `/vendor`-Verzeichnis — keine externe Supply Chain
- **XSS-Prävention**: Kein `innerHTML` mit unkontrollierten Daten, `textContent` bevorzugen
- **Secrets**: Keine API-Keys oder Credentials im Frontend-Code

---

## 8. robots.txt

Die `robots.txt` ist vorhanden und blockiert alle Suchmaschinen sowie KI-Crawler:

- Datei ist versioniert im Repository-Root
- Keine manuellen Änderungen außerhalb von Git
- Blockierte Crawler: `*` (alle), sowie explizit GPTBot, ChatGPT-User, Google-Extended, anthropic-ai, ClaudeBot, Claude-Web, CCBot, Bytespider, PerplexityBot u. a.

> `robots.txt` ist **kein Sicherheitsmechanismus** — es ist eine höfliche Bitte an Crawler.

---

## 9. Build & Deployment

### Deployment

- **Kein Build-Prozess** — die HTML-Dateien werden direkt ausgeliefert
- **GitHub Pages** deployt automatisch bei Push auf `main`
- Kein Docker, kein GHCR, kein Self-Hosted Runner

### Rollback

- Rollback durch Revert-Commit auf `main` oder Rücksetzen auf vorherigen Commit
- GitHub Pages aktualisiert sich automatisch

---

## 10. Definition of Done

Eine Änderung ist „done", wenn:

- Code umgesetzt und in HTML-Datei eingebettet
- Manuell getestet (Desktop + Mobil, verschiedene Browser)
- Responsive Design intakt
- README aktualisiert (falls neues Projekt oder strukturelle Änderung)
- Haupt-`index.html` aktualisiert (falls neues Projekt)
- PR reviewed und gemerged
- GitHub Pages Deployment erfolgreich (Seite erreichbar)

---

## 11. Dokumentationspflicht

Bei jeder Änderung, die in Produktion gehen kann:

- README prüfen/aktualisieren
- Änderungen nachvollziehbar im PR beschreiben
- Bei neuen Projekten: Projekt-Card in `index.html` eintragen

---

## 12. README-Struktur (Vorlage)

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

## 13. Design System

> **Zweck:** Einheitliches Design aller Fauteck-Webanwendungen.
> Dieses Projekt nutzt Bootstrap 5.3 mit anwendungsspezifischem CSS.

### Lokale Abhängigkeiten (`/vendor`)

Bootstrap und Font Awesome werden **lokal** aus dem `/vendor`-Verzeichnis geladen (keine externen CDN-Aufrufe).

Jede HTML-Datei bindet im `<head>` ein (Pfade relativ zur jeweiligen Datei):

```html
<!-- Bootstrap 5.3.2 -->
<link href="./vendor/bootstrap/bootstrap.min.css" rel="stylesheet">

<!-- Font Awesome 6.4.2 -->
<link rel="stylesheet" href="./vendor/fontawesome/css/all.min.css">
```

Vor `</body>`:

```html
<!-- Bootstrap JS Bundle (inkl. Popper.js) -->
<script src="./vendor/bootstrap/bootstrap.bundle.min.js"></script>
```

> **Hinweis:** Für Dateien in Unterordnern (z. B. `apps/pong/`) relative Pfade anpassen: `../../vendor/...`

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
