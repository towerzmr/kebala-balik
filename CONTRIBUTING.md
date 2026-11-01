# Katkı Rehberi

## Dal (branch) düzeni

- `main` → yayındaki sürüm, doğrudan push yapılmaz.
- `dev` → birleştirme dalı.
- Özellik dalları: `feat/sepet-odeme`, `fix/mobil-menu`, `content/menu-fiyatlari`.

## İş bölümü önerisi (4 kişilik ekip)

| Kişi | Alan | Dosyalar |
|---|---|---|
| 1 | Tasarım sistemi, hero, maskot | `css/tokens.css`, `css/base.css`, `js/art/mascots.js` |
| 2 | Katalog, sepet, filtreler | `js/modules/catalog.js`, `js/modules/cart.js`, `js/data/products.js` |
| 3 | Rezervasyon, iletişim, backend bağlantısı | `js/modules/reservation.js`, `js/modules/contact.js` |
| 4 | İçerik, menü, konum, SEO | `index.html`, `js/data/menu.js`, `js/config/site.js` |

Dosyalar bu şekilde ayrıldığı için aynı anda çalışırken çakışma (merge conflict) riski düşüktür.

## Kod kuralları

- Girintileme 2 boşluk, UTF-8, LF satır sonu (`.editorconfig`).
- Renk ve ölçüler doğrudan yazılmaz; `tokens.css` değişkenleri kullanılır.
- Yeni bölüm: HTML iskeleti `index.html`, stil `sections.css`, davranış yeni bir `modules/*.js` dosyası, bağlantı `main.js`.
- İçerik (ürün, fiyat, metin) koda gömülmez; `data/` veya `config/` altında tutulur.
- Commit mesajları: `feat: …`, `fix: …`, `style: …`, `content: …`, `docs: …`.

## Pull request kontrol listesi

- [ ] Masaüstü (1366 px) ve telefon (390 px) genişliğinde kontrol edildi
- [ ] Konsolda hata yok
- [ ] Klavyeyle gezinme çalışıyor
- [ ] Doğrulanmamış bilgi (adres, işletme noktası, sağlık iddiası) eklenmedi
