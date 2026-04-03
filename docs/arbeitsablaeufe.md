# Arbeitsabläufe & Häufige Aufgaben

> Zurück zum [Dokumentations-Index](INDEX.md)

---

## Neue App erstellen (depth=2)

### Schritt-für-Schritt

1. **Ordner anlegen:** `apps/<name>/index.html`
2. **`data-depth="2"`** im `<html>`-Tag setzen
3. **CSS/JS einbinden** mit Prefix `../../` (siehe Template unten)
4. **Nav/Footer-Platzhalter** einfügen: `<nav id="site-nav"></nav>` und `<footer id="site-footer"></footer>`
5. **Seitenspezifische Styles/Logik** inline in `<style>` und `<script>`
6. **Projekt-Card** in `/home/user/vibecoding-academy/index.html` im Bereich "Ergebnisse" eintragen
7. **Committen & Pushen** — GitHub Pages deployt automatisch

### Vollständiges HTML-Template (Copy-Paste)

```html
<!DOCTYPE html>
<html lang="de" data-depth="2">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>APP-NAME — Vibecoding Academy</title>
    <meta name="description" content="BESCHREIBUNG">

    <!-- Vendor (lokal) -->
    <link href="../../vendor/bootstrap/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../../vendor/fontawesome/css/all.min.css">

    <!-- Gemeinsame Styles -->
    <link rel="stylesheet" href="../../css/tokens.css">
    <link rel="stylesheet" href="../../css/nav.css">
    <link rel="stylesheet" href="../../css/footer.css">

    <style>
        /* Seitenspezifische Styles hier */
    </style>
</head>
<body>
    <nav id="site-nav"></nav>

    <main class="page-wrapper">
        <div class="container">
            <!-- Seiteninhalt hier -->
        </div>
    </main>

    <footer id="site-footer"></footer>

    <!-- Vendor JS -->
    <script src="../../vendor/bootstrap/bootstrap.bundle.min.js"></script>
    <!-- Shared Components (Nav & Footer Injection) -->
    <script src="../../js/components.js"></script>

    <script>
        /* Seitenspezifische Logik hier (z. B. Spiellogik als IIFE) */
    </script>
</body>
</html>
```

---

## Neue Bereichsseite erstellen (depth=1)

Für Seiten in einem Unterordner direkt unter Root (z. B. `wiki/`, `ueber-mich/`):

1. **Ordner anlegen:** `<bereich>/index.html`
2. **`data-depth="1"`** setzen
3. **Pfad-Prefix:** `../` für alle Vendor/CSS/JS-Einbindungen
4. Rest wie oben (Nav/Footer-Platzhalter, components.js)

```html
<html lang="de" data-depth="1">
<!-- Pfade mit ../ statt ../../ -->
<link href="../vendor/bootstrap/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="../css/tokens.css">
<!-- ... -->
<script src="../js/components.js"></script>
```

---

## Neue Root-Seite erstellen (depth=0)

Für Seiten direkt im Repository-Root (z. B. `impressum.html`):

1. **Datei anlegen:** `<name>.html` im Root
2. **`data-depth="0"`** setzen
3. **Pfad-Prefix:** `./` für alle Einbindungen

```html
<html lang="de" data-depth="0">
<link href="./vendor/bootstrap/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="./css/tokens.css">
<!-- ... -->
<script src="./js/components.js"></script>
```

---

## Navigation ändern

**Datei:** `/home/user/vibecoding-academy/js/components.js`

| Was | Zeilen | Beschreibung |
|-----|--------|--------------|
| Links hinzufügen/ändern | 11–16 | Objekt zu `navLinks`-Array hinzufügen: `{ href: 'pfad/', label: 'Text', key: 'key' }` |
| CTA-Button ändern | 17 | `ctaLink`-Objekt anpassen |
| Aktive Erkennung | 20–29 | Neuen Regex-Fall für den neuen Bereich hinzufügen |

> **ACHTUNG:** Änderungen an der Navigation betreffen **alle Seiten** gleichzeitig, da `components.js` global eingebunden ist.

**Beispiel — Neuen Link hinzufügen:**

```javascript
// Zeile 11-16 in components.js
var navLinks = [
    { href: '',            label: 'Workshop',  key: 'workshop' },
    { href: 'wiki/',       label: 'Wiki',      key: 'wiki' },
    { href: 'projekte/',   label: 'Projekte',  key: 'projekte' },
    { href: 'ueber-mich/', label: 'Coach',     key: 'ueber-mich' },
    { href: 'neu/',        label: 'Neu',       key: 'neu' }       // ← Neuer Link
];

// Zeile 20-29: Aktive Erkennung ergänzen
else if (/\/neu\//.test(path)) activeKey = 'neu';                  // ← Neue Erkennung
```

---

## Design Token ändern

**Datei:** `/home/user/vibecoding-academy/css/tokens.css` (Zeile 3–16)

> **ACHTUNG:** Token-Änderungen wirken **global auf alle Seiten**.

Alle Farben und Radien sind als CSS Custom Properties in `:root` definiert. Änderung in `tokens.css` reicht — kein weiterer Eingriff nötig.

---

## Neues Spielkonzept hinzufügen

1. **Markdown-Datei anlegen:** `/home/user/vibecoding-academy/projekte/<name>.md`
2. **Format** (Vorlage: `/home/user/vibecoding-academy/projekte/pong.md`):
   - Spielbeschreibung
   - Regeln & Mechanik
   - Steuerung
   - Technische Details (Canvas/DOM, Farben, Responsive)
   - CSS-Vorgaben
   - JavaScript-Struktur
3. **Viewer** zeigt die Datei automatisch an (`projekte/viewer.html?file=<name>.md`)

---

## Projekt-Card zur Landing Page hinzufügen

**Datei:** `/home/user/vibecoding-academy/index.html`

Im Bereich "Ergebnisse" eine neue Card einfügen. Bestehende Cards als Vorlage nutzen — Struktur mit Bootstrap-Grid (`.col-md-6` oder `.col-lg-4`), `.card`-Klasse und Link zur App.

---

## Deployment

| Aktion | Befehl / Prozess |
|--------|------------------|
| **Deployen** | `git push origin main` — GitHub Pages deployt automatisch |
| **Rollback** | Revert-Commit auf `main` pushen |
| **Live-URL** | `https://fauteck.github.io/vibecoding-academy/` |
| **Kein Build-Schritt** | HTML-Dateien werden direkt ausgeliefert |

---

## Lokale Entwicklung

```bash
cd /home/user/vibecoding-academy
python3 -m http.server 8000
# → http://localhost:8000
```

Kein `npm install`, kein Build-Prozess. Einfach einen lokalen HTTP-Server starten.
