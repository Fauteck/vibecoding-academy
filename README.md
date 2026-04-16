# Vibecoding Academy

[![GitHub Pages](https://img.shields.io/badge/Live-GitHub%20Pages-blue)](https://fauteck.github.io/vibecoding-academy/)
[![HTML](https://img.shields.io/badge/HTML-statisch-orange)]()
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.2-purple)](https://getbootstrap.com/)

KI-gestütztes Web-Coding -- von der Idee bis zum Release.

**Live:** [fauteck.github.io/vibecoding-academy](https://fauteck.github.io/vibecoding-academy/)

---

## Feature-Übersicht

| Feature | Beschreibung |
|---------|-------------|
| **Workshop** | Interaktiver Workshop: Vibecoding in 5 Schritten -- von der Idee bis zum Deploy |
| **Fertige Apps** | Pong, Grand Thomas Auto 6, Wochenendplanung als spielbare Beispiele |
| **Spielkonzepte** | 10 Konzeptvorlagen (Flappy Bird, Memory, Snake, Tetris u.a.) als Markdown mit Viewer |
| **Workshop-Handout** | Ausführliches Wiki zu Vibecoding, KI-Tools, Hosting und Best Practices |
| **Coach-Profil** | Vorstellung des Workshop-Leiters Niklas Fauteck |
| **Responsive Design** | Desktop-Navbar mit Dropdowns, Mobile Bottom Navigation mit Offcanvas |

---

## Architektur

Rein statische Website ohne Backend, Build-Prozess oder Datenbank. Jedes Projekt ist eine **selbstständige HTML-Datei** in einem eigenen Unterordner.

```
Browser  ──>  GitHub Pages  ──>  Statische HTML-Dateien
                                  (CSS + JS inline)
                                  (Bootstrap + Font Awesome lokal aus /vendor)
```

---

## Voraussetzungen

| Anforderung | Details |
|-------------|---------|
| Browser | Aktueller Browser (Chrome, Firefox, Safari, Edge) |
| Lokal testen | Beliebiger Webserver oder `python3 -m http.server` |
| Deployment | Git + GitHub-Account (Pages aktiviert) |

---

## Installation / Schnellstart

```bash
git clone https://github.com/Fauteck/vibecoding-academy.git
cd vibecoding-academy

# Lokaler Webserver starten (optional)
python3 -m http.server 8000
# Öffne http://localhost:8000
```

Alternativ: `index.html` direkt im Browser öffnen.

---

## Konfiguration

Keine Konfiguration erforderlich. Alle Einstellungen (Farben, Schriften, Breakpoints) sind als CSS-Variablen direkt in den HTML-Dateien definiert. Siehe [CLAUDE.md](CLAUDE.md) §12 für das vollständige Design System.

---

## Sicherheitsaspekte

| Maßnahme | Umsetzung |
|----------|-----------|
| **Lokale Abhängigkeiten** | Bootstrap und Font Awesome lokal aus `/vendor` — keine externen CDN-Aufrufe |
| **Externe Links** | Mit `rel="noopener"` versehen |
| **Keine Secrets** | Kein Backend, keine API-Keys, keine `.env`-Dateien |
| **XSS-Prävention** | `textContent` statt `innerHTML` mit unkontrollierten Daten |
| **robots.txt** | Blockiert alle Suchmaschinen und KI-Crawler (GPTBot, ClaudeBot u.a.) |

---

## Technologie-Stack

| Technologie | Version | Zweck |
|-------------|---------|-------|
| HTML5 | -- | Seitenstruktur |
| CSS3 | -- | Styling (inline) |
| JavaScript | ES6+ | Interaktivität (inline) |
| Bootstrap | 5.3.2 | Responsive Layout, Komponenten |
| Font Awesome | 6.4.2 | Icons |
| GitHub Pages | -- | Hosting & Deployment |

---

## Projektstruktur

```
vibecoding-academy/
├── index.html                          # Landing Page
├── README.md                           # Diese Datei
├── CLAUDE.md                           # KI-Entwicklungsregeln
├── robots.txt                          # Crawler-Blocking
├── images/
│   ├── content-bg.jpg                  # Hintergrundbild
│   └── niklas-fauteck.jpg              # Coach-Foto
├── apps/                               # Fertige Projekte
│   ├── pong/index.html                 # Pong -- Spieler gegen KI
│   ├── gta/index.html                  # Grand Thomas Auto 6 -- GTA-Parodie
│   └── wochenendplanung/index.html     # Wochenenddienst-Planung
├── ideen/                              # Spielkonzepte (Markdown)
│   ├── viewer.html                     # Markdown-Viewer für Konzepte
│   ├── flappybird.md                   # Flappy Bird
│   ├── haushaltsbuch.md                # Haushaltsbuch
│   ├── memory.md                       # Memory
│   ├── minesweeper.md                  # Minesweeper
│   ├── pong.md                         # Pong
│   ├── snake.md                        # Snake
│   ├── solitaire.md                    # Solitär
│   ├── sudoku.md                       # Sudoku
│   ├── tetris.md                       # Tetris
│   └── tictactoe.md                    # Tic-Tac-Toe
├── wiki/                               # Workshop-Materialien
│   ├── index.html                      # Workshop-Handout
│   └── beispiel-claude.md              # Beispiel CLAUDE.md
└── ueber-mich/                         # Coach-Profil
    └── index.html                      # Niklas Fauteck
```

---

## Entwicklung

### Neues Projekt hinzufügen

1. Unterordner in `apps/` anlegen mit eigener `index.html` (z.B. `apps/snake/index.html`)
2. Einheitliche Navigation einbauen (Desktop-Navbar mit Dropdowns, Mobile Bottom Nav mit Offcanvas)
3. Projekt-Card in der Haupt-`index.html` im Bereich "Ergebnisse" eintragen
4. Dropdown-Einträge in der Navigation aller bestehenden Seiten ergänzen
5. Committen & pushen -- GitHub Pages deployt automatisch

### Branching

- Entwicklung auf Feature-/Fix-Branches (`feature/...`, `fix/...`, `chore/...`)
- Merge via Pull Request
- `main` ist geschützt und entspricht dem Live-Stand

### Fertige Projekte

| Projekt | Link | Beschreibung |
|---------|------|-------------|
| Pong | [apps/pong/](https://fauteck.github.io/vibecoding-academy/apps/pong/) | Klassisches Pong-Spiel: Spieler gegen KI |
| Grand Thomas Auto 6 | [apps/gta/](https://fauteck.github.io/vibecoding-academy/apps/gta/) | GTA-Parodie im RTL-Sendezentrum |
| Wochenendplanung | [apps/wochenendplanung/](https://fauteck.github.io/vibecoding-academy/apps/wochenendplanung/) | Wochenenddienst-Planung und Übersicht |

### Spielkonzepte

Konzepte und Spielideen als Markdown-Dateien in `projekte/`, abrufbar über den [Konzept-Viewer](https://fauteck.github.io/vibecoding-academy/projekte/viewer.html):

Flappy Bird, Haushaltsbuch, Memory, Minesweeper, Pong, Snake, Solitär, Sudoku, Tetris, Tic-Tac-Toe

### Workshop-Handout

Das [Workshop-Handout](https://fauteck.github.io/vibecoding-academy/wiki/) behandelt:

- Was ist Vibecoding und wie funktioniert die Zusammenarbeit mit KI
- Paradigmenwechsel: Eigene Tools statt Massenprodukte
- Das Copycat-Prinzip und iterativer Ansatz
- KI-Kompetenzen aufteilen: ChatGPT vs. Claude
- Rahmenbedingungen mit CLAUDE.md festlegen
- Erfolgsfaktoren und alternative Tools
- Hosting: Lokale Entwicklung, GitHub Pages und Docker

---

## Lizenz

Eigener Quellcode und Inhalte: Alle Rechte vorbehalten. &copy; Niklas Fauteck

### Drittanbieter-Komponenten

Dieses Projekt verwendet Open-Source-Bibliotheken und Assets:

| Komponente | Version | Lizenz |
|---|---|---|
| Bootstrap | 5.3.2 | MIT |
| Popper.js | (im Bootstrap Bundle) | MIT |
| Font Awesome Free | 6.4.2 | Icons: CC BY 4.0 / Fonts: SIL OFL 1.1 / Code: MIT |
| JetBrains Mono | — | SIL OFL 1.1 |
| marked.js | 15.0.7 | MIT |
| DOMPurify | 3.3.3 | Apache 2.0 / MPL 2.0 |

Vollständige Lizenztexte und Copyright-Hinweise: [NOTICE.md](NOTICE.md)

---

## Kontakt

Niklas Fauteck -- ki [at] fauteck.eu

- [GitHub](https://github.com/Fauteck/vibecoding-academy)
- [LinkedIn](https://www.linkedin.com/in/fauteck)
