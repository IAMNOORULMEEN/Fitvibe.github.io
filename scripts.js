// Loading screen hide after page load
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.style.opacity = '0';
    setTimeout(() => loadingScreen.style.display = 'none', 500);
  }
});

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });
});

// Smooth scroll polyfill (for legacy support, mostly modern browsers support natively)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Animate elements on scroll using Intersection Observer
const animatedElements = document.querySelectorAll('.animate');
const observerOptions = {
  threshold: 0.2,
};
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animatedElements.forEach(el => {
  observer.observe(el);
});

// Testimonials Carousel Logic
const carouselWrapper = document.querySelector('.testimonials-wrapper');
const testimonials = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.carousel-control.prev');
const nextBtn = document.querySelector('.carousel-control.next');
let currentIndex = 0;
let testimonialInterval;

function updateCarousel() {
  testimonials.forEach((testimonial, i) => {
    testimonial.classList.toggle('active', i === currentIndex);
  });
}

function showNextTestimonial() {
  currentIndex = (currentIndex + 1) % testimonials.length;
  updateCarousel();
}

function showPrevTestimonial() {
  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  updateCarousel();
}

prevBtn.addEventListener('click', () => {
  showPrevTestimonial();
  resetInterval();
});
nextBtn.addEventListener('click', () => {
  showNextTestimonial();
  resetInterval();
});

function resetInterval() {
  clearInterval(testimonialInterval);
  testimonialInterval = setInterval(showNextTestimonial, 6000);
}

testimonialInterval = setInterval(showNextTestimonial, 6000);
updateCarousel();

// FAQ Accordion
const faqButtons = document.querySelectorAll('.faq-question');

faqButtons.forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    const answer = button.nextElementSibling;
    if (!expanded) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
      answer.style.maxHeight = null;
    }
  });

  // Accessibility: toggle answer height on page load if aria-expanded true
  if(button.getAttribute('aria-expanded') === 'true'){
    const answer = button.nextElementSibling;
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }
});

// Contact form validation and submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    alert('Thank you for contacting FitVibe! We will get back to you soon.');

    contactForm.reset();
  });
}

// Dark/Light mode toggle
const toggleThemeBtn = document.getElementById('toggle-theme');
const bodyElement = document.body;

function setTheme(theme) {
  if (theme === 'dark') {
    bodyElement.classList.add('dark-mode');
    toggleThemeBtn.textContent = '☀️';
  } else {
    bodyElement.classList.remove('dark-mode');
    toggleThemeBtn.textContent = '🌙';
  }
  localStorage.setItem('fitvibe-theme', theme);
}

toggleThemeBtn.addEventListener('click', () => {
  const isDark = bodyElement.classList.contains('dark-mode');
  setTheme(isDark ? 'light' : 'dark');
});

// Load saved theme
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('fitvibe-theme') || 'light';
  setTheme(savedTheme);
});
