/* Phat Panda — interactivity (vanilla JS, no dependencies) */
(function () {
  'use strict';

  // ---------- AGE GATE ----------
  const AGE_KEY = 'pp_age_verified';
  const ageGate = document.getElementById('gate');
  const isVerified = localStorage.getItem(AGE_KEY) || sessionStorage.getItem(AGE_KEY);

  if (ageGate && !isVerified) {
    ageGate.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  document.getElementById('g-yes')?.addEventListener('click', () => {
    // Remember verification for 30 days via localStorage
    localStorage.setItem(AGE_KEY, '1');
    if (ageGate) ageGate.hidden = true;
    document.body.style.overflow = '';
  });

  document.getElementById('g-no')?.addEventListener('click', () => {
    // Redirect underage visitors off-site
    window.location.href = 'https://www.google.com';
  });

  // ---------- MOBILE NAV ----------
  const navToggle = document.querySelector('.site-nav__toggle');
  const navMenu = document.getElementById('nav-menu');
  navToggle?.addEventListener('click', () => {
    const open = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  // close on nav click (mobile)
  document.querySelectorAll('.site-nav__menu a').forEach(a => {
    a.addEventListener('click', () => {
      navMenu?.classList.remove('is-open');
      navToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  // ---------- STICKY HEADER SHADOW ----------
  const header = document.querySelector('.site-header');
  const backToTop = document.querySelector('.back-to-top');
  function onScroll() {
    const y = window.scrollY;
    header?.classList.toggle('is-scrolled', y > 20);
    backToTop?.classList.toggle('is-visible', y > 400);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- BRAND FILTERS ----------
  const chips = document.querySelectorAll('.brands__filters .chip');
  const cards = document.querySelectorAll('.brand-card');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => { c.classList.remove('is-active'); c.setAttribute('aria-selected','false'); });
      chip.classList.add('is-active');
      chip.setAttribute('aria-selected','true');
      const filter = chip.dataset.filter;
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('is-hidden', !match);
      });
    });
  });

  // ---------- COUNTER ANIMATION ----------
  const counters = document.querySelectorAll('.stat__num[data-count]');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    if (isNaN(target)) return;
    // For years (4-digit), just set and skip animation
    if (target > 1900 && target < 3000) { el.textContent = target; return; }
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(target * eased);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  };

  // ---------- REVEAL ON SCROLL ----------
  const reveals = document.querySelectorAll('.section, .stat, .brand-card, .press-card, .award, .pillar, .benefit, .career-card');
  reveals.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          if (entry.target.classList.contains('stat')) {
            entry.target.querySelectorAll('.stat__num[data-count]').forEach(animateCount);
          }
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
    counters.forEach(animateCount);
  }

  // ---------- YEAR ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- COPY TO CLIPBOARD (brand-guide) ----------
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard?.writeText(btn.dataset.copy);
      const original = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = original, 1400);
    });
  });

  // ---------- SMOOTH FOCUS FOR ANCHORS ----------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      if (!id || id === 'top') return;
      const target = document.getElementById(id);
      if (target) {
        // Allow native smooth scroll; set focus for a11y
        setTimeout(() => target.setAttribute('tabindex', '-1'), 0);
        setTimeout(() => target.focus({ preventScroll: true }), 700);
      }
    });
  });
})();
