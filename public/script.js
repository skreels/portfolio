

// ============================================
// Scroll-triggered reveal animations
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const siblings = entry.target.parentElement.querySelectorAll('.slide-up, .fade-in');
      const siblingIndex = Array.from(siblings).indexOf(entry.target);
      const delay = siblingIndex * 100;

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in, .slide-up').forEach((el) => {
  observer.observe(el);
});

// ============================================
// Header scroll effect
// ============================================
const header = document.getElementById('main-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });

// ============================================
// Parallax effect on hero
// ============================================
const hero = document.getElementById('hero');
const heroContent = document.querySelector('.hero-content');
const heroBgLayer = document.querySelector('.hero-bg-layer');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroHeight = hero.offsetHeight;

  if (scrollY < heroHeight) {
    const ratio = scrollY / heroHeight;
    heroContent.style.transform = `translateY(${scrollY * 0.35}px)`;
    heroContent.style.opacity = 1 - ratio * 1.2;
    heroBgLayer.style.transform = `translateY(${scrollY * 0.15}px)`;
  }
}, { passive: true });

// ============================================
// Floating particles in hero
// ============================================
const particlesContainer = document.getElementById('hero-particles');

function createParticles(count) {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = (6 + Math.random() * 6) + 's';
    particle.style.width = (1 + Math.random() * 2) + 'px';
    particle.style.height = particle.style.width;
    particlesContainer.appendChild(particle);
  }
}

createParticles(30);

// ============================================
// Smooth scroll for nav links
// ============================================
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================================
// Active nav link highlighting
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--accent)';
        }
      });
    }
  });
}, { threshold: 0.3 });

sections.forEach(section => {
  navObserver.observe(section);
});

// ============================================
// Mobile hamburger menu
// ============================================
const navToggle = document.getElementById('nav-toggle');
const navUl = document.querySelector('nav ul');

navToggle.addEventListener('click', () => {
  const isOpen = navUl.classList.toggle('open');
  navToggle.classList.toggle('active');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navUl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navUl.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============================================
// Cursor glow effect
// ============================================
(function () {
  if (!window.matchMedia('(hover: hover)').matches) return;

  const glow = document.getElementById('cursor-glow');
  if (!glow) return;
  glow.style.display = 'block';

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function animate() {
    glowX += (mouseX - glowX) * 0.15;
    glowY += (mouseY - glowY) * 0.15;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    requestAnimationFrame(animate);
  }

  animate();
})();

// ============================================
// Typewriter effect on hero subtitle
// ============================================
(function () {
  const subtitle = document.querySelector('.hero-subtitle');
  if (!subtitle) return;

  const fullText = subtitle.textContent;
  subtitle.textContent = '';

  const cursor = document.createElement('span');
  cursor.classList.add('typewriter-cursor');
  subtitle.appendChild(cursor);

  let i = 0;
  const speed = 40;
  const startDelay = 1200;

  function type() {
    if (i < fullText.length) {
      subtitle.insertBefore(document.createTextNode(fullText.charAt(i)), cursor);
      i++;
      setTimeout(type, speed);
    }
  }

  setTimeout(type, startDelay);
})();

// ============================================
// Glitch / scramble effect on hero name
// ============================================
(function () {
  const glitchEl = document.getElementById('glitch-name');
  if (!glitchEl) return;

  const originalHTML = glitchEl.innerHTML;
  const originalText = glitchEl.textContent;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
  let isScrambling = false;

  glitchEl.addEventListener('mouseenter', () => {
    if (isScrambling) return;
    isScrambling = true;
    glitchEl.classList.add('scrambling');

    const duration = 500;
    const steps = 15;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const resolved = Math.floor(progress * originalText.length);
      let display = '';

      for (let i = 0; i < originalText.length; i++) {
        if (originalText[i] === ' ') {
          display += ' ';
        } else if (i < resolved) {
          display += originalText[i];
        } else {
          display += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      glitchEl.textContent = display;

      if (step >= steps) {
        clearInterval(timer);
        glitchEl.innerHTML = originalHTML;
        glitchEl.classList.remove('scrambling');
        isScrambling = false;
      }
    }, interval);
  });
})();

// ============================================
// 3D tilt effect on cards
// ============================================
(function () {
  if (!window.matchMedia('(hover: hover)').matches) return;

  const tiltElements = document.querySelectorAll('.project-card, .skill-item');
  const maxTilt = 12;

  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * maxTilt;
      const rotateX = ((centerY - y) / centerY) * maxTilt;

      requestAnimationFrame(() => {
        el.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    });

    el.addEventListener('mouseleave', () => {
      requestAnimationFrame(() => {
        el.style.transform = '';
      });
    });
  });
})();

// ============================================
// Constellation canvas (connected particles)
// ============================================
(function () {
  const canvas = document.getElementById('constellation-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let w, h, particles;
  const count = 60;
  const maxDist = 150;
  const accentR = 108, accentG = 99, accentB = 255;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: 1 + Math.random() * 1.5
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${accentR}, ${accentG}, ${accentB}, 0.3)`;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.12;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${accentR}, ${accentG}, ${accentB}, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize, { passive: true });
  init();
  draw();
})();

// ============================================
// Magnetic buttons (hero CTA)
// ============================================
(function () {
  if (!window.matchMedia('(hover: hover)').matches) return;

  const buttons = document.querySelectorAll('.hero-cta a');
  const strength = 0.3;

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      requestAnimationFrame(() => {
        btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
    });

    btn.addEventListener('mouseleave', () => {
      requestAnimationFrame(() => {
        btn.style.transform = '';
      });
    });
  });
})();