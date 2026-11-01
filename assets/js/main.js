/**
 * Kebala Balık — uygulama giriş noktası
 * Her modül tek bir işten sorumludur; burada yalnızca bağlanırlar.
 */
import { $, $$ } from './modules/utils.js';
import { mascotScene, mascotSolo } from './art/mascots.js';
import { scene, logo, fishSide, pack } from './art/illustrations.js';
import { elazigMap } from './art/map.js';
import { PRODUCTS, FILTERS } from './data/products.js';
import { GIFTS, GIFT_FILTERS } from './data/gifts.js';
import { MENU } from './data/menu.js';
import { withPhoto, initPhotos } from './data/photos.js';
import { initAdmin } from './modules/admin.js';
import { initCredits } from './modules/credits.js';
import { initNav } from './modules/nav.js';
import { initCart } from './modules/cart.js';
import { mountCatalog, initCatalogEvents } from './modules/catalog.js';
import { mountMenu } from './modules/menu.js';
import { initReservation } from './modules/reservation.js';
import { initContact } from './modules/contact.js';
import { initReveal } from './modules/reveal.js';

function renderArt() {
  $('#hero-mascots').innerHTML = mascotScene();
  $$('[data-logo]').forEach((el) => { el.innerHTML = logo(Number(el.dataset.logo) || 44); });
  $$('[data-mascot]').forEach((el) => { el.innerHTML = mascotSolo(el.dataset.mascot, el.dataset.label); });
  const sceneAlt = { lake: 'Keban Baraj Gölü', waterfall: 'Çırçır Şelalesi', fishing: 'Göl kıyısında balık tutma' };
  const sceneName = { lake: 'manzara-keban-golu', waterfall: 'manzara-circir-selalesi', fishing: 'manzara-balik-tutma' };
  $$('[data-scene]').forEach((el) => { el.innerHTML = withPhoto(sceneName[el.dataset.scene], scene(el.dataset.scene), sceneAlt[el.dataset.scene]); });
  $('.hero__sky').insertAdjacentHTML('beforeend', '<img class="photo hero__photo" data-slot="manzara-hero" alt="" data-fallback hidden>');
  $$('[data-map]').forEach((el) => { if (el.tagName !== 'A') el.innerHTML = elazigMap({ mode: el.dataset.map }); });
  const zw = $('#zw-fish');
  if (zw) zw.innerHTML = `<svg viewBox="0 0 520 260" role="img" aria-label="Alabalık çizimi: et, deri, pul, kılçık, kemik ve yağ bölümleri işaretli" xmlns="http://www.w3.org/2000/svg">${fishSide(260, 130, 440, { tone: 'raw' })}
    <g class="zw-dots">
      <g><circle cx="250" cy="128" r="10" class="zw-dot zw-dot--meat"/><text x="250" y="112" text-anchor="middle" class="zw-label">Et</text></g>
      <g><circle cx="150" cy="112" r="10" class="zw-dot zw-dot--skin"/><text x="150" y="96" text-anchor="middle" class="zw-label">Deri</text></g>
      <g><circle cx="330" cy="98" r="10" class="zw-dot zw-dot--scale"/><text x="330" y="82" text-anchor="middle" class="zw-label">Pul</text></g>
      <g><circle cx="205" cy="160" r="10" class="zw-dot zw-dot--bone"/><text x="205" y="144" text-anchor="middle" class="zw-label">Kılçık</text></g>
      <g><circle cx="375" cy="146" r="10" class="zw-dot zw-dot--frame"/><text x="375" y="130" text-anchor="middle" class="zw-label">Kemik</text></g>
      <g><circle cx="300" cy="165" r="10" class="zw-dot zw-dot--oil"/><text x="300" y="149" text-anchor="middle" class="zw-label">Yağ</text></g>
    </g></svg>`;
  const catArt = { frozen: 'dn-fileto', snack: 'at-cips', special: 'oz-konserve' };
  $$('[data-cat-art]').forEach((el) => { const p = PRODUCTS.find((x) => x.id === catArt[el.dataset.catArt]); el.innerHTML = pack(p.art, p.name); });
  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
}

function init() {
  renderArt();
  initNav();

  const byCat = (c) => PRODUCTS.filter((p) => p.cat === c);
  initCart([...PRODUCTS, ...GIFTS]);
  initCatalogEvents();
  mountCatalog({ grid: '#grid-dondurulmus', filterBar: '#filter-dondurulmus', items: byCat('dondurulmus'), filters: FILTERS.dondurulmus, variant: 'market', key: 'dondurulmus' });
  mountCatalog({ grid: '#grid-atistirmalik', filterBar: '#filter-atistirmalik', items: byCat('atistirmalik'), filters: FILTERS.atistirmalik, variant: 'snack', key: 'atistirmalik' });
  mountCatalog({ grid: '#grid-ozel', filterBar: '#filter-ozel', items: byCat('ozel'), filters: FILTERS.ozel, variant: 'market', key: 'ozel' });
  mountCatalog({ grid: '#grid-hediyelik', filterBar: '#filter-hediyelik', items: GIFTS, filters: GIFT_FILTERS, variant: 'gift', key: 'hediyelik' });
  mountMenu('#menu-root', MENU);

  initReservation();
  initContact();
  initReveal();
  initPhotos();
  initCredits();
  initAdmin();
  document.documentElement.classList.add('js-ready');
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
