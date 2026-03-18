const DOJO_BOOKING_URL = 'https://web.dojo.app/create_booking/vendor/0XYLokEoeff77KUU00p7ex68kXi4SF8dCobxdAlAkQ0_restaurant';

const LOGO_IMG = `<img src="assets/images/favicon-32x32.png" alt="" class="brand-logo" width="32" height="32">`;

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
          ${LOGO_IMG}
          <span class="brand-word">The Bank</span>
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
        <div class="footer-social">
          <a href="https://www.facebook.com/TheBankLowFell" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="https://www.instagram.com/thebank_lowfell/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="https://www.tripadvisor.co.uk/Restaurant_Review-g186394-d8090498-Reviews-The_Bank_Restaurant_Bar-Gateshead_Tyne_and_Wear_England.html" target="_blank" rel="noopener noreferrer" aria-label="Tripadvisor">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.432 5.976 5.976 0 0 0 4.075-1.6L12 19.5l1.922-1.886a5.976 5.976 0 0 0 4.075 1.6 5.997 5.997 0 0 0 4.04-10.432L24 6.647h-4.35a13.573 13.573 0 0 0-7.644-2.353zM6.003 17.215a3.997 3.997 0 1 1 0-7.994 3.997 3.997 0 0 1 0 7.994zm5.997-4.806a6.034 6.034 0 0 0-1.19-2.357 10.552 10.552 0 0 1 2.38-.273c.82 0 1.62.097 2.38.273a6.034 6.034 0 0 0-1.19 2.357c-.4-.166-.85-.26-1.38-.26s-.98.094-1.38.26h.38zm5.997 4.806a3.997 3.997 0 1 1 0-7.994 3.997 3.997 0 0 1 0 7.994zm0-5.997a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-11.994 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg>
          </a>
        </div>
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
