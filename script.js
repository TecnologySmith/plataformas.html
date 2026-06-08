/* ===========================
   TECNOLOGYSMITH — SCRIPT.JS
   =========================== */

// ── NAVBAR scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
  backTop.classList.toggle('visible', window.scrollY > 400);
});

// ── HAMBURGER menu ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  const isOpen = navLinks.classList.contains('open');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity   = isOpen ? '0' : '1';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

// Cerrar nav al hacer click en un link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = ''; s.style.opacity = '1';
    });
  });
});

// ── FILTER ──
const filterBtns = document.querySelectorAll('.filter-btn');
const cards      = document.querySelectorAll('.card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Actualizar botón activo
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    cards.forEach(card => {
      const category = card.dataset.category;
      if (filter === 'all' || category === filter) {
        card.classList.remove('hidden');
        card.style.animationName = 'none';
        requestAnimationFrame(() => {
          card.style.animationName = '';
        });
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

// Aplicar estado inicial a las cards
cards.forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(22px)';
  card.style.transition = `opacity 0.45s ${i * 0.04}s ease, transform 0.45s ${i * 0.04}s ease`;
  observer.observe(card);
});

// ── BACK TO TOP ──
const backTop = document.getElementById('backTop');
backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── SMOOTH SECTION SCROLL para nav links internos ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
