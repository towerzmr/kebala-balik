/**
 * Restoran menüsü — fiyatlar örnektir.
 * dish: art/illustrations.js içindeki tabak çizimi
 */
export const MENU = [
  {
    id: 'ana', label: 'Izgara & Ana Yemekler', short: 'Ana Yemekler',
    items: [
      { id: 'menu-izgara-keban-alabaligi', name: 'Izgara Keban Alabalığı', price: 320, dish: 'grilled', tag: 'Şefin önerisi',
        desc: 'Mangal kömüründe pişen bütün alabalık, roka ve közlenmiş biber.', info: '1 bütün balık · ~350 g' },
      { id: 'menu-kiremitte-alabalik', name: 'Kiremitte Alabalık', price: 360, dish: 'kiremit',
        desc: 'Domates, biber, sarımsak ve tereyağıyla taş fırında kiremitte.', info: 'Alabalık, domates, biber, sarımsak, tereyağı' },
      { id: 'menu-guvecte-alabalik', name: 'Güveçte Alabalık', price: 350, dish: 'guvec',
        desc: 'Toprak güveçte sebzelerle ağır ağır pişen alabalık.', info: 'Alabalık, patates, havuç, soğan, domates' },
      { id: 'menu-firinda-alabalik', name: 'Fırında Alabalık', price: 330, dish: 'oven',
        desc: 'Limon ve defne yaprağıyla fırınlanmış, sebze garnitürlü.', info: '1 bütün balık · mevsim sebzesi' },
      { id: 'menu-baharatli-alabalik-fileto', name: 'Baharatlı Alabalık Fileto', price: 310, dish: 'fillet',
        desc: 'Pul biber ve kekikle tavada mühürlenmiş fileto, bulgur pilavı.', info: '2 fileto · bulgur pilavı' },
      { id: 'menu-ozel-soslu-alabalik', name: 'Özel Soslu Alabalık', price: 345, dish: 'sauce',
        desc: 'Nar ekşisi ve ceviz soslu fileto, taze nane.', info: 'Alabalık, nar ekşisi, ceviz, nane' },
    ],
  },
  {
    id: 'yenilikci', label: 'Yenilikçi Balık Yemekleri', short: 'Yenilikçi',
    items: [
      { id: 'menu-alabalik-burger', name: 'Alabalık Burger', price: 280, dish: 'burger', tag: 'Gençlerin favorisi',
        desc: 'Alabalık köftesi, turşu, dereotlu yoğurt sos, brioche ekmek.', info: '180 g köfte · patates' },
      { id: 'menu-alabalik-koftesi', name: 'Alabalık Köftesi', price: 260, dish: 'balls',
        desc: 'Izgara alabalık köftesi, sumaklı soğan, közlenmiş domates.', info: '8 adet' },
      { id: 'menu-alabalikli-manti', name: 'Alabalıklı Mantı', price: 270, dish: 'manti',
        desc: 'Alabalık dolgulu mantı, sarımsaklı yoğurt ve pul biberli tereyağı.', info: '1 porsiyon · ~300 g' },
      { id: 'menu-alabalikli-makarna', name: 'Alabalıklı Makarna', price: 265, dish: 'pasta',
        desc: 'Kremalı dereotu sos, alabalık parçaları, limon kabuğu.', info: 'Linguine · ~350 g' },
      { id: 'menu-alabalikli-pizza', name: 'Alabalıklı Pizza', price: 295, dish: 'pizza',
        desc: 'İnce hamur, füme alabalık, kapari, kırmızı soğan, roka.', info: '30 cm' },
      { id: 'menu-alabalik-durum', name: 'Alabalık Dürüm', price: 220, dish: 'durum',
        desc: 'Lavaşta ızgara alabalık, yeşillik ve acılı ezme.', info: '1 dürüm · ayran ile' },
      { id: 'menu-alabalik-dolgulu-ravioli', name: 'Alabalık Dolgulu Ravioli', price: 285, dish: 'ravioli',
        desc: 'Ricotta ve alabalık dolgulu ravioli, tereyağlı adaçayı sos.', info: '12 adet' },
      { id: 'menu-citir-balik-tabagi', name: 'Çıtır Balık Tabağı', price: 290, dish: 'crispy',
        desc: 'Çıtır kaplamalı alabalık parçaları, tartar sos ve patates.', info: 'Paylaşımlık · 2 kişi' },
    ],
  },
  {
    id: 'paket', label: 'Konserve & Paket Ürünler', short: 'Paket Ürünler',
    items: [
      { id: 'menu-ton-baligi-konservesi', name: 'Ton Balığı Konservesi', price: 85, dish: 'can-tuna',
        desc: 'Zeytinyağlı ton balığı (tedarik ürünü).', info: '160 g' },
      { id: 'menu-alabalik-konservesi', name: 'Alabalık Konservesi', price: 95, dish: 'can-trout',
        desc: 'Zeytinyağlı alabalık parçaları.', info: '160 g' },
      { id: 'menu-fume-alabalik', name: 'Füme Alabalık', price: 240, dish: 'smoked',
        desc: 'Meşe talaşında tütsülenmiş ince dilimler.', info: '200 g · vakumlu' },
      { id: 'menu-ozel-soslu-balik-urunleri', name: 'Özel Soslu Balık Ürünleri', price: 130, dish: 'jar',
        desc: 'Közlenmiş biber ve nar ekşili soslu alabalık.', info: '220 g · kavanoz' },
    ],
  },
  {
    id: 'baslangic', label: 'Başlangıç & Atıştırmalıklar', short: 'Başlangıçlar',
    items: [
      { id: 'menu-balik-cipsi', name: 'Balık Cipsi', price: 90, dish: 'chips',
        desc: 'Fırınlanmış ince balık cipsi, limonlu tuz.', info: '1 kase' },
      { id: 'menu-balik-krakeri', name: 'Balık Krakeri', price: 85, dish: 'crackers',
        desc: 'Balık şekilli çıtır kraker, yoğurtlu dip sos.', info: '1 kase' },
      { id: 'menu-fume-balik-ezmesi', name: 'Füme Balık Ezmesi', price: 140, dish: 'spread',
        desc: 'Füme alabalık, labne, dereotu; köz ekmekle.', info: '150 g' },
      { id: 'menu-citir-balik-lokmalari', name: 'Çıtır Balık Lokmaları', price: 160, dish: 'bites',
        desc: 'Mısır unu kaplamalı lokmalar, acılı mayonez.', info: '10 adet' },
      { id: 'menu-ozel-balik-mezeleri', name: 'Özel Balık Mezeleri', price: 220, dish: 'meze',
        desc: 'Günün üç mezesi: marine alabalık, balık salatası, ezme.', info: '3 çeşit · paylaşımlık' },
    ],
  },
];
