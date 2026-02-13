// Menu mobile
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });
}

// Tema claro/escuro
const themeBtn = document.getElementById("themeBtn");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
}

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
  });
}

// Filtro de projetos
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    projectCards.forEach((card) => {
      const category = card.dataset.category;
      card.style.display = filter === "all" || filter === category ? "block" : "none";
    });
  });
});

// Formulário
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formMessage.textContent = "Mensagem enviada com sucesso! Obrigada pelo contato.";
    contactForm.reset();
  });
}


const reveals = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const trigger = window.innerHeight * 0.9;
  reveals.forEach((item) => {
    const top = item.getBoundingClientRect().top;
    if (top < trigger) item.classList.add("show");
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

const hero = document.getElementById("inicio");
const heroBgBase = document.getElementById("heroBgBase");
const heroContent = document.getElementById("heroContent");
const canvas = document.getElementById("heroParticles");

if (hero && heroBgBase && heroContent && canvas) {
  const ctx = canvas.getContext("2d");
  const DPR = Math.max(1, window.devicePixelRatio || 1);
  let particles = [];
  let quantity = 85;

  function setCanvasSize() {
    const w = hero.clientWidth;
    const h = hero.clientHeight;
    canvas.width = Math.floor(w * DPR);
    canvas.height = Math.floor(h * DPR);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    quantity = w < 768 ? 48 : 85;
  }

  function createParticles() {
    const w = hero.clientWidth;
    const h = hero.clientHeight;
    particles = Array.from({ length: quantity }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      a: Math.random() * 0.58 + 0.2
    }));
  }

  function animateParticles() {
    const w = hero.clientWidth;
    const h = hero.clientHeight;
    ctx.clearRect(0, 0, w, h);

    // pontos
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x <= 0 || p.x >= w) p.vx *= -1;
      if (p.y <= 0 || p.y >= h) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${p.a})`;
      ctx.fill();
    }

    // conexões
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.14;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255,95,95,${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animateParticles);
  }

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    heroBgBase.style.transform = `scale(1.03) translate(${x * 7}px, ${y * 7}px)`;
    heroContent.style.transform = `translate(${x * -4}px, ${y * -4}px)`;
  });

  hero.addEventListener("mouseleave", () => {
    heroBgBase.style.transform = "scale(1.03) translate(0,0)";
    heroContent.style.transform = "translate(0,0)";
  });

  setCanvasSize();
  createParticles();
  animateParticles();

  window.addEventListener("resize", () => {
    setCanvasSize();
    createParticles();
  });
}
