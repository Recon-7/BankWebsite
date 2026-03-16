const escapeHtml = (str = '') => str
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const renderMenuItem = (item) => `
  <div class="menu-item">
    <div>
      <div class="menu-item-name">${escapeHtml(item.name)}</div>
      <div class="menu-item-desc">${escapeHtml(item.desc || '')}</div>
    </div>
    <div class="menu-item-price">${escapeHtml(item.price || '')}</div>
  </div>
`;

const renderDeliveryColumn = (delivery) => {
  const linksHtml = delivery.links.map((link, idx) => `
    <a href="${escapeHtml(link.url)}" class="btn-ghost" style="display:inline-block;${idx === 0 ? 'margin-bottom:0.8rem;' : 'margin-top:0.5rem;'}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a>${idx === 0 ? '<br>' : ''}
  `).join('');

  return `
    <div class="menu-section">
      <div class="menu-section-title">${escapeHtml(delivery.title)}</div>
      <p style="font-family:var(--serif);font-size:1rem;color:var(--cream-dim);line-height:1.8;margin-bottom:1.5rem;">${escapeHtml(delivery.intro)}</p>
      ${linksHtml}
      <p style="font-family:var(--sans);font-size:0.7rem;color:var(--cream-dim);margin-top:1.5rem;line-height:1.6;font-weight:300;">${escapeHtml(delivery.note)}</p>
    </div>
  `;
};

const renderMenuColumn = (col) => {
  if (col.delivery) {
    return renderDeliveryColumn(col.delivery);
  }

  return `
    <div class="menu-section">
      ${col.sections.map((section, sectionIndex) => `
        <div class="menu-section-title"${sectionIndex > 0 ? ' style="margin-top:1.8rem;"' : ''}>${escapeHtml(section.title)}</div>
        ${section.items.map(renderMenuItem).join('')}
      `).join('')}
    </div>
  `;
};

const renderMenus = (siteData) => {
  const tabsEl = document.getElementById('menu-tabs');
  const panelsEl = document.getElementById('menu-panels');

  tabsEl.innerHTML = siteData.menuTabs
    .map((tab, i) => `<button class="menu-tab${i === 0 ? ' active' : ''}" data-panel="${tab.id}" type="button">${escapeHtml(tab.label)}</button>`)
    .join('');

  panelsEl.innerHTML = siteData.menuTabs
    .map((tab, i) => `
      <div id="${tab.id}" class="menu-panel${i === 0 ? ' active' : ''}">
        <div class="menu-cols">
          ${tab.columns.map(renderMenuColumn).join('')}
        </div>
        ${tab.note ? `<p class="menu-note">${escapeHtml(tab.note)}</p>` : ''}
      </div>
    `).join('');

  tabsEl.querySelectorAll('.menu-tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      const panelId = btn.dataset.panel;
      tabsEl.querySelectorAll('.menu-tab').forEach((tabBtn) => tabBtn.classList.remove('active'));
      panelsEl.querySelectorAll('.menu-panel').forEach((panel) => panel.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(panelId).classList.add('active');
    });
  });
};

const renderCocktails = (siteData) => {
  const cocktailsEl = document.getElementById('cocktails-grid');
  cocktailsEl.innerHTML = siteData.cocktails.map((cocktail) => `
    <div class="cocktail-card">
      <div class="cocktail-name">${escapeHtml(cocktail.name)}</div>
      <div class="cocktail-desc">${escapeHtml(cocktail.desc)}</div>
      <div class="cocktail-price">${escapeHtml(cocktail.price)}</div>
    </div>
  `).join('');
};

const renderOpeningHours = (siteData) => {
  const hoursEl = document.getElementById('hours-grid');
  hoursEl.innerHTML = siteData.openingHours.map((row) => `
    <div class="hours-row">
      <span class="day">${escapeHtml(row.day)}</span>
      <span class="${row.closed ? 'closed' : 'time'}">${escapeHtml(row.time)}</span>
    </div>
  `).join('');
};

const wirePrivateHireForm = () => {
  const privateHireForm = document.getElementById('private-hire-form');
  const privateHireStatus = document.getElementById('private-hire-status');

  privateHireForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(privateHireForm);
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
      'Event Details:',
      details
    ].join('\n');

    const mailto = `mailto:info@thebanklowfell.co.uk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

    if (privateHireStatus) {
      privateHireStatus.textContent = 'Your email app should now be open. If not, email info@thebanklowfell.co.uk directly.';
    }
  });
};

const wireScrollNav = () => {
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
};

const wireRevealAnimations = () => {
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach((el) => obs.observe(el));
};

const init = async () => {
  try {
    const response = await fetch('./data/site-data.json');
    if (!response.ok) {
      throw new Error('Failed to load site data');
    }

    const siteData = await response.json();
    renderMenus(siteData);
    renderCocktails(siteData);
    renderOpeningHours(siteData);
  } catch (error) {
    console.error(error);
  }

  wirePrivateHireForm();
  wireScrollNav();
  wireRevealAnimations();
};

init();
