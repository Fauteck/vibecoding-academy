---
name: vibecoding-academy-design
description: Use this skill to generate well-branded interfaces and assets for Vibecoding Academy mit Niklas Fauteck — production code or throwaway prototypes/mocks. Contains essential design guidelines, color & type tokens, fonts, vendored assets, and reusable type helpers.
user-invocable: true
---

Read `DESIGN.md` (full design system spec), `css/tokens.css` (CSS variables), `css/typography.css` (`.t-*` semantic type helpers), and the existing pages under `apps/`, `wiki/`, `kontakt/`, `ueber-mich/`, `projekte/` for usage examples.

When making **production code** changes, follow `CLAUDE.md` strictly: vanilla HTML/CSS/JS only, no build tools, no CDNs, vendored assets in `/vendor`, the canonical CSP meta-tag on every new page, and the design tokens from `css/tokens.css`.

When making **throwaway prototypes / mocks** for design review, you may inline assets and skip CSP, but stay inside the brand: IBM Plex Sans only, single blue family (`#5B8BD6` primary, `#3D5A8C` secondary), Font Awesome 6.4.2 icons (no Lucide / Heroicons), no emoji in chrome.

If the user invokes this skill without specific guidance, ask what they want to build, then act as an expert designer who outputs HTML artifacts _or_ production code — whichever fits.

Brand quick-reference:

- German-language ("du" form), single typeface (IBM Plex Sans), single blue family.
- Mantra: „Idee rein. Prototyp raus."
- H1: „Erst bauen. Dann wissen, was wirklich geht."
- No emoji in chrome; emoji only as project-tile markers on `projekte/index.html`.
- Cards: `border-radius: 10px`, 1px `--border-color`, glassmorphism on desktop only (mobile breakpoint `991.98px` disables `backdrop-filter`).
- CTA hover: `translateY(-1px)` + soft brand-blue shadow, NOT `opacity: 0.85`.
- Section headers (numbered): use `.numbered-sections` + `.section-header.numbered` with `.section-eyebrow` + `.section-title-lg` for the auto-generated `01 — ` prefix.

Token entry points (from `css/tokens.css`):

- Color: `--primary-color`, `--secondary-color`, `--success-color`, `--danger-color`, `--warning-color`, `--info-color`, `--bg-page`, `--bg-card`, `--text-primary`, `--text-muted`, `--border-color`.
- Semantic aliases: `--fg1`, `--fg2`, `--fg-brand`, `--fg-accent`, `--bg1`, `--bg2`.
- Typography: `--font-sans`, `--font-mono`, `--font-size-xs|sm|nav|base|md|lg|xl|display`, `--line-height-tight|base|loose`.
- Weights & tracking: `--font-weight-regular|medium|semibold|bold|black`, `--tracking-display|tight|label|wide`.
- Surfaces: `--shadow-sm|md|lg`, `--shadow-focus-ring`, `--card-blur`, `--bg-card-mobile`, `--bg-white`, `--text-on-dark[-strong]`.
- Radii: `--border-radius-card|button|pill` (canonical) or short aliases `--radius-card|button|pill`.
- Gradients: `--gradient-nav`, `--gradient-hero`, `--gradient-cta-soft`.
- Spacing: `--space-1` … `--space-7` (4 px grid).

Type-helper classes (from `css/typography.css`, opt-in per page via `<link rel="stylesheet" href=".../css/typography.css">`):

- `.t-display`, `.t-h1`, `.t-h2`, `.t-h3`, `.t-section-title`, `.t-section-label`, `.t-brand-name`, `.t-brand-subtitle`, `.t-lead`, `.t-body`, `.t-muted`, `.t-mono`.

Path resolution: each page sets `<html data-depth="0|1|2">` so `js/components.js` injects nav/footer with correct relative paths. Match `data-depth` to the folder depth of the file.
