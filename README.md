# Vibecoding Academy

Landing Page und Projekt-Hub für den **Vibecoding Workshop** – KI-gestütztes Web-Coding von der Idee bis zum Release.

## Live

[fauteck.github.io/vibecoding-academy](https://fauteck.github.io/vibecoding-academy/)

## Über den Workshop

In diesem Workshop tauschen wir uns zum Thema Vibecoding aus: Wie lassen sich mit KI-Unterstützung Web-Anwendungen und Spiele bauen – auch ohne tiefere eigene Coding-Skills? Vom Konzept über die digitale Infrastruktur bis hin zu Release- und Issue-Management.

Teilnehmer können eigene Ideen mitbringen (z. B. Tetris, Minesweeper, To-Do-Liste, Notizen-App), die dann live mit KI umgesetzt werden.

## Projekt hinzufügen

Die Startseite verlinkt auf Workshop-Ergebnisse in Unterordnern dieses Repos.

1. **Unterordner anlegen** mit eigener `index.html`, z. B. `minesweeper/index.html`
2. **Projekt-Card in `index.html` eintragen** – im Bereich `projects-grid` (ca. Zeile 322):

```html
<a class="project-card" href="./minesweeper/">
  <span class="project-icon">💣</span>
  <span class="project-name">Minesweeper</span>
  <span class="project-desc">Klassisches Minesweeper-Spiel</span>
</a>
```

3. **Platzhalter entfernen** – beim ersten Projekt den `<div class="projects-empty">…</div>` Block löschen
4. **Committen & pushen** – GitHub Pages deployt automatisch

## Tech-Stack

- Single-File HTML (kein Framework, keine externen Abhängigkeiten)
- CSS Custom Properties, Dark Theme (Purple/Cyan)
- SVG Favicon als Data-URI eingebettet
- Gehostet via GitHub Pages
