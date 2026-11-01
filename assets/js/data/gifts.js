/**
 * Hediyelik eşya koleksiyonu
 * Tüm ürünler şu an konsept tasarımdır. Üretime geçen ürünün
 * status değerini 'satista' yapın; sepete eklenebilir hale gelir.
 */
export const GIFT_FILTERS = [
  { id: 'all', label: 'Tümü' },
  { id: 'taki', label: 'Takı' },
  { id: 'anahtarlik', label: 'Anahtarlık' },
  { id: 'deri', label: 'Balık derisi' },
  { id: 'dekor', label: 'Magnet & dekor' },
  { id: 'oyuncak', label: 'Peluş' },
];

export const GIFTS = [
  { id: 'hd-kolye', cat: 'taki', status: 'konsept', price: 450, name: 'Balık Pulu Kolye',
    desc: 'Alabalık pulu dokusundan ilham alan, gümüş kaplama sedef efektli kolye.',
    details: { 'Malzeme': 'Gümüş kaplama, reçine', 'Boyut': '45 cm zincir' }, art: { type: 'necklace' } },
  { id: 'hd-kupe', cat: 'taki', status: 'konsept', price: 380, name: 'Balık Pulu Küpe',
    desc: 'İşlenmiş balık pullarıyla tasarlanan hafif, sallantılı küpe.',
    details: { 'Malzeme': 'İşlenmiş balık pulu, gümüş kanca' }, art: { type: 'earrings' } },
  { id: 'hd-anahtar-figur', cat: 'anahtarlik', status: 'konsept', price: 120, name: 'Balık Figürlü Anahtarlık',
    desc: 'Gökkuşağı alabalığı renklerinde emaye anahtarlık.',
    details: { 'Malzeme': 'Emaye metal' }, art: { type: 'keychain-fish' } },
  { id: 'hd-anahtar-logo', cat: 'anahtarlik', status: 'konsept', price: 110, name: 'Kebala Balık Logolu Anahtarlık',
    desc: 'Sekiz köşeli şapkalı logo işlemeli deri anahtarlık.',
    details: { 'Malzeme': 'Deri, metal halka' }, art: { type: 'keychain-logo' } },
  { id: 'hd-bileklik', cat: 'taki', status: 'konsept', price: 160, name: 'Balık Figürlü Bileklik',
    desc: 'Turkuaz ip üzerinde küçük balık figürleri.',
    details: { 'Malzeme': 'Mumlu ip, metal figür' }, art: { type: 'bracelet' } },
  { id: 'hd-cuzdan', cat: 'deri', status: 'konsept', price: 950, name: 'Balık Derisi Cüzdan',
    desc: 'Tabaklanmış alabalık derisinden, pul dokusu belirgin el yapımı cüzdan.',
    details: { 'Malzeme': 'Tabaklanmış balık derisi', 'Durum': 'Tabaklama denemeleri planlanıyor' }, art: { type: 'wallet' } },
  { id: 'hd-canta', cat: 'deri', status: 'konsept', price: 2400, name: 'Balık Derisi Çanta',
    desc: 'Balık derisi paneller ve keten astarlı küçük omuz çantası.',
    details: { 'Malzeme': 'Balık derisi, keten', 'Durum': 'Konsept tasarım' }, art: { type: 'bag' } },
  { id: 'hd-magnet-cayda', cat: 'dekor', status: 'konsept', price: 75, name: 'Çaydaçıra Temalı Magnet',
    desc: 'Mumlu tepsiyle Çaydaçıra oynayan maskotlarımız.',
    details: { 'Malzeme': 'Polyester döküm' }, art: { type: 'magnet-cayda' } },
  { id: 'hd-magnet-sapka', cat: 'dekor', status: 'konsept', price: 70, name: 'Sekiz Köşeli Şapka Magnet',
    desc: 'Elazığ\'ın geleneksel sekiz köşeli şapkası, minyatür boyutta.',
    details: { 'Malzeme': 'Polyester döküm' }, art: { type: 'magnet-hat' } },
  { id: 'hd-dekor', cat: 'dekor', status: 'konsept', price: 320, name: 'Keban Gölü Dekoratif Obje',
    desc: 'Katmanlı reçinede Keban Baraj Gölü\'nün turkuaz suları ve tepeleri.',
    details: { 'Malzeme': 'Epoksi reçine, ahşap taban' }, art: { type: 'decor' } },
  { id: 'hd-pelus', cat: 'oyuncak', status: 'konsept', price: 390, name: 'Maskot Peluş İkilisi',
    desc: 'Çaydaçıra kıyafetli iki alabalık maskotumuzun yumuşak peluşları.',
    details: { 'Boyut': '28 cm', 'Not': 'Oyuncak güvenlik testleri sonrası satışa çıkacak' }, art: { type: 'plush' } },
];
