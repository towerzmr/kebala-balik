/**
 * Fotoğraf sistemi
 * ------------------------------------------------------------
 * Her görsel alanının bir "slot" adı vardır (ör. 'dn-fileto').
 * Fotoğraflar iki kaynaktan gelebilir:
 *   1) AVAILABLE_PHOTOS — repoya eklenmiş dosyalar (assets/img/<slot>.jpg)
 *   2) Yönetici paneli — claude.ai'de yayınlanan sürümde yöneticinin
 *      yüklediği fotoğraflar (modules/admin.js, db + assets)
 * Fotoğrafı olmayan alanlarda çizim görünür.
 */
import { PRODUCTS } from './products.js';
import { GIFTS } from './gifts.js';
import { MENU } from './menu.js';

export const PHOTO_EXT = 'jpg';

/** Repoya dosya olarak eklenen fotoğraflar (uzantısız ad) */
export const AVAILABLE_PHOTOS = [
  // 'manzara-keban-golu',
];

/** Yönetici panelinde listelenen tüm görsel alanları */
export const PHOTO_SLOTS = [
  { group: 'Manzaralar', items: [
    { id: 'manzara-hero', name: 'Ana sayfa arka planı (Keban Gölü)' },
    { id: 'manzara-keban-golu', name: 'Keban Baraj Gölü' },
    { id: 'manzara-circir-selalesi', name: 'Çırçır Şelalesi' },
    { id: 'manzara-balik-tutma', name: 'Balık tutma deneyimi' },
  ] },
  { group: 'Restoran menüsü', items: MENU.flatMap((c) => c.items.map((i) => ({ id: i.id, name: i.name }))) },
  { group: 'Dondurulmuş ürünler', items: PRODUCTS.filter((p) => p.cat === 'dondurulmus').map((p) => ({ id: p.id, name: p.name })) },
  { group: 'Atıştırmalıklar', items: PRODUCTS.filter((p) => p.cat === 'atistirmalik').map((p) => ({ id: p.id, name: p.name })) },
  { group: 'Özel balık ürünleri', items: PRODUCTS.filter((p) => p.cat === 'ozel').map((p) => ({ id: p.id, name: p.name })) },
  { group: 'Hediyelik eşyalar', items: GIFTS.map((p) => ({ id: p.id, name: p.name })) },
];

/* ---------- Durum ---------- */
const staticPhotos = Object.fromEntries(AVAILABLE_PHOTOS.map((n) => [n, { url: `assets/img/${n}.${PHOTO_EXT}`, credit: '' }]));
let uploaded = {};   // slot → { url, credit, assetId }
const listeners = new Set();

export const photoMap = () => ({ ...staticPhotos, ...uploaded });
export const photoFor = (slot) => photoMap()[slot]?.url || null;

export function setUploadedPhotos(map) {
  uploaded = map || {};
  applyPhotos();
  listeners.forEach((fn) => fn(photoMap()));
}
export const onPhotosChange = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };

/** Çizimin üstüne fotoğraf yuvası ekler; fotoğraf gelince görünür olur */
export function withPhoto(slot, artHtml, alt = '') {
  const safeAlt = String(alt).replace(/"/g, '&quot;');
  return `${artHtml}<img class="photo" data-slot="${slot}" alt="${safeAlt}" decoding="async" data-fallback hidden>`;
}

/** Sayfadaki tüm yuvaları güncel fotoğraf listesine göre doldurur */
export function applyPhotos(root = document) {
  const map = photoMap();
  root.querySelectorAll('img[data-slot]').forEach((img) => {
    const url = map[img.dataset.slot]?.url;
    if (url) {
      if (img.getAttribute('src') !== url) img.setAttribute('src', url);
      img.hidden = false;
    } else {
      img.hidden = true;
      img.removeAttribute('src');
    }
  });
}

let scheduled = false;
export function initPhotos() {
  // Yüklenemeyen fotoğraf gizlenir, çizim görünür kalır
  document.addEventListener('error', (e) => {
    const t = e.target;
    if (t instanceof HTMLImageElement && t.hasAttribute('data-fallback')) t.hidden = true;
  }, true);
  // Sonradan çizilen kart, menü, sepet ve pencerelere de uygula
  new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; applyPhotos(); });
  }).observe(document.body, { childList: true, subtree: true });
  applyPhotos();
}
