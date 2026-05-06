# Quick Wins — Visuelle Verbesserungen für Vibecoding Academy

> **Zielgruppe:** Claude Code (oder andere AI-Coding-Agents), die an `Fauteck/vibecoding-academy` arbeiten.
> **Stand:** Mai 2026 · **Basis:** Live-Site `academy.niklasfauteck.de` + Repo-Analyse
> **Constraints beachten:** Vanilla HTML/CSS/JS · keine npm-Pakete · keine externen CDNs · CSP einhalten · vendored Assets verwenden.

Diese Datei listet konkrete, isoliert umsetzbare Verbesserungen. Jeder Punkt enthält: **Was**, **Warum**, **Konkrete Aufgabe**, **Akzeptanzkriterien**.

---

## 1. Hero-Sektion — weniger Cliché, mehr Charakter

**Was.** Der aktuelle 135°-Blau-Verlauf auf der Landing wirkt generisch und austauschbar.

**Warum.** Ist der erste visuelle Eindruck. Aktuell sieht die Hero aus wie viele andere Tech-/Workshop-Sites — kein Wiedererkennungswert.

**Aufgabe.**
- Variante A: Asymmetrisches Split-Layout (Mantra „Erst bauen. Dann wissen, was wirklich geht." links groß, Coach-Foto oder Hero-Visual rechts).
- Variante B: Subtile Code-Texture im Hintergrund (Monospace-Zeichen-Gitter, ~3 % Opacity, `pointer-events: none`).
- Variante C: Animiertes Mantra mit Type-Reveal beim Scroll (`prefers-reduced-motion` respektieren!).

**Akzeptanzkriterien.**
- Hero bleibt unter 600px Höhe auf Desktop.
- WCAG-AA-Kontrast für allen Text auf Hintergrund.
- Mobile Layout bleibt einspaltig, Foto ggf. unter dem Text.
- Kein Layout-Shift beim Laden.

---

## 2. Projektkacheln — Emoji ersetzen oder konsequent inszenieren

**Was.** Die Emoji-Icons (🏓 🚗 📅 📰) auf `projekte/index.html` und der Landing wirken wie eine Notlösung neben dem sonst sehr durchgestylten Design.

**Warum.** Brechen die Marken-Konsistenz. Sehen auf jedem OS unterschiedlich aus.

**Aufgabe.** Eine der drei Optionen wählen:
- **Option A — Mini-Screenshots:** 240×160px Thumbnails der Apps, statisch oder beim Hover gif-artig animiert. Im `images/`-Ordner ablegen, im `<picture>`-Element AVIF/WebP/JPG ausspielen.
- **Option B — SVG-Glyphs:** 12 inline-SVGs in Markenblau (`--primary-color`), einheitlicher Stroke-Stil (z. B. 2px round), 64×64px. In `images/icons/projekte/` ablegen.
- **Option C — Hybrid:** Fertige Apps bekommen Screenshots, Konzept-Ideen behalten emoji-artige Glyphs.

**Akzeptanzkriterien.**
- Keine Layout-Verschiebung bei langsamem Laden (`width`/`height` Attribute setzen).
- `loading="lazy"` für alles below-the-fold.
- Bei Screenshots: `decoding="async"` und `fetchpriority="low"`.

---

## 3. Section-Header-System schärfen

**Was.** Die aktuellen Section-Header (4px Border-Left + Padding) sind unscheinbar und gehen im Layout unter.

**Warum.** Eine Workshop-Marke darf Workshop-Charakter zeigen. Klare Sektions-Markierung gibt der Seite Rhythmus und Lesbarkeit.

**Aufgabe.** Neue Section-Header-Komponente:
- **Nummerierte Sektionen** als Eyebrow: „01 — Was du mitnimmst", „02 — Wie dein Workshop abläuft" …
- IBM Plex Sans 600, `--text-muted`, `font-size: 0.85rem`, `letter-spacing: 0.15em`, uppercase.
- Darunter H2 in 700/800-Weight, `font-size: 1.6rem`, `letter-spacing: -0.02em`.
- Alte 4px-Border-Variante als Fallback für Sub-Sektionen behalten.

**Akzeptanzkriterien.**
- Komponente wird in `css/components.css` (neu anlegen) zentralisiert.
- Auf allen 4 Hauptseiten (Landing, Projekte, Über mich, Kontakt) konsistent ersetzt.
- Anchor-Links per `id` weiterhin funktionsfähig.

---

## 4. Glasmorphismus konsequenter machen — oder weglassen

**Was.** `backdrop-filter: blur(8px)` mit 92 % weißem Hintergrund ist so dezent, dass der Effekt fast unsichtbar ist — aber Performance-Kosten verursacht.

**Warum.** Halbe Effekte sind die teuersten: man zahlt Performance + Browser-Kompatibilität ohne den visuellen Nutzen einzustreichen.

**Aufgabe.** Entscheiden und umsetzen:
- **Mutiger:** `backdrop-filter: blur(16px) saturate(1.4)` + Karten-Hintergrund auf `rgba(255,255,255,0.65)`. Hero-Textur soll durchscheinen.
- **Oder weg:** Komplett raus, stattdessen `--shadow-md` oder `--shadow-lg` für Tiefe, Karten-BG solide `#FFFFFF`.

**Akzeptanzkriterien.**
- Mobile-Override (`<= 991.98px`) bleibt: `backdrop-filter: none`, solider weißer Hintergrund.
- Lighthouse Performance Score darf nicht fallen (Vergleich vor/nach).
- Safari-Test: kein Flickering beim Scrollen.

---

## 5. Typo-Hierarchie verstärken

**Was.** Aktuell läuft fast alles bei Weight 400/600/700. IBM Plex Sans kann 100–900.

**Warum.** Mehr Weight-Range = klarere Hierarchie und schärferer Markenton („Erst bauen.").

**Aufgabe.**
- **Display-Weight 800** für Hero-H1 und neue Sektions-Nummern.
- `letter-spacing: -0.04em` für Display-Größen (Hero, große H1).
- `letter-spacing: -0.02em` für Brand-Name und H1-H2.
- Body bleibt 400, Lead bleibt 500, CTAs 600, normale Headlines 700.

**Akzeptanzkriterien.**
- Variable Font-Datei deckt 800 ab (bereits in `vendor/ibm-plex-sans/latin-wght-normal.woff2`).
- Tokens in `css/tokens.css` ergänzen: `--font-weight-black: 800`, `--tracking-display: -0.04em`.
- Visuell-Regression auf allen Seiten checken.

---

## 6. Coach-Avatar prominenter inszenieren

**Was.** 200×200px-Kreis auf `ueber-mich/` ist klein und brav.

**Warum.** Das Coaching ist personenbezogen — die Person darf größer und persönlicher gezeigt werden.

**Aufgabe.** Eine der Optionen:
- **A:** 320×320px, leicht aus dem Grid versetzt (`transform: rotate(-2deg)`), mit Polaroid-artigem weißem Rand.
- **B:** Duotone-Behandlung in Markenblau (CSS `filter` oder vorab gerendertes Bild).
- **C:** Zwei Bilder — eines arbeitend („während des Workshops"), eines neutral.

**Akzeptanzkriterien.**
- `<picture>` mit AVIF/WebP/JPG bleibt erhalten.
- Neue Größen-Varianten generieren (kein Hochskalieren!).
- Mobile: zurück auf max. 240px Breite, mittig.

---

## 7. CTA-Hover ersetzen — weg von `opacity: 0.85`

**Was.** Aktueller Hover-State auf `.cta-btn`/`.site-nav-cta` ist `opacity: 0.85`.

**Warum.** Langweiligster aller Hover-Effekte. Wirkt „abgetönt", nicht „aktiv".

**Aufgabe.** Einer der Vorschläge (Aufwand vergleichbar):
- **Border-Slide-In:** `box-shadow: inset 0 0 0 2px rgba(255,255,255,0.4)` bei Hover.
- **Icon-Shift:** `<i>` innerhalb des Buttons rückt 4px nach rechts (`transform: translateX(4px)`, Transition `0.2s ease`).
- **Lift + Schatten:** `transform: translateY(-2px)`, `box-shadow: 0 6px 20px rgba(91,139,214,0.35)`.

**Akzeptanzkriterien.**
- Effekt nur auf `:hover` UND `:focus-visible`.
- `prefers-reduced-motion: reduce` deaktiviert Transform.
- Bestehende `.contact-link`-Hover (translateY(-1px)) konsistent angleichen.

---

## Allgemeine Hinweise an Claude Code

- **Eine Änderung pro Commit/PR**, damit visuelle Reviews möglich bleiben.
- **Keine neuen Dependencies.** Auch nicht für Animationen — `transition` und `animation` reichen.
- **Bestehende CSS-Variablen verwenden**, neue nur in `css/tokens.css` hinzufügen und dort dokumentieren.
- **CSP nicht aufweichen** — keine inline-Scripts neu hinzufügen, keine externen Hosts in `connect-src`.
- Tests: Manuelle Sichtprüfung auf 320px / 768px / 1280px / 1920px Breite. Lighthouse-Score-Vergleich vor/nach für Punkte 1, 4, 6.

---

*Bei Unklarheiten: erst nachfragen, nicht raten. Diese Datei ist die Arbeitsbasis, nicht das letzte Wort.*
