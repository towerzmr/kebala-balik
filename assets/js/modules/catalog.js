/**
 * Ürün ızgaraları, filtreler ve detay penceresi.
 * Aynı modül dondurulmuş, atıştırmalık, özel ürün ve hediyelik
 * bölümlerini farklı görünüm varyantlarıyla çizer.
 */
import { $, $$, formatPrice, escapeHtml } from './utils.js';
import { STATUS } from '../data/products.js';
import { pack, gift } from '../art/illustrations.js';
import { openModal, closeModal } from './modal.js';
import { addToCart } from './cart.js';
import { toast } from './toast.js';
import { withPhoto } from '../data/photos.js';

const registry = new Map();

const media = (p) => withPhoto(p.id, p.art?.type ? gift(p.art.type) : pack(p.art, p.name), p.name);

const badge = (status) => {
  const s = STATUS[status] || STATUS.konsept;
  return `<span class="badge badge--${s.tone}">${s.label}</span>`;
};

function priceLine(p) {
  if (p.price == null) return '<span class="price price--na">Fiyat belirlenmedi</span>';
  if (p.status === 'satista') return `<span class="price">${formatPrice(p.price)}</span>`;
  return `<span class="price price--planned">${formatPrice(p.price)} <small>planlanan</small></span>`;
}

function card(p, variant) {
  const buy = p.status === 'satista'
    ? `<button type="button" class="btn btn--primary btn--sm" data-add="${p.id}">Sepete ekle</button>`
    : `<button type="button" class="btn btn--soft btn--sm" data-notify="${p.id}">Haber ver</button>`;
  return `
  <article class="card card--${variant}" data-id="${p.id}" data-sub="${p.sub || p.cat}" data-status="${p.status}">
    <div class="card__media">${media(p)}${badge(p.status)}</div>
    <div class="card__body">
      <h3 class="card__title">${escapeHtml(p.name)}</h3>
      <p class="card__desc">${escapeHtml(p.desc)}</p>
      ${p.pack ? `<p class="card__meta"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8l8-4 8 4v8l-8 4-8-4z M4 8l8 4 8-4 M12 12v8" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>${escapeHtml(p.pack)}</p>` : ''}
      <div class="card__foot">
        ${priceLine(p)}
        <div class="card__actions">
          <button type="button" class="btn btn--ghost btn--sm" data-detail="${p.id}">Detayları incele</button>
          ${buy}
        </div>
      </div>
    </div>
  </article>`;
}

/**
 * Bir ızgara ve filtre çubuğu bağlar.
 * @param {object} o  { grid, filterBar, items, filters, variant, key }
 */
export function mountCatalog({ grid, filterBar, items, filters, variant = 'market', key }) {
  items.forEach((p) => registry.set(p.id, p));
  const gridEl = $(grid);
  const barEl = $(filterBar);
  let active = 'all';
  let onlyAvailable = false;

  const draw = () => {
    const list = items.filter((p) => (active === 'all' || (p.sub || p.cat) === active) && (!onlyAvailable || p.status === 'satista'));
    gridEl.innerHTML = list.length
      ? list.map((p) => card(p, variant)).join('')
      : '<p class="empty-note">Bu filtreye uygun ürün yok. Başka bir kategori seçin.</p>';
    // Son satırda tek kart kalmaması için sütun sayısını içeriğe göre seç
    const k = list.length;
    gridEl.style.setProperty('--cols', k <= 4 ? Math.max(k, 3) : (k % 3 === 0 ? 3 : 4));
    const counter = $(`[data-count="${key}"]`);
    if (counter) counter.textContent = `${list.length} ürün`;
  };

  if (barEl) {
    const hasSale = items.some((p) => p.status === 'satista');
    barEl.innerHTML = `
      <div class="chips" role="group" aria-label="Kategori filtresi">
        ${filters.map((f, i) => `<button type="button" class="chip${i === 0 ? ' is-active' : ''}" data-filter="${f.id}" aria-pressed="${i === 0}">${f.label}</button>`).join('')}
      </div>
      <div class="filter-side">
        ${hasSale ? `<label class="switch"><input type="checkbox" id="only-${key}"><span class="switch__track" aria-hidden="true"></span><span>Yalnızca satıştakiler</span></label>` : ''}
        <span class="filter-count" data-count="${key}" aria-live="polite"></span>
      </div>`;
    barEl.addEventListener('click', (e) => {
      const chip = e.target.closest('[data-filter]');
      if (!chip) return;
      active = chip.dataset.filter;
      $$('[data-filter]', barEl).forEach((c) => { const on = c === chip; c.classList.toggle('is-active', on); c.setAttribute('aria-pressed', on); });
      draw();
    });
    $(`#only-${key}`, barEl)?.addEventListener('change', (e) => { onlyAvailable = e.target.checked; draw(); });
  }
  draw();
}

/** Tüm kartlar için tek olay dinleyicisi */
export function initCatalogEvents() {
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-add],[data-detail],[data-notify]');
    if (!t) return;
    if (t.dataset.add) addToCart(t.dataset.add);
    if (t.dataset.detail) showDetail(t.dataset.detail);
    if (t.dataset.notify) showNotify(t.dataset.notify);
  });
}

function showDetail(id) {
  const p = registry.get(id);
  if (!p) return;
  const rows = Object.entries(p.details || {}).map(([k, v]) => `<div><dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd></div>`).join('');
  const conceptNote = p.status === 'konsept'
    ? '<p class="notice notice--concept">Bu ürün konsept tasarımdır ve henüz satışta değildir. Görsel ve fiyat temsilîdir.</p>'
    : p.status === 'arge'
      ? '<p class="notice notice--rnd">Bu bir Ar-Ge ürün fikridir. Gerekli analizler ve yasal süreçler tamamlanmadan satışa sunulmaz; herhangi bir sağlık beyanı içermez.</p>'
      : '';
  openModal(`
    <div class="detail">
      <div class="detail__media">${media(p)}</div>
      <div class="detail__info">
        ${badge(p.status)}
        <h2 id="modal-title">${escapeHtml(p.name)}</h2>
        <p>${escapeHtml(p.desc)}</p>
        ${p.pack ? `<p class="detail__pack"><strong>Paket:</strong> ${escapeHtml(p.pack)}</p>` : ''}
        ${rows ? `<dl class="detail__list">${rows}</dl>` : ''}
        ${conceptNote}
        <div class="detail__foot">
          ${priceLine(p)}
          ${p.status === 'satista'
            ? `<button type="button" class="btn btn--primary" data-add-modal="${p.id}">Sepete ekle</button>`
            : `<button type="button" class="btn btn--soft" data-notify-modal="${p.id}">Satışa çıkınca haber ver</button>`}
        </div>
      </div>
    </div>`);
  $('[data-add-modal]')?.addEventListener('click', () => { addToCart(p.id); closeModal(); });
  $('[data-notify-modal]')?.addEventListener('click', () => showNotify(p.id));
}

function showNotify(id) {
  const p = registry.get(id);
  if (!p) return;
  openModal(`
    <form class="notify-form" novalidate>
      <h2 id="modal-title">${escapeHtml(p.name)} için haber ver</h2>
      <p>Ürün satışa çıktığında size e-posta ile haber verelim.</p>
      <div class="field">
        <label for="notify-email">E-posta adresiniz</label>
        <input id="notify-email" type="email" autocomplete="email" required placeholder="ornek@eposta.com">
        <p class="field__error" id="notify-err" hidden>Geçerli bir e-posta adresi yazın.</p>
      </div>
      <p class="demo-hint">Demo: Kayıt şu an hiçbir sunucuya gönderilmez.</p>
      <button class="btn btn--primary" type="submit">Haber ver</button>
    </form>`);
  const form = $('.notify-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inp = $('#notify-email', form);
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(inp.value.trim());
    $('#notify-err', form).hidden = ok;
    inp.setAttribute('aria-invalid', String(!ok));
    if (!ok) { inp.focus(); return; }
    closeModal();
    toast('Talebiniz alındı (demo).', 'ok');
  });
}
