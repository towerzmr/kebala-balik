/**
 * Yönetici fotoğraf paneli
 * ------------------------------------------------------------
 * Yalnızca claude.ai'de yayınlanan sürümde çalışır (window.claude).
 * - Tüm ziyaretçiler: yüklenen fotoğrafları okur (db "photos" koleksiyonu).
 * - Yalnızca yöneticiler (Owner / Editor): panel düğmesini görür,
 *   fotoğraf yükler, değiştirir, kaldırır. Bu kural sunucuda da
 *   uygulanır (db kuralı write: "admin", assets yalnızca Editor+).
 * GitHub/kendi sunucunuzda window.claude olmadığı için hiçbir şey yapmaz;
 * orada fotoğraflar AVAILABLE_PHOTOS listesinden gelir.
 */
import { PHOTO_SLOTS, setUploadedPhotos } from '../data/photos.js';
import { toast } from './toast.js';
import { escapeHtml } from './utils.js';

const COL = 'photos';
const MAX_SIDE = 1600;
let db = null;
let assets = null;
let docs = {};          // slot → { url, assetId, credit, updatedAt }
let panel = null;
let filter = { q: '', show: 'all' };
const busy = new Set();

const cap = (name) => (window.claude?.use ? window.claude.use(name) : Promise.resolve(null));

export async function initAdmin() {
  if (!window.claude?.use) return;
  const [dbNs, user] = await Promise.all([cap('db'), cap('user')]);
  db = dbNs;
  if (db) subscribe();

  const isAdmin = user ? await user.canEdit() : false;
  if (!isAdmin || !db) return;
  assets = await cap('assets');
  if (!assets) return;           // Editor altı kullanıcılar için null döner
  mountButton();
}

/* ---------- Okuma: herkes ---------- */
function subscribe() {
  db.collection(COL).onSnapshot((snap) => {
    const map = {};
    snap.docs.forEach((d) => {
      const v = d.data();
      if (!v) return;
      const url = v.url || (v.assetId ? `/_blob/${v.assetId}` : '');
      if (url) map[d.id] = { url, assetId: v.assetId, credit: v.credit || '', updatedAt: v.updatedAt || 0 };
    });
    docs = map;
    setUploadedPhotos(Object.fromEntries(Object.entries(map).map(([k, v]) => [k, { url: v.url, credit: v.credit }])));
    if (panel?.open) renderPanel();
  }, () => { /* fotoğraflar okunamazsa çizimler kalır */ });
}

/* ---------- Yönetici arayüzü ---------- */
function mountButton() {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'admin-fab';
  btn.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="12" cy="13" r="3.5" fill="none" stroke="currentColor" stroke-width="2"/></svg><span>Fotoğraf yönetimi</span>`;
  btn.addEventListener('click', openPanel);
  document.body.appendChild(btn);
}

function openPanel() {
  if (!panel) {
    panel = document.createElement('dialog');
    panel.className = 'admin-panel';
    panel.setAttribute('aria-labelledby', 'admin-title');
    document.body.appendChild(panel);
    panel.addEventListener('click', onClick);
    panel.addEventListener('change', onChange);
    panel.addEventListener('input', (e) => {
      if (e.target.id === 'admin-search') { filter.q = e.target.value; renderList(); }
    });
    panel.addEventListener('dragover', (e) => { const c = e.target.closest('.slot'); if (c) { e.preventDefault(); c.classList.add('is-drop'); } });
    panel.addEventListener('dragleave', (e) => e.target.closest('.slot')?.classList.remove('is-drop'));
    panel.addEventListener('drop', (e) => {
      const c = e.target.closest('.slot');
      if (!c) return;
      e.preventDefault(); c.classList.remove('is-drop');
      const f = e.dataTransfer.files?.[0];
      if (f) upload(c.dataset.slot, f);
    });
  }
  renderPanel();
  panel.showModal();
}

function renderPanel() {
  const total = PHOTO_SLOTS.reduce((s, g) => s + g.items.length, 0);
  const filled = PHOTO_SLOTS.reduce((s, g) => s + g.items.filter((i) => docs[i.id]).length, 0);
  const keepFocus = document.activeElement?.id;
  panel.innerHTML = `
    <div class="admin">
      <header class="admin__head">
        <div>
          <p class="eyebrow">Yalnızca yöneticiler görür</p>
          <h2 id="admin-title">Fotoğraf yönetimi</h2>
          <p class="admin__lead">Yüklediğiniz fotoğraf, tüm ziyaretçilerde ilgili çizimin yerine geçer. Fotoğraf yüklenmeyen alanlarda çizim görünmeye devam eder.</p>
        </div>
        <button class="icon-btn" type="button" data-admin="close" aria-label="Paneli kapat"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></button>
      </header>
      <div class="admin__tools">
        <div class="admin__progress" aria-label="${filled} / ${total} alan dolu">
          <span class="admin__bar"><span style="width:${Math.round((filled / total) * 100)}%"></span></span>
          <strong>${filled} / ${total}</strong> alan dolu
        </div>
        <input id="admin-search" type="search" placeholder="Alan ara (ör. fileto, şelale)" value="${escapeHtml(filter.q)}" aria-label="Alan ara">
        <div class="chips" role="group" aria-label="Göster">
          ${[['all', 'Tümü'], ['empty', 'Boş olanlar'], ['filled', 'Dolu olanlar']].map(([k, l]) => `<button type="button" class="chip${filter.show === k ? ' is-active' : ''}" data-show="${k}" aria-pressed="${filter.show === k}">${l}</button>`).join('')}
        </div>
      </div>
      <p class="admin__tip">İpucu: Fotoğrafı karta sürükleyip bırakabilirsiniz. Yatay ve en az 1200 piksel genişliğinde fotoğraflar en iyi sonucu verir; büyük dosyalar otomatik küçültülür.</p>
      <div class="admin__list" id="admin-list"></div>
    </div>`;
  renderList();
  if (keepFocus === 'admin-search') { const s = panel.querySelector('#admin-search'); s.focus(); s.setSelectionRange(s.value.length, s.value.length); }
}

function renderList() {
  const list = panel.querySelector('#admin-list');
  const q = filter.q.toLocaleLowerCase('tr-TR').trim();
  const html = PHOTO_SLOTS.map((g) => {
    const items = g.items.filter((i) => {
      const has = Boolean(docs[i.id]);
      if (filter.show === 'empty' && has) return false;
      if (filter.show === 'filled' && !has) return false;
      return !q || i.name.toLocaleLowerCase('tr-TR').includes(q) || i.id.includes(q);
    });
    if (!items.length) return '';
    return `<section class="admin__group"><h3>${g.group} <span>${g.items.filter((i) => docs[i.id]).length}/${g.items.length}</span></h3>
      <ul class="slots">${items.map(slotCard).join('')}</ul></section>`;
  }).join('');
  list.innerHTML = html || '<p class="empty-note">Aramanıza uygun alan yok.</p>';
}

function slotCard(i) {
  const d = docs[i.id];
  const isBusy = busy.has(i.id);
  return `<li class="slot${d ? ' has-photo' : ''}${isBusy ? ' is-busy' : ''}" data-slot="${i.id}">
    <div class="slot__thumb">${d ? `<img src="${d.url}" alt="${escapeHtml(i.name)}">` : '<span>Çizim kullanılıyor</span>'}${isBusy ? '<span class="slot__spin" aria-label="Yükleniyor"></span>' : ''}</div>
    <div class="slot__body">
      <p class="slot__name">${escapeHtml(i.name)}</p>
      <p class="slot__id">${i.id}</p>
      ${d ? `<label class="slot__credit"><span>Kaynak / fotoğrafçı</span><input type="text" data-credit="${i.id}" value="${escapeHtml(d.credit)}" placeholder="ör. Ahmet Y. / Unsplash" maxlength="140"></label>` : ''}
      <div class="slot__actions">
        <label class="btn btn--primary btn--sm slot__upload">
          <input type="file" accept="image/jpeg,image/png,image/webp" data-file="${i.id}" ${isBusy ? 'disabled' : ''}>
          ${d ? 'Değiştir' : 'Fotoğraf yükle'}
        </label>
        ${d ? `<button type="button" class="btn btn--ghost btn--sm" data-remove="${i.id}" ${isBusy ? 'disabled' : ''}>Kaldır</button>` : ''}
      </div>
    </div>
  </li>`;
}

function onClick(e) {
  if (e.target === panel || e.target.closest('[data-admin="close"]')) { panel.close(); return; }
  const show = e.target.closest('[data-show]');
  if (show) { filter.show = show.dataset.show; renderPanel(); return; }
  const rm = e.target.closest('[data-remove]');
  if (rm) {
    if (rm.dataset.confirm) { remove(rm.dataset.remove); return; }
    rm.dataset.confirm = '1';
    rm.textContent = 'Emin misiniz? Kaldır';
    rm.classList.add('is-danger');
    setTimeout(() => { if (rm.isConnected) { delete rm.dataset.confirm; rm.textContent = 'Kaldır'; rm.classList.remove('is-danger'); } }, 4000);
  }
}

function onChange(e) {
  const f = e.target.closest('[data-file]');
  if (f && f.files?.[0]) { upload(f.dataset.file, f.files[0]); f.value = ''; return; }
  const c = e.target.closest('[data-credit]');
  if (c) saveCredit(c.dataset.credit, c.value.trim());
}

/* ---------- Yazma: yalnızca yönetici ---------- */
async function resize(file) {
  let bmp;
  try { bmp = await createImageBitmap(file); } catch { throw { code: 'decode' }; }
  const scale = Math.min(1, MAX_SIDE / Math.max(bmp.width, bmp.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  canvas.getContext('2d').drawImage(bmp, 0, 0, canvas.width, canvas.height);
  bmp.close?.();
  return new Promise((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej({ code: 'decode' })), 'image/jpeg', 0.85));
}

const ERR = {
  decode: 'Bu dosya açılamadı. JPG, PNG veya WebP fotoğraf seçin.',
  type: 'Yalnızca JPG, PNG veya WebP fotoğraf yükleyebilirsiniz.',
  too_large: 'Dosya çok büyük. Daha küçük bir fotoğraf deneyin.',
  unsupported_type: 'Bu dosya türü desteklenmiyor. JPG, PNG veya WebP seçin.',
  quota_or_state: 'Depolama alanı doldu. Kullanılmayan fotoğrafları kaldırıp tekrar deneyin.',
  rate_limited: 'Kısa sürede çok fazla yükleme yapıldı. Biraz bekleyip tekrar deneyin.',
  not_granted: 'Fotoğraf yükleme izni verilmedi.',
  not_uploader: 'Bu sayfaya fotoğraf yükleme yetkiniz yok.',
};
const errMsg = (err) => ERR[err?.code] || 'Fotoğraf yüklenemedi. Bağlantınızı kontrol edip tekrar deneyin.';

async function upload(slot, file) {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) { toast(ERR.type); return; }
  busy.add(slot); renderList();
  try {
    const blob = await resize(file);
    const res = await assets.upload(blob, { type: 'image/jpeg' });
    const old = docs[slot]?.assetId;
    await db.doc(`${COL}/${slot}`).set({
      url: res.url, assetId: res.id, credit: docs[slot]?.credit || '', updatedAt: Date.now(),
    });
    if (old && old !== res.id) assets.delete(old).catch(() => {});
    toast('Fotoğraf yüklendi ve sitede yayında.', 'ok');
  } catch (err) {
    toast(errMsg(err));
  } finally {
    busy.delete(slot);
    if (panel?.open) renderList();
  }
}

async function remove(slot) {
  const d = docs[slot];
  if (!d) return;
  busy.add(slot); renderList();
  try {
    await db.doc(`${COL}/${slot}`).delete();
    if (d.assetId) await assets.delete(d.assetId).catch(() => {});
    toast('Fotoğraf kaldırıldı, çizim geri geldi.');
  } catch {
    toast('Fotoğraf kaldırılamadı. Tekrar deneyin.');
  } finally {
    busy.delete(slot);
    if (panel?.open) renderList();
  }
}

async function saveCredit(slot, credit) {
  if (!docs[slot] || docs[slot].credit === credit) return;
  try { await db.doc(`${COL}/${slot}`).update({ credit }); toast('Kaynak bilgisi kaydedildi.', 'ok'); }
  catch { toast('Kaynak bilgisi kaydedilemedi.'); }
}
