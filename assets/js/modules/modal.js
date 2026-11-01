/**
 * Ürün detay penceresi — native <dialog> kullanır.
 * openModal({ title, html }) ile içerik gösterilir.
 */
import { $ } from './utils.js';

let dialog;

function ensure() {
  if (dialog) return dialog;
  dialog = document.createElement('dialog');
  dialog.className = 'modal';
  dialog.setAttribute('aria-labelledby', 'modal-title');
  dialog.innerHTML = `
    <div class="modal__inner">
      <button class="icon-btn modal__close" type="button" aria-label="Pencereyi kapat">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
      </button>
      <div class="modal__body"></div>
    </div>`;
  document.body.appendChild(dialog);
  $('.modal__close', dialog).addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  return dialog;
}

export function openModal(html) {
  const d = ensure();
  $('.modal__body', d).innerHTML = html;
  if (typeof d.showModal === 'function') d.showModal(); else d.setAttribute('open', '');
  return d;
}

export function closeModal() { dialog?.close(); }
