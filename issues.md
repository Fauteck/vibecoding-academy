# Verbesserungsmöglichkeiten — Vibecoding Academy

> **Stand:** 2026-04-23
> **Scope:** Audit des aktuellen Repository-Standes (statische Website, GitHub Pages).
> **Zweck:** Priorisierte Liste konkreter, umsetzbarer Verbesserungen. Keine Empfehlungen, die das Projektprinzip (kein Build, kein Framework) verletzen.

---

## Prioritäten-Legende

| Kürzel | Bedeutung |
|---|---|
| **P1** | Hoch — sichtbarer Nutzerschaden oder klarer Regelverstoß |
| **P2** | Mittel — Qualitäts-/Wartbarkeitsproblem, kein akuter Schaden |
| **P3** | Niedrig — Nice-to-have, Wishlist, langfristig |

---

## 1. SEO & Auffindbarkeit

| # | Priorität | Datei : Zeile | Beschreibung |
|---|---|---|---|
| 1.1 | **P1** | `robots.txt:2–3` | `User-agent: *` + `Disallow: /` blockiert **alle** Suchmaschinen (auch Google, Bing, DuckDuckGo). Das widerspricht einer öffentlich beworbenen Workshop-Seite. Empfehlung: Allgemein `Allow: /` setzen und **nur** explizit gelistete AI-Crawler blocken. Entscheidung bewusst treffen und in `CLAUDE.md §8` dokumentieren. |
| 1.2 | **P2** | `sitemap.xml` | `lastmod`-Werte sind statisch auf `2026-04-02` und werden nie aktualisiert. Bei Content-Änderungen nutzlos. Empfehlung: Bei jedem PR mit Content-Änderung `lastmod` mitaktualisieren; alternativ als Checkliste in PR-Template. |
| 1.3 | **P2** | `apps/pong/index.html`, `apps/gta/index.html`, `apps/wochenendplanung/index.html` | JSON-LD Structured Data (`Schema.org`) existiert nur in `index.html:564–604`. Apps haben keine. Empfehlung: Pro App einen `SoftwareApplication`-Block mit `applicationCategory: Game` bzw. `Productivity`. |
| 1.4 | **P3** | alle Unterseiten | `og:image` zeigt überall auf `/images/og-image.png`. Pro Unterseite ein eigenes OG-Bild (Pong, GTA, Wochenendplanung) würde Social-Previews verbessern. |

---

## 2. Code-Qualität & Konsistenz

| # | Priorität | Datei : Zeile | Beschreibung |
|---|---|---|---|
| 2.1 | **P1** | `apps/pong/index.html:2`, `apps/gta/index.html:2`, `apps/wochenendplanung/index.html:2`, `apps/blog/index.html:2` | `<html lang="de">` ohne `data-depth="2"`. `js/components.js` berechnet Pfade anhand dieses Attributs (siehe CLAUDE.md §Architektur). Fehlt das Attribut, bricht die Pfadauflösung für Nav/Footer-Injection. Fix: `<html lang="de" data-depth="2">` in allen vier Apps. |
| 2.2 | **P2** | `apps/pong/index.html:41–112`, `apps/gta/index.html:192–263`, `apps/wochenendplanung/index.html:170–241` | Drei App-Dateien enthalten je ~70 Zeilen **identische** Navbar-/Footer-HTML. Das Shared-Components-Pattern (`<nav id="site-nav">` + `js/components.js`) wird umgangen. Entweder Apps auf Injection umstellen oder in `CLAUDE.md` dokumentieren **warum** Apps eigene Navbars haben. |
| 2.3 | **P2** | `apps/gta/index.html:25–188` | 164 Zeilen `.gta-*`-CSS inline im `<style>`-Block. Laut CLAUDE.md sollen nur **spiel-/app-spezifische** Styles inline bleiben — allgemeine Button/Layout-Styles gehören in `css/`. Kandidaten für `css/apps.css` prüfen. |
| 2.4 | **P3** | `apps/pong/index.html:204` | Inline-`style="width:100%; text-align:center; padding:0.6rem;…"` auf Footer-Element. Sollte in `css/footer.css` oder app-eigener Klasse sein. |
| 2.5 | **P3** | `apps/blog/` | App-Ordner existiert, ist aber weder in `CLAUDE.md §Architektur` noch auf der Landing-Page `index.html` als Projekt-Card verlinkt (widerspricht CLAUDE.md §11 Dokumentationspflicht). Entweder auflisten oder entfernen. |

---

## 3. Accessibility (WCAG / a11y)

| # | Priorität | Datei : Zeile | Beschreibung |
|---|---|---|---|
| 3.1 | **P2** | `apps/pong/index.html:120`, `apps/gta/index.html:271` | Canvas-Elemente ohne `aria-label`. Screenreader kündigen nur "canvas" an. Fix: `<canvas ... aria-label="Pong-Spiel: Schläger mit Pfeiltasten oder Maus steuern">`. |
| 3.2 | **P2** | `apps/gta/index.html:98–101` | Keyboard-Shortcuts werden per `@media (hover: hover)` nur auf Desktop eingeblendet. Touch-Nutzer erfahren nie, dass WASD/Pfeiltasten existieren. Alternative: Info-Button (`?`) mit Modal oder permanent sichtbarer Hint in kompaktem Layout. |
| 3.3 | **P2** | `apps/pong/index.html`, `apps/gta/index.html` | Canvas-Spiele fokussieren nicht sichtbar und haben keinen `tabindex="0"`. Tastaturnutzer, die erst mit Tab landen wollen, sehen keinen Fokus-Ring. |
| 3.4 | **P3** | `css/tokens.css` (`--text-muted: #7A8599` auf weißem Hintergrund) | Kontrast grenzwertig bei kleinen Schriftgrößen. WCAG AA-konform für Normaltext, aber für <14px fraglich. Stichprobe empfohlen. |

---

## 4. Performance

| # | Priorität | Datei : Zeile | Beschreibung |
|---|---|---|---|
| 4.1 | **P2** | alle Seiten mit Bildern (außerhalb `index.html:855–868`) | `loading="lazy"` ist nur auf Teilen der Bilder gesetzt (z. B. Niklas-Foto in `index.html`). In `ueber-mich/`, `projekte/`, Blog-Artikeln ungeprüft. Regel: Alle Bilder außerhalb des initialen Viewports `loading="lazy"` und `decoding="async"`. |
| 4.2 | **P3** | `vendor/bootstrap/bootstrap.min.css`, `vendor/fontawesome/css/all.min.css` | Komplette Bibliotheken werden geladen, auch wenn nur wenige Komponenten genutzt werden. Ohne Build-Prozess schwer selektiv, aber: FontAwesome als **Subset** mit nur den tatsächlich verwendeten Icons könnte Größe drastisch reduzieren (manueller Export bei FA). |
| 4.3 | **P3** | `vendor/bootstrap/bootstrap.bundle.min.js` | Bootstrap-JS wird auch auf Seiten geladen, die keine Bootstrap-Interaktivität nutzen (z. B. statische Legal-Pages). Dort optional weglassen. |

---

## 5. Sicherheit

| # | Priorität | Datei : Zeile | Beschreibung |
|---|---|---|---|
| 5.1 | **P2** | `apps/pong/index.html:17`, `apps/gta/index.html`, weitere | CSP-Meta enthält `script-src 'self' 'unsafe-inline'`. `'unsafe-inline'` ist nötig, weil die Spiele-Logik inline eingebettet ist. Mittelfristig: Spiele-Logik in externe JS-Dateien in der App-Ordner auslagern (z. B. `apps/pong/pong.js`) — widerspricht **nicht** dem Prinzip "selbstständige HTML-Datei", sondern macht das App-Verzeichnis selbstenthaltend. Danach `'unsafe-inline'` entfernen. |
| 5.2 | **P3** | `vendor/bootstrap/` (5.3.2, Mai 2023), `vendor/fontawesome/` (6.4.2, April 2024) | Beide Versionen sind ~2 Jahre alt. Keine bekannten CVEs, aber Update-Stand dokumentieren und jährlich prüfen. |
| 5.3 | **P3** | `js/components.js` und andere `innerHTML`-Stellen | `innerHTML` wird für Nav/Footer-Injection verwendet. Inhalt ist statisch im Script, also sicher. Trotzdem: Bei zukünftigen Erweiterungen (z. B. aus URL-Parametern lesen) klare Regel im Code-Kommentar festhalten: "Nur statische Strings — bei dynamischen Daten `textContent`". |

---

## 6. UX & App-spezifische Verbesserungen

| # | Priorität | Datei : Zeile | Beschreibung |
|---|---|---|---|
| 6.1 | **P2** | `apps/wochenendplanung/index.html` | Kein Export/Import der geplanten Daten. `localStorage` ist browser-/gerätegebunden — bei Browserwechsel/Cache-Leerung sind alle Einträge weg. Empfehlung: "Als JSON exportieren" / "JSON importieren"-Buttons. |
| 6.2 | **P2** | `apps/wochenendplanung/index.html` | Kein "Alle Daten zurücksetzen"-Button (mit Confirm). Für Demo-/Workshop-Zwecke nützlich. |
| 6.3 | **P3** | `apps/pong/index.html`, `apps/gta/index.html` | Kein Pause-Mechanismus (z. B. `Esc` oder `P`). Praktisch bei Unterbrechungen. |
| 6.4 | **P3** | `apps/pong/index.html` | Kein Highscore / keine persistente Bestleistung. Minimalimplementierung via `localStorage` wäre ein einfacher Lernerfolg. |

---

## 7. Wartbarkeit & Doku

| # | Priorität | Datei : Zeile | Beschreibung |
|---|---|---|---|
| 7.1 | **P2** | `CLAUDE.md §Architektur` | `apps/blog/` fehlt in der Projektübersicht und im Verzeichnisbaum. Ergänzen oder Ordner entfernen. |
| 7.2 | **P2** | `README.md` | README beschreibt das Projekt, aber enthält keine Checkliste "Neues Projekt hinzufügen" (die nur in `CLAUDE.md` steht). Neue Mitwirkende, die zuerst README lesen, verpassen die Regeln. Kurze Referenz auf `CLAUDE.md` in README an prominenter Stelle. |
| 7.3 | **P3** | `docs/INDEX.md` | Dokumentations-Hub. Wenn vorhanden: Auf Aktualität prüfen, insbesondere ob `apps/blog/` und alle aktuellen Dateien referenziert sind. |

---

## 8. Legal / DSGVO

| # | Priorität | Datei : Zeile | Beschreibung |
|---|---|---|---|
| 8.1 | **P2** | `datenschutz.html`, Footer (`js/components.js`) | Kein sichtbarer Cookie-/Tracking-Hinweis beim ersten Besuch. GitHub Pages und ggf. Web3Forms setzen Cookies. Für EU-Konformität reicht ein Footer-Link "Datenschutz & Cookies"; wird aktuell zu wenig prominent eingebunden. Prüfen, ob ein minimaler Banner nötig ist. |
| 8.2 | **P3** | `impressum.html`, `agb.html` | Jährliche Review (gültig laut TMG/DSA?). Keine akute Lücke, aber als Kalendereintrag sinnvoll. |

---

## 9. Tooling / Quality Gates

| # | Priorität | Datei : Zeile | Beschreibung |
|---|---|---|---|
| 9.1 | **P2** | — | Kein automatischer HTML-Validator, Link-Checker oder Lighthouse-Check. Laut CLAUDE.md §5 erfolgt Prüfung manuell — das skaliert nicht. GitHub Actions mit z. B. `lychee` (Link-Check) und `html-validate` wäre kein Build-Prozess im Sinne der CLAUDE.md-Regeln, sondern reine Qualitätskontrolle. |
| 9.2 | **P3** | — | Kein PR-Template. Ein kurzer Template-Stub (`.github/pull_request_template.md`) mit der DoD-Checkliste aus `CLAUDE.md §10` erleichtert manuelle Reviews. |

---

## Empfohlene Reihenfolge (Quick Wins zuerst)

1. **1.1** `robots.txt` — Suchmaschinen freigeben (5 Min)
2. **2.1** `data-depth="2"` in allen 4 Apps ergänzen (5 Min)
3. **3.1** `aria-label` auf Canvas in Pong & GTA (5 Min)
4. **7.1** `apps/blog/` in `CLAUDE.md` und `index.html` dokumentieren (10 Min)
5. **6.1 / 6.2** Export + Reset-Button für Wochenendplanung (30–60 Min)
6. **1.3** JSON-LD für Apps (30 Min)
7. **2.3 / 2.4** Inline-CSS aus Apps konsolidieren (1–2 h)
8. **9.1** Link-/HTML-Check via GitHub Actions (1 h)

Alles darüber hinaus als Backlog.
