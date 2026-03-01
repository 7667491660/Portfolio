/* ===========================
   ARPIT KR SINHA — PORTFOLIO
   script.js
   =========================== */

// ─── CUSTOM CURSOR ───────────────────────────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

// Smooth follower with lerp
function animateCursor() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effect on interactive elements
const interactives = document.querySelectorAll('a, button, .skill-pill, .project-card, .info-card');
interactives.forEach(el => {
  el.addEventListener('mouseenter', () => {
    follower.style.width = '60px';
    follower.style.height = '60px';
    follower.style.borderColor = '#c9a84c';
    follower.style.opacity = '0.8';
  });
  el.addEventListener('mouseleave', () => {
    follower.style.width = '36px';
    follower.style.height = '36px';
    follower.style.borderColor = '#c9a84c';
    follower.style.opacity = '0.6';
  });
});

// ─── PARTICLE CANVAS ─────────────────────────────────────────
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const PARTICLE_COUNT = 60;
const particles = [];

class Particle {
  constructor() { this.reset(true); }
  reset(init = false) {
    this.x = Math.random() * canvas.width;
    this.y = init ? Math.random() * canvas.height : canvas.height + 10;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedY = -(Math.random() * 0.4 + 0.1);
    this.speedX = (Math.random() - 0.5) * 0.2;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.6 ? '#c9a84c' : '#4f8ef7';
    this.life = 0;
    this.maxLife = Math.random() * 400 + 200;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life++;
    if (this.life > this.maxLife || this.y < -10) this.reset();
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity * Math.min(1, (this.maxLife - this.life) / 80);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ─── TYPEWRITER ───────────────────────────────────────────────
const phrases = [
  'Web Developer',
  'Problem Solver',
  'CS Student',
  'Full-Stack Builder',
  'Ready to Grow 🚀'
];

const typedEl = document.getElementById('typed');
let phraseIndex = 0, charIndex = 0, deleting = false;

function typeWriter() {
  const current = phrases[phraseIndex];
  if (!deleting) {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeWriter, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeWriter, 400);
      return;
    }
  }
  setTimeout(typeWriter, deleting ? 40 : 75);
}
typeWriter();

// ─── NAVBAR SCROLL ────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ─── SCROLL REVEAL ────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── SMOOTH SCROLL ────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── HERO PHOTO PARALLAX ─────────────────────────────────────
const heroPhoto = document.querySelector('.photo-frame');
if (heroPhoto) {
  window.addEventListener('mousemove', (e) => {
    const xShift = (e.clientX / window.innerWidth - 0.5) * 12;
    const yShift = (e.clientY / window.innerHeight - 0.5) * 8;
    heroPhoto.style.transform = `translate(${xShift}px, ${yShift}px)`;
  });
}

// ─── SKILL PILLS STAGGER REVEAL ──────────────────────────────
const pills = document.querySelectorAll('.skill-pill');
pills.forEach((pill, i) => {
  pill.style.transitionDelay = `${i * 0.05}s`;
  // Add subtle random tilt on hover
  pill.addEventListener('mouseenter', () => {
    const tilt = (Math.random() - 0.5) * 6;
    pill.style.transform = `translateY(-3px) rotate(${tilt}deg)`;
  });
  pill.addEventListener('mouseleave', () => {
    pill.style.transform = '';
  });
});

// ─── SECTION ACTIVE HIGHLIGHT IN NAV ─────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}`
          ? 'rgba(240,237,230,1)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ─── PAGE LOAD ANIMATION ──────────────────────────────────────
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  setTimeout(() => { document.body.style.opacity = '1'; }, 50);
});
