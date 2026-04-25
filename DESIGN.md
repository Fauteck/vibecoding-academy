---
# Vibecoding Academy — Design System
# Format: design.md (https://github.com/google-labs-code/design.md)
version: "1.0.0"
updated: "2026-04-25"
project: "Vibecoding Academy"
url: "https://fauteck.github.io/vibecoding-academy/"
tokens:
  colors:
    primary:
      value: "#5B8BD6"
      usage: "accent, links, borders, active nav states, CTA background, focus ring"
    secondary:
      value: "#3D5A8C"
      usage: "navbar, footer, brand name — dark anchor for the primary palette"
    success:
      value: "#5CC6A7"
      usage: "positive feedback, success states, completed items"
    danger:
      value: "#D46B6B"
      usage: "errors, negative values, destructive actions"
    warning:
      value: "#D4A55B"
      usage: "warnings, caution states"
    info:
      value: "#6BB8D4"
      usage: "informational hints — cyan-teal, analogous to primary"
    bg-page:
      value: "#EEF2F7"
      usage: "page background"
    bg-card:
      value: "rgba(255, 255, 255, 0.85)"
      usage: "card background on desktop — semi-transparent for glassmorphism"
    bg-card-mobile:
      value: "rgba(255, 255, 255, 0.88)"
      usage: "card background on mobile — solid fallback when backdrop-filter is disabled"
    text-primary:
      value: "#2D3748"
      usage: "body text, headings — warm dark blue-gray"
    text-muted:
      value: "#7A8599"
      usage: "secondary labels, nav links in default state"
    border:
      value: "#D4DCE8"
      usage: "borders, dividers — slightly blue-tinted to harmonize with palette"
    white:
      value: "#FFFFFF"
      usage: "CTA button text, footer link hover, card base"
  typography:
    font-family:
      value: "'IBM Plex Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      usage: "all text — IBM Plex Sans variable font, loaded from /vendor; system stack as fallback"
    font-size-base:
      value: "1rem"
      usage: "body text baseline (= 16px)"
    font-size-sm:
      value: "0.85rem"
      usage: "footer copy, CTA button label"
    font-size-xs:
      value: "0.75rem"
      usage: "nav brand subtitle"
    font-size-nav:
      value: "0.9rem"
      usage: "navigation link labels"
    font-size-brand:
      value: "1.5rem"
      usage: "navbar brand name"
    font-size-contact:
      value: "1.1rem"
      usage: "footer contact link (prominent)"
    font-weight-medium:
      value: "500"
      usage: "nav links, lead text, subtitles"
    font-weight-semibold:
      value: "600"
      usage: "brand name, CTA button, headings, contact link"
    line-height-base:
      value: "1.5"
      usage: "body text — comfortable reading rhythm"
    letter-spacing-brand:
      value: "-0.02em"
      usage: "brand name — tight tracking improves cohesion at display sizes"
    letter-spacing-subtitle:
      value: "0.05em"
      usage: "uppercase subtitles — wide tracking reinforces small-caps aesthetic"
  spacing:
    1:
      value: "0.25rem"
      px: "4px"
      usage: "micro gaps, separator margins (footer-sep)"
    2:
      value: "0.5rem"
      px: "8px"
      usage: "hamburger bar gaps, button vertical padding, footer-contact margin"
    3:
      value: "0.75rem"
      px: "12px"
      usage: "section header left padding, CTA button padding"
    4:
      value: "1rem"
      px: "16px"
      usage: "base unit — nav vertical padding, footer padding, section-header margin-bottom"
    5:
      value: "1.5rem"
      px: "24px"
      usage: "mobile nav inner padding, card inner, mobile page top"
    6:
      value: "2rem"
      px: "32px"
      usage: "section margins (section-header margin-top)"
    7:
      value: "3rem"
      px: "48px"
      usage: "desktop nav link gap, footer margin-top, page bottom padding"
  radii:
    card:
      value: "10px"
      usage: "standard content cards"
    button:
      value: "6px"
      usage: "CTA buttons — softer than pill, more structured than square"
    pill:
      value: "999px"
      usage: "badges, KPI chips — fully rounded"
  shadows:
    sm:
      value: "0 1px 8px rgba(0, 0, 0, 0.04)"
      usage: "navbar — subtle lift, anchors nav without heaviness"
    md:
      value: "0 4px 12px rgba(0, 0, 0, 0.06)"
      usage: "dropdown menus — clear layer separation from page"
    lg:
      value: "0 8px 24px rgba(0, 0, 0, 0.08)"
      usage: "hero cards — stronger elevation for featured content"
  transitions:
    fast:
      value: "0.2s ease"
      usage: "color changes, opacity — hover states, hamburger bar animation"
    medium:
      value: "0.3s ease"
      usage: "layout changes — reserved for dropdown slide-in"
  z-index:
    nav:
      value: 1030
      usage: "sticky navigation bar — always above page content"
    dropdown:
      value: 1040
      usage: "mobile nav dropdown — above navbar background"
    modal:
      value: 1050
      usage: "modal dialogs — reserved for future use"
    toast:
      value: 1060
      usage: "toast / flash notifications — topmost UI layer"
  gradients:
    nav:
      value: "linear-gradient(135deg, {colors.primary}, {colors.secondary})"
      usage: "navbar active indicators, accent elements"
    hero:
      value: "linear-gradient(135deg, rgba(61, 90, 140, 0.22), rgba(91, 139, 214, 0.15))"
      usage: "hero section overlay — applied over the background image"
  breakpoints:
    mobile-sm:
      value: "600px"
      usage: "small phones — tighter nav inner padding"
    mobile:
      value: "968px"
      usage: "navigation breakpoint — hamburger replaces desktop links"
    tablet:
      value: "991.98px"
      usage: "glassmorphism breakpoint — backdrop-filter disabled, card becomes solid"
accessibility:
  wcag-target: "AA"
  focus-style: "2px solid {colors.primary}, offset 3px"
  contrast:
    - pair: "text-primary (#2D3748) on bg-page (#EEF2F7)"
      ratio: "10.5:1"
      status: "AAA"
    - pair: "text-primary (#2D3748) on white (#FFFFFF)"
      ratio: "11.8:1"
      status: "AAA"
    - pair: "white (#FFFFFF) on secondary (#3D5A8C)"
      ratio: "6.9:1"
      status: "AA"
      note: "Navbar, footer — close to AAA threshold (7:1)"
    - pair: "text-muted (#7A8599) on bg-page (#EEF2F7)"
      ratio: "3.3:1"
      status: "AA-large-only"
      note: "Acceptable for nav links (large touch targets) and decorative labels. Do not use for body text."
    - pair: "primary (#5B8BD6) on white (#FFFFFF)"
      ratio: "3.4:1"
      status: "AA-large-only"
      note: "Use only for UI components (borders, active underlines) and large decorative text. CTA button text fails AA — see Known Issues."
    - pair: "primary (#5B8BD6) on bg-page (#EEF2F7)"
      ratio: "3.1:1"
      status: "AA-large-only"
      note: "Same restriction as above."
  known-issues:
    - id: "a11y-001"
      description: "White text on primary-color CTA button yields 3.4:1 — below WCAG AA (4.5:1) for the button's 13.6px (0.85rem) font size."
      recommendation: "Darken primary to ~#3D70C4 for button backgrounds, or increase button font-size to ≥18.67px bold."
    - id: "a11y-002"
      description: "text-muted (#7A8599) achieves only 3.3:1 on bg-page — fails AA for body text."
      recommendation: "Restrict text-muted to decorative labels and nav chrome. Use text-primary for readable body paragraphs."
---

# Vibecoding Academy — Design System

> **Source of truth** for all visual decisions in this repository.
> Tokens give agents exact values. Prose tells them *why* those values exist and how to apply them.
>
> Machine-readable tokens are in the YAML front matter above.
> The sections below explain rationale, constraints, and application rules.

---

## Philosophy

The design system rests on three principles:

1. **Static simplicity** — No build pipeline, no CSS preprocessor. Every token is a CSS custom property in `css/tokens.css`. A single file change propagates globally.
2. **Self-hosted variable font** — IBM Plex Sans is loaded as a WOFF2 variable font from `/vendor/ibm-plex-sans/`. The Segoe UI system stack is kept as a fallback. The variable font covers weights 100–900 with a single file, so no extra requests for bold or italic.
3. **Selective glassmorphism** — `backdrop-filter: blur()` is only used on elements that sit directly over the hero background image (hero badges, KPI pills, coach/intro cards). Base `.card` components use a near-opaque white background instead. The effect is disabled below 991.98 px.

---

## Color System

### Palette rationale

The palette is derived from the hero background image (`images/content-bg.jpg`), a blue-toned abstract texture. All hues are members of the same blue family, giving the UI a cohesive, calm character without strong contrast clashes between sections.

| CSS variable | Value | Usage |
|---|---|---|
| `--primary-color` | `#5B8BD6` | Accent — links, borders, active states, CTA |
| `--secondary-color` | `#3D5A8C` | Dark anchor — navbar, footer, brand |
| `--success-color` | `#5CC6A7` | Positive feedback |
| `--danger-color` | `#D46B6B` | Errors, destructive |
| `--warning-color` | `#D4A55B` | Caution |
| `--info-color` | `#6BB8D4` | Informational |
| `--bg-page` | `#EEF2F7` | Page surface |
| `--bg-card` | `rgba(255,255,255,0.92)` | Card surface (near-opaque) |
| `--text-primary` | `#2D3748` | Body text |
| `--text-muted` | `#7A8599` | Secondary labels |
| `--border-color` | `#D4DCE8` | Dividers, borders |

### App-specific color overrides

Apps may override palette tokens inside their inline `<style>` block. This is intentional — apps are self-contained. Example from `index.html`:

```css
/* Landing page — slightly more opaque cards, larger radius */
--bg-card: rgba(255, 255, 255, 0.72);
--border-radius-card: 12px;
```

Start every new app with the base tokens. Override only when the app's visual context genuinely requires it, and document why.

---

## Typography

**Font stack:** `'IBM Plex Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`

IBM Plex Sans is a humanist sans-serif designed by Mike Abbink for IBM. It provides optical warmth and clarity at UI sizes while remaining neutral enough for data-dense layouts. The variable font file covers weights 100–900 and normal/italic in two WOFF2 files (`latin-wght-normal.woff2`, `latin-wght-italic.woff2`), both served from `/vendor/ibm-plex-sans/`. The system font stack (Segoe UI, Tahoma, Verdana) is the fallback in case the font is unavailable.

| Token | Value | Context |
|---|---|---|
| `font-size-base` | `1rem` (16 px) | Body |
| `font-size-sm` | `0.85rem` | Footer, CTA button |
| `font-size-xs` | `0.75rem` | Nav subtitle |
| `font-size-nav` | `0.9rem` | Nav links |
| `font-size-brand` | `1.5rem` | Brand name |
| `font-weight-medium` | `500` | Nav, subtitles |
| `font-weight-semibold` | `600` | Brand, CTA, headings |

**Letter spacing:**
- Brand name uses `-0.02em` (tight) — improves visual cohesion at large display sizes.
- Uppercase subtitles use `+0.05em` (wide) — reinforces the small-caps aesthetic without requiring a separate font variant.

**Fluid typography** (app-level, not a shared token): Hero headings use `clamp(2rem, 4.2vw, 3rem)` for smooth scaling between viewport sizes. Apply this pattern in new apps for display-size headings.

---

## Spacing

All spacing derives from a **4 px grid** formalized as seven named steps.

| Token | Value | px | Typical use |
|---|---|---|---|
| `--space-1` | `0.25rem` | 4 px | Micro gaps, separator margins |
| `--space-2` | `0.5rem` | 8 px | Hamburger bar gaps, inline icons |
| `--space-3` | `0.75rem` | 12 px | Section header padding, button padding |
| `--space-4` | `1rem` | 16 px | Base unit — nav padding, footer |
| `--space-5` | `1.5rem` | 24 px | Mobile nav, card inner |
| `--space-6` | `2rem` | 32 px | Section margins |
| `--space-7` | `3rem` | 48 px | Desktop nav link gap, footer top margin |

When choosing spacing in a new component, pick the nearest step. Avoid arbitrary values like `0.7rem` or `1.3rem` — they accumulate into an incoherent rhythm.

---

## Elevation (Shadows)

Three shadow levels map to three distinct UI layers:

| Token | Value | Layer |
|---|---|---|
| `--shadow-sm` | `0 1px 8px rgba(0,0,0,.04)` | Navbar — base chrome |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,.06)` | Dropdowns — overlay |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,.08)` | Hero cards — featured |

Opacity values are deliberately low (0.04–0.08) because the blue-tinted palette and light page background already provide depth cues. Heavier shadows would fight the glassmorphism aesthetic.

---

## Motion (Transitions)

| Token | Value | Use |
|---|---|---|
| `--transition-fast` | `0.2s ease` | Hover colors, opacity, hamburger bars |
| `--transition-medium` | `0.3s ease` | Reserved for layout transitions |

**Principle:** All interactive color changes use `--transition-fast`. No element should transition slower than `--transition-medium` — motion should feel snappy, not decorative.

**Reduced motion:** Respect `prefers-reduced-motion` in new apps:

```css
@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; animation: none !important; }
}
```

---

## Z-Index Scale

| Token | Value | Element |
|---|---|---|
| `--z-nav` | `1030` | Sticky navbar |
| `--z-dropdown` | `1040` | Mobile nav dropdown |
| `--z-modal` | `1050` | Modal dialogs (reserved) |
| `--z-toast` | `1060` | Flash / toast notifications |

The base value `1030` matches Bootstrap's navbar z-index for compatibility. Each layer increments by 10 to leave room for sub-layers without collisions.

---

## Borders & Radii

| Token | Value | Use |
|---|---|---|
| `--border-color` | `#D4DCE8` | All borders and dividers |
| `--border-radius-card` | `10px` | Content cards |
| `--border-radius-button` | `6px` | CTA buttons |
| `--border-radius-pill` | `999px` | Badges, KPI chips |

Cards use a `1px solid var(--border-color)` border in addition to the glassmorphism background. The border provides a crisp edge that `backdrop-filter` alone cannot guarantee across all rendering engines.

---

## Gradients

| Token | Value | Use |
|---|---|---|
| `--gradient-nav` | `linear-gradient(135deg, #5B8BD6, #3D5A8C)` | Navbar active indicators |
| `--gradient-hero` | `linear-gradient(135deg, rgba(61,90,140,.22), rgba(91,139,214,.15))` | Hero section overlay |

Both gradients run at 135° (diagonal, top-left → bottom-right), matching the implied direction of the hero background image.

---

## Breakpoints

| Token | Value | Effect |
|---|---|---|
| `--bp-mobile-sm` | `600px` | Tighter nav inner padding on small phones |
| `--bp-mobile` | `968px` | Hamburger replaces desktop links |
| `--bp-tablet` | `991.98px` | Glassmorphism disabled; card background becomes solid |

`991.98px` (Bootstrap's `lg` threshold − 0.02 px) is used instead of `992px` to prevent a 1 px flash on exactly-992 px viewports where both conditions would be briefly true simultaneously.

---

## Accessibility

**Target:** WCAG 2.1 AA.

### Focus style

All interactive elements receive a visible keyboard focus ring via `:focus-visible`:

```css
:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 3px;
  border-radius: 3px;
}
```

`border-radius: 3px` softens the ring on rounded elements without requiring per-component overrides.

### Contrast ratios

| Pair | Ratio | WCAG |
|---|---|---|
| `text-primary` on `bg-page` | 10.5:1 | **AAA** ✓ |
| `text-primary` on white | 11.8:1 | **AAA** ✓ |
| white on `secondary` | 6.9:1 | **AA** ✓ |
| `text-muted` on `bg-page` | 3.3:1 | AA large only ⚠ |
| `primary` on white | 3.4:1 | AA large only ⚠ |
| `primary` on `bg-page` | 3.1:1 | AA large only ⚠ |

### Known issues

**a11y-001 — CTA button contrast**
White text on `--primary-color` (`#5B8BD6`) yields 3.4:1 — below WCAG AA (4.5:1) for the button's 13.6 px font size.
→ Recommended fix: darken primary to ~`#3D70C4` for button backgrounds, or increase font-size to ≥ 18.67 px bold.

**a11y-002 — text-muted in body context**
`--text-muted` (`#7A8599`) achieves only 3.3:1 on `--bg-page`. It passes for UI chrome (nav links, large touch targets) but fails for inline body copy.
→ Restrict `text-muted` to decorative labels and nav states. Use `text-primary` for readable body paragraphs.

---

## Components

### Navigation (`css/nav.css` + `js/components.js`)

- **Desktop (> 968 px):** Sticky white navbar, `var(--shadow-sm)`, brand left, links right, CTA button.
- **Mobile (≤ 968 px):** Hamburger replaces links. Tap opens a full-width dropdown with `var(--shadow-md)`.
- **Active state:** Detected from `window.location.pathname` via regex. Active link receives class `active` and `aria-current="page"`.
- **Path resolution:** Each page declares `<html data-depth="N">`. `components.js` reads this to build correct relative paths for all navigation links.

> **Warning:** Changes to `navLinks` or `ctaLink` in `components.js` affect **all pages simultaneously**.

### Footer (`css/footer.css` + `js/components.js`)

- Background: `var(--secondary-color)`, text: `rgba(255,255,255,0.7)`.
- Links: Kontakt, Impressum, Datenschutz, AGB — all with dynamic path prefix.
- Font size: `0.85rem` (`font-size-sm`).

### Cards

Standard card pattern:

```css
.card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-card);
  backdrop-filter: blur(6px);
}
```

On mobile (≤ 991.98 px), `backdrop-filter` is removed and background shifts to `rgba(255,255,255,0.88)` for performance.

### Section headers

```css
.section-header {
  border-left: 4px solid var(--primary-color);
  padding-left: var(--space-3);
}
```

The 4 px left border acts as a visual anchor. Apply to `<h2>` or `<h3>` elements introducing major content sections.

### CTA Button

```css
.site-nav-cta {
  background: var(--primary-color);
  color: #fff;
  border-radius: var(--border-radius-button);
  padding: 0.45rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  transition: opacity var(--transition-fast);
}
.site-nav-cta:hover { opacity: 0.85; }
```

Hover reduces opacity rather than darkening the background — avoids runtime color computation and keeps the animation smooth.

---

## App-Specific Styles

Each app in `apps/` is a self-contained HTML file. Inline `<style>` blocks may:

1. **Override palette tokens** — e.g., `--bg-card: rgba(255,255,255,0.72)` for a more opaque look.
2. **Add app-specific rules** — game canvas styles, board layouts, score displays.
3. **Never** extract shared logic into `css/` — app styles stay in-file to preserve independence.

When an app introduces a distinct visual motif (e.g., a neon glow for a retro game), define it inline. If the same motif appears in three or more apps, it is a candidate for promotion to a shared token.

---

## CSS Architecture

### Load order (every page)

| # | File | Purpose |
|---|---|---|
| 1 | `vendor/bootstrap/bootstrap.min.css` | Grid, utilities, base components |
| 2 | `vendor/fontawesome/css/all.min.css` | Icons |
| 3 | `css/tokens.css` | Design tokens, reset, base styles |
| 4 | `css/nav.css` | Navigation (desktop + mobile) |
| 5 | `css/footer.css` | Footer |
| 6 | Inline `<style>` | Page- or app-specific styles |

Before `</body>`:

| # | File | Purpose |
|---|---|---|
| 7 | `vendor/bootstrap/bootstrap.bundle.min.js` | Bootstrap + Popper.js |
| 8 | `js/components.js` | Nav & footer injection |
| 9 | Inline `<script>` | Page- or app-specific logic |

### Token cascade

CSS custom properties inherit through the document. Tokens defined in `:root` are available everywhere. Page-level overrides go in a `<style>` block that re-declares `:root` variables — no specificity conflicts.

---

## Governance

| Rule | Rationale |
|---|---|
| All dependencies in `/vendor` — no CDN links | Eliminates external supply chain risk; works offline |
| No `innerHTML` with uncontrolled data | XSS prevention — use `textContent` or explicit DOM construction |
| External links require `rel="noopener"` | Prevents tab-napping via `window.opener` |
| No `console.log` or `alert` in production | Clean console is a quality signal |
| Validate HTML before merging | Malformed HTML causes silent rendering failures |
| Test on desktop + mobile before PR | Responsive failures are invisible in desktop-only review |

---

*Maintained alongside `CLAUDE.md`. Update both when design decisions change.*
