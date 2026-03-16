const DOJO_BOOKING_URL = 'https://web.dojo.app/create_booking/vendor/0XYLokEoeff77KUU00p7ex68kXi4SF8dCobxdAlAkQ0_restaurant';

const LOGO_SVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="90" height="20" viewBox="0 0 177.778 40" aria-label="The Bank logo" class="brand-logo">
    <g data-name="Group 2723">
      <rect width="177.778" height="40" fill="none"/>
      <g>
        <path d="M7.56,87.574h5.052v-18.4h7.56V65.263H0v3.913H7.56Z"/>
        <path d="M39.116,87.574V65.263H34.065v9.032H23.428V65.263H18.376V87.574h5.052V78.008H34.065v9.567Z"/>
        <path d="M52.672,69.176V65.263H38.757V87.575H52.873V83.661H43.807V77.973h8.5V74.06h-8.5V69.176Z"/>
        <path d="M74.075,75.3a4.526,4.526,0,0,0,2.643-4.282,4.869,4.869,0,0,0-2.174-4.249,10.666,10.666,0,0,0-6.122-1.5H61.063V87.575h9.7a8.829,8.829,0,0,0,5.755-1.655,5.831,5.831,0,0,0,2.007-4.767q0-4.481-4.449-5.854m-7.962-6.456h1.975a4.35,4.35,0,0,1,2.643.719,2.31,2.31,0,0,1,.97,1.956,2.627,2.627,0,0,1-.938,2.124,3.769,3.769,0,0,1-2.508.787H66.114ZM69.693,84H66.114V77.973h3.312q3.946,0,3.947,2.978,0,3.044-3.68,3.044"/>
        <path d="M99.976,87.575l-9.5-22.312h-5.65L76.26,87.575h5.017l1.71-4.549H92.7l1.9,4.549ZM84.251,79.546,87.51,70.59l3.74,8.956Z"/>
        <path d="M97.291,65.263V87.575h5.051V73.523l11.727,14.052h4.564V65.263h-5.052V79.212l-11.64-13.949Z"/>
      </g>
    </g>
  </svg>
`;

const escapeHtml = (str = '') => str
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const injectLayout = () => {
  const nav = document.getElementById('app-nav');
  const footer = document.getElementById('app-footer');
  const current = document.body.dataset.page || 'home';

  if (nav) {
    nav.setAttribute('aria-label', 'Primary navigation');
    nav.innerHTML = `
      <div class="site-nav-inner container">
        <a class="brand" href="index.html" aria-label="The Bank home">
          <span class="brand-word">The Bank</span>
          ${LOGO_SVG}
        </a>
        <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="nav-primary" aria-label="Toggle navigation">
          <span class="nav-toggle-lines" aria-hidden="true"></span>
        </button>
        <div id="nav-primary" class="nav-primary">
          <ul class="nav-links">
            <li><a href="index.html" class="${current === 'home' ? 'active' : ''}" ${current === 'home' ? 'aria-current="page"' : ''}>Home</a></li>
            <li><a href="menus.html" class="${current === 'menus' ? 'active' : ''}" ${current === 'menus' ? 'aria-current="page"' : ''}>Menus</a></li>
            <li><a href="cocktails.html" class="${current === 'cocktails' ? 'active' : ''}" ${current === 'cocktails' ? 'aria-current="page"' : ''}>Cocktails</a></li>
            <li><a href="private-hire.html" class="${current === 'private-hire' ? 'active' : ''}" ${current === 'private-hire' ? 'aria-current="page"' : ''}>Private Hire</a></li>
            <li><a href="visit.html" class="${current === 'visit' ? 'active' : ''}" ${current === 'visit' ? 'aria-current="page"' : ''}>Visit</a></li>
          </ul>
          <a class="nav-cta" href="${DOJO_BOOKING_URL}" target="_blank" rel="noopener noreferrer" aria-label="Reserve with Dojo (opens in a new tab)">Reserve</a>
        </div>
      </div>
    `;
  }

  if (footer) {
    footer.setAttribute('role', 'contentinfo');
    footer.setAttribute('aria-label', 'Site footer');
    footer.innerHTML = `
      <div class="container">
        <p>© 2026 The Bank Bar. All rights reserved.</p>
        <p>516 Durham Road, Low Fell, Gateshead, NE9 6HU · 0191 487 9038 · info@thebanklowfell.co.uk</p>
      </div>
    `;
  }
};

const initMobileNav = () => {
  const nav = document.querySelector('.site-nav');
  const toggle = nav?.querySelector('.nav-toggle');
  const links = nav?.querySelectorAll('.nav-links a, .nav-cta');
  if (!nav || !toggle) return;

  const setOpen = (open) => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };

  toggle.addEventListener('click', () => {
    setOpen(!nav.classList.contains('open'));
  });

  links?.forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
};

const initStickyNav = () => {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 24);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
};

const initReveal = () => {
  const nodes = [...document.querySelectorAll('.reveal')];
  if (!nodes.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    nodes.forEach((node) => node.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  nodes.forEach((node) => observer.observe(node));
};

const initAccessibility = () => {
  const main = document.querySelector('main');
  if (main && !main.id) {
    main.id = 'main-content';
  }

  if (!document.querySelector('.skip-link') && main) {
    const skip = document.createElement('a');
    skip.className = 'skip-link';
    skip.href = '#main-content';
    skip.textContent = 'Skip to main content';
    document.body.prepend(skip);
  }
};

const renderMenus = (siteData) => {
  const tabsEl = document.getElementById('menu-tabs');
  const panelsEl = document.getElementById('menu-panels');
  if (!tabsEl || !panelsEl) return;

  const renderMenuItem = (item) => `
    <div class="menu-item">
      <div>
        <div class="menu-item-name">${escapeHtml(item.name)}</div>
        <div class="menu-item-desc">${escapeHtml(item.desc || '')}</div>
      </div>
      <div class="menu-item-price">${escapeHtml(item.price || '')}</div>
    </div>
  `;

  const renderDelivery = (delivery) => `
    <div class="menu-section-title">${escapeHtml(delivery.title)}</div>
    <p class="section-copy max-w-none">${escapeHtml(delivery.intro)}</p>
    ${delivery.links.map((l) => `<a class="btn btn-ghost mt-05" target="_blank" rel="noopener noreferrer" href="${escapeHtml(l.url)}">${escapeHtml(l.label)}</a>`).join('')}
    <p class="menu-note">${escapeHtml(delivery.note)}</p>
  `;

  const renderMenuColumn = (col) => {
    if (col.delivery) {
      return `<div class="menu-section">${renderDelivery(col.delivery)}</div>`;
    }

    return `
      <div class="menu-section">
        ${col.sections.map((section, sectionIndex) => `
          <div class="menu-section-title${sectionIndex > 0 ? ' mt-12' : ''}">${escapeHtml(section.title)}</div>
          ${section.items.map(renderMenuItem).join('')}
        `).join('')}
      </div>
    `;
  };

  tabsEl.setAttribute('role', 'tablist');
  tabsEl.setAttribute('aria-label', 'Menu categories');
  tabsEl.setAttribute('aria-orientation', 'horizontal');

  tabsEl.innerHTML = siteData.menuTabs
    .map((tab, i) => {
      const tabId = `tab-${tab.id}`;
      const panelId = `panel-${tab.id}`;
      const selected = i === 0;
      return `<button class="menu-tab${selected ? ' active' : ''}" id="${tabId}" role="tab" aria-selected="${selected}" aria-controls="${panelId}" tabindex="${selected ? '0' : '-1'}" data-panel="${tab.id}" type="button">${escapeHtml(tab.label)}</button>`;
    })
    .join('');

  panelsEl.innerHTML = siteData.menuTabs
    .map((tab, i) => {
      const tabId = `tab-${tab.id}`;
      const panelId = `panel-${tab.id}`;
      const active = i === 0;
      return `
      <div id="${panelId}" class="menu-panel${active ? ' active' : ''}" role="tabpanel" aria-labelledby="${tabId}" ${active ? '' : 'hidden'}>
        <div class="menu-cols">${tab.columns.map(renderMenuColumn).join('')}</div>
        ${tab.note ? `<p class="menu-note">${escapeHtml(tab.note)}</p>` : ''}
      </div>
    `;
    })
    .join('');

  const tabs = [...tabsEl.querySelectorAll('.menu-tab')];
  const panels = [...panelsEl.querySelectorAll('.menu-panel')];

  const setActiveTab = (tab, moveFocus = false) => {
    if (!tab) return;
    const panelSuffix = tab.dataset.panel;
    const panelId = `panel-${panelSuffix}`;

    tabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-selected', String(isActive));
      item.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      const isActive = panel.id === panelId;
      panel.classList.toggle('active', isActive);
      panel.hidden = !isActive;
    });

    if (moveFocus) tab.focus();
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => setActiveTab(tab));
    tab.addEventListener('keydown', (event) => {
      const index = tabs.indexOf(tab);
      let targetIndex = -1;

      if (event.key === 'ArrowRight') targetIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') targetIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') targetIndex = 0;
      if (event.key === 'End') targetIndex = tabs.length - 1;

      if (targetIndex >= 0) {
        event.preventDefault();
        setActiveTab(tabs[targetIndex], true);
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setActiveTab(tab);
      }
    });
  });
};

const renderCocktails = (siteData) => {
  const el = document.getElementById('cocktails-grid');
  if (!el) return;
  el.innerHTML = siteData.cocktails.map((c) => `
    <div class="cocktail-card">
      <div class="cocktail-name">${escapeHtml(c.name)}</div>
      <div class="cocktail-desc">${escapeHtml(c.desc)}</div>
      <div class="cocktail-price">${escapeHtml(c.price)}</div>
    </div>
  `).join('');
};

const renderHours = (siteData) => {
  const el = document.getElementById('hours-grid');
  if (!el) return;
  el.innerHTML = siteData.openingHours.map((h) => `
    <div class="hours-row">
      <span>${escapeHtml(h.day)}</span>
      <span class="${h.closed ? 'closed' : 'time'}">${escapeHtml(h.time)}</span>
    </div>
  `).join('');
};

const wireDojoLinks = () => {
  document.querySelectorAll('[data-dojo-link="true"]').forEach((link) => {
    if (link instanceof HTMLAnchorElement) {
      link.href = DOJO_BOOKING_URL;
    }
  });
};

const wirePrivateHireForm = () => {
  const form = document.getElementById('private-hire-form');
  if (!form) return;
  const status = document.getElementById('private-hire-status');

  if (status) {
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const eventDate = String(formData.get('eventDate') || '').trim();
    const guestCount = String(formData.get('guestCount') || '').trim();
    const details = String(formData.get('details') || '').trim();

    const subject = `Private Hire Enquiry - ${name || 'The Bank Website'}`;
    const body = [
      'Private Hire Enquiry',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Event Date: ${eventDate}`,
      `Number of Guests: ${guestCount}`,
      '',
      'Details:',
      details
    ].join('\n');

    window.location.href = `mailto:info@thebanklowfell.co.uk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (status) status.textContent = 'Your email app should open now.';
  });
};

const init = async () => {
  injectLayout();
  initAccessibility();
  initMobileNav();
  initStickyNav();
  initReveal();
  wireDojoLinks();
  wirePrivateHireForm();

  try {
    const response = await fetch('./data/site-data.json');
    if (!response.ok) throw new Error('Could not load data');
    const siteData = await response.json();
    renderMenus(siteData);
    renderCocktails(siteData);
    renderHours(siteData);
  } catch (error) {
    console.error(error);
  }
};

init();
