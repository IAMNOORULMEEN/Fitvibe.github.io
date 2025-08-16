// Utilities
const $ = (q, ctx = document) => ctx.querySelector(q);
const $$ = (q, ctx = document) => Array.from(ctx.querySelectorAll(q));

/* Loader */
window.addEventListener('load', () => {
  $('#loader')?.classList.add('hidden');
});

/* Current year */
$('#year').textContent = new Date().getFullYear();

/* Mobile Nav */
const hamburger = $('#hamburger');
const navMenu = $('#navMenu');
hamburger?.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
});
$$('.nav-links a').forEach(a => a.addEventListener('click', () => navMenu.classList.remove('open')));

/* Back to top */
const backToTop = $('#backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) backToTop.classList.add('show');
  else backToTop.classList.remove('show');
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* Theme toggle (persist) */
const themeToggle = $('#themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* Intersection Observer: reveal on scroll */
const revealEls = [...$$('.reveal-up'), ...$$('.reveal-fade')];
const io = new IntersectionObserver((entries) => {
  entries.forEach(ent => {
    if (ent.isIntersecting) {
      ent.target.classList.add('revealed');
      io.unobserve(ent.target);
    }
  });
}, {threshold: 0.15});
revealEls.forEach(el => io.observe(el));

/* Animated counters */
const counters = $$('.count');
let countersAnimated = false;
const countersIO = new IntersectionObserver((entries) => {
  entries.forEach(ent => {
    if (ent.isIntersecting && !countersAnimated) {
      countersAnimated = true;
      counters.forEach(counter => animateCount(counter));
      countersIO.disconnect();
    }
  });
}, {threshold: 0.4});
if (counters.length) countersIO.observe(counters[0]);

function animateCount(el) {
  const target = +el.dataset.target || 0;
  const duration = 1400;
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(p * target).toLocaleString();
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* Carousel */
const track = $('.carousel-track');
const prevBtn = $('.carousel .prev');
const nextBtn = $('.carousel .next');
const dotsWrap = $('.carousel-dots');

if (track && prevBtn && nextBtn && dotsWrap) {
  const slides = $$('.testimonial', track);
  let index = 0;

  // dots
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(b);
  });
  function updateDots() {
    $$('.carousel-dots button', dotsWrap).forEach((d, i) => d.classList.toggle('active', i === index));
  }
  function goTo(i) {
    index = (i + slides.length) % slides.length;
    const offset = slides.slice(0, index).reduce((acc, s) => acc + s.getBoundingClientRect().width + 16, 0);
    track.scrollTo({ left: offset, behavior: 'smooth' });
    updateDots();
  }
  prevBtn.addEventListener('click', () => goTo(index - 1));
  nextBtn.addEventListener('click', () => goTo(index + 1));
  updateDots();

  // Auto-play
  let auto = setInterval(() => goTo(index + 1), 5000);
  track.addEventListener('pointerenter', () => clearInterval(auto));
  track.addEventListener('pointerleave', () => auto = setInterval(() => goTo(index + 1), 5000));
}

/* FAQ details animation (native <details> is good; just add smoothness) */
$$('details').forEach(d => {
  d.addEventListener('toggle', () => {
    if (d.open) {
      const c = d.querySelector('p');
      if (c) {
        c.style.opacity = 0;
        requestAnimationFrame(() => {
          c.animate([{opacity:0},{opacity:1}], {duration:200, fill:'forwards'});
        });
      }
    }
  });
});

/* Contact form validation (client-side only) */
$('#contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  let valid = true;
  $$('input[required], textarea[required]', form).forEach(field => {
    const error = field.parentElement.querySelector('.error');
    if (!field.value.trim() || (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value))) {
      error.textContent = field.type === 'email' ? 'Enter a valid email.' : 'This field is required.';
      valid = false;
    } else {
      error.textContent = '';
    }
  });

  const status = $('#formStatus');
  if (!valid) {
    status.textContent = 'Please fix the errors above.';
    return;
  }
  // Simulate success (replace with your backend later)
  status.textContent = 'Sending…';
  setTimeout(() => {
    status.textContent = 'Thanks! We’ll reach out within 24 hours.';
    e.target.reset();
  }, 700);
});
