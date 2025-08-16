/* ===== RESET ===== */
* {
  margin: 0; padding: 0;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
}
body {
  line-height: 1.6;
  background: #f9f9f9;
  color: #333;
}
a { text-decoration: none; }

/* ===== NAVBAR ===== */
.navbar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 1rem 2rem;
  background: #111; color: #fff;
}
.nav-links {
  list-style: none;
  display: flex; gap: 1.5rem;
}
.nav-links a { color: #fff; transition: 0.3s; }
.nav-links a:hover { color: #ff6b6b; }

/* ===== HERO ===== */
.hero {
  height: 100vh;
  background: url("assets/hero-bg.jpg") center/cover no-repeat;
  display: flex; flex-direction: column; justify-content: center; align-items: center;
  text-align: center; color: #fff;
}
.hero h1 { font-size: 3rem; animation: fadeIn 1s ease; }
.hero p { margin: 1rem 0; font-size: 1.2rem; }
.hero-buttons { display: flex; gap: 1rem; }

/* Buttons */
.btn {
  padding: 0.7rem 1.5rem;
  border-radius: 5px;
  font-weight: bold;
}
.primary { background: #ff6b6b; color: #fff; }
.primary:hover { background: #e63946; }
.secondary { background: #fff; color: #111; }
.secondary:hover { background: #eee; }

/* ===== SECTIONS ===== */
section { padding: 4rem 2rem; text-align: center; }
.services .card, .pricing .price-card, .testimonials .testimonial {
  background: #fff; padding: 1.5rem; margin: 1rem;
  border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}
.card:hover, .price-card:hover, .testimonial:hover { transform: translateY(-10px); }

/* ===== TESTIMONIALS ===== */
.testimonials { background: #f0f0f0; }
.testimonial img {
  width: 80px; height: 80px; border-radius: 50%; margin-bottom: 1rem;
}

/* ===== CONTACT ===== */
form {
  display: flex; flex-direction: column; gap: 1rem;
  max-width: 500px; margin: auto;
}
form input, form textarea {
  padding: 0.8rem; border: 1px solid #ccc; border-radius: 5px;
}
form button { width: fit-content; margin: auto; }

/* ===== FOOTER ===== */
footer {
  background: #111; color: #fff; text-align: center;
  padding: 1rem; margin-top: 2rem;
}

/* ===== ANIMATIONS ===== */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
