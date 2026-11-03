> Lesen: bei Änderungen an HTML-Head, CSP, externen Links/Formularen, robots.txt, oder bei Security-/OWASP-Prüfungen.

## 6. Security & Secrets

- No secrets in code or repo (this project requires none)
- No `.env` files (purely static project)
- No external CDN inclusions — dependencies are stored locally in `/vendor`
- External links must include `rel="noopener"`

### Content Security Policy

Every HTML file carries an identical `http-equiv` CSP meta-tag (GitHub Pages
delivers no server-side headers, so the meta-tag is the only mechanism).
Canonical value — copy this verbatim into every new page:

```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'">
```

**Directive rationale:**

| Directive | Value | Reason |
|---|---|---|
| `default-src` | `'self'` | Block all unlisted resource types by default |
| `script-src` | `'self' 'unsafe-inline'` | Inline game scripts; no external JS |
| `style-src` | `'self' 'unsafe-inline'` | Inline styles; no external CSS |
| `img-src` | `'self' data:` | Allows inline data-URIs (icons, favicons) |
| `font-src` | `'self'` | Font Awesome loaded from `/vendor` |
| `connect-src` | `'self'` | No external API calls |
| `frame-ancestors` | `'none'` | Prevents clickjacking via iframes |
| `base-uri` | `'self'` | Prevents `<base>` tag injection |
| `form-action` | `'self'` | Forms may only submit to same origin |

**If a page needs to submit a form to an external service** (e.g. `https://api.web3forms.com`),
add that origin to `form-action` on that page only — do not change the canonical template.

---

## 7. OWASP Top 10

This repo has no backend and no API. OWASP applies **by analogy**:

- **Input Validation**: Validate user input in games client-side
- **Supply Chain**: Dependencies in `/vendor` — no external supply chain
- **XSS Prevention**: No `innerHTML` with uncontrolled data; prefer `textContent`
- **Secrets**: No API keys or credentials in frontend code

---

## 8. robots.txt

The `robots.txt` is present and blocks all search engines and AI crawlers:

- File is versioned in the repository root
- No manual changes outside of Git
- Blocked crawlers: `*` (all), plus explicitly GPTBot, ChatGPT-User, Google-Extended, anthropic-ai, ClaudeBot, Claude-Web, CCBot, Bytespider, PerplexityBot, and others

> `robots.txt` is **not a security mechanism** — it is a polite request to crawlers.
