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
  initEscapeHandlers();
});

function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });

  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

function initNavigation() {
  const navContainer = document.querySelector('.navbar-container');
  if (!navContainer) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 50;
    navContainer.style.background = scrolled ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.95)';
    navContainer.style.boxShadow = scrolled ? '0 4px 20px rgba(0,0,0,0.1)' : '0 2px 15px rgba(0,0,0,0.06)';
  });
}

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

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.querySelector('.modal-close').addEventListener('click', closeModal);
}

function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const text = `
*CONSULTA - Granja Don Gregorio*
Nombre: ${form.nombre.value}
Email: ${form.email.value}
Tel: ${form.telefono.value}
Fechas: ${form.fechas.value}
Huéspedes: ${form.huespedes.value}
Mensaje: ${form.mensaje.value}
    `.trim();

    window.open(`https://wa.me/595986455598?text=${encodeURIComponent(text)}`, '_blank');
    form.reset();
    toast('Consulta enviada');
  });
}

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

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
    });
  });
}

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

function initFormValidation() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('input', (e) => {
    if (e.target.checkValidity()) {
      e.target.style.borderColor = '#16a34a';
    }
  });
}

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

function initIntersectionObserver() {}
