# CLAUDE.md — Binding Rules for AI-Assisted Development

> **Scope:** This document is the **sole, authoritative rule base** for this repository.
> It supersedes any additional AI/design/README rule files.

## Wissensquelle: llm-wiki (Todoteck)

Vor inhaltlichen Antworten: Notiz `_index` und die Repo-Übersicht `vibecoding-academy` im Todoteck-Projekt `llm-wiki` lesen. Es gibt **kein** Wiki-Repository auf GitHub. Zweck/Hosting stehen im Wiki, Inhalte/Build/Seitenstruktur in diesem Repo. Vollständige Regeln: docs/claude/wiki.md lesen.

---

## Project Overview

**Vibecoding Academy** is a workshop and showcase project for AI-assisted web coding.
It demonstrates the journey from idea to finished web application using AI tools.

- **Type:** Purely static website (HTML, CSS, JavaScript) — no backend, no database
- **Deployment:** GitHub Pages (automatic on push to `main`)
- **Live:** https://academy.niklasfauteck.de/ — eigene Domain via `CNAME` im
  Repository-Root. Die alte Adresse `fauteck.github.io/vibecoding-academy/`
  leitet dorthin um und gilt nicht mehr als kanonisch.
- **Content:** Landing page, finished apps (Pong, GTA parody, Weekend planner), game concepts, Wiki/Handout

### Architecture

- No build process, no bundler, no package manager
- **Shared layout assets** (`css/`, `js/`) for navigation, footer, design tokens, and base styles
- Page-specific styles stay inline in HTML files
- Game/app logic stays self-contained inline in each HTML file
- External dependencies stored locally in `/vendor` (Bootstrap 5.3.2, Font Awesome 6.4.2)
- Each page sets `<html data-depth="0|1|2">` for correct relative path resolution via `js/components.js`

Verzeichnisbaum, Doku-Landkarte und Schritte für ein neues Projekt: docs/claude/architektur.md.

---

## 1. Core Principles

- **GitOps first**: The live website is updated exclusively via Git pushes to `main` (GitHub Pages).
- **No manual deployments**: Changes always go through Code Change → Commit → Push.
- **Reproducibility**: The `main` branch always reflects the live state.
- **Self-contained projects**: Each game/project is a standalone HTML file — no shared build artifacts.

---

## 3. Allowed / Not Allowed

### The AI May

- Change and refactor code (within the existing architecture)
- Create new projects as self-contained HTML files in subfolders
- Create/modify files (including documentation)
- Extend existing game concepts (Markdown in `projekte/`)

### The AI May NOT

- Introduce build tools, package managers, or bundlers (no npm, webpack, Vite, etc.)
- Introduce frameworks (no React, Vue, Angular, etc.)
- Propose server-side components (no Node.js, Python, etc.)
- Include external CDN links (all dependencies are loaded locally from `/vendor`)
- Extract game/app logic into shared files (games remain self-contained)

> **Note:** Shared layout assets (navigation, footer, design tokens) live centrally in `css/` and `js/`.
> Only game/app-specific logic and styles stay inline in each HTML file.

---

## 4. Branching, Merge, Reviews

- Development on feature/fix branches
- Merge via pull request
- `main` is release-ready/production-grade and protected
- GitHub Pages deploys automatically from `main`

Recommended branch naming: `feature/...`, `fix/...`, `chore/...`

PR contains: Purpose, scope, affected projects/games

---

## 5. Quality Requirements (Gates)

Before merging into `main`:

- HTML is valid and well-formed
- No broken links (internal navigation)
- Responsive design works (desktop + mobile)
- No debug output (`console.log`, `alert`) in final code
- No temporary workarounds
- Dependencies are loaded from `/vendor` (no external CDN calls)
- Accessibility: `alt` attributes on images, `aria-label` on icon-only buttons

> **Note:** There is no CI — checks are performed manually before merge.

---

## Security (Kurzfassung)

- No secrets in code or repo (this project requires none)
- No `.env` files (purely static project)
- No external CDN inclusions — dependencies are stored locally in `/vendor`
- External links must include `rel="noopener"`

Jede HTML-Datei trägt dieselbe CSP-Meta-Tag-Zeile (kanonischer Wert in docs/claude/sicherheit.md).

---

## 9. Build & Deployment

### Deployment

- **No build process** — HTML files are served directly
- **GitHub Pages** deploys automatically on push to `main`
- No Docker, no GHCR, no self-hosted runner

### Rollback

- Rollback via revert commit on `main` or reset to a previous commit
- GitHub Pages updates automatically


---

## Verweise: Thema -> Datei (bei Bedarf lesen, keine @-Imports)

| Thema / Anlass | Datei |
|---|---|
| Wiki-Pflege, Todoteck llm-wiki, `_log`/`_schema` | docs/claude/wiki.md |
| Verzeichnisbaum, Doku-Landkarte, neues Projekt anlegen | docs/claude/architektur.md |
| Lange Sessions, Output klein halten, große Aufgaben, Subagents | docs/claude/arbeitsweise-sessions.md |
| CSP (kanonischer Wert), OWASP, robots.txt, Formulare an externe Dienste | docs/claude/sicherheit.md |
| Definition of Done, Doku-Pflichten, Doku-Hygiene | docs/claude/definition-of-done-doku.md |
| README anlegen/ändern | docs/claude/readme-struktur.md |
| UI/Styling: vendor-Einbindung, Tokens, Typografie, Breakpoints, Navigation, Komponenten | docs/claude/design-system.md (Details: DESIGN.md) |
| Andere KI-Tools (Copilot, Cursor, Windsurf, Cline) | docs/claude/ki-tools-kompatibilitaet.md |
