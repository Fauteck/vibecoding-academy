> Lesen: bei UI-/Styling-Arbeit (Tokens, Typografie, Breakpoints, Navigation, Komponenten, vendor-Einbindung).

## 14. Design System

> **Purpose:** Consistent design across all Fauteck web applications.
> This project uses Bootstrap 5.3 with application-specific CSS.
> **Full specification:** See [DESIGN.md](../../DESIGN.md)

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

> **Single source of truth:** `css/tokens.css` defines the authoritative token values.
> The excerpt below is a quick reference only — if values differ, `css/tokens.css` wins.

```css
:root {
    --primary-color:   #5B8BD6;   /* Accent, links, borders */
    --secondary-color: #3D5A8C;   /* Navbar, footer */
    --success-color:   #5CC6A7;   /* Positive values, success */
    --danger-color:    #D46B6B;   /* Errors, negative values */
    --warning-color:   #D4A55B;   /* Warnings */
    --info-color:      #6BB8D4;   /* Info hints */
    --bg-page:         #EEF2F7;   /* Page background */
    --bg-card:         rgba(255, 255, 255, 0.78); /* Card background */
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
| Denser cards | ≤ 992 px | Card background becomes denser (no backdrop-filter anywhere since 2026-08-31) |

### Navigation

- **Desktop (> 968 px):** Sticky white navbar with `--shadow-sm`, brand left, links + CTA right
- **Mobile (≤ 968 px):** Hamburger button; tap opens full-width dropdown with `--shadow-md`
- Body automatically gets `padding-top: 4.5rem` via `nav.css`

### Components

| Class | Usage |
|---|---|
| `.card` | Standard card (translucent on desktop, denser on mobile) |
| `.section-header` | Section heading with primary-color left border |
| `.site-nav` | Sticky top navigation bar |
| `.site-nav-cta` | Call-to-action button in navbar |
| `.footer` | Footer area |
| `.page-wrapper` | Main content wrapper with top/bottom padding |
