# Kebala Balık

**Keban'ın Lezzeti, Elazığ'ın Misafirperverliği!**

Elazığ Keban alabalığını gastronomi, yöresel kültür, hediyelik eşya ve balık tutma deneyimiyle buluşturan marka sitesi. Saf HTML, CSS ve JavaScript (ES modülleri) ile yazılmıştır; derleme adımı veya bağımlılık gerektirmez.

## Çalıştırma

ES modülleri `file://` üzerinden açılmaz; basit bir yerel sunucu kullanın:

```bash
# Python
python3 -m http.server 8000
# veya Node
npx serve .
```

Ardından `http://localhost:8000` adresini açın. VS Code kullanıyorsanız **Live Server** eklentisi de yeterli.

## Klasör yapısı

```
kebala-balik/
├── index.html                 # Tüm bölümlerin HTML iskeleti (SEO için statik içerik burada)
├── assets/
│   ├── css/
│   │   ├── tokens.css         # Renk, yazı tipi, boşluk değişkenleri
│   │   ├── base.css           # Sıfırlama ve tipografi
│   │   ├── layout.css         # Konteyner, üst menü, footer
│   │   ├── components.css     # Buton, kart, rozet, form, sepet, pencere, bildirim
│   │   └── sections.css       # Bölüme özel stiller (hero, menü, konum…)
│   ├── js/
│   │   ├── main.js            # Giriş noktası: modülleri bağlar
│   │   ├── config/site.js     # İletişim, konum, sosyal medya, rezervasyon ayarları
│   │   ├── data/              # products.js, gifts.js, menu.js, photos.js — içerik buradan yönetilir
│   │   ├── art/               # SVG maskotlar, ürün/yemek çizimleri, şematik harita
│   │   └── modules/           # nav, cart, catalog, menu, reservation, contact, admin, credits, modal, toast…
│   └── img/                   # Gerçek fotoğraflar buraya eklenecek
├── docs/ROADMAP.md           # Yol haritası
├── docs/FOTOGRAF-LISTESI.md   # Gerçek fotoğraf listesi ve arama bağlantıları
└── CONTRIBUTING.md
```

## İçerik nasıl güncellenir?

| Ne değişecek? | Dosya |
|---|---|
| Telefon, e-posta, adres, koordinat, sosyal medya | `assets/js/config/site.js` |
| Ürün adı, fiyat, durum (satışta / konsept / Ar-Ge) | `assets/js/data/products.js` |
| Hediyelik eşyalar | `assets/js/data/gifts.js` |
| Restoran menüsü | `assets/js/data/menu.js` |
| Renkler ve yazı tipleri | `assets/css/tokens.css` |

- `site.js` içinde `null` bırakılan alanlar sitede "Yakında paylaşılacak" olarak görünür. Değer girildiğinde otomatik dolar. **Uydurma adres/telefon eklemeyin.**
- Kesin koordinat (`location.coords`) girildiğinde "Yol tarifi al" ve "Haritada görüntüle" butonları o noktayı kullanır; girilmezse Çırçır Şelalesi bölgesini arar.
- Bir ürünü satışa açmak için `status: 'satista'` yapın; "Sepete ekle" butonu açılır.

## Gerçek fotoğraf eklemek

İki yol var:

**1. Yönetici paneli (claude.ai'de yayınlanan sürüm).** Sayfanın sahibi ve Editor yetkisi verilen kişiler sol altta **Fotoğraf yönetimi** düğmesini görür. Ziyaretçiler bu düğmeyi görmez; yükleme yetkisi sunucuda da kısıtlıdır. Panelde 58 görsel alanının her birine fotoğraf yüklenebilir, değiştirilebilir, kaldırılabilir ve kaynak/fotoğrafçı bilgisi yazılabilir. Fotoğraflar tarayıcıda en fazla 1600 piksele küçültülüp JPEG olarak kaydedilir. Kaynak yazılan fotoğraflar footer'daki "Görsel kaynakları" listesinde görünür. Kodu: `assets/js/modules/admin.js`.

**2. Dosya olarak (GitHub / kendi sunucunuz).** Fotoğrafı `docs/FOTOGRAF-LISTESI.md` dosyasındaki adla `assets/img/` klasörüne koyun (ör. `assets/img/dn-fileto.jpg`) ve adını `assets/js/data/photos.js` içindeki `AVAILABLE_PHOTOS` listesine ekleyin.

Kendi sunucunuzda yönetici paneli çalışmaz, çünkü panel claude.ai'nin depolama altyapısını kullanır. Kendi sunucunuzda aynı özellik için giriş sistemi ve yükleme API'si gerekir (bkz. `docs/ROADMAP.md`).

Maskotlar markaya özel karakterler olduğu için SVG olarak kalır.

## Demo olan özellikler

Aşağıdakiler arayüz olarak tam çalışır ama **sunucuya veri göndermez**:

- **Rezervasyon formu** (`modules/reservation.js`): doğrulama + onay ekranı. Backend hazır olduğunda `submitReservation()` fonksiyonunu gerçek API çağrısıyla değiştirin.
- **Sepet** (`modules/cart.js`): adet, ara toplam, tarayıcıda saklama. "Siparişi tamamla" ödeme altyapısının bağlı olmadığını bildirir.
- **İletişim ve "Haber ver" formları**: doğrulama + başarı mesajı.

## Doğruluk ilkeleri

- Haritada tekil yetiştiricilik işletmesi gösterilmez; yalnızca Keban Baraj Gölü vurgulanır. Noktalar resmî kayıtlarla doğrulandıktan sonra eklenmelidir.
- Fiyatlar örnektir. Konsept ve Ar-Ge ürünleri sitede açıkça etiketlenir.
- Balık yağı/vitamin fikirlerinde sağlık beyanı kullanılmaz.
- Besin değerleri USDA FoodData Central'daki çiftlik gökkuşağı alabalığı verilerine dayanır (yaklaşık).

## Erişilebilirlik ve SEO

Anlamsal HTML bölümleri, "İçeriğe geç" bağlantısı, klavyeyle kullanılabilir menü/sekme/pencere, `aria-live` bildirimleri, görünür odak halkası, `prefers-reduced-motion` desteği, Türkçe `lang="tr"`, meta açıklama, Open Graph ve schema.org (Restaurant) verisi.

## Lisans

Tüm hakları Kebala Balık ekibine aittir.
