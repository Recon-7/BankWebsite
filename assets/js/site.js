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
            <li><a href="drinks.html" class="${current === 'drinks' ? 'active' : ''}" ${current === 'drinks' ? 'aria-current="page"' : ''}>Drinks</a></li>
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
        <!-- Newsletter Signup -->
        <div class="footer-newsletter">
          <h3>Stay in the Loop</h3>
          <p>Get exclusive offers, event invites, and news straight to your inbox.</p>
          <form class="newsletter-form" id="newsletter-form">
            <input type="email" name="email" placeholder="Enter your email" required class="newsletter-input" aria-label="Email address">
            <button type="submit" class="newsletter-btn">Subscribe</button>
          </form>
          <p class="newsletter-status" id="newsletter-status" aria-live="polite"></p>
        </div>

        <div class="footer-divider"></div>

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

        <!-- Live Open/Closed Status -->
        <div class="open-status" id="open-status"></div>

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

  const renderDeliveryTab = (options) => options.map(opt => `
    <div class="delivery-option">
      <div class="delivery-option-header">
        <h3 class="delivery-option-name">${escapeHtml(opt.name)}</h3>
        ${opt.note ? `<span class="delivery-option-badge">${escapeHtml(opt.note)}</span>` : ''}
      </div>
      <p class="delivery-option-desc">${escapeHtml(opt.description)}</p>
      <a class="btn btn-primary mt-08" href="${escapeHtml(opt.url)}" target="_blank" rel="noopener noreferrer">Order on ${escapeHtml(opt.name)}</a>
    </div>
  `).join('');

  const renderMenuColumn = (col) => {
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
        ${tab.type === 'delivery' && tab.options?.length
          ? `<div class="delivery-order-section">
              <h3 class="delivery-order-heading">Order for Delivery</h3>
              <div class="delivery-options">${renderDeliveryTab(tab.options)}</div>
            </div>`
          : ''}
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
  
  el.innerHTML = siteData.cocktails.map((c) => {
    const nameLower = c.name.toLowerCase();
    const img = nameLower.includes('espresso martini')
      ? 'assets/images/drinks/espresso-martini.png'
      : nameLower.includes('pornstar')
        ? 'assets/images/drinks/pornstar-martini.png'
        : 'assets/images/drinks/cocktails.jpg';
    return `
    <div class="cocktail-card${c.happyHour ? ' happy-hour' : ''}">
      <div class="cocktail-card-image">
        <img src="${img}" alt="${escapeHtml(c.name)}" loading="lazy">
      </div>
      <div class="cocktail-card-content">
        <div class="cocktail-name">
          ${escapeHtml(c.name)}
          ${c.happyHour ? '<span class="happy-hour-badge" title="Happy Hour Cocktail">🍸</span>' : ''}
        </div>
        <div class="cocktail-desc">${escapeHtml(c.desc)}</div>
        <div class="cocktail-price">${escapeHtml(c.price)}</div>
      </div>
    </div>
  `;
  }).join('');
};

const renderHappyHour = (siteData) => {
  const timesEl = document.getElementById('happy-hour-times');
  const priceEl = document.getElementById('happy-hour-price');
  if (!timesEl || !priceEl) return;

  const { happyHour } = siteData;
  if (happyHour) {
    timesEl.textContent = happyHour.times || 'Check with staff for times';
    priceEl.textContent = happyHour.price || '';
  }
};

const renderHours = (siteData) => {
  const el = document.getElementById('hours-grid');
  if (!el) return;

  const dayOrder = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5,
    Sunday: 6
  };

  el.innerHTML = [...siteData.openingHours]
  .sort((a, b) => (dayOrder[a.day] ?? 999) - (dayOrder[b.day] ?? 999))
  .map((h) => `
    <div class="hours-row">
      <span>${escapeHtml(h.day)}</span>
      <span class="${h.closed ? 'closed' : 'time'}">${escapeHtml(h.time)}</span>
    </div>
  `).join('');
};

const parseTimeLabelTo24Hour = (label) => {
  const match = (label || '').trim().toLowerCase().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/);
  if (!match) return null;

  let hour = Number(match[1]);
  const minute = Number(match[2] || 0);
  const meridiem = match[3];

  if (meridiem === 'pm' && hour !== 12) hour += 12;
  if (meridiem === 'am' && hour === 12) hour = 0;

  return hour + minute / 60;
};

const format12Hour = (time24) => {
  const hour24 = Math.floor(time24);
  const minutes = Math.round((time24 % 1) * 60);
  const suffix = hour24 >= 12 ? 'pm' : 'am';
  const hour12 = hour24 % 12 || 12;
  return `${hour12}${minutes ? `:${String(minutes).padStart(2, '0')}` : ''}${suffix}`;
};

const buildHoursMap = (openingHours = []) => {
  const dayIndexMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6
  };

  return openingHours.reduce((map, row) => {
    const dayIndex = dayIndexMap[row.day];
    if (dayIndex === undefined) return map;

    if (row.closed || !row.time || row.time.toLowerCase() === 'closed') {
      map[dayIndex] = null;
      return map;
    }

    const normalizedTime = row.time.replace(/approx\.?/gi, '').trim();
    const parts = normalizedTime.split(/\s*[–-]\s*/);
    if (parts.length !== 2) {
      map[dayIndex] = null;
      return map;
    }

    const open = parseTimeLabelTo24Hour(parts[0]);
    const close = parseTimeLabelTo24Hour(parts[1]);
    if (open === null || close === null) {
      map[dayIndex] = null;
      return map;
    }

    map[dayIndex] = { open, close };
    return map;
  }, {});
};

// Drinks page tabs and rendering
const DRINKS_TABS = [
  { id: 'cocktails', label: 'Cocktails' },
  { id: 'white', label: 'White Wines' },
  { id: 'red', label: 'Red Wines' },
  { id: 'rose', label: 'Rosé' },
  { id: 'sparkling', label: 'Fizz & Champagne' },
  { id: 'hot', label: 'Hot Drinks' }
];

const renderDrinksTabs = () => {
  const tabsEl = document.getElementById('drinks-tabs');
  if (!tabsEl) return;

  tabsEl.innerHTML = DRINKS_TABS.map((tab, i) => {
    const selected = i === 0;
    return `<button class="menu-tab${selected ? ' active' : ''}" id="tab-${tab.id}" role="tab" aria-selected="${selected}" aria-controls="panel-${tab.id}" tabindex="${selected ? '0' : '-1'}" data-panel="${tab.id}" type="button">${escapeHtml(tab.label)}</button>`;
  }).join('');
};

const renderWineCard = (wine) => {
  const prices = [];
  if (wine.glass125ml) prices.push(`125ml: ${wine.glass125ml}`);
  if (wine.glass175ml) prices.push(`175ml: ${wine.glass175ml}`);
  if (wine.glass250ml) prices.push(`250ml: ${wine.glass250ml}`);
  if (wine.bottle) prices.push(`Bottle: ${wine.bottle}`);

  return `
    <div class="wine-card">
      <div class="wine-header">
        <div class="wine-name">${escapeHtml(wine.name)}</div>
        <div class="wine-origin">${escapeHtml(wine.origin)}</div>
      </div>
      <div class="wine-prices">${prices.join(' · ')}</div>
    </div>
  `;
};

const renderWines = (siteData) => {
  if (!siteData.wines || siteData.wines.length === 0) return;

  const winesByType = {
    White: [],
    Red: [],
    'Rosé': [],
    Sparkling: [],
    Champagne: []
  };

  siteData.wines.forEach(wine => {
    const type = wine.type || 'White';
    if (winesByType[type]) {
      winesByType[type].push(wine);
    }
  });

  // White wines
  const whiteGrid = document.getElementById('wines-white-grid');
  if (whiteGrid) {
    whiteGrid.innerHTML = winesByType.White.map(renderWineCard).join('') || '<p>No white wines available</p>';
  }

  // Red wines
  const redGrid = document.getElementById('wines-red-grid');
  if (redGrid) {
    redGrid.innerHTML = winesByType.Red.map(renderWineCard).join('') || '<p>No red wines available</p>';
  }

  // Rosé wines
  const roseGrid = document.getElementById('wines-rose-grid');
  if (roseGrid) {
    roseGrid.innerHTML = winesByType['Rosé'].map(renderWineCard).join('') || '<p>No rosé wines available</p>';
  }

  // Sparkling & Champagne
  const sparklingGrid = document.getElementById('wines-sparkling-grid');
  if (sparklingGrid) {
    const sparkling = [...winesByType.Sparkling, ...winesByType.Champagne];
    sparklingGrid.innerHTML = sparkling.map(renderWineCard).join('') || '<p>No sparkling wines available</p>';
  }
};

const renderHotDrinks = (siteData) => {
  const el = document.getElementById('hot-drinks-grid');
  if (!el || !siteData.hotBeverages) return;

  el.innerHTML = siteData.hotBeverages.map(drink => `
    <div class="wine-card">
      <div class="wine-header">
        <div class="wine-name">${escapeHtml(drink.name)}</div>
        <div class="wine-origin">${escapeHtml(drink.price)}</div>
      </div>
      ${drink.description ? `<div class="wine-prices">${escapeHtml(drink.description)}</div>` : ''}
    </div>
  `).join('');
};

const initDrinksTabs = () => {
  const tabsEl = document.getElementById('drinks-tabs');
  const panelsEl = document.getElementById('drinks-panels');
  if (!tabsEl || !panelsEl) return;

  const tabs = [...tabsEl.querySelectorAll('.menu-tab')];
  const panels = [...panelsEl.querySelectorAll('.drinks-panel')];

  const setActiveTab = (tab, moveFocus = false) => {
    if (!tab) return;
    const panelId = `panel-${tab.dataset.panel}`;

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
    });
  });
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

// Fetch with retry logic
const fetchWithRetry = async (url, retries = 2, delay = 1000) => {
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
      if (response.status >= 500 && i < retries) {
        await new Promise(r => setTimeout(r, delay * (i + 1)));
        continue;
      }
      throw new Error(`HTTP ${response.status}`);
    } catch (err) {
      if (i === retries) throw err;
      await new Promise(r => setTimeout(r, delay * (i + 1)));
    }
  }
};

// Show loading state
const setLoadingState = (loading) => {
  const containers = ['#cocktails-grid', '#menu-panels', '#hours-grid'];
  containers.forEach(selector => {
    const el = document.querySelector(selector);
    if (el && loading && !el.innerHTML.includes('menu-item')) {
      el.innerHTML = '<div class="loading-state">Loading...</div>';
    }
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
  initNewsletterForm();
  initParallax();
  initFloatingButton();

  setLoadingState(true);

  try {
    // Attempt to fetch from the API with retry, fallback to local data
    let response;
    try {
      response = await fetchWithRetry('/api/menu');
    } catch {
      console.warn('API unavailable, using local data');
      response = await fetch('./data/site-data.json');
    }

    if (!response.ok) throw new Error('Could not load data');
    const siteData = await response.json();
    
    renderMenus(siteData);
    renderCocktails(siteData);
    renderHappyHour(siteData);
    renderHours(siteData);
    renderReviews(siteData);
    initOpenStatus(siteData);
    
    // Drinks page
    renderDrinksTabs();
    renderWines(siteData);
    renderHotDrinks(siteData);
    initDrinksTabs();
  } catch (error) {
    console.error('Error loading menu data:', error);
    // Show error state
    const cocktailsGrid = document.getElementById('cocktails-grid');
    if (cocktailsGrid) {
      cocktailsGrid.innerHTML = '<p class="error-state">Unable to load cocktails. Please refresh or try again later.</p>';
    }
  }
};

// Reviews
const renderReviews = (siteData) => {
  const grid = document.getElementById('reviews-grid');
  const summary = document.getElementById('reviews-summary');
  if (!grid) return;

  const reviews = siteData.reviews || [];
  if (!reviews.length) return;

  const stars = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

  const sourceIcon = (source) => {
    const s = (source || '').toLowerCase();
    if (s.includes('google')) return '<span class="review-source-badge review-source-google">Google</span>';
    if (s.includes('tripadvisor')) return '<span class="review-source-badge review-source-tripadvisor">TripAdvisor</span>';
    if (s.includes('facebook')) return '<span class="review-source-badge review-source-facebook">Facebook</span>';
    return `<span class="review-source-badge">${escapeHtml(source)}</span>`;
  };

  grid.innerHTML = reviews.map(r => `
    <div class="review-card">
      <div class="review-stars" aria-label="${r.rating} out of 5 stars">${stars(r.rating)}</div>
      <blockquote class="review-quote">"${escapeHtml(r.quote)}"</blockquote>
      <div class="review-footer">
        <span class="review-author">— ${escapeHtml(r.author)}</span>
        ${sourceIcon(r.source)}
      </div>
    </div>
  `).join('');

  // Overall rating summary
  if (summary && reviews.length) {
    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    const rounded = Math.round(avg * 10) / 10;
    summary.innerHTML = `
      <div class="reviews-overall">
        <span class="reviews-overall-score">${rounded}</span>
        <div>
          <div class="reviews-overall-stars" aria-label="${rounded} out of 5">${stars(Math.round(avg))}</div>
          <span class="reviews-overall-count">Based on ${reviews.length} review${reviews.length !== 1 ? 's' : ''}</span>
        </div>
      </div>
    `;
  }
};

// Newsletter Form
const initNewsletterForm = () => {
  const form = document.getElementById('newsletter-form');
  const status = document.getElementById('newsletter-status');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[name="email"]').value;
    
    // Simulate subscription (would connect to email service in production)
    if (status) {
      status.textContent = 'Thanks for subscribing! We\'ll be in touch.';
      status.classList.add('success');
      form.reset();
      
      setTimeout(() => {
        status.textContent = '';
        status.classList.remove('success');
      }, 4000);
    }
  });
};

// Open/Closed Status
const initOpenStatus = (siteData) => {
  const statusEl = document.getElementById('open-status');
  if (!statusEl) return;
  const hours = buildHoursMap(siteData?.openingHours || []);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const updateStatus = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours() + now.getMinutes() / 60;
    const todayHours = hours[day];

    let isOpen = false;
    let message = '';

    if (todayHours && hour >= todayHours.open && hour < todayHours.close) {
      isOpen = true;
      message = `Open now · Closes around ${format12Hour(todayHours.close)}`;
    } else {
      // Find next opening
      let nextDay = day;
      for (let i = 1; i <= 7; i++) {
        nextDay = (day + i) % 7;
        if (hours[nextDay]) {
          message = `Closed · Opens ${i === 1 ? 'tomorrow' : days[nextDay]} at ${format12Hour(hours[nextDay].open)}`;
          break;
        }
      }
    }

    statusEl.innerHTML = `<span class="status-dot ${isOpen ? 'open' : 'closed'}"></span>${message}`;
  };

  updateStatus();
  setInterval(updateStatus, 60000); // Update every minute
};

// Parallax Effect (disabled)
const initParallax = () => {
  // Zoom effect disabled per preference
  return;
};

// Floating Book Button
const initFloatingButton = () => {
  const btn = document.querySelector('.floating-book-btn');
  if (!btn) return;

  let lastScroll = 0;
  const threshold = 300;

  const handleScroll = () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > threshold) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
    
    lastScroll = currentScroll;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
};

// Scroll Reveal Animation
const initScrollReveal = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-stagger');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
};

// Scroll to Top Button
const initScrollToTop = () => {
  // Create button if not exists
  if (document.querySelector('.scroll-to-top')) return;
  
  const btn = document.createElement('button');
  btn.className = 'scroll-to-top';
  btn.setAttribute('aria-label', 'Scroll to top');
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
  document.body.appendChild(btn);

  const handleScroll = () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  };

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', handleScroll, { passive: true });
};

// Auto-add reveal classes to common sections
const autoAddRevealClasses = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Add reveal to sections
  document.querySelectorAll('section > .container, .hero-tagline, .featured-cocktail, .footer-newsletter').forEach(el => {
    if (!el.classList.contains('reveal') && !el.classList.contains('reveal-left') && !el.classList.contains('reveal-right')) {
      el.classList.add('reveal');
    }
  });

  // Add stagger to grids
  document.querySelectorAll('.gallery-grid, .wines-grid').forEach(el => {
    if (!el.classList.contains('reveal-stagger')) {
      el.classList.add('reveal-stagger');
    }
  });
};

// Initialize all visual enhancements
const initVisualEnhancements = () => {
  autoAddRevealClasses();
  initScrollReveal();
  initScrollToTop();
};

// Call after DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVisualEnhancements);
} else {
  initVisualEnhancements();
}

init();
