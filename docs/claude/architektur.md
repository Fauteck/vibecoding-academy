> Lesen: bei Änderungen an Verzeichnisstruktur, neuen Seiten/Projekten, Shared Assets (css/, js/) oder wenn die Doku-Landkarte gebraucht wird.

### Architecture

Each project is a **self-contained HTML file** in its own subfolder:

```
vibecoding-academy/
├── index.html              # Landing page
├── 404.html                # Error page
├── impressum.html          # Legal notice
├── datenschutz.html        # Privacy policy
├── agb.html                # Terms of service
├── robots.txt              # Crawler blocking
├── CNAME                   # academy.niklasfauteck.de
├── CLAUDE.md               # This file — the binding rule base
├── DESIGN.md               # Design system
├── README.md               # Project README
├── NOTICE.md               # Third-party licences
├── css/                    # Shared stylesheets
│   ├── tokens.css          # Design tokens, reset, base styles, .t-* type helpers
│   ├── hero.css            # Shared hero section, action row and CTA
│   ├── nav.css             # Navigation styles
│   └── footer.css          # Footer styles
├── js/                     # Shared scripts
│   └── components.js       # Navigation, footer & skip link (JS injection)
├── images/                 # Optimised assets (avif/webp/jpg) + og-image.png
├── vendor/                 # Local dependencies — no CDN
│   ├── bootstrap/          # Bootstrap 5.3.2
│   ├── fontawesome/        # Font Awesome 6.4.2 (woff2 only)
│   ├── ibm-plex-sans/      # Variable font, wght 100–700
│   ├── ibm-plex-sans-condensed/  # Display face, static cut 700
│   ├── ibm-plex-mono/      # Static cuts 400/500/700 (no variable font)
│   ├── marked/             # Markdown parser (projekte/viewer.html)
│   └── dompurify/          # HTML sanitiser (projekte/viewer.html)
├── apps/                   # Finished projects
│   ├── pong/index.html     # Pong game
│   ├── gta/index.html      # GTA parody (+ fonts/)
│   ├── wochenendplanung/index.html  # Weekend planner
│   └── blog/index.html     # AI blog (+ article.html)
├── wiki/                   # Workshop materials
│   ├── index.html          # Workshop handout
│   ├── beispiel-claude.md  # Example CLAUDE.md
│   └── workshop-deck/      # Presentation deck — own palette and type;
│                           # alignment with the design system is still open
├── projekte/               # Game concepts (Markdown) + index.html + viewer.html
├── kontakt/                # Contact page
├── ueber-mich/             # About page
├── hosting/                # Hosting comparison page
├── docs/                   # LLM-optimised documentation
└── .claude/skills/         # Skill definitions — the only path Claude Code loads
```

> The tree lists the top-level directories completely. It is hand-maintained and
> nothing checks it — when a directory is added, this block is part of the change.


### Further Documentation

Detailed architecture and workflow documentation (LLM-optimized with absolute paths and code examples):

| Document | Content |
|----------|---------|
| [docs/INDEX.md](../INDEX.md) | Documentation hub, file quick reference, directory structure |
| [docs/architektur.md](../architektur.md) | Shared components, path resolution, CSS chain, design tokens |
| [docs/arbeitsablaeufe.md](../arbeitsablaeufe.md) | Step-by-step guides, HTML templates, common tasks |
| [DESIGN.md](../../DESIGN.md) | Design system — tokens, rationale, accessibility, components |

> **Skill statt Doku:** Die Design-Leitplanken für generierte Oberflächen liegen
> als Skill unter `.claude/skills/vibecoding-academy-design/SKILL.md`. Bis
> 2026-08-26 lagen sie als `docs/SKILL.md` — dort hat Claude Code sie nie
> geladen, erkannt wird nur `.claude/skills/<name>/SKILL.md`. Eine
> Skill-Definition, die nicht geladen wird, ist keine Regel, sondern ein Text.

> **Nicht mehr hier:** Der Vorschlagskatalog für visuelle Verbesserungen lag bis
> 2026-08-26 als `docs/QUICK_WINS.md` im Repo. Die sieben offenen Punkte liegen
> jetzt als Unteraufgaben der Todoteck-Aufgabe **„vibecoding-academy: Visuelle
> Quick Wins"** (Projekt Home Lab) — ein Backlog gehört in ein Werkzeug, das
> abhaken kann.

### Adding a New Project

1. Create a subfolder in `apps/` with its own `index.html` (e.g., `apps/snake/index.html`)
2. Set `<html data-depth="2">`, include `css/tokens.css`, `css/nav.css`, `css/footer.css` (relative paths: `../../css/...`)
3. Insert `<nav id="site-nav"></nav>` and `<footer id="site-footer"></footer>` as placeholders
4. Include `js/components.js` before `</body>` (`../../js/components.js`)
5. Add a project card to the "Ergebnisse" section in the main `index.html`
6. Commit & push — GitHub Pages deploys automatically
