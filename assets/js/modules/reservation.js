/**
 * Balık tutma deneyimi rezervasyonu — ÇALIŞAN DEMO
 * Veriler hiçbir sunucuya gönderilmez. Backend eklendiğinde
 * `submitReservation` fonksiyonunu gerçek API çağrısıyla değiştirin.
 */
import { $, escapeHtml } from './utils.js';
import { rules, check, maskPhone } from './validate.js';
import { SITE } from '../config/site.js';

const pad = (x) => String(x).padStart(2, '0');
const isoDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

/** Gelecekte burası POST /api/reservations olacak */
async function submitReservation(data) {
  await new Promise((r) => setTimeout(r, 700));
  return { ok: true, code: `KB-${Date.now().toString(36).slice(-5).toUpperCase()}`, data };
}

export function initReservation() {
  const form = $('#reservation-form');
  if (!form) return;
  const { slots, maxPeople, maxDaysAhead } = SITE.reservation;
  const f = (id) => $(`#${id}`, form);

  const today = new Date();
  const max = new Date(); max.setDate(max.getDate() + maxDaysAhead);
  f('r-date').min = isoDate(today);
  f('r-date').max = isoDate(max);
  f('r-time').innerHTML = '<option value="">Saat seçin</option>' + slots.map((s) => `<option>${s}</option>`).join('');
  f('r-people').max = maxPeople;
  maskPhone(f('r-phone'));

  const notes = f('r-notes');
  const counter = $('#r-notes-count');
  notes.addEventListener('input', () => { counter.textContent = `${notes.value.length}/400`; });

  const validators = {
    'r-name': rules.name,
    'r-phone': rules.phone,
    'r-email': rules.email,
    'r-date': (v) => {
      if (!v) return 'Ziyaret tarihini seçin.';
      if (v < isoDate(today)) return 'Geçmiş bir tarih seçilemez.';
      if (v > isoDate(max)) return `En fazla ${maxDaysAhead} gün sonrası için rezervasyon yapılabilir.`;
      return '';
    },
    'r-time': rules.required('Tercih ettiğiniz saati seçin.'),
    'r-people': (v) => {
      const k = Number(v);
      return Number.isInteger(k) && k >= 1 && k <= maxPeople ? '' : `Kişi sayısı 1 ile ${maxPeople} arasında olmalı.`;
    },
    'r-consent': rules.required('Devam etmek için onay kutusunu işaretleyin.'),
  };

  Object.entries(validators).forEach(([id, fn]) => {
    const el = f(id);
    el.addEventListener('blur', () => el.value && check(el, fn));
    el.addEventListener('change', () => el.getAttribute('aria-invalid') === 'true' && check(el, fn));
  });

  // kişi sayacı
  form.addEventListener('click', (e) => {
    const b = e.target.closest('[data-step]');
    if (!b) return;
    const inp = f('r-people');
    inp.value = Math.min(maxPeople, Math.max(1, (Number(inp.value) || 1) + Number(b.dataset.step)));
    check(inp, validators['r-people']);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let firstBad = null;
    Object.entries(validators).forEach(([id, fn]) => { if (!check(f(id), fn) && !firstBad) firstBad = f(id); });
    if (firstBad) { firstBad.focus(); return; }

    const btn = $('button[type="submit"]', form);
    btn.disabled = true; btn.classList.add('is-loading'); btn.querySelector('span').textContent = 'Gönderiliyor…';

    const data = {
      name: f('r-name').value.trim(), phone: f('r-phone').value, email: f('r-email').value.trim(),
      date: f('r-date').value, time: f('r-time').value, people: f('r-people').value, notes: notes.value.trim(),
    };
    const res = await submitReservation(data);
    btn.disabled = false; btn.classList.remove('is-loading'); btn.querySelector('span').textContent = 'Rezervasyon oluştur';
    if (res.ok) showSuccess(res, form);
  });
}

function showSuccess({ code, data }, form) {
  const box = $('#reservation-success');
  const dateTxt = new Date(`${data.date}T00:00`).toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  $('#rs-summary', box).innerHTML = `
    <div><dt>Talep no</dt><dd>${code}</dd></div>
    <div><dt>Ad Soyad</dt><dd>${escapeHtml(data.name)}</dd></div>
    <div><dt>Tarih</dt><dd>${dateTxt}</dd></div>
    <div><dt>Saat</dt><dd>${data.time}</dd></div>
    <div><dt>Kişi</dt><dd>${data.people}</dd></div>`;
  form.hidden = true;
  box.hidden = false;
  $('h3', box).focus();
  $('#rs-new', box).onclick = () => {
    form.reset();
    $('#r-notes-count').textContent = '0/400';
    form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
    box.hidden = true; form.hidden = false; $('#r-name').focus();
  };
}
