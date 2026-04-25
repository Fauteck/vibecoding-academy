# Architecture & Components

> Back to [Documentation Index](INDEX.md)

---

## Page Types

Each HTML page sets `<html data-depth="N">` to control relative path resolution.

| data-depth | Path prefix | Examples |
|------------|-------------|---------|
| `0` | `./` | `index.html`, `impressum.html`, `datenschutz.html`, `agb.html`, `404.html` |
| `1` | `../` | `wiki/index.html`, `projekte/index.html`, `ueber-mich/index.html`, `kontakt/index.html` |
| `2` | `../../` | `apps/pong/index.html`, `apps/gta/index.html`, `apps/wochenendplanung/index.html` |

> **WARNING:** Wrong `data-depth` = broken navigation, footer, and asset paths across the entire page.

---

## Shared Layout System

### Path Resolution (`js/components.js`, lines 7–8)

```javascript
var depth = parseInt(document.documentElement.getAttribute('data-depth') || '0', 10);
var prefix = depth === 0 ? './' : '../'.repeat(depth);
```

`components.js` reads `data-depth` from the `<html>` tag and calculates the prefix for all asset and link paths. This prefix is used for navigation, footer, and all internal links.

### Navigation (`js/components.js`, lines 11–71)

| Area | Lines | Description |
|------|-------|-------------|
| `navLinks` array | 11–16 | Defines main navigation (Workshop, Wiki, Projekte, Coach) |
| `ctaLink` | 17 | Call-to-action button ("Workshop anfragen") |
| Active detection | 20–29 | Regex-based on `window.location.pathname` |
| `buildLinks()` | 32–42 | Generates link HTML with active state and `aria-current` |
| Desktop nav | 46–61 | Sticky navbar with brand, links, hamburger |
| Hamburger toggle | 64–70 | Mobile menu open/close with `aria-expanded` |

> **WARNING:** Changes to `navLinks` or `ctaLink` affect **all pages simultaneously**.

### Footer (`js/components.js`, lines 74–85)

Injected into `<footer id="site-footer"></footer>`. Contains links to Kontakt, Impressum, Datenschutz, and AGB — all with dynamic prefix.

---

## CSS Dependency Chain

Each page includes the following files **in this order**:

| # | File | Absolute Path | Purpose |
|---|------|--------------|---------|
| 1 | Bootstrap CSS | `/home/user/vibecoding-academy/vendor/bootstrap/bootstrap.min.css` | Grid, utilities, base components |
| 2 | Font Awesome | `/home/user/vibecoding-academy/vendor/fontawesome/css/all.min.css` | Icons |
| 3 | Design Tokens | `/home/user/vibecoding-academy/css/tokens.css` | CSS custom properties, reset, base styles |
| 4 | Navigation CSS | `/home/user/vibecoding-academy/css/nav.css` | Desktop and mobile navigation |
| 5 | Footer CSS | `/home/user/vibecoding-academy/css/footer.css` | Footer styles |
| 6 | Inline `<style>` | (in the HTML file itself) | Page-specific styles |

Before `</body>`:

| # | File | Absolute Path | Purpose |
|---|------|--------------|---------|
| 7 | Bootstrap JS | `/home/user/vibecoding-academy/vendor/bootstrap/bootstrap.bundle.min.js` | Popper.js + Bootstrap interactions |
| 8 | Components JS | `/home/user/vibecoding-academy/js/components.js` | Nav & footer injection |
| 9 | Inline `<script>` | (in the HTML file itself) | Page-specific logic (e.g. game logic) |

---

## Design Tokens (`css/tokens.css`)

Complete variable reference — see [DESIGN.md](../DESIGN.md) for rationale and accessibility notes.

| Variable | Value | Usage |
|----------|-------|-------|
| `--primary-color` | `#5B8BD6` | Accent, links, borders, focus ring |
| `--secondary-color` | `#3D5A8C` | Navbar, footer |
| `--success-color` | `#5CC6A7` | Positive values, success |
| `--danger-color` | `#D46B6B` | Errors, negative values |
| `--warning-color` | `#D4A55B` | Warnings |
| `--info-color` | `#6BB8D4` | Info hints |
| `--bg-page` | `#EEF2F7` | Page background |
| `--bg-card` | `rgba(255,255,255,0.85)` | Card background (semi-transparent) |
| `--text-primary` | `#2D3748` | Primary text |
| `--text-muted` | `#7A8599` | Muted text |
| `--border-color` | `#D4DCE8` | Border color |
| `--border-radius-card` | `10px` | Card corners |
| `--border-radius-button` | `6px` | Button corners |
| `--border-radius-pill` | `999px` | Badge/chip corners |
| `--space-1 … --space-7` | `0.25rem … 3rem` | Spacing scale (4 px grid) |
| `--shadow-sm/md/lg` | see DESIGN.md | Shadow scale (3 levels) |
| `--transition-fast/medium` | `0.2s / 0.3s ease` | Transition durations |
| `--z-nav … --z-toast` | `1030 … 1060` | Z-index scale |
| `--gradient-nav/hero` | see DESIGN.md | Gradient presets |

---

## App Architecture

Each app is a **single, self-contained HTML file**:

- **Styles:** Inline `<style>` block in the HTML file
- **Logic:** Inline `<script>` block (typically as IIFE)
- **No shared game logic** between apps
- **Exception:** `apps/gta/` has its own fonts in `apps/gta/fonts/`

Finished apps:

| App | Path | Description |
|-----|------|-------------|
| Pong | `/home/user/vibecoding-academy/apps/pong/index.html` | Classic Pong game |
| GTA parody | `/home/user/vibecoding-academy/apps/gta/index.html` | GTA parody with custom fonts |
| Weekend planner | `/home/user/vibecoding-academy/apps/wochenendplanung/index.html` | Weekend planner |

---

## Game Concepts (`projekte/`)

Markdown files with detailed specifications (rules, controls, colors, technical details):

| Concept | Path |
|---------|------|
| Pong | `/home/user/vibecoding-academy/projekte/pong.md` |
| Snake | `/home/user/vibecoding-academy/projekte/snake.md` |
| Tetris | `/home/user/vibecoding-academy/projekte/tetris.md` |
| Memory | `/home/user/vibecoding-academy/projekte/memory.md` |
| Flappy Bird | `/home/user/vibecoding-academy/projekte/flappybird.md` |
| Minesweeper | `/home/user/vibecoding-academy/projekte/minesweeper.md` |
| Solitaire | `/home/user/vibecoding-academy/projekte/solitaire.md` |
| Sudoku | `/home/user/vibecoding-academy/projekte/sudoku.md` |
| Tic-Tac-Toe | `/home/user/vibecoding-academy/projekte/tictactoe.md` |
| Household budget | `/home/user/vibecoding-academy/projekte/haushaltsbuch.md` |

- `viewer.html` renders the Markdown files in the browser
- Concepts serve as templates for new app implementations
