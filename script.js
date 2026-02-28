/* ============================================================
   VISIT QATAR — SCRIPT.JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Navbar Scroll Shadow ── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  /* ── Hamburger / Mobile Menu ── */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
  }

  /* ── Mobile Accordion Dropdowns ── */
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', function () {
      const dropdown = this.nextElementSibling;
      const isOpen = dropdown && dropdown.classList.contains('open');

      // Close all
      document.querySelectorAll('.mobile-dropdown.open').forEach(d => d.classList.remove('open'));
      document.querySelectorAll('.mobile-nav-link.open').forEach(l => l.classList.remove('open'));

      if (!isOpen && dropdown) {
        dropdown.classList.add('open');
        this.classList.add('open');
      }
    });
  });

  /* ── FAQ Accordion ── */
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function () {
      const item = this.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  /* ── Newsletter Form ── */
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = this.querySelector('input[type="email"]');
      if (input && input.value) {
        const btn = this.querySelector('button');
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
        btn.style.background = '#22c55e';
        input.value = '';
        setTimeout(() => {
          btn.innerHTML = original;
          btn.style.background = '';
        }, 3000);
      }
    });
  });

  /* ── Auth Forms ── */
  document.querySelectorAll('.auth-form').forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Please wait...';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check-circle"></i> Success!';
        btn.style.background = '#22c55e';
        setTimeout(() => {
          btn.innerHTML = original;
          btn.style.background = '';
          btn.disabled = false;
        }, 2000);
      }, 1500);
    });
  });

  /* ── Password Toggle ── */
  document.querySelectorAll('.toggle-password').forEach(toggle => {
    toggle.addEventListener('click', function () {
      const input = this.closest('.input-wrap').querySelector('input');
      if (input.type === 'password') {
        input.type = 'text';
        this.classList.replace('fa-eye', 'fa-eye-slash');
      } else {
        input.type = 'password';
        this.classList.replace('fa-eye-slash', 'fa-eye');
      }
    });
  });

  /* ── Video Hero: Sound Toggle ── */
  const videoEl = document.querySelector('.hero-vid');
  const soundBtn = document.getElementById('videoSoundBtn');
  const soundIcon = document.getElementById('videoSoundIcon');

  if (videoEl && soundBtn) {
    soundBtn.addEventListener('click', () => {
      videoEl.muted = !videoEl.muted;
      soundIcon.className = videoEl.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
    });
  }

  /* ── Animated Stat Counters ── */
  const counters = document.querySelectorAll('.counter');

  if (counters.length) {
    const formatNum = (n) => {
      if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
      if (n >= 1000) return n.toLocaleString();
      return n.toString();
    };

    const animateCounter = (el) => {
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current = Math.min(Math.round(increment * step), target);
        el.textContent = formatNum(current) + suffix;
        if (step >= steps) clearInterval(timer);
      }, duration / steps);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  /* ── Set Active Nav Link ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .dropdown a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(currentPage) && currentPage !== 'index.html') {
      link.classList.add('active');
    }
  });

});