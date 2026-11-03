> Lesen: vor Merge/Abschluss einer Änderung (Definition of Done, Doku-Pflichten) und bei jeder Doku-Änderung oder Aufräum-Durchgang (Doku-Hygiene).

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

## 12. Doku-Hygiene

Doku veraltet an drei Stellen, und alle drei sind Aussagen, die nichts
nachrechnet: die **Kopie** (eine abgeleitete Seite wiederholt einen Fakt,
dessen Heimat woanders liegt), die **Sollens-Regel** (ein Regelwerk
behauptet eine Praxis, die so nicht gelebt wird) und die **handgepflegte
Aufzählung** (eine Tabelle spiegelt eine Menge aus dem Code).

Verbindlich vor Doku-Änderungen und bei jedem Aufräum-Durchgang: Notiz
**„Behauptungen, die niemand prüft"** im Todoteck-Projekt `llm-wiki`
(per `search`/`get_note`) — Gegenmittel je Sorte und Prüfliste.

Kurzfassung für dieses Repo:

- Eine Regel hier beschreibt, was **tatsächlich passiert**. Weicht sie von
  der Praxis ab, wird die Regel korrigiert — nicht die Praxis behauptet.
- Was sich aus dem Code aufzählen lässt (Modul-, Route-, Tabellenlisten,
  Verzeichnisbäume), gehört in einen Test, nicht in Prosa.
- Status („X von Y umgesetzt", „noch kein PR") gehört nach Todoteck oder in
  git — nicht in eine Datei, die beim Erledigen niemand anfasst.
