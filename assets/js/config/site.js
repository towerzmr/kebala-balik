/**
 * Kebala Balık — site ayarları
 * ------------------------------------------------------------
 * Henüz kesinleşmeyen bilgiler bilerek `null` bırakıldı.
 * Değer girildiğinde ilgili alanlar sitede otomatik görünür.
 * Uydurma adres, telefon veya hesap adı EKLEMEYİN.
 */
export const SITE = {
  brand: 'Kebala Balık',
  slogan: "Keban'ın Lezzeti, Elazığ'ın Misafirperverliği!",

  contact: {
    phone: null,          // örn. '+90 5xx xxx xx xx'
    email: null,          // örn. 'iletisim@alanadi.com'
    whatsapp: null,       // örn. '905xxxxxxxxx'
  },

  location: {
    region: 'Çırçır Şelalesi çevresi, Keban / Elazığ',
    address: null,        // Kesin işletme adresi belirlenince yazın
    coords: null,         // { lat: 38.xxxx, lng: 39.xxxx }
    // Kesin konum yokken haritada genel bölge aranır:
    fallbackQuery: 'Çırçır Şelalesi, Keban, Elazığ',
  },

  hours: null,            // örn. 'Her gün 09:00 – 20:00'

  social: [
    { id: 'instagram', label: 'Instagram', url: null },
    { id: 'facebook', label: 'Facebook', url: null },
    { id: 'youtube', label: 'YouTube', url: null },
    { id: 'tiktok', label: 'TikTok', url: null },
  ],

  reservation: {
    // Saat dilimleri örnektir; işletme saatleri netleşince güncelleyin.
    slots: ['09:00', '10:30', '12:00', '13:30', '15:00', '16:30'],
    maxPeople: 20,
    maxDaysAhead: 180,
  },

  currency: 'TRY',
};

/** Harita bağlantıları: koordinat varsa onu, yoksa genel bölgeyi kullanır */
export function mapLinks(loc = SITE.location) {
  const q = loc.coords ? `${loc.coords.lat},${loc.coords.lng}` : (loc.address || loc.fallbackQuery);
  const enc = encodeURIComponent(q);
  return {
    view: `https://www.google.com/maps/search/?api=1&query=${enc}`,
    directions: `https://www.google.com/maps/dir/?api=1&destination=${enc}`,
    isExact: Boolean(loc.coords || loc.address),
  };
}
