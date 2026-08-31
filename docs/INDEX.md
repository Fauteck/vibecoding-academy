# Documentation — Vibecoding Academy

> Purely static website (HTML, CSS, JavaScript). No backend, no database, no build process.
> Deployment via GitHub Pages on push to `main`.

---

## Quick Navigation

| Document | Content |
|----------|---------|
| [CLAUDE.md](../CLAUDE.md) | Governance, rules, design system, definition of done |
| [DESIGN.md](../DESIGN.md) | Design system — tokens, rationale, accessibility, components |
| [docs/architektur.md](architektur.md) | Shared components, path resolution, CSS chain, design tokens |
| [docs/arbeitsablaeufe.md](arbeitsablaeufe.md) | Step-by-step guides for common tasks |
| [README.md](../README.md) | Project overview, features, tech stack |

---

## Key Files

| Absolute Path | Purpose | Lines |
|---------------|---------|-------|
| `/home/user/vibecoding-academy/js/components.js` | Navigation, footer & skip link injection (all pages) | 96 |
| `/home/user/vibecoding-academy/css/tokens.css` | Design tokens, CSS reset, base styles, `.t-*` type helpers | 397 |
| `/home/user/vibecoding-academy/css/hero.css` | Shared hero section, action row and CTA | 96 |
| `/home/user/vibecoding-academy/css/nav.css` | Navigation styles (desktop + mobile) | 207 |
| `/home/user/vibecoding-academy/css/footer.css` | Footer styles | 19 |
| `/home/user/vibecoding-academy/DESIGN.md` | Design system specification | — |
| `/home/user/vibecoding-academy/index.html` | Landing page | 959 |

---

## Directory Structure

```
/home/user/vibecoding-academy/
├── index.html                          # Landing page (depth=0)
├── CLAUDE.md                           # Governance & rules
├── DESIGN.md                           # Design system
├── README.md                           # Project README
├── NOTICE.md                           # Third-party licences
├── robots.txt                          # Crawler blocking
├── 404.html                            # Error page
├── impressum.html                      # Legal notice (depth=0)
├── datenschutz.html                    # Privacy policy (depth=0)
├── agb.html                            # Terms of service (depth=0)
│
├── css/                                # Shared stylesheets
│   ├── tokens.css                      #   Design tokens + reset + .t-* type helpers
│   ├── hero.css                        #   Hero section, action row, CTA
│   ├── nav.css                         #   Navigation (desktop + mobile)
│   └── footer.css                      #   Footer
│
├── js/                                 # Shared scripts
│   └── components.js                   #   Nav & footer injection
│
├── apps/                               # Finished projects (depth=2)
│   ├── pong/index.html                 #   Pong game
│   ├── gta/index.html                  #   GTA parody (+ fonts/)
│   ├── wochenendplanung/index.html     #   Weekend planner
│   └── blog/index.html                 #   AI blog (+ article.html)
│
├── wiki/                               # Workshop materials (depth=1)
│   ├── index.html                      #   Workshop handout
│   ├── beispiel-claude.md              #   Example CLAUDE.md
│   └── workshop-deck/index.html        #   Presentation deck (own palette/type)
│
├── projekte/                           # Game concepts (depth=1)
│   ├── index.html                      #   Overview page
│   ├── viewer.html                     #   Markdown viewer
│   ├── pong.md                         #   Pong concept
│   ├── snake.md                        #   Snake concept
│   ├── tetris.md                       #   Tetris concept
│   ├── memory.md                       #   Memory concept
│   ├── flappybird.md                   #   Flappy Bird concept
│   ├── minesweeper.md                  #   Minesweeper concept
│   ├── solitaire.md                    #   Solitaire concept
│   ├── sudoku.md                       #   Sudoku concept
│   ├── tictactoe.md                    #   Tic-Tac-Toe concept
│   └── haushaltsbuch.md                #   Household budget concept
│
├── ueber-mich/                         # Coach profile (depth=1)
│   └── index.html
│
├── kontakt/                            # Contact page (depth=1)
│   └── index.html
│
├── hosting/                            # Hosting comparison (depth=1)
│   └── index.html
│
├── images/                             # Static images
│   ├── content-bg.jpg                  #   Background image
│   ├── og-image.png                    #   Link preview, 1200x630
│   └── ...                             #   niklas-fauteck-* in avif/webp/jpg
│
├── vendor/                             # Local dependencies
│   ├── bootstrap/                      #   Bootstrap 5.3.2
│   │   ├── bootstrap.min.css
│   │   └── bootstrap.bundle.min.js
│   ├── fontawesome/                    #   Font Awesome 6.4.2 (woff2 only)
│   │   └── css/all.min.css
│   ├── ibm-plex-sans/                  #   Variable font, wght 100-700
│   ├── ibm-plex-mono/                  #   Static cuts 400/500/700 (family has no VF)
│   ├── marked/                         #   Markdown parser
│   └── dompurify/                      #   HTML sanitiser
│
└── docs/                               # LLM-optimised documentation
    ├── INDEX.md                        #   ← You are here
    ├── architektur.md                  #   Architecture & components
    └── arbeitsablaeufe.md              #   Workflows & tasks

.claude/skills/                         # Only path Claude Code loads skills from
└── vibecoding-academy-design/SKILL.md  #   Design guardrails for generated UI
```
