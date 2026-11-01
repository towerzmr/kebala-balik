/**
 * Elazığ şematik haritası (ölçekli değildir).
 * İlçe merkezleri yaklaşık enlem/boylamdan basit projeksiyonla yerleştirildi.
 * Yetiştiricilik için tekil işletme noktası GÖSTERİLMEZ; yalnızca
 * kafes yetiştiriciliğinin yoğunlaştığı su alanı (Keban Baraj Gölü) vurgulanır.
 */
const proj = (lat, lon) => [Math.round((lon - 38.3) * 400), Math.round((39.15 - lat) * 500)];

const PLACES = {
  elazig: { name: 'Elazığ (Merkez)', at: proj(38.675, 39.22), main: true },
  keban: { name: 'Keban', at: proj(38.80, 38.74) },
  agin: { name: 'Ağın', at: proj(38.94, 38.72) },
  baskil: { name: 'Baskil', at: proj(38.57, 38.82) },
  palu: { name: 'Palu', at: proj(38.69, 39.93) },
  sivrice: { name: 'Sivrice', at: proj(38.45, 39.31) },
};

const LAKE = 'M168,186 C176,170 182,150 176,128 C170,104 160,88 166,64 C170,50 182,44 188,58 C194,78 186,98 194,120 C202,140 214,150 236,152 C262,154 280,140 300,150 C322,160 340,152 364,156 C392,160 410,148 436,156 C462,164 490,152 518,160 C546,168 572,160 596,170 C606,176 602,188 590,188 C566,188 546,182 520,184 C492,186 466,178 440,182 C414,186 392,178 366,182 C340,186 316,176 294,178 C270,180 254,186 232,180 C210,174 198,186 186,196 C178,202 166,198 168,186 Z';
const HAZAR = 'M412,338 C424,326 456,324 474,334 C486,342 476,354 458,356 C438,358 404,352 412,338 Z';
const OUTLINE = 'M70,120 C90,70 140,30 210,26 C300,22 380,60 470,70 C560,80 650,90 720,130 C770,160 772,230 744,280 C716,330 640,350 580,380 C520,410 470,450 400,456 C330,462 260,430 210,400 C160,370 110,350 84,300 C58,250 54,170 70,120 Z';

export function elazigMap({ mode = 'farming', ariaLabel } = {}) {
  const [kx, ky] = PLACES.keban.at;
  const cirX = kx - 6, cirY = ky + 22; // Çırçır Şelalesi: Keban ilçe merkezi yakını (yaklaşık)
  const label = ariaLabel || (mode === 'farming'
    ? "Elazığ şematik haritası. Keban Baraj Gölü, alabalık kafes yetiştiriciliğinin yoğunlaştığı alan olarak vurgulanmış."
    : "Elazığ şematik haritası. Kebala Balık'ın planlanan bölgesi Keban ilçesinde Çırçır Şelalesi çevresi olarak işaretlenmiş.");

  const places = Object.values(PLACES).map(({ name, at: [x, y], main }) => `
    <g class="map-place${main ? ' is-main' : ''}">
      <circle cx="${x}" cy="${y}" r="${main ? 7 : 5}" />
      <text x="${x + 10}" y="${y + 4}">${name}</text>
    </g>`).join('');

  const farming = mode === 'farming' ? `
    <path d="${LAKE}" class="map-lake-glow"/>
    <g class="map-callout">
      <path d="M380,150 L420,92" />
      <rect x="400" y="54" width="236" height="44" rx="10"/>
      <text x="414" y="73">Keban Baraj Gölü</text>
      <text x="414" y="90" class="small">Kafes yetiştiriciliğinin yoğun olduğu su alanı</text>
    </g>` : '';

  const location = mode === 'location' ? `
    <circle cx="${cirX}" cy="${cirY}" r="34" class="map-zone"/>
    <g class="map-pin" transform="translate(${cirX} ${cirY})">
      <path d="M0,0 C-14,-18 -16,-30 -16,-36 A16,16 0 0 1 16,-36 C16,-30 14,-18 0,0 Z"/>
      <circle cx="0" cy="-36" r="6" fill="#fff"/>
    </g>
    <g class="map-callout">
      <path d="M${cirX + 14},${cirY - 40} L${cirX + 70},68" />
      <rect x="${cirX + 50}" y="24" width="230" height="44" rx="10"/>
      <text x="${cirX + 64}" y="43">Çırçır Şelalesi çevresi</text>
      <text x="${cirX + 64}" y="60" class="small">Kebala Balık planlanan bölge</text>
    </g>` : `
    <g class="map-place"><path d="M${cirX - 5},${cirY - 5} l10,10 m0,-10 l-10,10" stroke="#0B2545" stroke-width="2.4"/></g>`;

  return `
  <svg class="map-svg" viewBox="0 0 800 500" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="500" class="map-bg"/>
    <g class="map-grid">${Array.from({ length: 9 }, (_, i) => `<path d="M${i * 100},0 V500"/>`).join('')}${Array.from({ length: 6 }, (_, i) => `<path d="M0,${i * 100} H800"/>`).join('')}</g>
    <path d="${OUTLINE}" class="map-land"/>
    <path d="M${kx - 2},${ky + 10} C${kx - 10},${ky + 80} ${kx + 20},${ky + 160} ${kx - 10},${ky + 280}" class="map-river"/>
    <text x="${kx - 40}" y="${ky + 200}" class="map-river-label">Fırat</text>
    ${farming}
    <path d="${LAKE}" class="map-lake"/>
    <path d="${HAZAR}" class="map-lake map-lake--hazar"/>
    <text x="430" y="378" class="map-water-label">Hazar Gölü</text>
    ${mode !== 'farming' ? `<text x="300" y="140" class="map-water-label">Keban Baraj Gölü</text>` : ''}
    <rect x="${kx - 14}" y="${ky + 4}" width="16" height="6" rx="2" class="map-dam"/>
    ${places}
    ${location}
    <g class="map-compass" transform="translate(740 440)"><circle r="22"/><path d="M0,-16 L6,0 L0,16 L-6,0 Z"/><text y="-26" text-anchor="middle">K</text></g>
    <text x="24" y="480" class="map-note">Şematik gösterimdir, ölçekli değildir.</text>
  </svg>`;
}
