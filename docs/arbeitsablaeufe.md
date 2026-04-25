# Workflows & Common Tasks

> Back to [Documentation Index](INDEX.md)

---

## Create a New App (depth=2)

### Step by Step

1. **Create folder:** `apps/<name>/index.html`
2. **Set `data-depth="2"`** in the `<html>` tag
3. **Include CSS/JS** with prefix `../../` (see template below)
4. **Insert nav/footer placeholders:** `<nav id="site-nav"></nav>` and `<footer id="site-footer"></footer>`
5. **Page-specific styles/logic** inline in `<style>` and `<script>`
6. **Add project card** in `/home/user/vibecoding-academy/index.html` in the "Ergebnisse" section
7. **Commit & push** — GitHub Pages deploys automatically

### Full HTML Template (Copy-Paste)

```html
<!DOCTYPE html>
<html lang="de" data-depth="2">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>APP-NAME — Vibecoding Academy</title>
    <meta name="description" content="DESCRIPTION">

    <!-- Vendor (local) -->
    <link href="../../vendor/bootstrap/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../../vendor/fontawesome/css/all.min.css">

    <!-- Shared styles -->
    <link rel="stylesheet" href="../../css/tokens.css">
    <link rel="stylesheet" href="../../css/nav.css">
    <link rel="stylesheet" href="../../css/footer.css">

    <style>
        /* Page-specific styles here */
    </style>
</head>
<body>
    <nav id="site-nav"></nav>

    <main class="page-wrapper">
        <div class="container">
            <!-- Page content here -->
        </div>
    </main>

    <footer id="site-footer"></footer>

    <!-- Vendor JS -->
    <script src="../../vendor/bootstrap/bootstrap.bundle.min.js"></script>
    <!-- Shared components (nav & footer injection) -->
    <script src="../../js/components.js"></script>

    <script>
        /* Page-specific logic here (e.g. game logic as IIFE) */
    </script>
</body>
</html>
```

---

## Create a New Section Page (depth=1)

For pages in a subfolder directly under root (e.g., `wiki/`, `ueber-mich/`):

1. **Create folder:** `<section>/index.html`
2. **Set `data-depth="1"`**
3. **Path prefix:** `../` for all vendor/CSS/JS includes
4. Rest as above (nav/footer placeholders, components.js)

```html
<html lang="de" data-depth="1">
<!-- Paths with ../ instead of ../../ -->
<link href="../vendor/bootstrap/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="../css/tokens.css">
<!-- ... -->
<script src="../js/components.js"></script>
```

---

## Create a New Root Page (depth=0)

For pages directly in the repository root (e.g., `impressum.html`):

1. **Create file:** `<name>.html` in root
2. **Set `data-depth="0"`**
3. **Path prefix:** `./` for all includes

```html
<html lang="de" data-depth="0">
<link href="./vendor/bootstrap/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="./css/tokens.css">
<!-- ... -->
<script src="./js/components.js"></script>
```

---

## Change Navigation

**File:** `/home/user/vibecoding-academy/js/components.js`

| What | Lines | Description |
|------|-------|-------------|
| Add/change links | 11–16 | Add object to `navLinks` array: `{ href: 'path/', label: 'Text', key: 'key' }` |
| Change CTA button | 17 | Adjust `ctaLink` object |
| Active detection | 20–29 | Add new regex case for the new section |

> **WARNING:** Navigation changes affect **all pages** simultaneously since `components.js` is included globally.

**Example — Add a new link:**

```javascript
// Lines 11-16 in components.js
var navLinks = [
    { href: '',            label: 'Workshop',  key: 'workshop' },
    { href: 'wiki/',       label: 'Wiki',      key: 'wiki' },
    { href: 'projekte/',   label: 'Projekte',  key: 'projekte' },
    { href: 'ueber-mich/', label: 'Coach',     key: 'ueber-mich' },
    { href: 'new/',        label: 'New',       key: 'new' }       // ← New link
];

// Lines 20-29: add active detection
else if (/\/new\//.test(path)) activeKey = 'new';                 // ← New detection
```

---

## Change Design Tokens

**File:** `/home/user/vibecoding-academy/css/tokens.css` (lines 3–50)

> **WARNING:** Token changes take effect **globally on all pages**.

All colors, spacing, shadows, and radii are defined as CSS custom properties in `:root`. Changing `tokens.css` is sufficient — no further intervention needed.

For rationale and accessibility implications of each token, see [DESIGN.md](../DESIGN.md).

---

## Add a New Game Concept

1. **Create Markdown file:** `/home/user/vibecoding-academy/projekte/<name>.md`
2. **Format** (template: `/home/user/vibecoding-academy/projekte/pong.md`):
   - Game description
   - Rules & mechanics
   - Controls
   - Technical details (Canvas/DOM, colors, responsive)
   - CSS guidelines
   - JavaScript structure
3. **Viewer** displays the file automatically (`projekte/viewer.html?file=<name>.md`)

---

## Add a Project Card to the Landing Page

**File:** `/home/user/vibecoding-academy/index.html`

Insert a new card in the "Ergebnisse" section. Use existing cards as a template — structure with Bootstrap grid (`.col-md-6` or `.col-lg-4`), `.card` class, and link to the app.

---

## Deployment

| Action | Command / Process |
|--------|------------------|
| **Deploy** | `git push origin main` — GitHub Pages deploys automatically |
| **Rollback** | Push a revert commit to `main` |
| **Live URL** | `https://fauteck.github.io/vibecoding-academy/` |
| **No build step** | HTML files are served directly |

---

## Local Development

```bash
cd /home/user/vibecoding-academy
python3 -m http.server 8000
# → http://localhost:8000
```

No `npm install`, no build process. Just start a local HTTP server.
