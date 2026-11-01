/**
 * Bölümler görünür alana girerken hafifçe yukarı kayar.
 * İçerik her zaman görünürdür (opacity 0 kullanılmaz).
 */
import { $$, prefersReducedMotion } from './utils.js';

export function initReveal() {
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  $$('[data-reveal]').forEach((el) => { el.classList.add('reveal'); io.observe(el); });
}
