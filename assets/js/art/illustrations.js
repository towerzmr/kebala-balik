/**
 * Kebala Balık — çizim kütüphanesi (saf SVG)
 * ------------------------------------------------------------
 * Gerçek fotoğraflar hazır olana kadar ürün, yemek ve mekân
 * görsellerini üretir. Her fonksiyon bir SVG metni döndürür.
 *
 *   dish(type)      → restoran tabağı
 *   pack(art, name) → ürün ambalajı
 *   gift(type)      → hediyelik eşya
 *   scene(type)     → manzara (göl, şelale, balık tutma)
 *   logo()          → marka işareti
 */
import { mascotSolo } from './mascots.js';

let n = 0;
const uid = (p = 'g') => `${p}${++n}`;

/* ============ ORTAK PARÇALAR ============ */

/** Yandan görünüm alabalık. len: piksel uzunluk, tone: raw | grilled | smoked | gold */
export function fishSide(cx, cy, len = 200, { tone = 'raw', rot = 0, flip = false } = {}) {
  const id = uid('f');
  const s = len / 200;
  const body = 'M100,0 C82,-32 22,-40 -40,-25 L-78,-7 L-106,-34 L-96,0 L-106,34 L-78,7 L-40,25 C22,40 82,32 100,0 Z';
  const tones = {
    raw: ['#5E7F45', '#E98C8C', '#F4F6F4'],
    grilled: ['#7A4A21', '#C9873F', '#F0C27A'],
    smoked: ['#8A4B23', '#D9733F', '#F2A66B'],
    gold: ['#B97A1E', '#E8A93A', '#FFD98A'],
  };
  const [a, b, c] = tones[tone] || tones.raw;
  const grill = tone === 'grilled'
    ? `<g clip-path="url(#${id}c)" stroke="#3B200C" stroke-width="5" opacity=".55" stroke-linecap="round">
        ${[-50, -20, 10, 40, 70].map((x) => `<path d="M${x},-40 L${x - 26},40"/>`).join('')}</g>`
    : '';
  const spots = tone === 'raw'
    ? [[-20, -14], [0, -18], [20, -12], [40, -16], [-38, -10], [10, -6], [56, -8]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.2" fill="#2C3A2A"/>`).join('')
    : '';
  return `
  <g transform="translate(${cx} ${cy}) rotate(${rot}) scale(${flip ? -s : s} ${s})">
    <defs>
      <linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${a}"/><stop offset=".45" stop-color="${b}"/><stop offset="1" stop-color="${c}"/>
      </linearGradient>
      <clipPath id="${id}c"><path d="${body}"/></clipPath>
    </defs>
    <ellipse cx="0" cy="30" rx="96" ry="10" fill="#0B2545" opacity=".14"/>
    <path d="${body}" fill="url(#${id})"/>
    ${tone === 'raw' ? `<path d="M-74,0 C-20,-4 40,-4 92,-2" stroke="#E98C8C" stroke-width="7" opacity=".6" fill="none" clip-path="url(#${id}c)"/>` : ''}
    ${spots}${grill}
    <path d="M58,-22 Q48,0 58,22" stroke="#00000033" stroke-width="3" fill="none"/>
    <path d="M-10,-30 q20,-16 44,-6" fill="${a}" opacity=".9"/>
    <circle cx="74" cy="-7" r="6.5" fill="#fff"/><circle cx="75" cy="-7" r="3.6" fill="#13202F"/>
    <path d="M-60,-16 C-10,-30 50,-28 80,-14" stroke="#fff" stroke-opacity=".35" stroke-width="5" fill="none" stroke-linecap="round"/>
  </g>`;
}

const lemon = (x, y, r = 16, rot = 0) => `
  <g transform="translate(${x} ${y}) rotate(${rot})">
    <path d="M${-r},0 A${r},${r} 0 0 1 ${r},0 Z" fill="#FFE066" stroke="#F2C230" stroke-width="3"/>
    <path d="M0,0 L${-r * 0.6},${-r * 0.6} M0,0 L0,${-r * 0.85} M0,0 L${r * 0.6},${-r * 0.6}" stroke="#F7D24A" stroke-width="2"/>
  </g>`;

const leaf = (x, y, r = 14, rot = 0, c = '#4CA64C') => `<path transform="translate(${x} ${y}) rotate(${rot})" d="M0,0 C${r * 0.6},${-r * 0.7} ${r * 1.6},${-r * 0.5} ${r * 2},0 C${r * 1.6},${r * 0.5} ${r * 0.6},${r * 0.7} 0,0 Z" fill="${c}"/>`;

const greens = (cx, cy, count = 7, spread = 60) =>
  Array.from({ length: count }, (_, i) => leaf(cx + Math.cos(i * 2.1) * spread * 0.5, cy + Math.sin(i * 1.7) * spread * 0.2, 12 + (i % 3) * 3, i * 47, i % 2 ? '#4CA64C' : '#78C25A')).join('');

const tomato = (x, y, r = 14) => `<g><circle cx="${x}" cy="${y}" r="${r}" fill="#E8412E"/><circle cx="${x}" cy="${y}" r="${r * 0.6}" fill="#F26B4F"/><circle cx="${x - r * 0.3}" cy="${y - r * 0.3}" r="${r * 0.18}" fill="#FFD8C7"/></g>`;

const steam = () => `<g class="steam" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7">
  <path d="M170,70 q-12,-16 0,-32 q12,-16 0,-32"/><path d="M200,62 q-12,-16 0,-32 q12,-16 0,-32"/><path d="M230,70 q-12,-16 0,-32 q12,-16 0,-32"/></g>`;

/** Tabak sahnesi zemin */
function plateWrap(inner, { plate = 'round', bg = '#DCEEF6', plateColor = '#FFFFFF', hot = false } = {}) {
  const id = uid('p');
  const p = {
    round: `<ellipse cx="200" cy="176" rx="160" ry="98" fill="#0B2545" opacity=".14"/>
            <ellipse cx="200" cy="164" rx="158" ry="96" fill="${plateColor}"/>
            <ellipse cx="200" cy="164" rx="124" ry="72" fill="url(#${id}pl)"/>`,
    oval: `<ellipse cx="200" cy="180" rx="182" ry="82" fill="#0B2545" opacity=".14"/>
           <ellipse cx="200" cy="168" rx="180" ry="80" fill="${plateColor}"/>
           <ellipse cx="200" cy="168" rx="150" ry="60" fill="url(#${id}pl)"/>`,
    board: `<rect x="40" y="70" width="320" height="190" rx="26" fill="#0B2545" opacity=".14" transform="translate(4 8)"/>
            <rect x="40" y="70" width="320" height="190" rx="26" fill="#C98D55"/>
            <path d="M60,110 H340 M60,160 H340 M60,210 H340" stroke="#B57A45" stroke-width="2" opacity=".6"/>`,
    none: '',
  }[plate];
  return `
  <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <defs>
      <radialGradient id="${id}bg" cx=".5" cy=".4" r=".8"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="${bg}"/></radialGradient>
      <radialGradient id="${id}pl" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#EEF3F6"/></radialGradient>
    </defs>
    <rect width="400" height="300" fill="url(#${id}bg)"/>
    <g opacity=".35" stroke="#FFFFFF" stroke-width="2">${Array.from({ length: 9 }, (_, i) => `<path d="M${i * 50},0 V300"/>`).join('')}</g>
    ${p}
    ${inner}
    ${hot ? steam() : ''}
  </svg>`;
}

/* ============ RESTORAN TABAKLARI ============ */
const DISHES = {
  grilled: () => plateWrap(`${greens(130, 200, 8, 120)}${fishSide(205, 160, 230, { tone: 'grilled', rot: -4 })}
    ${lemon(310, 200, 18, 10)}${lemon(96, 140, 14, -30)}
    <path d="M110,212 q30,-14 60,4" stroke="#E8412E" stroke-width="12" stroke-linecap="round" fill="none"/>`, { plate: 'oval', hot: true }),

  kiremit: () => plateWrap(`
    <ellipse cx="200" cy="170" rx="172" ry="80" fill="#9B4426"/><ellipse cx="200" cy="164" rx="160" ry="70" fill="#C7613A"/>
    <ellipse cx="200" cy="166" rx="140" ry="56" fill="#D9472C"/>
    ${fishSide(200, 160, 220, { tone: 'grilled' })}
    ${tomato(110, 190, 14)}${tomato(290, 186, 13)}${tomato(260, 138, 11)}
    <path d="M120,140 q20,-8 40,0 M250,200 q20,-8 40,0" stroke="#3E9B43" stroke-width="7" stroke-linecap="round" fill="none"/>
    <g fill="#FFD7A8"><circle cx="150" cy="200" r="5"/><circle cx="240" cy="132" r="4"/><circle cx="300" cy="160" r="5"/></g>`, { plate: 'none', hot: true }),

  guvec: () => plateWrap(`
    <ellipse cx="200" cy="184" rx="140" ry="74" fill="#0B2545" opacity=".15"/>
    <ellipse cx="200" cy="170" rx="136" ry="72" fill="#8E3E22"/><ellipse cx="200" cy="160" rx="120" ry="60" fill="#B2532E"/>
    <ellipse cx="200" cy="160" rx="104" ry="50" fill="#D2552F"/>
    <g fill="#F2A66B"><rect x="150" y="140" width="40" height="22" rx="6"/><rect x="210" y="150" width="44" height="22" rx="6" transform="rotate(12 232 161)"/><rect x="180" y="170" width="38" height="20" rx="6"/></g>
    <g fill="#F7C548"><circle cx="135" cy="160" r="9"/><circle cx="262" cy="140" r="9"/><circle cx="240" cy="182" r="8"/></g>
    <g fill="#F28C38"><rect x="120" y="140" width="18" height="8" rx="4"/><rect x="270" y="170" width="18" height="8" rx="4"/></g>
    ${leaf(196, 132, 10, -20, '#3E9B43')}${leaf(150, 182, 9, 30, '#3E9B43')}`, { plate: 'none', hot: true }),

  oven: () => plateWrap(`
    <rect x="34" y="78" width="332" height="176" rx="22" fill="#5C6B7A"/><rect x="44" y="86" width="312" height="160" rx="16" fill="#3F4B57"/>
    <rect x="52" y="94" width="296" height="144" rx="12" fill="#F1E3C6"/>
    ${fishSide(200, 164, 230, { tone: 'gold', rot: 3 })}
    ${[110, 200, 290].map((x) => `<circle cx="${x}" cy="160" r="12" fill="#FFE066" stroke="#F2C230" stroke-width="3" opacity=".9"/>`).join('')}
    ${leaf(90, 210, 14, 10, '#4E7A3A')}${leaf(280, 120, 14, 200, '#4E7A3A')}
    ${tomato(100, 120, 11)}${tomato(310, 214, 11)}`, { plate: 'none', hot: true }),

  fillet: () => plateWrap(`
    <g fill="#D8B26E">${Array.from({ length: 40 }, (_, i) => `<circle cx="${148 + Math.cos(i * 2.4) * (i % 7) * 7}" cy="${172 + Math.sin(i * 2.4) * (i % 7) * 3.6}" r="4.2"/>`).join('')}</g>
    <ellipse cx="148" cy="174" rx="44" ry="26" fill="#C99A52" opacity=".3"/>
    ${[0, 1].map((i) => `<g transform="translate(${240 + i * 26} ${148 + i * 30}) rotate(-12)">
      <rect x="-56" y="-18" width="112" height="36" rx="18" fill="#F28C6B"/>
      <path d="M-40,-14 q6,14 0,28 M-20,-16 q6,16 0,32 M0,-17 q6,17 0,34 M20,-16 q6,16 0,32 M40,-14 q6,14 0,28" stroke="#FFC2A6" stroke-width="3" fill="none"/>
      <rect x="-56" y="-18" width="112" height="8" rx="4" fill="#B5532F" opacity=".6"/></g>`).join('')}
    <g fill="#C8462B"><circle cx="230" cy="140" r="2.5"/><circle cx="262" cy="152" r="2.5"/><circle cx="276" cy="186" r="2.5"/></g>
    ${leaf(300, 120, 9, 0, '#3E9B43')}${leaf(120, 130, 9, 140, '#3E9B43')}`, { hot: true }),

  sauce: () => plateWrap(`
    <path d="M90,170 C120,110 280,110 310,170 C280,220 120,220 90,170 Z" fill="#7A1E2C" opacity=".85"/>
    <g transform="translate(200 162) rotate(-6)"><rect x="-70" y="-22" width="140" height="44" rx="22" fill="#F28C6B"/>
      <path d="M-50,-18 q6,18 0,36 M-25,-20 q6,20 0,40 M0,-21 q6,21 0,42 M25,-20 q6,20 0,40 M50,-18 q6,18 0,36" stroke="#FFC2A6" stroke-width="3" fill="none"/></g>
    <g fill="#C08A55"><path d="M150,200 q8,-10 16,0 q-8,10 -16,0Z"/><path d="M240,130 q8,-10 16,0 q-8,10 -16,0Z"/><path d="M270,196 q8,-10 16,0 q-8,10 -16,0Z"/></g>
    <g fill="#E8343E"><circle cx="130" cy="150" r="5"/><circle cx="286" cy="160" r="5"/><circle cx="200" cy="208" r="5"/></g>
    ${leaf(210, 128, 11, -30, '#3EA35E')}${leaf(222, 130, 9, 20, '#5EC07A')}`, { hot: true }),

  burger: () => plateWrap(`
    <g transform="translate(170 0)">
      <ellipse cx="0" cy="232" rx="90" ry="14" fill="#0B2545" opacity=".14"/>
      <path d="M-82,206 Q0,236 82,206 L80,220 Q0,246 -80,220 Z" fill="#D9963F"/>
      <path d="M-86,190 q20,14 40,0 t40,0 t40,0 t40,0 L86,206 L-86,206 Z" fill="#5EB84A"/>
      <rect x="-84" y="160" width="168" height="36" rx="18" fill="#C27A3E"/>
      <path d="M-70,170 h140" stroke="#E7A868" stroke-width="3" opacity=".7"/>
      <path d="M-88,156 q22,18 44,4 t44,4 t44,-4 t44,4 L88,166 L-88,166 Z" fill="#FFF1D6"/>
      <rect x="-80" y="146" width="160" height="14" rx="6" fill="#E8412E"/>
      <path d="M-84,146 C-84,80 84,80 84,146 Z" fill="#E3A24E"/>
      <path d="M-60,120 C-50,96 50,96 60,120" stroke="#F5C27A" stroke-width="8" fill="none" opacity=".6"/>
      <g fill="#FFF6E0"><ellipse cx="-30" cy="108" rx="4" ry="2.4"/><ellipse cx="0" cy="100" rx="4" ry="2.4"/><ellipse cx="28" cy="108" rx="4" ry="2.4"/><ellipse cx="14" cy="122" rx="4" ry="2.4"/><ellipse cx="-14" cy="120" rx="4" ry="2.4"/></g>
    </g>
    <g transform="translate(310 160)">
      <path d="M-34,10 L-26,80 L26,80 L34,10 Z" fill="#E8412E"/>
      ${[-24, -14, -4, 6, 16, 24].map((x, i) => `<rect x="${x}" y="${-16 - (i % 3) * 8}" width="9" height="40" rx="3" fill="#F7C548" transform="rotate(${(i - 3) * 5} ${x} 10)"/>`).join('')}
      <path d="M-34,10 L-26,80 L26,80 L34,10 Z" fill="#E8412E"/>
      <text x="0" y="56" text-anchor="middle" font-size="16" font-weight="800" fill="#fff" font-family="sans-serif">K</text>
    </g>`, { plate: 'board' }),

  balls: () => plateWrap(`
    ${greens(200, 200, 6, 160)}
    ${[[150, 150], [200, 140], [250, 150], [130, 186], [180, 186], [230, 186], [272, 184], [200, 214]].map(([x, y]) => `
      <circle cx="${x}" cy="${y}" r="22" fill="#9C5A2E"/><circle cx="${x - 6}" cy="${y - 7}" r="8" fill="#C27A3E" opacity=".8"/>
      <path d="M${x - 12},${y + 4} l24,-8" stroke="#5C3315" stroke-width="3" opacity=".6"/>`).join('')}
    <g stroke="#B04A7A" stroke-width="4" fill="none"><ellipse cx="300" cy="140" rx="16" ry="8"/><ellipse cx="110" cy="146" rx="14" ry="7"/></g>
    ${tomato(320, 190, 14)}`, { hot: true }),

  manti: () => plateWrap(`
    <ellipse cx="200" cy="166" rx="120" ry="66" fill="#FBFAF4"/>
    ${Array.from({ length: 24 }, (_, i) => { const x = 120 + (i % 6) * 32 + ((i / 6 | 0) % 2) * 12; const y = 128 + (i / 6 | 0) * 22; return `<rect x="${x}" y="${y}" width="18" height="18" rx="5" transform="rotate(45 ${x + 9} ${y + 9})" fill="#F6DDAE" stroke="#E0BA78" stroke-width="2"/>`; }).join('')}
    <path d="M120,150 C160,130 180,190 220,160 S280,140 300,170" stroke="#D9472C" stroke-width="8" fill="none" opacity=".85" stroke-linecap="round"/>
    <g fill="#8E1D14"><circle cx="170" cy="150" r="2.5"/><circle cx="240" cy="176" r="2.5"/><circle cx="210" cy="138" r="2.5"/></g>
    ${leaf(260, 128, 9, 0, '#3E9B43')}`, { hot: true }),

  pasta: () => plateWrap(`
    ${Array.from({ length: 12 }, (_, i) => `<ellipse cx="200" cy="164" rx="${100 - i * 7}" ry="${56 - i * 4}" fill="none" stroke="${i % 2 ? '#F2D27A' : '#F7DE94'}" stroke-width="7" transform="rotate(${i * 13} 200 164)"/>`).join('')}
    <g fill="#F28C6B">${[[160, 140], [230, 150], [190, 186], [250, 182], [146, 176]].map(([x, y]) => `<rect x="${x}" y="${y}" width="22" height="14" rx="6"/>`).join('')}</g>
    <g stroke="#3E9B43" stroke-width="2.5">${[[170, 160], [214, 140], [236, 170], [180, 196]].map(([x, y]) => `<path d="M${x},${y} l6,-8 m-6,8 l8,-2 m-8,2 l2,-9"/>`).join('')}</g>
    <g fill="#FFE066"><circle cx="120" cy="134" r="5"/><circle cx="282" cy="196" r="5"/></g>`, { hot: true }),

  pizza: () => plateWrap(`
    <circle cx="200" cy="160" r="118" fill="#D9963F"/><circle cx="200" cy="160" r="102" fill="#E04A2E"/>
    <circle cx="200" cy="160" r="98" fill="#F5D88E" opacity=".6"/>
    ${[[160, 120], [240, 130], [200, 190], [140, 180], [260, 196], [210, 100]].map(([x, y]) => `<path d="M${x - 16},${y} q16,-14 32,0 q-16,10 -32,0Z" fill="#F28C6B"/>`).join('')}
    <g fill="#5A2D82" opacity=".8">${[[180, 150], [250, 160], [150, 210], [230, 214]].map(([x, y]) => `<path d="M${x},${y} a10,10 0 1 1 14,0" stroke="#7B3FA8" stroke-width="3" fill="none"/>`).join('')}</g>
    <g fill="#4A7A2E">${[[200, 140], [170, 200], [244, 110], [262, 176]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4"/>`).join('')}</g>
    ${greens(200, 160, 5, 80)}
    <path d="M200,160 L300,100 M200,160 L200,42 M200,160 L100,100" stroke="#C27A3E" stroke-width="2" opacity=".5"/>`, { plate: 'board' }),

  durum: () => plateWrap(`
    <g transform="rotate(-18 200 160)">
      <rect x="70" y="124" width="250" height="72" rx="36" fill="#F2DDB0"/>
      <path d="M90,130 q20,30 0,60 M140,128 q20,32 0,64 M190,128 q20,32 0,64 M240,128 q20,32 0,64" stroke="#E2C48B" stroke-width="3" fill="none"/>
      <ellipse cx="320" cy="160" rx="22" ry="36" fill="#F7E7C5"/>
      <circle cx="318" cy="150" r="10" fill="#5EB84A"/><circle cx="326" cy="168" r="9" fill="#F28C6B"/><circle cx="312" cy="172" r="7" fill="#E8412E"/>
      ${[[110, 140], [180, 176], [250, 138], [280, 182]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#C27A3E" opacity=".5"/>`).join('')}
    </g>
    <g transform="translate(320 220)"><rect x="-16" y="-34" width="32" height="56" rx="8" fill="#FFFFFF" stroke="#BFD9EA" stroke-width="3"/><text x="0" y="4" text-anchor="middle" font-size="10" font-weight="800" fill="#1E88C8" font-family="sans-serif">AYRAN</text></g>`, { plate: 'board' }),

  ravioli: () => plateWrap(`
    ${Array.from({ length: 9 }, (_, i) => { const x = 136 + (i % 3) * 46; const y = 116 + (i / 3 | 0) * 38; return `<g transform="rotate(${(i % 2) * 8 - 4} ${x + 18} ${y + 16})"><rect x="${x}" y="${y}" width="38" height="34" rx="6" fill="#F6DDAE" stroke="#E0BA78" stroke-width="3" stroke-dasharray="4 3"/><ellipse cx="${x + 19}" cy="${y + 17}" rx="10" ry="8" fill="#F9E7C4"/></g>`; }).join('')}
    <path d="M110,200 C160,214 250,214 300,196" stroke="#F2C230" stroke-width="7" fill="none" opacity=".8" stroke-linecap="round"/>
    ${leaf(286, 118, 12, 40, '#7E9E7A')}${leaf(120, 128, 12, -150, '#7E9E7A')}`, { hot: true }),

  crispy: () => plateWrap(`
    ${[[150, 150], [190, 132], [230, 146], [170, 180], [212, 176], [250, 182], [140, 196]].map(([x, y], i) => `<path transform="translate(${x} ${y}) rotate(${i * 30})" d="M-24,0 C-24,-16 24,-18 26,0 C26,14 -22,16 -24,0Z" fill="#E3A24E" stroke="#C27A3E" stroke-width="3"/>`).join('')}
    ${[[270, 130], [284, 140], [296, 128], [276, 150], [292, 156]].map(([x, y], i) => `<rect x="${x}" y="${y}" width="8" height="40" rx="3" fill="#F7C548" transform="rotate(${i * 12 - 20} ${x} ${y})"/>`).join('')}
    <ellipse cx="116" cy="140" rx="26" ry="16" fill="#FFFFFF" stroke="#D7E7F2" stroke-width="3"/><ellipse cx="116" cy="138" rx="20" ry="11" fill="#F4F0D8"/>
    <g fill="#5EB84A"><circle cx="110" cy="136" r="2"/><circle cx="122" cy="140" r="2"/></g>
    ${lemon(290, 210, 16, 0)}`, { plate: 'oval', hot: true }),

  'can-tuna': () => canScene('#0B2545', '#2EC4B6', 'TON'),
  'can-trout': () => canScene('#1E88C8', '#FFFFFF', 'ALABALIK'),

  smoked: () => plateWrap(`
    ${Array.from({ length: 7 }, (_, i) => `<path transform="translate(${110 + i * 30} ${160 + Math.sin(i) * 8}) rotate(${-30 + i * 10})" d="M-14,-40 C10,-40 18,-10 14,40 C-4,42 -18,10 -14,-40Z" fill="${i % 2 ? '#F28C6B' : '#F7A07F'}" stroke="#E0704F" stroke-width="2"/>`).join('')}
    ${lemon(316, 120, 16, 20)}${leaf(90, 120, 12, -30, '#3E9B43')}
    <g fill="#5A3A20"><circle cx="300" cy="216" r="3"/><circle cx="310" cy="222" r="3"/><circle cx="292" cy="224" r="3"/></g>`, { plate: 'board' }),

  jar: () => plateWrap(jarShape(200, 150, '#C8462B', 'SOSLU'), { plate: 'none' }),

  chips: () => bowl(Array.from({ length: 12 }, (_, i) => `<path transform="translate(${140 + (i * 41) % 120} ${120 + (i * 17) % 50}) rotate(${i * 33})" d="M-16,-12 L18,-6 L-4,18 Z" fill="${i % 2 ? '#F2C14E' : '#E9A93A'}" stroke="#C88A1E" stroke-width="2"/>`).join('')),

  crackers: () => bowl(Array.from({ length: 10 }, (_, i) => `<g transform="translate(${140 + (i * 37) % 120} ${120 + (i * 19) % 50}) rotate(${i * 28})"><path d="M14,0 C6,-10 -8,-10 -14,0 L-22,-8 L-20,0 L-22,8 L-14,0 C-8,10 6,10 14,0Z" fill="#F2B544" stroke="#C88A1E" stroke-width="2"/><circle cx="8" cy="-2" r="1.6" fill="#7A4A21"/></g>`).join('')),

  spread: () => plateWrap(`
    <ellipse cx="170" cy="168" rx="80" ry="46" fill="#FFFFFF" stroke="#D7E7F2" stroke-width="4"/>
    <ellipse cx="170" cy="164" rx="64" ry="34" fill="#F6C3A8"/>
    <path d="M130,164 C150,150 190,176 210,160" stroke="#E79B7A" stroke-width="5" fill="none"/>
    <g stroke="#3E9B43" stroke-width="2.5"><path d="M160,150 l6,-8 m-6,8 l8,-2"/><path d="M186,170 l6,-8 m-6,8 l8,-2"/></g>
    ${[0, 1, 2].map((i) => `<rect x="${262 + i * 8}" y="${110 + i * 34}" width="80" height="30" rx="10" fill="#E3B06A" stroke="#C27A3E" stroke-width="3" transform="rotate(${-10 + i * 6} 300 ${124 + i * 34})"/>`).join('')}`, { plate: 'board' }),

  bites: () => bowl(Array.from({ length: 9 }, (_, i) => `<path transform="translate(${146 + (i * 37) % 110} ${120 + (i * 21) % 50}) rotate(${i * 40})" d="M-18,0 C-18,-12 18,-14 20,0 C20,12 -16,12 -18,0Z" fill="#E3A24E" stroke="#C27A3E" stroke-width="3"/>`).join(''), true),

  meze: () => plateWrap(`
    ${[[120, 150, '#F6C3A8'], [210, 130, '#E9EFD9'], [300, 150, '#F28C6B']].map(([x, y, c], i) => `
      <ellipse cx="${x}" cy="${y + 16}" rx="52" ry="30" fill="#0B2545" opacity=".12"/>
      <ellipse cx="${x}" cy="${y + 10}" rx="52" ry="30" fill="#FFFFFF" stroke="#D7E7F2" stroke-width="3"/>
      <ellipse cx="${x}" cy="${y + 6}" rx="40" ry="20" fill="${c}"/>
      ${i === 1 ? greens(x, y + 6, 4, 40) : ''}${i === 2 ? `<path d="M${x - 24},${y + 6} q24,-12 48,0" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/>` : ''}`).join('')}
    ${lemon(210, 220, 16, 0)}`, { plate: 'board' }),
};

function bowl(inner, hot = false) {
  return plateWrap(`
    <ellipse cx="200" cy="200" rx="130" ry="40" fill="#0B2545" opacity=".14"/>
    <path d="M80,150 C80,230 320,230 320,150 Z" fill="#1E88C8"/>
    <path d="M80,150 C80,230 320,230 320,150" stroke="#0F4C81" stroke-width="4" fill="none"/>
    <path d="M100,186 q25,-10 50,0 t50,0 t50,0 t50,0" stroke="#7FD8F0" stroke-width="3" fill="none" opacity=".7"/>
    <ellipse cx="200" cy="150" rx="120" ry="34" fill="#F7F0DC"/>
    ${inner}`, { plate: 'none', hot });
}

function canScene(color, accent, label) {
  return plateWrap(`
    <g transform="translate(200 160)">
      <ellipse cx="0" cy="66" rx="98" ry="22" fill="#0B2545" opacity=".15"/>
      <path d="M-92,-30 V44 A92,22 0 0 0 92,44 V-30 Z" fill="${color}"/>
      <path d="M-92,-6 H92 M-92,30 H92" stroke="${accent}" stroke-width="3" opacity=".5"/>
      <ellipse cx="0" cy="-30" rx="92" ry="22" fill="#C7CED6"/><ellipse cx="0" cy="-30" rx="80" ry="17" fill="#E3E8ED"/>
      <rect x="-26" y="-36" width="52" height="12" rx="6" fill="#AEB7C1"/>
      <text x="0" y="22" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="22" fill="${accent}">${label}</text>
      <text x="0" y="-4" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="11" letter-spacing="3" fill="${accent}" opacity=".85">KEBALA</text>
    </g>`, { plate: 'none' });
}

function jarShape(cx, cy, color, label) {
  return `
  <g transform="translate(${cx} ${cy})">
    <ellipse cx="0" cy="96" rx="80" ry="14" fill="#0B2545" opacity=".15"/>
    <rect x="-56" y="-86" width="112" height="28" rx="6" fill="${color}"/>
    <path d="M-66,-56 H66 V76 Q66,96 46,96 H-46 Q-66,96 -66,76 Z" fill="#F7C6AE" opacity=".95"/>
    <path d="M-66,-56 H66 V76 Q66,96 46,96 H-46 Q-66,96 -66,76 Z" fill="none" stroke="#FFFFFF" stroke-width="4" opacity=".5"/>
    <rect x="-58" y="-16" width="116" height="62" rx="8" fill="#FFFFFF"/>
    <text x="0" y="10" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="11" letter-spacing="3" fill="#1E88C8">KEBALA</text>
    <text x="0" y="34" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="18" fill="${color}">${label}</text>
    <path d="M-50,-46 v110" stroke="#FFFFFF" stroke-width="8" opacity=".35" stroke-linecap="round"/>
  </g>`;
}

export function dish(type) {
  return (DISHES[type] || DISHES.grilled)();
}

/* ============ AMBALAJLAR ============ */

/** Küçük sekiz köşeli şapka ikonu (marka imzası) */
const hatIcon = (x, y, s = 1, c = '#FFFFFF') => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-14,-12 L-10,-16 L0,-18 L10,-16 L14,-12 L16,6 L-16,6 Z" fill="none" stroke="${c}" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M-16,2 H16 M-5,-17 L-6,6 M5,-17 L6,6" stroke="${c}" stroke-width="2"/>
  </g>`;

function motif(m, x, y, s = 1) {
  const g = (inner) => `<g transform="translate(${x} ${y}) scale(${s})">${inner}</g>`;
  switch (m) {
    case 'whole': return fishSide(x, y, 150 * s, { tone: 'raw' });
    case 'smoked': return fishSide(x, y, 150 * s, { tone: 'smoked' });
    case 'fillet': return g(`<rect x="-60" y="-18" width="120" height="36" rx="18" fill="#F28C6B"/><path d="M-40,-14 q6,14 0,28 M-15,-16 q6,16 0,32 M10,-16 q6,16 0,32 M35,-14 q6,14 0,28" stroke="#FFC2A6" stroke-width="3" fill="none"/>`);
    case 'balls': return g([-36, 0, 36].map((cx) => `<circle cx="${cx}" cy="0" r="18" fill="#9C5A2E"/><circle cx="${cx - 5}" cy="-6" r="6" fill="#C27A3E"/>`).join(''));
    case 'manti': return g([-30, 0, 30].map((cx) => `<rect x="${cx - 10}" y="-10" width="20" height="20" rx="5" transform="rotate(45 ${cx} 0)" fill="#F6DDAE" stroke="#E0BA78" stroke-width="2"/>`).join(''));
    case 'burger': return g(`<path d="M-44,0 C-44,-34 44,-34 44,0 Z" fill="#E3A24E"/><rect x="-46" y="0" width="92" height="16" rx="8" fill="#9C5A2E"/><path d="M-44,20 H44 L40,30 H-40 Z" fill="#D9963F"/>`);
    case 'bites': return g([[-30, -6], [0, 6], [30, -4], [-12, -16], [16, -18]].map(([cx, cy], i) => `<path transform="translate(${cx} ${cy}) rotate(${i * 50})" d="M-14,0 C-14,-10 14,-11 16,0 C16,9 -12,10 -14,0Z" fill="#E3A24E" stroke="#C27A3E" stroke-width="2"/>`).join(''));
    case 'kiremit': return g(`<ellipse rx="60" ry="24" fill="#C7613A"/><ellipse rx="48" ry="16" fill="#D9472C"/>${fishSide(0, -2, 90, { tone: 'grilled' })}`);
    case 'crackers': return g([[-34, 0], [0, -10], [34, 2], [-14, 18], [20, 22]].map(([cx, cy], i) => `<g transform="translate(${cx} ${cy}) rotate(${i * 25})"><path d="M14,0 C6,-10 -8,-10 -14,0 L-22,-8 L-20,0 L-22,8 L-14,0 C-8,10 6,10 14,0Z" fill="#F2B544" stroke="#C88A1E" stroke-width="2"/></g>`).join(''));
    case 'chips': return g([[-30, 0], [0, -12], [28, 4], [-8, 18]].map(([cx, cy], i) => `<path transform="translate(${cx} ${cy}) rotate(${i * 40})" d="M-16,-12 L18,-6 L-4,18 Z" fill="#F2C14E" stroke="#C88A1E" stroke-width="2"/>`).join(''));
    case 'spread': return g(`<ellipse rx="40" ry="16" fill="#F6C3A8"/><path d="M-24,0 q24,-10 48,0" stroke="#E79B7A" stroke-width="4" fill="none"/>`);
    case 'bar': return g(`<rect x="-50" y="-14" width="100" height="28" rx="8" fill="#C27A3E"/><g fill="#E3B06A">${[-34, -14, 6, 26].map((cx) => `<circle cx="${cx}" cy="0" r="5"/>`).join('')}</g>`);
    case 'drop': return g(`<path d="M0,-30 C14,-10 22,2 22,12 A22,22 0 0 1 -22,12 C-22,2 -14,-10 0,-30Z" fill="#F7C548" stroke="#C88A1E" stroke-width="3"/>`);
    case 'tuna': return g(`<path d="M50,0 C30,-26 -20,-24 -40,0 L-56,-16 L-50,0 L-56,16 L-40,0 C-20,24 30,26 50,0Z" fill="#5D7A99"/><circle cx="36" cy="-4" r="3" fill="#fff"/>`);
    default: return '';
  }
}

function packBg(color) {
  const id = uid('bg');
  return { id, def: `<radialGradient id="${id}" cx=".5" cy=".35" r=".85"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="${color}" stop-opacity=".22"/></radialGradient>` };
}

export function pack(art = {}, name = '') {
  const { shape = 'box', color = '#1E88C8', accent = '#FFFFFF', motif: m = 'whole', label = '' } = art;
  const bg = packBg(color);
  const short = (label || name.replace(/^Kebala\s*/i, '').split(' ').slice(-1)[0] || '').toLocaleUpperCase('tr-TR');
  const brand = (x, y, c = accent, size = 13) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="800" font-size="${size}" letter-spacing="2" fill="${c}">KEBALA BALIK</text>`;
  let body = '';
  switch (shape) {
    case 'tray':
      body = `<rect x="66" y="86" width="268" height="160" rx="20" fill="#0B2545" opacity=".14" transform="translate(6 10)"/>
        <rect x="66" y="86" width="268" height="160" rx="20" fill="${color}"/>
        <rect x="82" y="100" width="236" height="104" rx="14" fill="#EAF6FB" opacity=".95"/>
        ${motif(m, 200, 152, 1)}
        <rect x="82" y="100" width="236" height="104" rx="14" fill="#fff" opacity=".18"/>
        ${brand(200, 230)}${hatIcon(300, 228, .8, accent)}`;
      break;
    case 'box':
      body = `<path d="M90,110 L130,78 H330 L290,110 Z" fill="${color}" opacity=".75"/>
        <path d="M290,110 L330,78 V218 L290,250 Z" fill="${color}" opacity=".55"/>
        <rect x="90" y="110" width="200" height="140" rx="6" fill="${color}"/>
        <rect x="104" y="124" width="172" height="70" rx="10" fill="#FFFFFF"/>
        ${motif(m, 190, 159, .8)}
        ${brand(190, 216)}
        <text x="190" y="238" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="11" fill="${accent}" opacity=".9">${short}</text>`;
      break;
    case 'pouch':
      body = `<path d="M110,70 H290 L300,250 Q200,268 100,250 Z" fill="#0B2545" opacity=".14" transform="translate(6 8)"/>
        <path d="M110,70 H290 L300,250 Q200,268 100,250 Z" fill="${color}"/>
        <path d="M110,70 H290 V86 H110 Z" fill="#FFFFFF" opacity=".25"/>
        <path d="M120,92 H280" stroke="#FFFFFF" stroke-dasharray="6 5" stroke-width="2" opacity=".6"/>
        <ellipse cx="200" cy="160" rx="82" ry="48" fill="#FFFFFF" opacity=".95"/>
        ${motif(m, 200, 160, .85)}
        ${brand(200, 232, accent)}`;
      break;
    case 'bag':
      body = `<path d="M100,76 Q200,62 300,76 L310,250 Q200,266 90,250 Z" fill="${color}"/>
        <path d="M100,76 Q200,62 300,76 L300,92 Q200,80 100,92 Z" fill="#000" opacity=".12"/>
        <circle cx="200" cy="160" r="62" fill="#FFFFFF"/>
        ${motif(m, 200, 160, .8)}
        ${brand(200, 242, accent)}${hatIcon(200, 108, .9, accent)}`;
      break;
    case 'snackbox':
      body = `<g transform="rotate(-4 200 160)">
        <rect x="110" y="60" width="180" height="200" rx="14" fill="#0B2545" opacity=".16" transform="translate(8 8)"/>
        <rect x="110" y="60" width="180" height="200" rx="14" fill="${color}"/>
        <path d="M110,200 q45,-26 90,0 t90,0 V260 H110 Z" fill="${accent}" opacity=".2"/>
        ${[[130, 84], [270, 100], [140, 236], [262, 232]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="#FFFFFF" opacity=".6"/>`).join('')}
        <text x="200" y="104" text-anchor="middle" font-family="'Bricolage Grotesque', sans-serif" font-weight="800" font-size="30" fill="${accent}">${short}</text>
        ${motif(m, 200, 150, .8)}
        <rect x="128" y="188" width="144" height="26" rx="13" fill="${accent}"/>
        <text x="200" y="206" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="800" font-size="12" letter-spacing="2" fill="${color}">KEBALA BALIK</text>
        <svg x="232" y="196" width="60" height="70" viewBox="-140 20 280 600">${mascotHead()}</svg>
      </g>`;
      break;
    case 'chipsbag':
      body = `<g transform="rotate(3 200 160)">
        <path d="M118,56 L282,56 Q296,160 282,264 L118,264 Q104,160 118,56 Z" fill="#0B2545" opacity=".16" transform="translate(8 8)"/>
        <path d="M118,56 L282,56 Q296,160 282,264 L118,264 Q104,160 118,56 Z" fill="${color}"/>
        <path d="M118,56 h164 v10 h-164 Z M118,254 h164 v10 h-164 Z" fill="#000" opacity=".15"/>
        <path d="M120,62 l8,-6 l8,6 l8,-6 l8,6 l8,-6 l8,6 l8,-6 l8,6 l8,-6 l8,6 l8,-6 l8,6 l8,-6 l8,6 l8,-6 l8,6 l8,-6 l8,6 l8,-6 l8,6" stroke="#fff" stroke-width="2" fill="none" opacity=".5"/>
        <circle cx="200" cy="150" r="62" fill="${accent}"/>
        ${motif(m, 200, 150, .85)}
        <text x="200" y="92" text-anchor="middle" font-family="'Bricolage Grotesque', sans-serif" font-weight="800" font-size="30" fill="#FFFFFF" stroke="#0B2545" stroke-width="1.5" paint-order="stroke">${short}</text>
        <rect x="132" y="222" width="136" height="24" rx="12" fill="#0B2545"/>
        <text x="200" y="239" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="800" font-size="11" letter-spacing="2" fill="#FFFFFF">KEBALA BALIK</text>
        <path d="M130,80 Q124,160 130,240" stroke="#fff" stroke-width="10" opacity=".22" fill="none" stroke-linecap="round"/>
      </g>`;
      break;
    case 'jar':
      body = jarShape(200, 160, color, short);
      break;
    case 'bar':
      body = `<g transform="rotate(-10 200 160)">
        <path d="M70,130 l10,-6 l-10,-6 v-0 H330 l-10,6 l10,6 v60 l-10,6 l10,6 H70 l10,-6 l-10,-6 Z" fill="${color}"/>
        <rect x="120" y="128" width="160" height="66" rx="12" fill="${accent}"/>
        ${motif(m, 200, 150, .7)}
        <text x="200" y="186" text-anchor="middle" font-family="'Bricolage Grotesque', sans-serif" font-weight="800" font-size="14" fill="${color}">${short}</text>
      </g>`;
      break;
    case 'bottle':
      body = `<rect x="174" y="58" width="52" height="30" rx="6" fill="${accent}"/>
        <path d="M150,96 Q150,86 166,86 H234 Q250,86 250,96 V250 Q250,264 236,264 H164 Q150,264 150,250 Z" fill="${color}"/>
        <rect x="158" y="136" width="84" height="90" rx="10" fill="#FFFFFF"/>
        ${motif(m, 200, 168, .8)}
        <text x="200" y="214" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="13" fill="${accent}">AR-GE</text>
        <path d="M162,100 V250" stroke="#fff" stroke-width="8" opacity=".25" stroke-linecap="round"/>`;
      break;
    case 'can':
      return canScene(color, accent, short);
    default: break;
  }
  return `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <defs>${bg.def}</defs><rect width="400" height="300" fill="url(#${bg.id})"/>
    <circle cx="340" cy="56" r="60" fill="${color}" opacity=".08"/><circle cx="50" cy="260" r="80" fill="${color}" opacity=".08"/>
    ${body}</svg>`;
}

/** Ambalajlar için minik maskot (erkek) */
let headCache = '';
function mascotHead() {
  if (!headCache) headCache = mascotSolo('male').replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  return headCache;
}

/* ============ HEDİYELİK EŞYALAR ============ */
function giftWrap(inner, bg = '#E3F4F8') {
  const id = uid('gb');
  return `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <defs><radialGradient id="${id}" cx=".5" cy=".4" r=".8"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="${bg}"/></radialGradient>
    <linearGradient id="${id}s" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#F4FBFF"/><stop offset=".5" stop-color="#B9D7E6"/><stop offset="1" stop-color="#7FA6BC"/></linearGradient>
    <linearGradient id="${id}n" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#E7FFFB"/><stop offset=".4" stop-color="#9FE6E0"/><stop offset=".7" stop-color="#F7C4D4"/><stop offset="1" stop-color="#C9E8FF"/></linearGradient></defs>
    <rect width="400" height="300" fill="url(#${id})"/>
    <ellipse cx="200" cy="262" rx="140" ry="14" fill="#0B2545" opacity=".1"/>
    ${inner.replaceAll('SILVER', `url(#${id}s)`).replaceAll('NACRE', `url(#${id}n)`)}</svg>`;
}

const scale = (x, y, r = 16, rot = 0) => `<path transform="translate(${x} ${y}) rotate(${rot})" d="M0,${-r} C${r * 0.9},${-r * 0.6} ${r},${r * 0.3} 0,${r} C${-r},${r * 0.3} ${-r * 0.9},${-r * 0.6} 0,${-r} Z" fill="NACRE" stroke="SILVER" stroke-width="3"/>`;

const GIFTS = {
  necklace: () => giftWrap(`<path d="M90,40 Q200,230 310,40" stroke="SILVER" stroke-width="3" fill="none" stroke-dasharray="2 4"/>
    ${scale(200, 180, 34)}${scale(170, 166, 14, -30)}${scale(230, 166, 14, 30)}
    <circle cx="200" cy="140" r="5" fill="SILVER"/>`),
  earrings: () => giftWrap(`${[140, 260].map((x) => `<path d="M${x},50 q-14,0 -14,14 q0,10 14,16" stroke="SILVER" stroke-width="4" fill="none"/><circle cx="${x}" cy="84" r="5" fill="SILVER"/>
    ${scale(x, 112, 20)}${scale(x, 158, 26)}${scale(x, 210, 18)}`).join('')}`),
  'keychain-fish': () => giftWrap(`<circle cx="200" cy="70" r="28" fill="none" stroke="SILVER" stroke-width="7"/><path d="M200,98 v24" stroke="SILVER" stroke-width="5"/>
    ${fishSide(200, 180, 210, { tone: 'raw', rot: -8 })}`),
  'keychain-logo': () => giftWrap(`<circle cx="200" cy="64" r="26" fill="none" stroke="SILVER" stroke-width="7"/><path d="M200,90 v20" stroke="SILVER" stroke-width="5"/>
    <rect x="130" y="110" width="140" height="130" rx="30" fill="#7A4A2A"/><rect x="140" y="120" width="120" height="110" rx="24" fill="none" stroke="#F2C14E" stroke-width="2" stroke-dasharray="5 4"/>
    ${hatIcon(200, 160, 2.2, '#F2C14E')}<text x="200" y="214" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="800" font-size="16" fill="#F2C14E">KEBALA</text>`, '#F5E9DC'),
  bracelet: () => giftWrap(`<ellipse cx="200" cy="160" rx="130" ry="64" fill="none" stroke="#13C4B9" stroke-width="7"/>
    <ellipse cx="200" cy="160" rx="130" ry="64" fill="none" stroke="#0B8F87" stroke-width="2" stroke-dasharray="4 6"/>
    ${[[88, 140], [140, 212], [200, 224], [260, 212], [312, 140]].map(([x, y], i) => `<g transform="translate(${x} ${y}) rotate(${i * 20 - 40}) scale(.45)"><path d="M50,0 C30,-26 -20,-24 -40,0 L-56,-16 L-50,0 L-56,16 L-40,0 C-20,24 30,26 50,0Z" fill="SILVER"/></g>`).join('')}`),
  wallet: () => giftWrap(`<rect x="90" y="80" width="220" height="150" rx="18" fill="#3E5A66"/>
    <g opacity=".55">${Array.from({ length: 40 }, (_, i) => `<path d="M${100 + (i % 8) * 26 + ((i / 8 | 0) % 2) * 13},${96 + (i / 8 | 0) * 26} q13,13 26,0" stroke="#9CC3CE" stroke-width="2" fill="none"/>`).join('')}</g>
    <path d="M90,150 H310 V214 Q310,230 294,230 H106 Q90,230 90,214 Z" fill="#2E4650"/>
    <rect x="270" y="140" width="50" height="34" rx="10" fill="#2E4650" stroke="#9CC3CE" stroke-width="2"/><circle cx="292" cy="157" r="6" fill="#F2C14E"/>
    <path d="M100,160 H300" stroke="#9CC3CE" stroke-width="2" stroke-dasharray="5 4"/>`, '#E6F0F2'),
  bag: () => giftWrap(`<path d="M150,110 C150,40 250,40 250,110" stroke="#5B3A29" stroke-width="10" fill="none"/>
    <path d="M100,110 H300 L284,250 Q200,262 116,250 Z" fill="#8C6B4F"/>
    <g opacity=".5">${Array.from({ length: 36 }, (_, i) => `<path d="M${116 + (i % 7) * 26 + ((i / 7 | 0) % 2) * 13},${126 + (i / 7 | 0) * 24} q13,13 26,0" stroke="#D9BFA0" stroke-width="2" fill="none"/>`).join('')}</g>
    <path d="M100,110 H300 L296,140 H104 Z" fill="#E9DCC6"/><circle cx="200" cy="140" r="9" fill="#F2C14E"/>`, '#F3EBE1'),
  'magnet-cayda': () => giftWrap(`<rect x="70" y="40" width="260" height="210" rx="28" fill="#FFFFFF" stroke="#D7E7F2" stroke-width="5"/>
    <rect x="86" y="56" width="228" height="178" rx="20" fill="#0B2545"/>
    ${Array.from({ length: 12 }, (_, i) => `<circle cx="${100 + (i * 53) % 200}" cy="${70 + (i * 31) % 60}" r="1.8" fill="#FFF7D6"/>`).join('')}
    <svg x="100" y="70" width="100" height="164" viewBox="-140 20 280 600">${mascotSolo('male').replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')}</svg>
    <svg x="200" y="70" width="100" height="164" viewBox="-140 20 280 600">${mascotSolo('female').replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')}</svg>
    ${[[118, 116], [282, 116]].map(([x, y]) => `<g><ellipse cx="${x}" cy="${y + 10}" rx="22" ry="6" fill="#C9CED6"/><rect x="${x - 3}" y="${y - 12}" width="6" height="22" fill="#FFF3D6"/><path d="M${x},${y - 26} q6,8 0,14 q-6,-6 0,-14" fill="#FFC14E"/></g>`).join('')}
    <text x="200" y="226" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="800" font-size="14" fill="#FFFFFF" letter-spacing="2">ÇAYDAÇIRA</text>`),
  'magnet-hat': () => giftWrap(`<circle cx="200" cy="150" r="104" fill="#FFFFFF" stroke="#D7E7F2" stroke-width="5"/>
    <g transform="translate(200 160) scale(1.25)">
      <path d="M-52,-36 L-37,-50 L0,-56 L37,-50 L52,-36 L60,44 Q0,62 -60,44 Z" fill="#5A0F1E"/>
      <polygon points="-52,-36 -37,-50 0,-56 37,-50 52,-36 37,-26 0,-22 -37,-26" fill="#7E1A2E" stroke="#E3B03F" stroke-width="3"/>
      <path d="M-37,-26 L-42,48 M0,-22 L0,54 M37,-26 L42,48" stroke="#E3B03F" stroke-width="2.4"/>
      <path d="M-60,30 Q0,48 60,30 L60,44 Q0,62 -60,44 Z" fill="#E3B03F"/>
    </g>`),
  decor: () => giftWrap(`<rect x="110" y="220" width="180" height="26" rx="6" fill="#B07A4F"/>
    <path d="M120,220 V110 Q120,70 160,70 H240 Q280,70 280,110 V220 Z" fill="#DFF6FA" opacity=".8" stroke="#BFE3EC" stroke-width="3"/>
    <path d="M120,150 L160,110 L190,136 L230,96 L280,146 V160 H120 Z" fill="#B88E6B"/>
    <path d="M120,160 H280 V220 H120 Z" fill="#2EC4B6"/>
    <path d="M120,176 q20,-8 40,0 t40,0 t40,0 t40,0" stroke="#FFFFFF" stroke-width="3" fill="none" opacity=".6"/>
    <path d="M120,196 q20,-8 40,0 t40,0 t40,0 t40,0" stroke="#1E88C8" stroke-width="3" fill="none" opacity=".6"/>
    <path d="M140,90 v110" stroke="#fff" stroke-width="8" opacity=".35" stroke-linecap="round"/>`),
  plush: () => giftWrap(`<svg x="70" y="22" width="130" height="250" viewBox="-140 20 280 600">${mascotSolo('male').replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')}</svg>
    <svg x="200" y="22" width="130" height="250" viewBox="-140 20 280 600">${mascotSolo('female').replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')}</svg>
    <g fill="none" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="3 4" opacity=".7"><ellipse cx="135" cy="160" rx="54" ry="110"/><ellipse cx="265" cy="160" rx="54" ry="110"/></g>`, '#FDEFF3'),
};

export function gift(type) {
  return (GIFTS[type] || GIFTS.necklace)();
}

/* ============ MANZARALAR ============ */
export function scene(type) {
  const id = uid('sc');
  const sky = `<linearGradient id="${id}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7EC8F2"/><stop offset="1" stop-color="#DFF4FB"/></linearGradient>
    <linearGradient id="${id}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2EC4B6"/><stop offset="1" stop-color="#0F4C81"/></linearGradient>`;
  const hills = `<path d="M0,250 L90,170 L160,210 L250,130 L340,200 L430,150 L520,210 L610,140 L700,200 L800,160 V300 H0 Z" fill="#B88E6B"/>
    <path d="M0,270 L120,210 L220,250 L330,190 L450,250 L560,200 L680,250 L800,210 V320 H0 Z" fill="#9C7556"/>
    <path d="M250,130 L272,150 L262,148 Z M610,140 L630,158 L618,156 Z" fill="#E8D5C0"/>`;
  if (type === 'waterfall') {
    return `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Çırçır Şelalesi'ni anlatan turkuaz şelale çizimi" preserveAspectRatio="xMidYMid slice">
      <defs>${sky}<linearGradient id="${id}fall" x1="0" x2="1"><stop offset="0" stop-color="#9FF0E8"/><stop offset=".5" stop-color="#FFFFFF"/><stop offset="1" stop-color="#7FE3DA"/></linearGradient></defs>
      <rect width="800" height="500" fill="url(#${id}sky)"/>${hills}
      <path d="M0,240 H800 V500 H0 Z" fill="#7A5A44"/>
      <path d="M0,240 C120,226 240,250 360,236 C480,222 620,248 800,234 V300 H0 Z" fill="#8E6B52"/>
      ${[[90, 300, 120], [250, 296, 140], [420, 304, 120], [580, 298, 150], [720, 304, 100]].map(([x, y, w]) => `<rect x="${x - w / 2}" y="${y - 50}" width="${w}" height="160" rx="12" fill="url(#${id}fall)" opacity=".92"/>
        <g stroke="#FFFFFF" stroke-width="3" opacity=".8" class="fall-lines">${[0, 1, 2, 3].map((k) => `<path d="M${x - w / 2 + 14 + k * (w - 28) / 3},${y - 40} v130"/>`).join('')}</g>`).join('')}
      <path d="M0,400 H800 V500 H0 Z" fill="url(#${id}w)"/>
      <path d="M0,404 q50,-14 100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0" stroke="#FFFFFF" stroke-width="6" fill="none" opacity=".7"/>
      ${greens(60, 250, 6, 120)}${greens(740, 250, 6, 120)}
    </svg>`;
  }
  if (type === 'fishing') {
    return `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Göl kıyısındaki iskelede oltayla balık tutan maskot çizimi" preserveAspectRatio="xMidYMid slice">
      <defs>${sky}<radialGradient id="${id}sun" cx=".8" cy=".2" r=".4"><stop offset="0" stop-color="#FFF4C2"/><stop offset="1" stop-color="#FFF4C2" stop-opacity="0"/></radialGradient></defs>
      <rect width="800" height="500" fill="url(#${id}sky)"/><rect width="800" height="500" fill="url(#${id}sun)"/>
      <circle cx="640" cy="90" r="40" fill="#FFE59A"/>
      ${hills}
      <path d="M0,280 H800 V500 H0 Z" fill="url(#${id}w)"/>
      ${[300, 340, 390, 450].map((y, i) => `<path d="M${i * 60},${y} q40,-10 80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0" stroke="#FFFFFF" stroke-width="3" fill="none" opacity="${0.5 - i * 0.08}"/>`).join('')}
      <path d="M0,360 H330 V378 H0 Z" fill="#8C5A35"/>
      ${[40, 120, 200, 280].map((x) => `<rect x="${x}" y="370" width="14" height="130" fill="#6E4527"/>`).join('')}
      <svg x="190" y="180" width="110" height="200" viewBox="-140 20 280 600">${mascotSolo('male').replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')}</svg>
      <path d="M282,250 Q420,120 560,170" stroke="#3B2A1E" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M560,170 V330" stroke="#0B2545" stroke-width="1.5"/>
      <circle cx="560" cy="330" r="8" fill="#E8412E"/><path d="M552,330 h16" stroke="#fff" stroke-width="3"/>
      <circle cx="560" cy="334" r="20" fill="none" stroke="#FFFFFF" stroke-width="2" opacity=".6" class="ripple"/>
      ${fishSide(660, 420, 120, { tone: 'raw', rot: -18 })}
    </svg>`;
  }
  // varsayılan: Keban Baraj Gölü
  return `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Kahverengi tepeler arasındaki turkuaz Keban Baraj Gölü çizimi" preserveAspectRatio="xMidYMid slice">
    <defs>${sky}</defs>
    <rect width="800" height="500" fill="url(#${id}sky)"/>
    <g fill="#FFFFFF" opacity=".85"><ellipse cx="160" cy="80" rx="60" ry="16"/><ellipse cx="200" cy="70" rx="40" ry="18"/><ellipse cx="560" cy="110" rx="70" ry="14"/></g>
    ${hills}
    <path d="M0,290 C200,270 600,300 800,280 V500 H0 Z" fill="url(#${id}w)"/>
    ${[310, 350, 400, 450].map((y, i) => `<path d="M${(i % 2) * 40},${y} q40,-10 80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0" stroke="#FFFFFF" stroke-width="3" fill="none" opacity="${0.55 - i * 0.1}"/>`).join('')}
    ${[[420, 340], [520, 360], [620, 330]].map(([x, y]) => `<g><circle cx="${x}" cy="${y}" r="26" fill="none" stroke="#E8EEF2" stroke-width="5"/><circle cx="${x}" cy="${y}" r="26" fill="#0B2545" opacity=".15"/><path d="M${x - 26},${y} h52 M${x},${y - 26} v52" stroke="#E8EEF2" stroke-width="2" opacity=".6"/></g>`).join('')}
    <text x="520" y="410" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" opacity=".85">yüzer ağ kafesler (temsilî)</text>
  </svg>`;
}

/* ============ LOGO ============ */
export function logo(size = 44) {
  const id = uid('lg');
  return `<svg width="${size}" height="${size}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2EC4B6"/><stop offset="1" stop-color="#1E88C8"/></linearGradient></defs>
    <circle cx="32" cy="32" r="31" fill="#0B2545"/>
    <path d="M6,40 q6.5,-5 13,0 t13,0 t13,0 t13,0 V52 Q32,68 6,52 Z" fill="url(#${id})" opacity=".9"/>
    <path d="M50,32 C44,22 28,21 18,28 L10,22 L12,32 L10,42 L18,36 C28,43 44,42 50,32 Z" fill="#F4F6F4"/>
    <path d="M14,32 C26,30 38,30 49,31" stroke="#EE8F93" stroke-width="3" fill="none"/>
    <circle cx="44" cy="30" r="2" fill="#0B2545"/>
    <path d="M24,14 L27,11 L32,10 L37,11 L40,14 L41,21 Q32,24 23,21 Z" fill="#B3262D" stroke="#F2C14E" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M23,19 Q32,22 41,19" stroke="#F2C14E" stroke-width="1.6" fill="none"/>
  </svg>`;
}
