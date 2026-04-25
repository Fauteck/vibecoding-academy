# CLAUDE.md — Binding Rules for AI-Assisted Development

> **Scope:** This document is the **sole, authoritative rule base** for this repository.
> It supersedes any additional AI/design/README rule files.

---

## Project Overview

**Vibecoding Academy** is a workshop and showcase project for AI-assisted web coding.
It demonstrates the journey from idea to finished web application using AI tools.

- **Type:** Purely static website (HTML, CSS, JavaScript) — no backend, no database
- **Deployment:** GitHub Pages (automatic on push to `main`)
- **Live:** https://fauteck.github.io/vibecoding-academy/
- **Content:** Landing page, finished apps (Pong, GTA parody, Weekend planner), game concepts, Wiki/Handout

### Architecture

Each project is a **self-contained HTML file** in its own subfolder:

```
vibecoding-academy/
├── index.html              # Landing page
├── robots.txt              # Crawler blocking
├── css/                    # Shared stylesheets
│   ├── tokens.css          # Design tokens, reset, base styles
│   ├── nav.css             # Navigation styles
│   └── footer.css          # Footer styles
├── js/                     # Shared scripts
│   └── components.js       # Navigation & footer (JS injection)
├── apps/                   # Finished projects
│   ├── pong/index.html     # Pong game
│   ├── gta/index.html      # GTA parody
│   └── wochenendplanung/index.html  # Weekend planner
├── wiki/                   # Workshop materials
│   ├── index.html          # Workshop handout
│   └── beispiel-claude.md  # Example CLAUDE.md
└── ideen/                  # Game concepts (Markdown)
```

- No build process, no bundler, no package manager
- **Shared layout assets** (`css/`, `js/`) for navigation, footer, design tokens, and base styles
- Page-specific styles stay inline in HTML files
- Game/app logic stays self-contained inline in each HTML file
- External dependencies stored locally in `/vendor` (Bootstrap 5.3.2, Font Awesome 6.4.2)
- Each page sets `<html data-depth="0|1|2">` for correct relative path resolution via `js/components.js`

### Further Documentation

Detailed architecture and workflow documentation (LLM-optimized with absolute paths and code examples):

| Document | Content |
|----------|---------|
| [docs/INDEX.md](docs/INDEX.md) | Documentation hub, file quick reference, directory structure |
| [docs/architektur.md](docs/architektur.md) | Shared components, path resolution, CSS chain, design tokens |
| [docs/arbeitsablaeufe.md](docs/arbeitsablaeufe.md) | Step-by-step guides, HTML templates, common tasks |
| [DESIGN.md](DESIGN.md) | Design system — tokens, rationale, accessibility, components |

### Adding a New Project

1. Create a subfolder in `apps/` with its own `index.html` (e.g., `apps/snake/index.html`)
2. Set `<html data-depth="2">`, include `css/tokens.css`, `css/nav.css`, `css/footer.css` (relative paths: `../../css/...`)
3. Insert `<nav id="site-nav"></nav>` and `<footer id="site-footer"></footer>` as placeholders
4. Include `js/components.js` before `</body>` (`../../js/components.js`)
5. Add a project card to the "Ergebnisse" section in the main `index.html`
6. Commit & push — GitHub Pages deploys automatically

---

## Table of Contents

1. [Core Principles](#1-core-principles)
2. [Working Style for Long Sessions (API Stability)](#2-working-style-for-long-sessions-api-stability)
3. [Allowed / Not Allowed](#3-allowed--not-allowed)
4. [Branching, Merge, Reviews](#4-branching-merge-reviews)
5. [Quality Requirements (Gates)](#5-quality-requirements-gates)
6. [Security & Secrets](#6-security--secrets)
7. [OWASP Top 10](#7-owasp-top-10)
8. [robots.txt](#8-robotstxt)
9. [Build & Deployment](#9-build--deployment)
10. [Definition of Done](#10-definition-of-done)
11. [Documentation Requirements](#11-documentation-requirements)
12. [README Structure (Template)](#12-readme-structure-template)
13. [Design System](#13-design-system)

---

## 1. Core Principles

- **GitOps first**: The live website is updated exclusively via Git pushes to `main` (GitHub Pages).
- **No manual deployments**: Changes always go through Code Change → Commit → Push.
- **Reproducibility**: The `main` branch always reflects the live state.
- **Self-contained projects**: Each game/project is a standalone HTML file — no shared build artifacts.

---

## 2. Working Style for Long Sessions (API Stability)

> Goal: Avoid stream timeouts (`Stream idle timeout — partial response received`).
> The cause is single long operations without intermediate output,
> not the number of parallel tool calls.

### Keep Output Small

- Filter bash output: `head -n 100`, `tail -n 100`, `grep -E '...'`,
  `wc -l` instead of full logs/dumps.
- Read large files in segments (`Read` with `offset`/`limit`),
  not completely.
- No `find . | ...` dumps of entire project trees — use targeted
  `find`/`rg` queries with path filters.

### Don't Block Synchronously on Long Runs

- Start builds, tests, installations as background tasks
  (`run_in_background: true`), don't wait in the foreground.
- Set realistic timeouts for bash calls; hanging processes should
  abort quickly rather than silently blocking the stream.
- No `sleep` loops or poll-busy-waits in the main thread.

### Protect Context

- For broad codebase research (> 3 queries, unclear scope) use the
  `Explore` subagent — it encapsulates large search results and returns
  only a summary.
- For design decisions use the `Plan` subagent before making extensive edits.

### Efficient, Not Cautious

- Run independent tool calls in parallel in one message (e.g.,
  multiple `Read`s or `grep`s) — this reduces total time and thus
  the probability of timeout.
- Sequential only when one call depends on the result of the previous.

### Structure Large Tasks

- Break tasks with many file changes (> 10 files or > 3 logically
  separate sub-steps) into clear sub-steps, each as a self-contained
  unit with an intermediate result.
- Use `TodoWrite` to keep progress visible and resume seamlessly
  after interruptions.

---

## 3. Allowed / Not Allowed

### The AI May

- Change and refactor code (within the existing architecture)
- Create new projects as self-contained HTML files in subfolders
- Create/modify files (including documentation)
- Extend existing game concepts (Markdown in `ideen/`)

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

## 6. Security & Secrets

- No secrets in code or repo (this project requires none)
- No `.env` files (purely static project)
- No external CDN inclusions — dependencies are stored locally in `/vendor`
- External links must include `rel="noopener"`

### Content Security Policy

Every HTML file carries an identical `http-equiv` CSP meta-tag (GitHub Pages
delivers no server-side headers, so the meta-tag is the only mechanism).
Canonical value — copy this verbatim into every new page:

```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'">
```

**Directive rationale:**

| Directive | Value | Reason |
|---|---|---|
| `default-src` | `'self'` | Block all unlisted resource types by default |
| `script-src` | `'self' 'unsafe-inline'` | Inline game scripts; no external JS |
| `style-src` | `'self' 'unsafe-inline'` | Inline styles; no external CSS |
| `img-src` | `'self' data:` | Allows inline data-URIs (icons, favicons) |
| `font-src` | `'self'` | Font Awesome loaded from `/vendor` |
| `connect-src` | `'self'` | No external API calls |
| `frame-ancestors` | `'none'` | Prevents clickjacking via iframes |
| `base-uri` | `'self'` | Prevents `<base>` tag injection |
| `form-action` | `'self'` | Forms may only submit to same origin |

**If a page needs to submit a form to an external service** (e.g. `https://api.web3forms.com`),
add that origin to `form-action` on that page only — do not change the canonical template.

---

## 7. OWASP Top 10

This repo has no backend and no API. OWASP applies **by analogy**:

- **Input Validation**: Validate user input in games client-side
- **Supply Chain**: Dependencies in `/vendor` — no external supply chain
- **XSS Prevention**: No `innerHTML` with uncontrolled data; prefer `textContent`
- **Secrets**: No API keys or credentials in frontend code

---

## 8. robots.txt

The `robots.txt` is present and blocks all search engines and AI crawlers:

- File is versioned in the repository root
- No manual changes outside of Git
- Blocked crawlers: `*` (all), plus explicitly GPTBot, ChatGPT-User, Google-Extended, anthropic-ai, ClaudeBot, Claude-Web, CCBot, Bytespider, PerplexityBot, and others

> `robots.txt` is **not a security mechanism** — it is a polite request to crawlers.

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

## 10. Definition of Done

A change is "done" when:

- Code implemented and embedded in HTML file
- Manually tested (desktop + mobile, multiple browsers)
- Responsive design intact
- README updated (if new project or structural change)
- Main `index.html` updated (if new project)
- PR reviewed and merged
- GitHub Pages deployment successful (page reachable)

---

## 11. Documentation Requirements

For every change that can go to production:

- Check/update README
- Describe changes clearly in the PR
- For new projects: add project card to `index.html`

---

## 12. README Structure (Template)

Every `README.md` in this repository follows this outline. Sections that do not apply are omitted — the order remains the same.

### Principles for READMEs

- **English** — all READMEs in English
- **Self-explanatory** — setup and operation must be possible without additional docs
- **No filler text** — every section has a clear purpose
- **Tables > prose**
- **ASCII diagrams > no diagrams** — no external images

### Mandatory Structure

| # | Section | Required | Condition for Optional |
|---|---------|----------|------------------------|
| 1 | Header with badges | **Yes** | — |
| 2 | User interface | No | Only for apps with UI |
| 3 | Feature overview | **Yes** | — |
| 4 | Architecture | **Yes** | — |
| 5 | Prerequisites | **Yes** | — |
| 6 | Installation / Quick start | **Yes** | — |
| 7 | Reverse proxy setup | No | Only for special proxy config |
| 8 | Configuration | **Yes** | — |
| 9 | API reference | No | Required if own APIs |
| 10 | Database schema | No | Recommended for own DBs |
| 11 | Security aspects | **Yes** | — |
| 12 | Technology stack | **Yes** | — |
| 13 | Project structure | No | Recommended for monorepos |
| 14 | Development | **Yes** | — |
| 15 | Versioning | No | Recommended |
| 16 | License | **Yes** | — |

---

## 13. Design System

> **Purpose:** Consistent design across all Fauteck web applications.
> This project uses Bootstrap 5.3 with application-specific CSS.
> **Full specification:** See [DESIGN.md](DESIGN.md)

### Local Dependencies (`/vendor`)

Bootstrap and Font Awesome are loaded **locally** from the `/vendor` directory (no external CDN calls).

Each HTML file includes in `<head>` (paths relative to the file):

```html
<!-- Bootstrap 5.3.2 -->
<link href="./vendor/bootstrap/bootstrap.min.css" rel="stylesheet">

<!-- Font Awesome 6.4.2 -->
<link rel="stylesheet" href="./vendor/fontawesome/css/all.min.css">
```

Before `</body>`:

```html
<!-- Bootstrap JS Bundle (incl. Popper.js) -->
<script src="./vendor/bootstrap/bootstrap.bundle.min.js"></script>
```

> **Note:** For files in subfolders (e.g., `apps/pong/`) adjust relative paths: `../../vendor/...`

### Color Palette (Design Tokens)

```css
:root {
    --primary-color:   #5B8BD6;   /* Accent, links, borders */
    --secondary-color: #3D5A8C;   /* Navbar, footer */
    --success-color:   #5CC6A7;   /* Positive values, success */
    --danger-color:    #D46B6B;   /* Errors, negative values */
    --warning-color:   #D4A55B;   /* Warnings */
    --info-color:      #6BB8D4;   /* Info hints */
    --bg-page:         #EEF2F7;   /* Page background */
    --bg-card:         rgba(255, 255, 255, 0.85); /* Card background */
    --text-primary:    #2D3748;   /* Primary text */
    --text-muted:      #7A8599;   /* Muted text */
    --border-color:    #D4DCE8;   /* Border color */
    --border-radius-card: 10px;
}
```

### Typography

```css
font-family: 'IBM Plex Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
```

### Responsive Breakpoints

| Breakpoint | Width | Behavior |
|---|---|---|
| Desktop | > 968 px | Desktop navbar visible; hamburger hidden |
| Mobile | ≤ 968 px | Hamburger menu; dropdown navigation |
| Small mobile | ≤ 600 px | Tighter nav inner padding |
| Glassmorphism off | ≤ 992 px | backdrop-filter disabled; card background becomes solid |

### Navigation

- **Desktop (> 968 px):** Sticky white navbar with `--shadow-sm`, brand left, links + CTA right
- **Mobile (≤ 968 px):** Hamburger button; tap opens full-width dropdown with `--shadow-md`
- Body automatically gets `padding-top: 4.5rem` via `nav.css`

### Components

| Class | Usage |
|---|---|
| `.card` | Standard card (glassmorphism on desktop, solid on mobile) |
| `.section-header` | Section heading with primary-color left border |
| `.site-nav` | Sticky top navigation bar |
| `.site-nav-cta` | Call-to-action button in navbar |
| `.footer` | Footer area |
| `.page-wrapper` | Main content wrapper with top/bottom padding |

---

## Compatibility with Other AI Tools

This file is named `CLAUDE.md` and is automatically recognized by Claude Code.

| Tool | Expected Path |
|---|---|
| Claude Code | `CLAUDE.md` (repository root) |
| GitHub Copilot | `.github/copilot-instructions.md` |
| Cursor | `.cursor/rules` or `.cursorrules` |
| Windsurf | `.windsurfrules` |
| Cline | `.clinerules` |

Recommendation: Create symlinks or copies of `CLAUDE.md` at the respective paths so all tools use the same rules.
