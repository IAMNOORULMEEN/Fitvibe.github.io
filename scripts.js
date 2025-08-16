// Card animation on scroll
const cards = document.querySelectorAll('.card, .mini-card, .half-card, .banner-card');
const options = {threshold: 0.13};
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'none';
      entry.target.style.animation = 'none';
      observer.unobserve(entry.target);
    }
  });
}, options);
cards.forEach(card => observer.observe(card));

// Hamburger for mobile nav
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('open');
});

// Close nav when clicking a link (mobile)
document.querySelectorAll('.nav-menu a').forEach(link =>
  link.addEventListener('click', ()=>{
    navMenu.classList.remove('active');
    hamburger.classList.remove('open');
  }));

// Optional: Smooth scroll for internal anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener('click',function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior: "smooth"});
    }
  });
});
