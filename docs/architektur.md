# Architektur & Komponenten

> Zurück zum [Dokumentations-Index](INDEX.md)

---

## Seitentypen

Jede HTML-Seite setzt `<html data-depth="N">`, um die relative Pfadauflösung zu steuern.

| data-depth | Pfad-Prefix | Beispiele |
|------------|-------------|-----------|
| `0` | `./` | `index.html`, `impressum.html`, `datenschutz.html`, `agb.html`, `404.html` |
| `1` | `../` | `wiki/index.html`, `projekte/index.html`, `ueber-mich/index.html`, `kontakt/index.html` |
| `2` | `../../` | `apps/pong/index.html`, `apps/gta/index.html`, `apps/wochenendplanung/index.html` |

> **ACHTUNG:** Falsche `data-depth` = kaputte Navigation, Footer und Asset-Pfade auf der gesamten Seite.

---

## Shared Layout System

### Pfadauflösung (`js/components.js`, Zeile 7–8)

```javascript
var depth = parseInt(document.documentElement.getAttribute('data-depth') || '0', 10);
var prefix = depth === 0 ? './' : '../'.repeat(depth);
```

`components.js` liest `data-depth` aus dem `<html>`-Tag und berechnet den Prefix für alle Asset- und Link-Pfade. Dieser Prefix wird für Navigation, Footer und alle internen Links verwendet.

### Navigation (`js/components.js`, Zeile 11–71)

| Bereich | Zeilen | Beschreibung |
|---------|--------|--------------|
| `navLinks`-Array | 11–16 | Definiert die Hauptnavigation (Workshop, Wiki, Projekte, Coach) |
| `ctaLink` | 17 | Call-to-Action-Button ("Workshop anfragen") |
| Aktive Erkennung | 20–29 | Regex-basiert auf `window.location.pathname` |
| `buildLinks()` | 32–42 | Generiert Link-HTML mit aktivem Zustand |
| Desktop-Nav | 46–61 | Sticky Navbar mit Brand, Links, Hamburger |
| Hamburger-Toggle | 64–70 | Mobiles Menü öffnen/schließen |

> **ACHTUNG:** Änderungen an `navLinks` oder `ctaLink` betreffen **alle Seiten gleichzeitig**.

### Footer (`js/components.js`, Zeile 74–85)

Injiziert in `<footer id="site-footer"></footer>`. Enthält Links zu Kontakt, Impressum, Datenschutz und AGB — alle mit dynamischem Prefix.

---

## CSS-Abhängigkeitskette

Jede Seite bindet die folgenden Dateien **in dieser Reihenfolge** ein:

| # | Datei | Absoluter Pfad | Zweck |
|---|-------|----------------|-------|
| 1 | Bootstrap CSS | `/home/user/vibecoding-academy/vendor/bootstrap/bootstrap.min.css` | Grid, Utilities, Basiskomponenten |
| 2 | Font Awesome | `/home/user/vibecoding-academy/vendor/fontawesome/css/all.min.css` | Icons |
| 3 | Design Tokens | `/home/user/vibecoding-academy/css/tokens.css` | CSS Custom Properties, Reset, Basis-Styles |
| 4 | Navigation CSS | `/home/user/vibecoding-academy/css/nav.css` | Desktop- und Mobile-Navigation |
| 5 | Footer CSS | `/home/user/vibecoding-academy/css/footer.css` | Footer-Styles |
| 6 | Inline `<style>` | (in der HTML-Datei selbst) | Seitenspezifische Styles |

Vor `</body>`:

| # | Datei | Absoluter Pfad | Zweck |
|---|-------|----------------|-------|
| 7 | Bootstrap JS | `/home/user/vibecoding-academy/vendor/bootstrap/bootstrap.bundle.min.js` | Popper.js + Bootstrap-Interaktionen |
| 8 | Components JS | `/home/user/vibecoding-academy/js/components.js` | Nav & Footer Injection |
| 9 | Inline `<script>` | (in der HTML-Datei selbst) | Seitenspezifische Logik (z. B. Spiellogik) |

---

## Design Tokens (`css/tokens.css`)

Vollständige Variablen-Referenz:

| Variable | Wert | Verwendung |
|----------|------|------------|
| `--primary-color` | `#5B8BD6` | Akzentfarbe, Links, Borders |
| `--secondary-color` | `#3D5A8C` | Navbar, Footer |
| `--success-color` | `#5CC6A7` | Positive Werte, Erfolg |
| `--danger-color` | `#D46B6B` | Fehler, negative Werte |
| `--warning-color` | `#D4A55B` | Warnungen |
| `--info-color` | `#6BB8D4` | Info-Hinweise |
| `--bg-page` | `#EEF2F7` | Seitenhintergrund |
| `--bg-card` | `rgba(255,255,255,0.85)` | Kartenhintergrund (halbtransparent) |
| `--text-primary` | `#2D3748` | Primärer Text |
| `--text-muted` | `#7A8599` | Gedimmter Text |
| `--border-color` | `#D4DCE8` | Rahmenfarbe |
| `--border-radius-card` | `10px` | Kartenecken |

---

## App-Architektur

Jede App ist eine **einzige, selbstständige HTML-Datei**:

- **Styles:** Inline `<style>`-Block in der HTML-Datei
- **Logik:** Inline `<script>`-Block (typischerweise als IIFE)
- **Keine geteilte Spiellogik** zwischen Apps
- **Ausnahme:** `apps/gta/` hat eigene Schriftarten in `apps/gta/fonts/`

Fertige Apps:

| App | Pfad | Beschreibung |
|-----|------|--------------|
| Pong | `/home/user/vibecoding-academy/apps/pong/index.html` | Klassisches Pong-Spiel |
| GTA-Parodie | `/home/user/vibecoding-academy/apps/gta/index.html` | GTA-Parodie mit eigenen Fonts |
| Wochenendplanung | `/home/user/vibecoding-academy/apps/wochenendplanung/index.html` | Wochenendplaner |

---

## Spielkonzepte (`projekte/`)

Markdown-Dateien mit detaillierten Spezifikationen (Regeln, Steuerung, Farben, technische Details):

| Konzept | Pfad |
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
| Haushaltsbuch | `/home/user/vibecoding-academy/projekte/haushaltsbuch.md` |

- `viewer.html` rendert die Markdown-Dateien im Browser
- Konzepte dienen als Vorlage für neue App-Implementierungen
