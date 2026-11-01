/** İletişim formu (demo) ve iletişim/konum bilgilerinin config'den doldurulması */
import { $, $$, escapeHtml } from './utils.js';
import { rules, check } from './validate.js';
import { SITE, mapLinks } from '../config/site.js';
import { toast } from './toast.js';

export function initContact() {
  const form = $('#contact-form');
  if (form) {
    const v = {
      'c-name': rules.name,
      'c-email': rules.email,
      'c-topic': rules.required('Bir konu seçin.'),
      'c-message': (x) => (x.trim().length >= 10 ? '' : 'Mesajınız en az 10 karakter olmalı.'),
    };
    Object.entries(v).forEach(([id, fn]) => $(`#${id}`).addEventListener('blur', (e) => e.target.value && check(e.target, fn)));
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let bad = null;
      Object.entries(v).forEach(([id, fn]) => { const el = $(`#${id}`); if (!check(el, fn) && !bad) bad = el; });
      if (bad) { bad.focus(); return; }
      const name = $('#c-name').value.trim().split(' ')[0];
      $('#contact-success').hidden = false;
      $('#contact-success p').textContent = `Teşekkürler ${name}! Mesajınız demo olarak alındı. İletişim altyapısı bağlandığında mesajlar ekibimize ulaşacak.`;
      form.reset();
      toast('Mesajınız alındı (demo).', 'ok');
    });
  }
  fillContactInfo();
}

/** null olan alanlar "yakında" olarak gösterilir */
export function fillContactInfo() {
  const { contact, location, hours, social } = SITE;
  const soon = '<span class="soon">Yakında paylaşılacak</span>';
  const copyBtn = (val) => `<button type="button" class="link-btn" data-copy="${escapeHtml(val)}">Kopyala</button>`;

  $$('[data-info="phone"]').forEach((el) => { el.innerHTML = contact.phone ? `<span class="selectable">${escapeHtml(contact.phone)}</span> ${copyBtn(contact.phone)}` : soon; });
  $$('[data-info="email"]').forEach((el) => { el.innerHTML = contact.email ? `<span class="selectable">${escapeHtml(contact.email)}</span> ${copyBtn(contact.email)}` : soon; });
  $$('[data-info="hours"]').forEach((el) => { el.innerHTML = hours ? escapeHtml(hours) : soon; });
  $$('[data-info="region"]').forEach((el) => { el.textContent = location.region; });
  $$('[data-info="address"]').forEach((el) => { el.innerHTML = location.address ? escapeHtml(location.address) : '<span class="soon">Kesin adres belirlendiğinde eklenecek</span>'; });

  const links = mapLinks();
  $$('[data-map="view"]').forEach((a) => { a.href = links.view; });
  $$('[data-map="directions"]').forEach((a) => { a.href = links.directions; });
  $$('[data-map-note]').forEach((el) => { el.hidden = links.isExact; });

  $$('[data-social-list]').forEach((ul) => {
    ul.innerHTML = social.map((s) => s.url
      ? `<li><a class="social" href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label}">${icon(s.id)}</a></li>`
      : `<li><span class="social is-soon" title="${s.label} hesabı yakında" aria-label="${s.label} hesabı yakında">${icon(s.id)}</span></li>`).join('');
  });

  document.addEventListener('click', async (e) => {
    const b = e.target.closest('[data-copy]');
    if (!b) return;
    try { await navigator.clipboard.writeText(b.dataset.copy); toast('Kopyalandı'); } catch { toast('Kopyalanamadı; metni seçip kopyalayın.'); }
  });
}

function icon(id) {
  const p = {
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.3" fill="currentColor"/>',
    facebook: '<path d="M14 8h3V4h-3c-2.8 0-4 1.8-4 4.3V10H7v4h3v7h4v-7h3l1-4h-4V8.6c0-.4.3-.6.6-.6z" fill="currentColor"/>',
    youtube: '<rect x="2" y="5" width="20" height="14" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M10 9l5 3-5 3z" fill="currentColor"/>',
    tiktok: '<path d="M14 3v11.5a3.5 3.5 0 1 1-3-3.46V8a6.5 6.5 0 1 0 6 6.48V9.3A7 7 0 0 0 21 10.6V7.4A4.4 4.4 0 0 1 17 3z" fill="currentColor"/>',
  }[id] || '';
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${p}</svg>`;
}
