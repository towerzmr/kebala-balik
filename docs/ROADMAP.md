# Yol Haritası

## Aşama 1 — Ön yüz (tamamlandı)
- Tüm bölümler, responsive tasarım, SVG maskot ve çizimler
- Filtrelenebilir katalog, sepet arayüzü, menü sekmeleri
- Demo rezervasyon ve iletişim formları

## Aşama 2 — Backend
- `POST /api/reservations` (ad, telefon, e-posta, tarih, saat, kişi, not) + işletme paneli
- `POST /api/contact`, `POST /api/notify`
- Ürün ve stok yönetimi; `data/*.js` yerine API'den okuma
- KVKK aydınlatma metni ve açık rıza kaydı
- Kendi sunucuda yönetici girişi ve fotoğraf yükleme API'si (claude.ai sürümündeki panelin karşılığı)

## Aşama 3 — Satış
- Ödeme altyapısı (iyzico / PayTR vb.), soğuk zincir kargo hesabı
- Sipariş takibi ve e-posta bildirimleri

## Aşama 4 — İçerik
- Profesyonel ürün ve yemek fotoğrafları (`assets/img/`)
- Maskotların 3D render'ı ve peluş üretimi
- Kesin işletme adresi/koordinatı ve doğrulanmış yetiştiricilik noktaları
