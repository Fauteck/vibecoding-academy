# CLAUDE.md — Beispiel-Vorlage

> **Zweck:** Diese Datei dient als Vorlage fuer eigene Projekte.
> Sie zeigt, wie eine `CLAUDE.md` strukturiert sein kann, um KI-Tools wie Claude Code effektiv zu steuern.

---

## Projektuebersicht

**Projektname** ist eine [kurze Beschreibung des Projekts].

- **Typ:** [z. B. Statische Website, Web-App, CLI-Tool]
- **Tech-Stack:** [z. B. HTML/CSS/JS, Python, Node.js]
- **Deployment:** [z. B. GitHub Pages, Docker, Vercel]

---

## Grundprinzipien

- Aenderungen gehen immer ueber Code-Change, Commit, Push
- Der `main`-Branch spiegelt stets den Live-Stand wider
- [Weitere projektspezifische Prinzipien]

---

## Erlaubt / Nicht erlaubt

### Die KI darf

- Code aendern und refactoren
- Neue Dateien erstellen
- Tests schreiben und ausfuehren
- Dokumentation aktualisieren

### Die KI darf NICHT

- [z. B. Frameworks einfuehren ohne Ruecksprache]
- [z. B. Secrets oder API-Keys im Code speichern]
- [z. B. Breaking Changes ohne Absprache]

---

## Qualitaetsanforderungen

Vor einem Merge in `main` muss gelten:

- Code ist getestet
- Keine Debug-Ausgaben im finalen Code
- Dokumentation ist aktuell
- [Weitere Anforderungen]

---

## Security

- Keine Secrets im Code oder Repository
- Externe Abhaengigkeiten mit Integrity-Hashes absichern
- Benutzereingaben validieren
- [Weitere Sicherheitsregeln]

---

## Design System (optional)

Hier koennen Farben, Schriftarten, Komponenten und Layouts definiert werden,
damit die KI konsistente Designs erstellt.

```css
:root {
    --primary-color:   #5B8BD6;
    --secondary-color: #3D5A8C;
    --bg-page:         #EEF2F7;
    --text-primary:    #2D3748;
}
```

---

## Kompatibilitaet

| Tool | Erwarteter Pfad |
|---|---|
| Claude Code | `CLAUDE.md` (Repository-Root) |
| GitHub Copilot | `.github/copilot-instructions.md` |
| Cursor | `.cursor/rules` oder `.cursorrules` |

> **Tipp:** Symlinks oder Kopien unter den jeweiligen Pfaden anlegen,
> damit alle Tools dieselben Regeln verwenden.
