/* ==========================================
   GRANJA DON GREGORIO - FIX MOBILE READY
========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initMobileMenu();
  initGallery();
  initForm();
  initIntersectionObserver();
  initSmoothScroll();
  initNumberCounters();
  initScrollEffects();
  initFormValidation();
  initContactShortcut();
  initEscapeHandlers();
  detectarModoOscuro();
});

/* ========== MOBILE MENU FIX ========== */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');

    // bloquear scroll en móvil
    document.body.style.overflow = navLinks.classList.contains('active')
      ? 'hidden'
      : 'auto';
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });

  // cerrar tocando fuera
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

/* ========== NAVBAR SCROLL ========== */
function initNavigation() {
  const navContainer = document.querySelector('.navbar-container');
  if (!navContainer) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 50;

    navContainer.style.background = scrolled
      ? 'rgba(255,255,255,0.98)'
      : 'rgba(255,255,255,0.95)';

    navContainer.style.boxShadow = scrolled
      ? '0 4px 20px rgba(0,0,0,0.1)'
      : '0 2px 15px rgba(0,0,0,0.06)';
  });
}

/* ========== GALERÍA MOBILE FRIENDLY ========== */
function initGallery() {
  const items = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('galleryModal');
  const modalImage = document.getElementById('modalImage');

  if (!modal || !modalImage) return;

  items.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;

      modalImage.src = img.src;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

/* ========== FORM WHATSAPP ========== */
function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
      nombre: form.nombre.value,
      email: form.email.value,
      telefono: form.telefono.value,
      fechas: form.fechas.value,
      huespedes: form.huespedes.value,
      mensaje: form.mensaje.value
    };

    const text = `
*CONSULTA - Granja Don Gregorio*
Nombre: ${data.nombre}
Email: ${data.email}
Tel: ${data.telefono}
Fechas: ${data.fechas}
Huéspedes: ${data.huespedes}
Mensaje: ${data.mensaje}
    `.trim();

    const url = `https://wa.me/595986455598?text=${encodeURIComponent(text)}`;

    window.open(url, '_blank');
    form.reset();

    toast("Consulta enviada");
  });
}

/* ========== TOAST MOBILE SAFE ========== */
function toast(msg) {
  const el = document.createElement('div');
  el.textContent = msg;

  Object.assign(el.style, {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#16a34a',
    color: '#fff',
    padding: '12px 18px',
    borderRadius: '10px',
    zIndex: 9999,
    fontSize: '14px'
  });

  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

/* ========== SCROLL SUAVE FIX ========== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;

      e.preventDefault();

      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });
    });
  });
}

/* ========== COUNTERS SAFE MOBILE ========== */
function initNumberCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const hero = document.querySelector('.hero');

  if (!hero) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      counters.forEach(c => {
        const target = parseInt(c.textContent);
        let i = 0;

        const step = () => {
          i += target / 30;
          c.textContent = Math.min(Math.ceil(i), target) + '+';
          if (i < target) requestAnimationFrame(step);
        };

        step();
      });

      obs.disconnect();
    });
  });

  obs.observe(hero);
}

/* ========== ESC + MODAL FIX MOBILE ========== */
function initEscapeHandlers() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('galleryModal');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    }
  });
}

/* ========== VALIDACIÓN SIMPLE ========== */
function initFormValidation() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('input', (e) => {
    if (e.target.checkValidity()) {
      e.target.style.borderColor = '#16a34a';
    }
  });
}

/* ========== SCROLL EFFECTS MOBILE SAFE ========== */
function initScrollEffects() {
  const hero = document.querySelector('.hero');

  window.addEventListener('scroll', () => {
    if (!hero) return;

    const y = window.scrollY;
    if (y < window.innerHeight) {
      hero.style.backgroundPositionY = y * 0.3 + 'px';
    }
  });
}

/* ========== DARK MODE DETECTION ========== */
function detectarModoOscuro() {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  if (mq.matches) document.documentElement.setAttribute('data-theme', 'dark');

  mq.addEventListener('change', e => {
    document.documentElement.toggleAttribute('data-theme', e.matches);
  });
}
