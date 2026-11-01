/** Form doğrulama yardımcıları (rezervasyon ve iletişim ortak) */
import { $ } from './utils.js';

export const rules = {
  name: (v) => (v.trim().length >= 3 && /\s/.test(v.trim()) ? '' : 'Adınızı ve soyadınızı yazın.'),
  phone: (v) => {
    const d = v.replace(/\D/g, '').replace(/^90/, '').replace(/^0/, '');
    return /^5\d{9}$/.test(d) || /^[2-4]\d{9}$/.test(d) ? '' : 'Telefonu 05xx xxx xx xx biçiminde yazın.';
  },
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Geçerli bir e-posta adresi yazın (örn. ad@eposta.com).'),
  required: (msg) => (v) => (String(v).trim() ? '' : msg),
};

/** Alanı doğrular, hata mesajını gösterir; geçerliyse true döner */
export function check(input, fn) {
  const msg = fn(input.type === 'checkbox' ? (input.checked ? 'x' : '') : input.value);
  const err = $(`#${input.id}-err`);
  input.setAttribute('aria-invalid', String(Boolean(msg)));
  if (err) { err.textContent = msg; err.hidden = !msg; }
  input.closest('.field')?.classList.toggle('has-error', Boolean(msg));
  return !msg;
}

/** Telefon alanını yazarken 05xx xxx xx xx biçimine getirir */
export function maskPhone(input) {
  input.addEventListener('input', () => {
    let d = input.value.replace(/\D/g, '').slice(0, 11);
    if (d && d[0] !== '0') d = `0${d}`.slice(0, 11);
    const parts = [d.slice(0, 4), d.slice(4, 7), d.slice(7, 9), d.slice(9, 11)].filter(Boolean);
    input.value = parts.join(' ');
  });
}
