/* ── Shared Navigation & Footer Components ──────── */
(function () {
  'use strict';

  /* Determine the relative path prefix from the current page to the site root.
     Each HTML page sets <html data-depth="0|1|2"> to indicate its folder depth. */
  var depth = parseInt(document.documentElement.getAttribute('data-depth') || '0', 10);
  var prefix = depth === 0 ? './' : '../'.repeat(depth);

  /* ── Navigation Links ─────────────────────────── */
  var navLinks = [
    { href: '',            label: 'Workshop',  key: 'workshop' },
    { href: 'wiki/',       label: 'Wiki',      key: 'wiki' },
    { href: 'projekte/',   label: 'Projekte',  key: 'projekte' },
    { href: 'ueber-mich/', label: 'Coach',     key: 'ueber-mich' }
  ];
  var ctaLink = { href: 'kontakt/', label: 'Workshop anfragen' };

  /* Detect active section from the current path */
  var path = window.location.pathname;
  var activeKey = '';
  if (/\/wiki\//.test(path))            activeKey = 'wiki';
  else if (/\/projekte\//.test(path))   activeKey = 'projekte';
  else if (/\/apps\//.test(path))       activeKey = 'projekte';
  else if (/\/ueber-mich\//.test(path)) activeKey = 'ueber-mich';
  else if (/\/kontakt\//.test(path))    activeKey = 'kontakt';
  else if (/\/index\.html$/.test(path) || path.replace(/\/$/, '').split('/').pop() === '' ||
           path.endsWith('/vibecoding-academy/') || path === '/vibecoding-academy')
    activeKey = 'workshop';

  /* Build link HTML */
  function buildLinks(container) {
    var html = '';
    for (var i = 0; i < navLinks.length; i++) {
      var link = navLinks[i];
      var cls = 'site-nav-link';
      if (container === 'desktop' && link.key === activeKey) cls += ' active';
      html += '<a class="' + cls + '" href="' + prefix + link.href + '">' + link.label + '</a>';
    }
    html += '<a class="site-nav-cta" href="' + prefix + ctaLink.href + '">' + ctaLink.label + '</a>';
    return html;
  }

  /* ── Render Navigation ────────────────────────── */
  var navEl = document.getElementById('site-nav');
  if (navEl) {
    navEl.className = 'site-nav';
    navEl.setAttribute('role', 'navigation');
    navEl.setAttribute('aria-label', 'Hauptnavigation');
    navEl.innerHTML =
      '<div class="site-nav-inner">' +
        '<a class="site-nav-brand" href="' + prefix + '">' +
          '<span class="site-nav-brand-name">Vibecoding Academy</span>' +
          '<span class="site-nav-brand-subtitle">mit Niklas Fauteck</span>' +
        '</a>' +
        '<div class="site-nav-links">' + buildLinks('desktop') + '</div>' +
        '<button class="site-nav-hamburger" aria-label="Menü" aria-expanded="false">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
        '<div class="site-nav-dropdown">' + buildLinks('dropdown') + '</div>' +
      '</div>';

    /* Hamburger toggle */
    var hamburger = navEl.querySelector('.site-nav-hamburger');
    var dropdown = navEl.querySelector('.site-nav-dropdown');
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      dropdown.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', hamburger.classList.contains('open'));
    });
  }

  /* ── Render Footer ────────────────────────────── */
  var footerEl = document.getElementById('site-footer');
  if (footerEl) {
    footerEl.className = 'footer';
    footerEl.style.marginBottom = '1.5rem';
    footerEl.innerHTML =
      '<a class="footer-contact-link" href="' + prefix + 'kontakt/">Kontakt</a>' +
      '<a href="' + prefix + 'impressum.html">Impressum</a>' +
      '<span class="footer-sep">&middot;</span>' +
      '<a href="' + prefix + 'datenschutz.html">Datenschutz</a>' +
      '<span class="footer-sep">&middot;</span>' +
      '<a href="' + prefix + 'agb.html">AGB</a>';
  }
})();
