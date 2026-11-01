/**
 * Sepet — istemci tarafı demo.
 * Ödeme altyapısı bağlı değildir; "Siparişi tamamla" bunu açıkça bildirir.
 */
import { $, $$, formatPrice, escapeHtml, store } from './utils.js';
import { toast } from './toast.js';
import { pack, gift } from '../art/illustrations.js';
import { withPhoto } from '../data/photos.js';

const KEY = 'kebala-sepet-v1';
let items = {};          // { id: adet }
let catalog = new Map(); // id → ürün
let lastFocus = null;

const els = {};

export function initCart(allItems) {
  catalog = new Map(allItems.map((p) => [p.id, p]));
  const saved = store.get(KEY, {});
  items = Object.fromEntries(Object.entries(saved).filter(([id, q]) => catalog.get(id)?.status === 'satista' && q > 0));

  els.drawer = $('#cart-drawer');
  els.list = $('#cart-items');
  els.total = $('#cart-total');
  els.count = $$('[data-cart-count]');
  els.checkout = $('#cart-checkout');
  els.overlay = $('#cart-overlay');
  els.note = $('#cart-note');

  $$('[data-cart-open]').forEach((b) => b.addEventListener('click', open));
  $$('[data-cart-close]').forEach((b) => b.addEventListener('click', close));
  els.overlay.addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && els.drawer.classList.contains('is-open')) close(); });

  els.list.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-qty]');
    if (!btn) return;
    const { id } = btn.closest('[data-id]').dataset;
    const delta = btn.dataset.qty;
    if (delta === 'remove') setQty(id, 0); else setQty(id, (items[id] || 0) + Number(delta));
  });

  els.checkout.addEventListener('click', () => {
    els.note.hidden = false;
    els.note.focus();
  });

  render();
}

export function addToCart(id, qty = 1) {
  const p = catalog.get(id);
  if (!p || p.status !== 'satista') return;
  setQty(id, (items[id] || 0) + qty);
  toast(`${p.name} sepete eklendi`, 'ok');
  bump();
}

function setQty(id, q) {
  if (q <= 0) delete items[id]; else items[id] = Math.min(q, 20);
  store.set(KEY, items);
  render();
}

function bump() {
  els.count.forEach((c) => { c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump'); });
}

function render() {
  const entries = Object.entries(items);
  const count = entries.reduce((s, [, q]) => s + q, 0);
  const total = entries.reduce((s, [id, q]) => s + (catalog.get(id)?.price || 0) * q, 0);
  els.count.forEach((c) => { c.textContent = count; c.hidden = count === 0; });
  els.total.textContent = formatPrice(total);
  els.checkout.disabled = count === 0;
  els.note.hidden = true;

  if (!entries.length) {
    els.list.innerHTML = `<li class="cart-empty"><p><strong>Sepetiniz boş.</strong></p><p>Satıştaki ürünlerde "Sepete ekle" butonunu kullanabilirsiniz.</p>
      <a class="btn btn--ghost" href="#dondurulmus" data-cart-close>Ürünlere göz at</a></li>`;
    $('[data-cart-close]', els.list)?.addEventListener('click', close);
    return;
  }
  els.list.innerHTML = entries.map(([id, q]) => {
    const p = catalog.get(id);
    const thumb = withPhoto(p.id, p.art?.type ? gift(p.art.type) : pack(p.art, p.name));
    return `<li class="cart-item" data-id="${id}">
      <div class="cart-item__thumb">${thumb}</div>
      <div class="cart-item__info">
        <p class="cart-item__name">${escapeHtml(p.name)}</p>
        <p class="cart-item__meta">${escapeHtml(p.pack || '')}</p>
        <div class="qty" role="group" aria-label="${escapeHtml(p.name)} adedi">
          <button type="button" data-qty="-1" aria-label="Bir azalt">−</button>
          <span aria-live="polite">${q}</span>
          <button type="button" data-qty="1" aria-label="Bir artır">+</button>
        </div>
      </div>
      <div class="cart-item__side">
        <p class="cart-item__price">${formatPrice(p.price * q)}</p>
        <button type="button" class="link-btn" data-qty="remove">Kaldır</button>
      </div>
    </li>`;
  }).join('');
}

function open() {
  lastFocus = document.activeElement;
  els.drawer.classList.add('is-open');
  els.overlay.hidden = false;
  els.drawer.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
  setTimeout(() => $('.drawer__close', els.drawer)?.focus(), 50);
}

function close() {
  els.drawer.classList.remove('is-open');
  els.overlay.hidden = true;
  els.drawer.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
  lastFocus?.focus?.();
}
