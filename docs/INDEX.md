# Dokumentation — Vibecoding Academy

> Rein statische Website (HTML, CSS, JavaScript). Kein Backend, keine Datenbank, kein Build-Prozess.
> Deployment via GitHub Pages bei Push auf `main`.

---

## Schnellnavigation

| Dokument | Inhalt |
|----------|--------|
| [CLAUDE.md](../CLAUDE.md) | Governance, Regeln, Design System, Definition of Done |
| [docs/architektur.md](architektur.md) | Shared Components, Pfadauflösung, CSS-Kette, Design Tokens |
| [docs/arbeitsablaeufe.md](arbeitsablaeufe.md) | Schritt-für-Schritt-Anleitungen für häufige Aufgaben |
| [README.md](../README.md) | Projekt-Übersicht, Features, Tech Stack |

---

## Wichtigste Dateien

| Absoluter Pfad | Zweck | Zeilen |
|----------------|-------|--------|
| `/home/user/vibecoding-academy/js/components.js` | Navigation & Footer Injection (alle Seiten) | 87 |
| `/home/user/vibecoding-academy/css/tokens.css` | Design Tokens, CSS Reset, Basis-Styles | 79 |
| `/home/user/vibecoding-academy/css/nav.css` | Navigation-Styles (Desktop + Mobil) | 192 |
| `/home/user/vibecoding-academy/css/footer.css` | Footer-Styles | 19 |
| `/home/user/vibecoding-academy/index.html` | Landing Page | 959 |

---

## Verzeichnisstruktur

```
/home/user/vibecoding-academy/
├── index.html                          # Landing Page (depth=0)
├── CLAUDE.md                           # Governance & Regeln
├── README.md                           # Projekt-README
├── robots.txt                          # Crawler-Blocking
├── sitemap.xml                         # Sitemap
├── 404.html                            # Fehlerseite
├── impressum.html                      # Impressum (depth=0)
├── datenschutz.html                    # Datenschutz (depth=0)
├── agb.html                            # AGB (depth=0)
│
├── css/                                # Gemeinsame Stylesheets
│   ├── tokens.css                      #   Design Tokens + Reset
│   ├── nav.css                         #   Navigation (Desktop + Mobil)
│   └── footer.css                      #   Footer
│
├── js/                                 # Gemeinsame Skripte
│   └── components.js                   #   Nav & Footer Injection
│
├── apps/                               # Fertige Projekte (depth=2)
│   ├── pong/index.html                 #   Pong-Spiel
│   ├── gta/index.html                  #   GTA-Parodie (+ fonts/)
│   └── wochenendplanung/index.html     #   Wochenendplanung
│
├── wiki/                               # Workshop-Materialien (depth=1)
│   ├── index.html                      #   Workshop-Handout
│   └── beispiel-claude.md              #   Beispiel CLAUDE.md
│
├── projekte/                           # Spielkonzepte (depth=1)
│   ├── index.html                      #   Übersichtsseite
│   ├── viewer.html                     #   Markdown-Viewer
│   ├── pong.md                         #   Pong-Konzept
│   ├── snake.md                        #   Snake-Konzept
│   ├── tetris.md                       #   Tetris-Konzept
│   ├── memory.md                       #   Memory-Konzept
│   ├── flappybird.md                   #   Flappy Bird-Konzept
│   ├── minesweeper.md                  #   Minesweeper-Konzept
│   ├── solitaire.md                    #   Solitaire-Konzept
│   ├── sudoku.md                       #   Sudoku-Konzept
│   ├── tictactoe.md                    #   Tic-Tac-Toe-Konzept
│   └── haushaltsbuch.md                #   Haushaltsbuch-Konzept
│
├── ueber-mich/                         # Coach-Profil (depth=1)
│   └── index.html
│
├── kontakt/                            # Kontaktseite (depth=1)
│   └── index.html
│
├── hosting/                            # Hosting-Infos
│
├── images/                             # Statische Bilder
│   ├── content-bg.jpg                  #   Hintergrundbild
│   └── ...
│
├── vendor/                             # Lokale Abhängigkeiten
│   ├── bootstrap/                      #   Bootstrap 5.3.2
│   │   ├── bootstrap.min.css
│   │   └── bootstrap.bundle.min.js
│   └── fontawesome/                    #   Font Awesome 6.4.2
│       └── css/all.min.css
│
└── docs/                               # LLM-optimierte Dokumentation
    ├── INDEX.md                        #   ← Du bist hier
    ├── architektur.md                  #   Architektur & Komponenten
    └── arbeitsablaeufe.md              #   Arbeitsabläufe & Aufgaben
```
