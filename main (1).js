/* ============================================================
   main.js – Jaryd Balderas Website
   - Floating particles
   - Scroll-reveal (IntersectionObserver)
   - Sticky nav shrink on scroll
   - Smooth anchor scrolling
   ============================================================ */

// ---- Floating Particles ----
(function () {
  const container = document.getElementById('particles');
  if (!container) return;
  const COUNT = 18;
  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2; // 2–6px
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 14 + 10}s;
      animation-delay: ${Math.random() * 12}s;
      opacity: 0;
    `;
    container.appendChild(p);
  }
})();

// ---- Scroll Reveal ----
(function () {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          // stagger siblings in the same parent
          const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
          const delay = siblings.indexOf(entry.target) * 80;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  items.forEach((el) => observer.observe(el));
})();

// ---- Nav shrink on scroll ----
(function () {
  const nav = document.getElementById('siteNav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.background = 'rgba(10,10,15,0.97)';
    } else {
      nav.style.background = 'rgba(10,10,15,0.85)';
    }
  }, { passive: true });
})();

// ---- Smooth anchor scroll (backup for older browsers) ----
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
