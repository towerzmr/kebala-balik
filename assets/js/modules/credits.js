/** Footer'daki "Görsel kaynakları" listesi — kaynak yazılmış fotoğraflar */
import { $ } from './utils.js';
import { PHOTO_SLOTS, photoMap, onPhotosChange } from '../data/photos.js';

const names = Object.fromEntries(PHOTO_SLOTS.flatMap((g) => g.items.map((i) => [i.id, i.name])));

function render(map) {
  const box = $('#photo-credits');
  if (!box) return;
  const rows = Object.entries(map).filter(([, v]) => v.credit);
  box.hidden = rows.length === 0;
  const ul = $('ul', box);
  ul.innerHTML = '';
  rows.forEach(([slot, v]) => {
    const li = document.createElement('li');
    const b = document.createElement('strong');
    b.textContent = names[slot] || slot;
    li.append(b, document.createTextNode(`: ${v.credit}`));
    ul.appendChild(li);
  });
}

export function initCredits() {
  render(photoMap());
  onPhotosChange(render);
}
