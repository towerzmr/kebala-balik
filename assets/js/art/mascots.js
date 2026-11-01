/**
 * Kebala Balık maskotları — "Keban" (erkek) ve "Harput" (dişi) alabalık.
 * Saf SVG, 3D çizgi film görünümü için degrade ve ışık katmanları kullanır.
 *
 * mascotScene()  → iki maskot + "KEBALA BALIK" tabelası (ana sayfa)
 * mascotSolo()   → tek maskot (küçük kullanım alanları için)
 *
 * Profesyonel 3D render hazır olduğunda hero bölümündeki SVG yerine
 * <img src="assets/img/maskotlar.webp"> kullanılabilir.
 */

const BODY = 'M0,92 C58,92 97,150 97,236 C97,340 78,432 34,506 L-34,506 C-78,432 -97,340 -97,236 C-97,150 -58,92 0,92 Z';
const TAIL = 'M-30,492 C-52,536 -86,568 -98,600 C-58,592 -26,586 0,568 C26,586 58,592 98,600 C86,568 52,536 30,492 Z';

/** Ortak tanımlar: gövde renkleri, ışık, gölge filtreleri */
function defs(p) {
  return `
  <defs>
    <linearGradient id="${p}-skin" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#4F7440"/><stop offset=".16" stop-color="#86A75C"/>
      <stop offset=".27" stop-color="#EE8F93"/><stop offset=".37" stop-color="#F7F4EF"/>
      <stop offset=".63" stop-color="#F7F4EF"/><stop offset=".73" stop-color="#EE8F93"/>
      <stop offset=".84" stop-color="#86A75C"/><stop offset="1" stop-color="#4F7440"/>
    </linearGradient>
    <radialGradient id="${p}-shade" cx=".36" cy=".26" r=".85">
      <stop offset="0" stop-color="#fff" stop-opacity=".55"/>
      <stop offset=".35" stop-color="#fff" stop-opacity="0"/>
      <stop offset=".8" stop-color="#0B2545" stop-opacity=".18"/>
      <stop offset="1" stop-color="#0B2545" stop-opacity=".38"/>
    </radialGradient>
    <linearGradient id="${p}-tail" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#7E9E57"/><stop offset=".6" stop-color="#5B7F45"/><stop offset="1" stop-color="#E88A8F"/>
    </linearGradient>
    <radialGradient id="${p}-eye" cx=".4" cy=".35" r=".7">
      <stop offset="0" stop-color="#2A6FB0"/><stop offset=".55" stop-color="#0E3C6E"/><stop offset="1" stop-color="#061A33"/>
    </radialGradient>
    <linearGradient id="${p}-gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FFE29A"/><stop offset=".5" stop-color="#E3B03F"/><stop offset="1" stop-color="#A9761C"/>
    </linearGradient>
    <linearGradient id="${p}-cloth-shade" x1="0" x2="1">
      <stop offset="0" stop-color="#000" stop-opacity=".28"/><stop offset=".3" stop-color="#000" stop-opacity="0"/>
      <stop offset=".7" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".32"/>
    </linearGradient>
    <filter id="${p}-soft" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#0B2545" flood-opacity=".28"/>
    </filter>
    <clipPath id="${p}-clip"><path d="${BODY}"/></clipPath>
  </defs>`;
}

/** Benekler — gökkuşağı alabalığının siyah noktaları */
function scales() {
  let out = '';
  for (let r = 0; r < 6; r++) for (let c = 0; c < 3; c++) {
    const y = 300 + r * 30, xo = (r % 2) * 9;
    out += `<path d="M${-88 + c * 16 + xo},${y} q8,8 16,0" /><path d="M${88 - c * 16 - xo},${y} q-8,8 -16,0" />`;
  }
  return `<g stroke="#3E5A33" stroke-width="1.6" fill="none" opacity=".28">${out}</g>`;
}

function spots() {
  const pts = [[-70,150],[-52,128],[-78,190],[-62,262],[-84,300],[66,142],[48,124],[80,196],[70,270],[84,320],[-30,112],[30,110],[-74,350],[76,362]];
  return pts.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i % 3 ? 3.4 : 4.6}" fill="#2C3A2A" opacity=".75"/>`).join('');
}

/** Yüz: göz, kaş, yanak, ağız */
function face(p, female) {
  const lash = female
    ? `<path d="M-52,160 l-9,-8 M-46,154 l-6,-10 M52,160 l9,-8 M46,154 l6,-10" stroke="#0B2545" stroke-width="3.2" stroke-linecap="round"/>`
    : '';
  return `
  <g class="m-eyes">
    <ellipse cx="-31" cy="182" rx="23" ry="26" fill="#fff"/>
    <ellipse cx="31" cy="182" rx="23" ry="26" fill="#fff"/>
    <circle cx="-28" cy="186" r="15" fill="url(#${p}-eye)"/>
    <circle cx="28" cy="186" r="15" fill="url(#${p}-eye)"/>
    <circle cx="-23" cy="179" r="5.5" fill="#fff"/><circle cx="33" cy="179" r="5.5" fill="#fff"/>
    <circle cx="-33" cy="193" r="2.4" fill="#fff" opacity=".8"/><circle cx="23" cy="193" r="2.4" fill="#fff" opacity=".8"/>
  </g>
  ${lash}
  <path d="M-50,${female ? 148 : 146} Q-31,${female ? 138 : 134} -12,146 M12,146 Q31,${female ? 138 : 134} 50,${female ? 148 : 146}" stroke="#2F3E2A" stroke-width="${female ? 3.5 : 5}" fill="none" stroke-linecap="round"/>
  <ellipse cx="-58" cy="222" rx="15" ry="9" fill="#FF7C8E" opacity=".55"/>
  <ellipse cx="58" cy="222" rx="15" ry="9" fill="#FF7C8E" opacity=".55"/>
  <path d="M-24,224 Q0,${female ? 250 : 254} 24,224 Q0,236 -24,224 Z" fill="#8E2133"/>
  <path d="M-12,238 Q0,246 12,238 Q0,234 -12,238 Z" fill="#FF7C8E"/>
  <path d="M-26,222 Q0,${female ? 252 : 256} 26,222" stroke="${female ? '#C2415B' : '#3E4E33'}" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M-84,222 Q-66,250 -86,284 M84,222 Q66,250 86,284" stroke="#3E5A33" stroke-width="3" fill="none" opacity=".55" stroke-linecap="round"/>
  <path d="M-90,232 Q-78,252 -92,272 M90,232 Q78,252 92,272" stroke="#E86F7A" stroke-width="2" fill="none" opacity=".5"/>`;
}

/** Erkek Çaydaçıra kıyafeti: beyaz gömlek, işlemeli yelek, kuşak, şalvar */
function maleOutfit(p) {
  return `
  <g clip-path="url(#${p}-clip)">
    <rect x="-110" y="262" width="220" height="250" fill="#F5F1E8"/>
    <path d="M-14,262 L0,286 L14,262" fill="#E6DECD" stroke="#CDBFA5" stroke-width="2"/>
    <g fill="url(#${p}-gold)"><circle cx="0" cy="302" r="3.5"/><circle cx="0" cy="326" r="3.5"/><circle cx="0" cy="350" r="3.5"/><circle cx="0" cy="374" r="3.5"/></g>
    <path d="M-110,262 L-24,262 C-30,300 -26,360 -16,420 L-110,420 Z" fill="#7A1A2B"/>
    <path d="M110,262 L24,262 C30,300 26,360 16,420 L110,420 Z" fill="#7A1A2B"/>
    <path d="M-24,262 C-30,300 -26,360 -16,420 M24,262 C30,300 26,360 16,420" stroke="url(#${p}-gold)" stroke-width="5" fill="none"/>
    <path d="M-62,300 c10,-12 22,0 12,10 c-10,10 -20,-2 -10,-12 M-70,350 c12,-10 24,4 12,12 c-12,8 -20,-4 -8,-12 M-56,392 q10,-10 20,0
             M62,300 c-10,-12 -22,0 -12,10 c10,10 20,-2 10,-12 M70,350 c-12,-10 -24,4 -12,12 c12,8 20,-4 8,-12 M56,392 q-10,-10 -20,0"
          stroke="url(#${p}-gold)" stroke-width="3" fill="none" stroke-linecap="round"/>
    <rect x="-110" y="412" width="220" height="40" fill="#B3262D"/>
    <g stroke-width="4"><path d="M-110,420 H110" stroke="#F2C14E"/><path d="M-110,432 H110" stroke="#1F6F5C"/><path d="M-110,444 H110" stroke="#F2C14E"/></g>
    <rect x="-110" y="452" width="220" height="60" fill="#1B2335"/>
    <path d="M-40,452 q4,30 -2,56 M0,452 v56 M40,452 q-4,30 2,56" stroke="#2D3A55" stroke-width="3" fill="none"/>
    <rect x="-110" y="262" width="220" height="250" fill="url(#${p}-cloth-shade)"/>
  </g>`;
}

/** Dişi Çaydaçıra kıyafeti: üç etek entari, işlemeli yaka, gümüş kemer, altın sıra */
function femaleOutfit(p) {
  return `
  <g clip-path="url(#${p}-clip)">
    <rect x="-110" y="262" width="220" height="250" fill="#6A1747"/>
    <path d="M-30,262 L0,330 L30,262 Z" fill="#E9577F"/>
    <g fill="#FFD3DE" opacity=".9"><circle cx="-8" cy="282" r="3"/><circle cx="8" cy="282" r="3"/><circle cx="0" cy="300" r="3"/></g>
    <path d="M-30,262 L0,330 L30,262" stroke="url(#${p}-gold)" stroke-width="5" fill="none"/>
    <path d="M-30,330 L-40,512 M30,330 L40,512" stroke="url(#${p}-gold)" stroke-width="5"/>
    <path d="M-34,340 L-44,512 L44,512 L34,340 Z" fill="#E9577F"/>
    <g stroke="url(#${p}-gold)" stroke-width="2.4" fill="none">
      <path d="M-8,350 q8,-10 16,0 q-8,10 -16,0 M-10,380 q10,-12 20,0 q-10,12 -20,0 M-12,470 q12,-12 24,0 q-12,12 -24,0"/>
    </g>
    <path d="M-110,300 C-80,310 -64,330 -70,360 M110,300 C80,310 64,330 70,360" stroke="url(#${p}-gold)" stroke-width="3" fill="none"/>
    <g fill="url(#${p}-gold)">
      <circle cx="-76" cy="318" r="4"/><circle cx="-84" cy="340" r="4"/><circle cx="76" cy="318" r="4"/><circle cx="84" cy="340" r="4"/>
    </g>
    <rect x="-110" y="398" width="220" height="24" fill="#C9CED6"/>
    <path d="M-110,402 H110 M-110,418 H110" stroke="#8E96A3" stroke-width="2"/>
    <circle cx="0" cy="410" r="20" fill="#DDE2E8" stroke="#8E96A3" stroke-width="3"/>
    <circle cx="0" cy="410" r="9" fill="#2EC4B6" stroke="#8E96A3" stroke-width="2"/>
    <path d="M-110,494 H110" stroke="url(#${p}-gold)" stroke-width="6"/>
    <rect x="-110" y="262" width="220" height="250" fill="url(#${p}-cloth-shade)"/>
  </g>
  <path d="M-46,258 Q0,292 46,258" stroke="url(#${p}-gold)" stroke-width="3" fill="none"/>
  <g fill="url(#${p}-gold)" stroke="#A9761C" stroke-width="1">
    <circle cx="-34" cy="268" r="6"/><circle cx="-17" cy="276" r="6.5"/><circle cx="0" cy="279" r="7"/><circle cx="17" cy="276" r="6.5"/><circle cx="34" cy="268" r="6"/>
  </g>`;
}

/** Sekiz köşeli Elazığ şapkası */
function eightCornerHat(p) {
  const top = [];
  for (let k = 0; k < 8; k++) {
    const a = (Math.PI / 4) * k + Math.PI / 8;
    top.push([+(Math.cos(a) * 52).toFixed(1), +(42 + Math.sin(a) * 13).toFixed(1)]);
  }
  const topPts = top.map((q) => q.join(',')).join(' ');
  // ön yüzde görünen köşeler (sinüs > 0 olanlar), soldan sağa
  const front = top.filter(([, y]) => y >= 42).sort((a, b) => a[0] - b[0]);
  const base = front.map(([x]) => [+(x * 1.14).toFixed(1), 122]);
  const facets = front.map(([x, y], i) => `<path d="M${x},${y} L${base[i][0]},${base[i][1]}" stroke="#E3B03F" stroke-width="2.4" opacity=".9"/>`).join('');
  const bodyPath = `M-52,42 ${front.map(([x, y]) => `L${x},${y}`).join(' ')} L52,42 L59,122 ${[...base].reverse().map(([x, y]) => `L${x},${y + 6}`).join(' ')} L-59,122 Z`;
  return `
  <g class="m-hat" transform="rotate(-7 0 80)">
    <path d="${bodyPath}" fill="#5A0F1E"/>
    <path d="${bodyPath}" fill="url(#${p}-cloth-shade)"/>
    ${facets}
    <polygon points="${topPts}" fill="#7E1A2E" stroke="#E3B03F" stroke-width="3"/>
    <path d="M-59,110 Q0,130 59,110 L59,124 Q0,144 -59,124 Z" fill="url(#${p}-gold)"/>
    <g fill="#7A1A2B"><circle cx="-36" cy="122" r="3"/><circle cx="-12" cy="127" r="3"/><circle cx="12" cy="127" r="3"/><circle cx="36" cy="122" r="3"/></g>
    <circle cx="0" cy="40" r="7" fill="url(#${p}-gold)"/>
    <path d="M52,46 q20,10 22,40" stroke="#E3B03F" stroke-width="3" fill="none"/>
    <path d="M68,84 l6,22 l6,-22 z" fill="#B3262D"/>
  </g>`;
}

/** Kadın başlığı: fes, altın sıra, tepelik ve tül yazma */
function femaleHeaddress(p) {
  const coins = Array.from({ length: 9 }, (_, i) => {
    const x = -56 + i * 14;
    const y = 120 + Math.abs(x) * 0.08;
    return `<circle cx="${x}" cy="${y}" r="6.5" fill="url(#${p}-gold)" stroke="#A9761C" stroke-width="1"/>`;
  }).join('');
  return `
  <g class="m-hat" transform="rotate(6 0 80)">
    <path d="M-50,50 Q0,30 50,50 L60,116 Q0,132 -60,116 Z" fill="#C1272D"/>
    <path d="M-50,50 Q0,30 50,50 L60,116 Q0,132 -60,116 Z" fill="url(#${p}-cloth-shade)"/>
    <ellipse cx="0" cy="46" rx="50" ry="12" fill="#D9363C"/>
    <circle cx="0" cy="44" r="18" fill="url(#${p}-gold)" stroke="#A9761C" stroke-width="2"/>
    <circle cx="0" cy="44" r="8" fill="#2EC4B6"/>
    <path d="M-54,96 Q0,112 54,96" stroke="#F2C14E" stroke-width="3" fill="none"/>
    ${coins}
  </g>`;
}

function femaleVeil() {
  return `<path class="m-veil" d="M-66,96 C-120,150 -128,260 -112,340 L-92,330 C-100,250 -96,170 -60,120 Z M66,96 C120,150 128,260 112,340 L92,330 C100,250 96,170 60,120 Z" fill="#FFF3F6" opacity=".88" stroke="#F4B6C6" stroke-width="2"/>`;
}

/** Kol: kumaş kol + yüzgeç el */
function arm(from, ctrl, to, sleeve, cuff, p) {
  const [x1, y1] = from, [cx, cy] = ctrl, [x2, y2] = to;
  return `
  <path d="M${x1},${y1} Q${cx},${cy} ${x2},${y2}" stroke="${sleeve}" stroke-width="30" fill="none" stroke-linecap="round"/>
  <path d="M${x1},${y1} Q${cx},${cy} ${x2},${y2}" stroke="#000" stroke-opacity=".12" stroke-width="30" fill="none" stroke-linecap="round" transform="translate(3 4)"/>
  <circle cx="${x2}" cy="${y2}" r="15" fill="${cuff}"/>
  <g transform="translate(${x2} ${y2 + 8})">
    <path d="M-20,-6 C-20,-18 20,-18 20,-6 C22,8 14,16 0,16 C-14,16 -22,8 -20,-6 Z" fill="#94B266"/>
    <path d="M-20,-6 C-20,-18 20,-18 20,-6 C22,8 14,16 0,16 C-14,16 -22,8 -20,-6 Z" fill="url(#${p}-shade)"/>
    <path d="M-10,-8 q-2,12 0,20 M0,-10 v24 M10,-8 q2,12 0,20" stroke="#4F7440" stroke-width="2" fill="none" opacity=".6"/>
    <ellipse cx="-6" cy="-8" rx="7" ry="4" fill="#fff" opacity=".35"/>
  </g>`;
}

function fishBody(p) {
  return `
  <path d="${TAIL}" fill="url(#${p}-tail)"/>
  <path d="M-60,560 L0,570 M60,560 L0,570 M-80,586 L0,570 M80,586 L0,570" stroke="#3E5A33" stroke-width="2" opacity=".4"/>
  <path d="M-90,440 q-28,10 -34,36 q22,-4 38,-18 Z M90,440 q28,10 34,36 q-22,-4 -38,-18 Z" fill="#7E9E57"/>
  <path d="M-8,96 C-30,60 -10,40 14,30 C10,56 20,74 12,96 Z" fill="#7E9E57" class="m-dorsal"/>
  <path d="${BODY}" fill="url(#${p}-skin)"/>
  ${spots()}${scales()}`;
}

function shading(p) {
  return `<path d="${BODY}" fill="url(#${p}-shade)" pointer-events="none"/>
   <ellipse cx="-44" cy="150" rx="18" ry="34" fill="#fff" opacity=".18" transform="rotate(18 -44 150)"/>`;
}

/** Erkek maskot (merkez 0,0 koordinatına göre) */
function maleFish(p, { arms = true } = {}) {
  return `
  <g filter="url(#${p}-soft)">
    ${fishBody(p)}
    ${maleOutfit(p)}
    ${shading(p)}
    ${face(p, false)}
    ${eightCornerHat(p)}
  </g>`;
}

function femaleFish(p) {
  return `
  <g filter="url(#${p}-soft)">
    ${femaleVeil()}
    ${fishBody(p)}
    ${femaleOutfit(p)}
    ${shading(p)}
    ${face(p, true)}
    ${femaleHeaddress(p)}
  </g>`;
}

/** Ana sayfa sahnesi: iki maskot birlikte tabela tutuyor */
export function mascotScene() {
  const p = 'ms';
  const signX = 205, signY = 392, signW = 410, signH = 128;
  return `
<svg class="mascot-scene" viewBox="0 0 820 650" role="img" aria-labelledby="ms-title ms-desc" xmlns="http://www.w3.org/2000/svg">
  <title id="ms-title">Kebala Balık maskotları</title>
  <desc id="ms-desc">Elazığ'ın Çaydaçıra kıyafetlerini giymiş iki sevimli alabalık. Erkek alabalık sekiz köşeli şapka, işlemeli yelek ve kuşak giyiyor; dişi alabalık altın sıralı fes, tül yazma ve işlemeli entari giyiyor. İkisi birlikte üzerinde KEBALA BALIK yazan beyaz bir tabela tutuyor.</desc>
  ${defs(p)}
  <ellipse cx="410" cy="612" rx="330" ry="20" fill="#0B2545" opacity=".16"/>
  <g class="m-male"><g transform="translate(245 6)">${maleFish(p)}</g></g>
  <g class="m-female"><g transform="translate(575 6) scale(.97)">${femaleFish(p)}</g></g>

  <g class="m-sign" transform="rotate(-2 410 455)">
    <rect x="${signX + 6}" y="${signY + 10}" width="${signW}" height="${signH}" rx="20" fill="#0B2545" opacity=".18"/>
    <rect x="${signX}" y="${signY}" width="${signW}" height="${signH}" rx="20" fill="#FFFFFF" stroke="#D7E7F2" stroke-width="3"/>
    <path d="M${signX + 30},${signY + 102} q20,-12 40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0" stroke="#2EC4B6" stroke-width="3" fill="none" opacity=".55"/>
    <text x="410" y="${signY + 78}" text-anchor="middle" class="sign-text" fill="#0B2545" textLength="356" lengthAdjust="spacingAndGlyphs">KEBALA BALIK</text>
    <text x="410" y="${signY + 118}" text-anchor="middle" class="sign-sub" fill="#1E88C8">KEBAN · ELAZIĞ</text>
  </g>

  <g class="m-arms">
    <g transform="translate(245 6)">
      ${arm([-88, 300], [-120, 380], [-20, 404], '#F5F1E8', '#7A1A2B', p)}
      ${arm([88, 300], [120, 360], [92, 394], '#F5F1E8', '#7A1A2B', p)}
    </g>
    <g transform="translate(575 6) scale(.97)">
      ${arm([-88, 300], [-122, 360], [-94, 396], '#6A1747', '#E3B03F', p)}
      ${arm([88, 300], [120, 380], [20, 404], '#6A1747', '#E3B03F', p)}
    </g>
  </g>
</svg>`;
}

/** Tek maskot (kart, bildirim, footer gibi küçük alanlar için) */
export function mascotSolo(kind = 'male', label = '') {
  const p = `solo-${kind}`;
  const body = kind === 'female' ? femaleFish(p) : maleFish(p);
  const arms = kind === 'female'
    ? arm([-88, 300], [-140, 300], [-120, 230], '#6A1747', '#E3B03F', p) + arm([88, 300], [120, 380], [70, 420], '#6A1747', '#E3B03F', p)
    : arm([-88, 300], [-120, 380], [-70, 420], '#F5F1E8', '#7A1A2B', p) + arm([88, 300], [140, 300], [120, 230], '#F5F1E8', '#7A1A2B', p);
  return `
<svg class="mascot-solo" viewBox="-140 20 280 600" role="img" aria-label="${label || (kind === 'female' ? 'Dişi alabalık maskot el sallıyor' : 'Erkek alabalık maskot el sallıyor')}" xmlns="http://www.w3.org/2000/svg">
  ${defs(p)}
  <ellipse cx="0" cy="606" rx="100" ry="12" fill="#0B2545" opacity=".15"/>
  ${body}
  ${arms}
</svg>`;
}
