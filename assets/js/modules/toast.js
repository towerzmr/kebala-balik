/** Ekranın altında kısa bildirim gösterir (aria-live ile duyurulur) */
let region;
export function toast(message, tone = 'info') {
  if (!region) {
    region = document.createElement('div');
    region.className = 'toast-region';
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('role', 'status');
    document.body.appendChild(region);
  }
  const el = document.createElement('div');
  el.className = `toast toast--${tone}`;
  el.textContent = message;
  region.appendChild(el);
  setTimeout(() => el.classList.add('is-leaving'), 2600);
  setTimeout(() => el.remove(), 3100);
}
