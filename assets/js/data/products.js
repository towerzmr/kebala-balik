/**
 * Ürün kataloğu
 * ------------------------------------------------------------
 * status: 'satista'  → sepete eklenebilir
 *         'konsept'  → tasarım aşamasında, satışta değil
 *         'arge'     → araştırma / geliştirme aşamasında ürün fikri
 * price : örnek fiyat (TL). Gerçek fiyatlar belirlenince güncelleyin.
 * image : gerçek ürün fotoğrafı eklendiğinde yolunu yazın
 *         (örn. 'assets/img/urunler/fileto.webp'). Boşsa çizim kullanılır.
 * art   : fotoğraf yokken kullanılan çizim ayarları (art/illustrations.js)
 */

export const STATUS = {
  satista: { label: 'Satışta', tone: 'ok' },
  konsept: { label: 'Konsept', tone: 'concept' },
  arge: { label: 'Ar-Ge aşamasında', tone: 'rnd' },
};

export const PRODUCT_CATEGORIES = [
  { id: 'dondurulmus', label: 'Dondurulmuş Ürünler', anchor: '#dondurulmus' },
  { id: 'atistirmalik', label: 'Atıştırmalıklar', anchor: '#atistirmaliklar' },
  { id: 'ozel', label: 'Özel Balık Ürünleri', anchor: '#ozel-urunler' },
];

export const PRODUCTS = [
  /* ---------- DONDURULMUŞ ---------- */
  {
    id: 'dn-butun', cat: 'dondurulmus', sub: 'butun', status: 'satista', price: 340,
    name: 'Paketlenmiş Bütün Alabalık',
    desc: 'Temizlenmiş, iç organları alınmış bütün Keban alabalığı. Izgara ve fırın için ideal.',
    pack: '2 adet · yaklaşık 700 g · vakumlu',
    details: { 'Saklama': '-18 °C', 'Hazırlık': 'Buzdolabında çözdürüp pişirin', 'İçerik': '%100 alabalık' },
    art: { shape: 'tray', color: '#0F4C81', accent: '#2EC4B6', motif: 'whole' },
  },
  {
    id: 'dn-fileto', cat: 'dondurulmus', sub: 'fileto', status: 'satista', price: 295,
    name: 'Alabalık Fileto',
    desc: 'Kılçıkları ayıklanmış, derili pembe fileto. Tavada 6 dakikada hazır.',
    pack: '4 fileto · 500 g · tek tek dondurulmuş',
    details: { 'Saklama': '-18 °C', 'Hazırlık': 'Tava, fırın veya ızgara', 'İçerik': '%100 alabalık filetosu' },
    art: { shape: 'box', color: '#E8735A', accent: '#0B2545', motif: 'fillet' },
  },
  {
    id: 'dn-tekli', cat: 'dondurulmus', sub: 'butun', status: 'satista', price: 165,
    name: 'Tekli Porsiyon Alabalık',
    desc: 'Tek kişilik, porsiyonluk alabalık. Öğrenci ve çalışanlar için pratik paket.',
    pack: '1 adet · yaklaşık 350 g',
    details: { 'Saklama': '-18 °C', 'Hazırlık': 'Fırında 20 dk, 200 °C', 'İçerik': '%100 alabalık' },
    art: { shape: 'pouch', color: '#1E88C8', accent: '#FFFFFF', motif: 'whole' },
  },
  {
    id: 'dn-kofte', cat: 'dondurulmus', sub: 'hazir', status: 'satista', price: 210,
    name: 'Alabalık Köftesi',
    desc: 'Alabalık eti, taze maydanoz ve yöresel baharatlarla hazırlanmış köfteler.',
    pack: '16 adet · 480 g',
    details: { 'Saklama': '-18 °C', 'Hazırlık': 'Çözdürmeden tavada 8 dk', 'İçerik': 'Alabalık, ekmek içi, soğan, maydanoz, baharat' },
    art: { shape: 'box', color: '#2EC4B6', accent: '#0B2545', motif: 'balls' },
  },
  {
    id: 'dn-manti', cat: 'dondurulmus', sub: 'hazir', status: 'konsept', price: 230,
    name: 'Alabalık Dolgulu Mantı',
    desc: 'İnce açılmış hamur, alabalık ve dereotu iç harcı. Yoğurt ve tereyağıyla servis edilir.',
    pack: '500 g · 3 porsiyon',
    details: { 'Durum': 'Tarif geliştirme aşamasında' },
    art: { shape: 'bag', color: '#F2B544', accent: '#0B2545', motif: 'manti' },
  },
  {
    id: 'dn-burger', cat: 'dondurulmus', sub: 'hazir', status: 'konsept', price: 195,
    name: 'Alabalık Burger Köftesi',
    desc: 'Burger ekmeğine tam oturan, sulu ve hafif alabalık köftesi.',
    pack: '4 adet · 120 g',
    details: { 'Durum': 'Ambalaj ve tarif tasarım aşamasında' },
    art: { shape: 'box', color: '#0B2545', accent: '#F2B544', motif: 'burger' },
  },
  {
    id: 'dn-baharatli', cat: 'dondurulmus', sub: 'hazir', status: 'konsept', price: 185,
    name: 'Baharatlı Alabalık Parçaları',
    desc: 'Pul biber ve kekikle harmanlanmış lokma parçalar. Tava ve airfryer için.',
    pack: '400 g',
    details: { 'Durum': 'Konsept ürün' },
    art: { shape: 'bag', color: '#C8462B', accent: '#FFFFFF', motif: 'bites' },
  },
  {
    id: 'dn-kiremit', cat: 'dondurulmus', sub: 'firin', status: 'konsept', price: 260,
    name: 'Fırına Hazır Kiremitte Alabalık',
    desc: 'Domates, biber ve sarımsakla hazırlanmış; kendi pişirme kabında fırına girer.',
    pack: '2 kişilik · 650 g · fırına dayanıklı kap',
    details: { 'Durum': 'Konsept ürün' },
    art: { shape: 'tray', color: '#B5532F', accent: '#F7E6D4', motif: 'kiremit' },
  },
  {
    id: 'dn-marine', cat: 'dondurulmus', sub: 'firin', status: 'konsept', price: 275,
    name: 'Marine Edilmiş Alabalık',
    desc: 'Limon, zeytinyağı ve defne yaprağıyla marine edilmiş fileto.',
    pack: '2 fileto · 400 g',
    details: { 'Durum': 'Konsept ürün' },
    art: { shape: 'pouch', color: '#3C8D5A', accent: '#FFFFFF', motif: 'fillet' },
  },

  /* ---------- ATIŞTIRMALIK ---------- */
  {
    id: 'at-kraker', cat: 'atistirmalik', sub: 'kraker', status: 'konsept', price: 65,
    name: 'Kebala Alabalık Krakeri',
    desc: 'Fırınlanmış, çıtır balık şekilli kraker. Maskotlarımızın ambalajıyla.',
    pack: '90 g',
    details: { 'Durum': 'Ambalaj tasarımı hazır, tarif denemeleri sürüyor' },
    art: { shape: 'snackbox', color: '#FFB703', accent: '#0B2545', motif: 'crackers', label: 'KRAKER' },
  },
  {
    id: 'at-cips', cat: 'atistirmalik', sub: 'cips', status: 'konsept', price: 55,
    name: 'Kebala Balık Cipsi',
    desc: 'İnce dilimlenmiş, fırınlanmış balık derisi ve eti bazlı çıtır cips.',
    pack: '70 g',
    details: { 'Durum': 'Ambalaj tasarımı hazır, üretim denemeleri planlanıyor' },
    art: { shape: 'chipsbag', color: '#13C4B9', accent: '#FF5D73', motif: 'chips', label: 'CİPS' },
  },
  {
    id: 'at-citir', cat: 'atistirmalik', sub: 'cips', status: 'konsept', price: 70,
    name: 'Çıtır Alabalık Atıştırmalığı',
    desc: 'Kızartılmadan fırınlanan küçük alabalık lokmaları.',
    pack: '60 g',
    details: { 'Durum': 'Konsept ürün' },
    art: { shape: 'chipsbag', color: '#FF5D73', accent: '#FFE66D', motif: 'bites', label: 'ÇITIR' },
  },
  {
    id: 'at-ezme', cat: 'atistirmalik', sub: 'ezme', status: 'konsept', price: 120,
    name: 'Füme Alabalık Ezmesi',
    desc: 'Füme alabalık, labne ve dereotu. Kraker ve ekmek üstüne.',
    pack: '180 g · cam kavanoz',
    details: { 'Durum': 'Konsept ürün' },
    art: { shape: 'jar', color: '#E8B48A', accent: '#0B2545', motif: 'spread', label: 'EZME' },
  },
  {
    id: 'at-tuzlu', cat: 'atistirmalik', sub: 'kraker', status: 'konsept', price: 60,
    name: 'Alabalık Aromalı Tuzlu Kraker',
    desc: 'Kaya tuzu ve alabalık aromalı ince kraker.',
    pack: '100 g',
    details: { 'Durum': 'Konsept ürün' },
    art: { shape: 'snackbox', color: '#8E7DFF', accent: '#FFFFFF', motif: 'crackers', label: 'TUZLU' },
  },
  {
    id: 'at-protein', cat: 'atistirmalik', sub: 'protein', status: 'konsept', price: 85,
    name: 'Balık Proteinli Atıştırmalık',
    desc: 'Balık proteini ve yulaf bazlı tuzlu atıştırmalık bar fikri.',
    pack: '40 g bar',
    details: { 'Durum': 'Konsept ürün; besin değerleri laboratuvar analizi sonrası paylaşılacak' },
    art: { shape: 'bar', color: '#0B2545', accent: '#2EC4B6', motif: 'bar', label: 'PROTEİN' },
  },
  {
    id: 'at-omega', cat: 'atistirmalik', sub: 'protein', status: 'arge', price: null,
    name: 'Balık Yağı Ürün Fikri',
    desc: 'Balık yağı ve vitamin kategorisinde geliştirilebilecek ürün fikri. Herhangi bir sağlık beyanı içermez.',
    pack: 'Henüz belirlenmedi',
    details: { 'Durum': 'Ar-Ge fikri', 'Not': 'Kalite kontrol ve mevzuat incelemesi tamamlanmadan satışa sunulmayacak' },
    art: { shape: 'bottle', color: '#F2B544', accent: '#0B2545', motif: 'drop', label: 'AR-GE' },
  },

  /* ---------- ÖZEL BALIK ÜRÜNLERİ ---------- */
  {
    id: 'oz-fume', cat: 'ozel', sub: 'fume', status: 'konsept', price: 240,
    name: 'Füme Alabalık',
    desc: 'Meşe talaşında soğuk tütsülenmiş ince dilim alabalık.',
    pack: '200 g · vakumlu',
    details: { 'Durum': 'Konsept ürün' },
    art: { shape: 'tray', color: '#5B3A29', accent: '#F2B544', motif: 'smoked' },
  },
  {
    id: 'oz-konserve', cat: 'ozel', sub: 'konserve', status: 'konsept', price: 95,
    name: 'Alabalık Konservesi',
    desc: 'Zeytinyağlı alabalık parçaları. Salata ve sandviçler için.',
    pack: '160 g · kolay açılır kapak',
    details: { 'Durum': 'Konsept ürün' },
    art: { shape: 'can', color: '#1E88C8', accent: '#FFFFFF', motif: 'whole', label: 'ALABALIK' },
  },
  {
    id: 'oz-ton', cat: 'ozel', sub: 'konserve', status: 'konsept', price: 85,
    name: 'Ton Balığı Konservesi',
    desc: 'Kebala Balık etiketli zeytinyağlı ton balığı. Tedarikçi seçimi sürüyor.',
    pack: '160 g',
    details: { 'Durum': 'Konsept ürün', 'Not': 'Ton balığı Keban kaynaklı değildir; tedarik ürünüdür' },
    art: { shape: 'can', color: '#0B2545', accent: '#2EC4B6', motif: 'tuna', label: 'TON' },
  },
  {
    id: 'oz-soslu', cat: 'ozel', sub: 'soslu', status: 'konsept', price: 130,
    name: 'Özel Soslu Alabalık',
    desc: 'Közlenmiş biber ve nar ekşili soslu alabalık parçaları.',
    pack: '220 g · cam kavanoz',
    details: { 'Durum': 'Konsept ürün' },
    art: { shape: 'jar', color: '#C8462B', accent: '#FFFFFF', motif: 'spread', label: 'SOSLU' },
  },
];

/** Bölüm başına filtre seçenekleri */
export const FILTERS = {
  dondurulmus: [
    { id: 'all', label: 'Tümü' },
    { id: 'butun', label: 'Bütün balık' },
    { id: 'fileto', label: 'Fileto' },
    { id: 'hazir', label: 'Pişirmeye hazır' },
    { id: 'firin', label: 'Fırına hazır' },
  ],
  atistirmalik: [
    { id: 'all', label: 'Tümü' },
    { id: 'kraker', label: 'Kraker' },
    { id: 'cips', label: 'Cips & çıtır' },
    { id: 'ezme', label: 'Ezme' },
    { id: 'protein', label: 'Protein & Ar-Ge' },
  ],
  ozel: [
    { id: 'all', label: 'Tümü' },
    { id: 'fume', label: 'Füme' },
    { id: 'konserve', label: 'Konserve' },
    { id: 'soslu', label: 'Soslu' },
  ],
};
