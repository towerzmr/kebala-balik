/**
 * Üst menü: sabit başlık, mobil menü, açılır "Ürünlerimiz" menüsü,
 * yumuşak kaydırma ve aktif bölüm vurgusu (scrollspy).
 */
import { $, $$ } from './utils.js';

export function initNav() {
  const header = $('.site-header');
  const toggle = $('.nav-toggle');
  const nav = $('#site-nav');
  const dd = $('.has-dropdown');
  const ddBtn = $('.dropdown-toggle');

  // Kaydırınca başlık gölgesi
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobil menü
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));

  // Açılır menü
  const setDD = (open) => { ddBtn.setAttribute('aria-expanded', open); dd.classList.toggle('is-open', open); };
  ddBtn.addEventListener('click', (e) => { e.stopPropagation(); setDD(ddBtn.getAttribute('aria-expanded') !== 'true'); });
  document.addEventListener('click', (e) => { if (!dd.contains(e.target)) setDD(false); });
  dd.addEventListener('keydown', (e) => { if (e.key === 'Escape') { setDD(false); ddBtn.focus(); } });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); toggle.focus(); } });

  // Bölüm bağlantıları: yumuşak kaydırma + menüyü kapat
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!target) return;
    e.preventDefault();
    setMenu(false); setDD(false);
    target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    try { history.replaceState(null, '', `#${id}`); } catch { /* bazı çerçevelerde desteklenmez */ }
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });

  // Aktif bölüm vurgusu
  const links = $$('#site-nav a[href^="#"]');
  const map = new Map(links.map((l) => [l.getAttribute('href').slice(1), l]));
  const parentFor = { dondurulmus: 'urunler', atistirmaliklar: 'urunler', 'ozel-urunler': 'urunler' };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const id = en.target.id;
        links.forEach((l) => l.removeAttribute('aria-current'));
        (map.get(id) || map.get(parentFor[id]))?.setAttribute('aria-current', 'true');
        if (parentFor[id]) ddBtn.setAttribute('data-current', 'true'); else ddBtn.removeAttribute('data-current');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach((s) => io.observe(s));
  }

  // Açılışta hash varsa ilgili bölüme git
  if (location.hash.length > 1) {
    const t = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (t) setTimeout(() => t.scrollIntoView(), 60);
  }
}
