/* =====================================================
   VISIT QATAR — main.js
   Home page JavaScript
===================================================== */

'use strict';

/* =====================================================
   1. HERO CAROUSEL
===================================================== */
(function initCarousel() {

  const slides    = document.querySelectorAll('.hero-slide');
  const dots      = document.querySelectorAll('.hero-dot');
  const prevBtn   = document.getElementById('heroPrev');
  const nextBtn   = document.getElementById('heroNext');

  if (!slides.length) return;

  let current   = 0;
  let timer     = null;
  const DELAY   = 6000; // ms between auto-advances

  /* ---- Core: go to a specific slide ---- */
  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    dots[current].setAttribute('aria-selected', 'false');

    current = (index + slides.length) % slides.length;

    slides[current].classList.add('active');
    dots[current].classList.add('active');
    dots[current].setAttribute('aria-selected', 'true');
  }

  /* ---- Auto-play ---- */
  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), DELAY);
  }

  function resetTimer() {
    startTimer();
  }

  /* ---- Prev / Next buttons ---- */
  if (prevBtn) {
    prevBtn.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => { goTo(current + 1); resetTimer(); });
  }

  /* ---- Dot buttons ---- */
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); resetTimer(); });
  });

  /* ---- Keyboard navigation (left / right arrows) ---- */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { goTo(current - 1); resetTimer(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); resetTimer(); }
  });

  /* ---- Touch / swipe support ---- */
  let touchStartX = 0;
  const carousel = document.getElementById('heroCarousel');
  if (carousel) {
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) {
        dx < 0 ? goTo(current + 1) : goTo(current - 1);
        resetTimer();
      }
    }, { passive: true });
  }

  /* ---- Pause on hover ---- */
  if (carousel) {
    carousel.addEventListener('mouseenter', () => clearInterval(timer));
    carousel.addEventListener('mouseleave', startTimer);
  }

  /* ---- Init ---- */
  startTimer();

})();


/* =====================================================
   2. NAVBAR — scroll behaviour
===================================================== */
(function initNavbar() {

  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const SCROLL_THRESHOLD = 60;

  function onScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

})();


/* =====================================================
   3. MOBILE MENU TOGGLE
===================================================== */
(function initMobileMenu() {

  const toggleBtn  = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!toggleBtn || !mobileMenu) return;

  let isOpen = false;

  function openMenu() {
    isOpen = true;
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    toggleBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    isOpen = false;
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', () => {
    isOpen ? closeMenu() : openMenu();
  });

  /* Close on Escape */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) closeMenu();
  });

  /* Close when clicking a link inside the mobile menu */
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

})();


/* =====================================================
   4. STATS COUNTER ANIMATION
===================================================== */
(function initStatsCounter() {

  const statNums = document.querySelectorAll('.stat-num[data-target]');
  if (!statNums.length) return;

  const DURATION = 1800; // ms

  function animateCounter(el) {
    const target    = parseInt(el.dataset.target, 10);
    const suffix    = el.dataset.suffix || '';
    const startTime = performance.now();

    function tick(now) {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / DURATION, 1);
      // Ease-out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      const value    = Math.round(eased * target);

      el.textContent = value + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        // Apply the display suffix (M+, +, etc.) if stored on element
        el.textContent = el.dataset.display || (target + suffix);
      }
    }

    requestAnimationFrame(tick);
  }

  /* Use IntersectionObserver so counters run when visible */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  /* Set display format and start observing */
  const displays = { 4: '4M+', 300: '300+', 55: '55+', 365: '365' };
  statNums.forEach((el) => {
    const t = parseInt(el.dataset.target, 10);
    el.dataset.display = displays[t] || String(t);
    el.textContent = '0';
    observer.observe(el);
  });

})();


/* =====================================================
   5. WHY VISIT QATAR — SCROLL REVEAL
===================================================== */
(function initScrollReveal() {

  const items = document.querySelectorAll('.why-item.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        /* Stagger each card by 100ms */
        const index = Array.from(items).indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('in-view');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach((item) => observer.observe(item));

})();


/* =====================================================
   6. NEWSLETTER FORM
===================================================== */
(function initNewsletter() {

  const form    = document.getElementById('nlForm');
  const input   = document.getElementById('nlEmail');
  const success = document.getElementById('nlSuccess');

  if (!form || !input) return;

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = input.value.trim();

    if (!isValidEmail(email)) {
      input.style.borderColor = '#C0392B';
      input.focus();
      setTimeout(() => (input.style.borderColor = ''), 2000);
      return;
    }

    /* Simulate submission */
    const submitBtn = form.querySelector('.nl-submit');
    submitBtn.textContent = 'Subscribing…';
    submitBtn.disabled = true;

    setTimeout(() => {
      input.value        = '';
      submitBtn.textContent = 'Subscribe';
      submitBtn.disabled    = false;
      if (success) {
        success.textContent = 'Thank you! You will receive Qatar inspiration in your inbox soon.';
        setTimeout(() => (success.textContent = ''), 6000);
      }
    }, 1200);
  });

})();


/* =====================================================
   7. DESTINATION & EXPERIENCE CARD — KEYBOARD ACCESS
===================================================== */
(function initCardKeyboard() {

  /* Allow Enter / Space to trigger onclick for card elements
     that use onclick but aren't <a> or <button> */
  const cards = document.querySelectorAll('.dest-card, .exp-card');

  cards.forEach((card) => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

})();


/* =====================================================
   8. SMOOTH SCROLL — anchor links (#section)
===================================================== */
(function initSmoothScroll() {

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--nav-h'),
          10
        ) || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();