/* ── Shared Navigation & Footer Components ──────── */
(function () {
  'use strict';

  /* Each HTML page sets <html data-depth="0|1|2"> to indicate its folder depth. */
  const depth = parseInt(document.documentElement.getAttribute('data-depth') ?? '0', 10);
  const prefix = depth === 0 ? './' : '../'.repeat(depth);

  /* ── Navigation Links ─────────────────────────── */
  const navLinks = [
    { href: '',            label: 'Workshop',  key: 'workshop' },
    { href: 'wiki/',       label: 'Wiki',      key: 'wiki' },
    { href: 'projekte/',   label: 'Projekte',  key: 'projekte' },
    { href: 'ueber-mich/', label: 'Coach',     key: 'ueber-mich' }
  ];
  const ctaLink = { href: 'kontakt/', label: 'Workshop anfragen' };

  /* Detect active section from the current path */
  const path = window.location.pathname;
  let activeKey = '';
  if (/\/wiki\//.test(path))            activeKey = 'wiki';
  else if (/\/projekte\//.test(path))   activeKey = 'projekte';
  else if (/\/apps\//.test(path))       activeKey = 'projekte';
  else if (/\/ueber-mich\//.test(path)) activeKey = 'ueber-mich';
  else if (/\/kontakt\//.test(path))    activeKey = 'kontakt';
  else if (/\/index\.html$/.test(path) || path.replace(/\/$/, '').split('/').pop() === '' ||
           path.endsWith('/vibecoding-academy/') || path === '/vibecoding-academy')
    activeKey = 'workshop';

  function createNavLink(link, isActive) {
    const a = document.createElement('a');
    a.className = isActive ? 'site-nav-link active' : 'site-nav-link';
    a.href = prefix + link.href;
    a.textContent = link.label;
    if (isActive) a.setAttribute('aria-current', 'page');
    return a;
  }

  function buildLinkGroup(container) {
    const frag = document.createDocumentFragment();
    for (const link of navLinks) {
      frag.appendChild(createNavLink(link, container === 'desktop' && link.key === activeKey));
    }
    const cta = document.createElement('a');
    cta.className = 'site-nav-cta';
    cta.href = prefix + ctaLink.href;
    cta.textContent = ctaLink.label;
    frag.appendChild(cta);
    return frag;
  }

  /* ── Render Navigation ────────────────────────── */
  const navEl = document.getElementById('site-nav');
  if (navEl) {
    navEl.className = 'site-nav';
    navEl.setAttribute('role', 'navigation');
    navEl.setAttribute('aria-label', 'Hauptnavigation');

    const brand = document.createElement('a');
    brand.className = 'site-nav-brand';
    brand.href = prefix;
    const brandName = document.createElement('span');
    brandName.className = 'site-nav-brand-name';
    brandName.textContent = 'Vibecoding Academy';
    const brandSub = document.createElement('span');
    brandSub.className = 'site-nav-brand-subtitle';
    brandSub.textContent = 'mit Niklas Fauteck';
    brand.appendChild(brandName);
    brand.appendChild(brandSub);

    const linksDiv = document.createElement('div');
    linksDiv.className = 'site-nav-links';
    linksDiv.appendChild(buildLinkGroup('desktop'));

    const hamburger = document.createElement('button');
    hamburger.className = 'site-nav-hamburger';
    hamburger.setAttribute('aria-label', 'Menü');
    hamburger.setAttribute('aria-expanded', 'false');
    for (let i = 0; i < 3; i++) hamburger.appendChild(document.createElement('span'));

    const dropdown = document.createElement('div');
    dropdown.className = 'site-nav-dropdown';
    dropdown.appendChild(buildLinkGroup('dropdown'));

    const inner = document.createElement('div');
    inner.className = 'site-nav-inner';
    inner.appendChild(brand);
    inner.appendChild(linksDiv);
    inner.appendChild(hamburger);
    inner.appendChild(dropdown);
    navEl.appendChild(inner);

    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      dropdown.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', hamburger.classList.contains('open'));
    });
  }

  /* ── Static Hamburger Buttons (data-toggle="hamburger") ── */
  document.querySelectorAll('[data-toggle="hamburger"]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.classList.toggle('open');
      btn.nextElementSibling.classList.toggle('open');
      btn.setAttribute('aria-expanded', btn.classList.contains('open'));
    });
  });

  /* ── Render Footer ────────────────────────────── */
  const footerEl = document.getElementById('site-footer');
  if (footerEl) {
    footerEl.className = 'footer';
    footerEl.style.marginBottom = '1.5rem';

    const contactLink = document.createElement('a');
    contactLink.className = 'footer-contact-link';
    contactLink.href = prefix + 'kontakt/';
    contactLink.textContent = 'Kontakt';

    const impLink = document.createElement('a');
    impLink.href = prefix + 'impressum.html';
    impLink.textContent = 'Impressum';

    const sep1 = document.createElement('span');
    sep1.className = 'footer-sep';
    sep1.textContent = '·';

    const dsgvoLink = document.createElement('a');
    dsgvoLink.href = prefix + 'datenschutz.html';
    dsgvoLink.textContent = 'Datenschutz';

    const sep2 = document.createElement('span');
    sep2.className = 'footer-sep';
    sep2.textContent = '·';

    const agbLink = document.createElement('a');
    agbLink.href = prefix + 'agb.html';
    agbLink.textContent = 'AGB';

    footerEl.appendChild(contactLink);
    footerEl.appendChild(impLink);
    footerEl.appendChild(sep1);
    footerEl.appendChild(dsgvoLink);
    footerEl.appendChild(sep2);
    footerEl.appendChild(agbLink);
  }
})();
