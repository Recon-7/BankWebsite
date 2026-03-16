const DOJO_BOOKING_URL = 'https://web.dojo.app/create_booking/vendor/0XYLokEoeff77KUU00p7ex68kXi4SF8dCobxdAlAkQ0_restaurant';

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
    nav.innerHTML = `
      <div class="site-nav-inner container">
        <a class="brand" href="index.html">The Bank</a>
        <ul class="nav-links">
          <li><a href="index.html" class="${current === 'home' ? 'active' : ''}">Home</a></li>
          <li><a href="menus.html" class="${current === 'menus' ? 'active' : ''}">Menus</a></li>
          <li><a href="cocktails.html" class="${current === 'cocktails' ? 'active' : ''}">Cocktails</a></li>
          <li><a href="private-hire.html" class="${current === 'private-hire' ? 'active' : ''}">Private Hire</a></li>
          <li><a href="visit.html" class="${current === 'visit' ? 'active' : ''}">Visit</a></li>
        </ul>
        <a class="nav-cta" href="${DOJO_BOOKING_URL}" target="_blank" rel="noopener noreferrer">Reserve</a>
      </div>
    `;
  }

  if (footer) {
    footer.innerHTML = `
      <div class="container">
        <p>© 2026 The Bank Restaurant & Bar. All rights reserved.</p>
        <p>516 Durham Road, Low Fell, Gateshead, NE9 6HU · 0191 487 9038 · info@thebanklowfell.co.uk</p>
      </div>
    `;
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
    <p class="section-copy" style="max-width:none;">${escapeHtml(delivery.intro)}</p>
    ${delivery.links.map((l) => `<a class="btn btn-ghost" style="margin-right:.5rem;margin-top:.4rem;" target="_blank" rel="noopener noreferrer" href="${escapeHtml(l.url)}">${escapeHtml(l.label)}</a>`).join('')}
    <p class="menu-note">${escapeHtml(delivery.note)}</p>
  `;

  const renderMenuColumn = (col) => {
    if (col.delivery) {
      return `<div class="menu-section">${renderDelivery(col.delivery)}</div>`;
    }

    return `
      <div class="menu-section">
        ${col.sections.map((section, sectionIndex) => `
          <div class="menu-section-title"${sectionIndex > 0 ? ' style="margin-top:1.2rem;"' : ''}>${escapeHtml(section.title)}</div>
          ${section.items.map(renderMenuItem).join('')}
        `).join('')}
      </div>
    `;
  };

  tabsEl.innerHTML = siteData.menuTabs
    .map((tab, i) => `<button class="menu-tab${i === 0 ? ' active' : ''}" data-panel="${tab.id}" type="button">${escapeHtml(tab.label)}</button>`)
    .join('');

  panelsEl.innerHTML = siteData.menuTabs
    .map((tab, i) => `
      <div id="${tab.id}" class="menu-panel${i === 0 ? ' active' : ''}">
        <div class="menu-cols">${tab.columns.map(renderMenuColumn).join('')}</div>
        ${tab.note ? `<p class="menu-note">${escapeHtml(tab.note)}</p>` : ''}
      </div>
    `)
    .join('');

  tabsEl.querySelectorAll('.menu-tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      const panelId = btn.dataset.panel;
      tabsEl.querySelectorAll('.menu-tab').forEach((t) => t.classList.remove('active'));
      panelsEl.querySelectorAll('.menu-panel').forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById(panelId);
      if (panel) panel.classList.add('active');
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

const wirePrivateHireForm = () => {
  const form = document.getElementById('private-hire-form');
  if (!form) return;
  const status = document.getElementById('private-hire-status');

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
