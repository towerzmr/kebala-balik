/** Restoran menüsü — erişilebilir sekme (tab) yapısı */
import { $, $$, formatPrice, escapeHtml } from './utils.js';
import { dish } from '../art/illustrations.js';
import { withPhoto } from '../data/photos.js';

export function mountMenu(root, categories) {
  const el = $(root);
  el.innerHTML = `
    <div class="menu-tabs" role="tablist" aria-label="Menü kategorileri">
      ${categories.map((c, i) => `<button role="tab" type="button" id="tab-${c.id}" aria-controls="panel-${c.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" class="menu-tab">
        <span class="menu-tab__label">${c.label}</span><span class="menu-tab__short">${c.short}</span><span class="menu-tab__count">${c.items.length}</span></button>`).join('')}
    </div>
    ${categories.map((c, i) => `
      <div class="menu-panel" role="tabpanel" id="panel-${c.id}" aria-labelledby="tab-${c.id}" ${i === 0 ? '' : 'hidden'}>
        <ul class="menu-grid">
          ${c.items.map((it) => `
            <li class="dish">
              <div class="dish__media">${withPhoto(it.id, dish(it.dish), it.name)}${it.tag ? `<span class="dish__tag">${it.tag}</span>` : ''}</div>
              <div class="dish__body">
                <div class="dish__head"><h3>${escapeHtml(it.name)}</h3><span class="dish__dots" aria-hidden="true"></span><span class="dish__price">${formatPrice(it.price)}</span></div>
                <p>${escapeHtml(it.desc)}</p>
                <p class="dish__info">${escapeHtml(it.info)}</p>
              </div>
            </li>`).join('')}
        </ul>
      </div>`).join('')}`;

  const tabs = $$('[role="tab"]', el);
  const select = (tab, focus = true) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
      $(`#${t.getAttribute('aria-controls')}`).hidden = !on;
    });
    if (focus) tab.focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t, false));
    t.addEventListener('keydown', (e) => {
      const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (k) { e.preventDefault(); select(tabs[(i + k + tabs.length) % tabs.length]); }
      if (e.key === 'Home') { e.preventDefault(); select(tabs[0]); }
      if (e.key === 'End') { e.preventDefault(); select(tabs[tabs.length - 1]); }
    });
  });
}
