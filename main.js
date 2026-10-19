/* ─── Main JS for Pranith Portfolio ─── */

// ── Typewriter Effect ──
const phrases = [
  "Skilled Software Engineer",
  "Quick Learner",
  "Self-Motivated Creator",
  "Python Developer",
  "Problem Solver"
];

let phraseIdx = 0;
let charIdx = 0;
let deleting = false;
const el = document.getElementById("typewriter");

function typeLoop() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    el.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    el.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 55 : 90);
}
typeLoop();

// ── Navbar scroll effect ──
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

// ── Hamburger menu ──
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  const spans = hamburger.querySelectorAll("span");
  const isOpen = navLinks.classList.contains("open");
  spans[0].style.transform = isOpen ? "rotate(45deg) translate(5px, 5px)" : "";
  spans[1].style.opacity = isOpen ? "0" : "1";
  spans[2].style.transform = isOpen ? "rotate(-45deg) translate(5px, -5px)" : "";
});

// Close nav on link click
navLinks.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    const spans = hamburger.querySelectorAll("span");
    spans[0].style.transform = "";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "";
  });
});

// ── Intersection Observer — Skill bars & fade-ins ──
const skillFills = document.querySelectorAll(".skill-fill");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const pct = fill.style.getPropertyValue("--pct");
        fill.style.width = pct;
        observer.unobserve(fill);
      }
    });
  },
  { threshold: 0.4 }
);
skillFills.forEach((fill) => observer.observe(fill));

// ── Fade-in on scroll for cards ──
const fadeEls = document.querySelectorAll(
  ".skill-card, .timeline-card, .project-card, .cert-card, .workshop-card, .about-stats .stat-card"
);

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);

fadeEls.forEach((el) => {
  if (!el.style.animationName) {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  }
  fadeObserver.observe(el);
});

// ── Contact Form ──
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById("submit-btn");
  const success = document.getElementById("form-success");
  btn.textContent = "Sending...";
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = "Send Message 🚀";
    btn.disabled = false;
    success.style.display = "block";
    document.getElementById("contact-form").reset();
    setTimeout(() => (success.style.display = "none"), 5000);
  }, 1200);
}

// ── Smooth active nav highlight ──
const sections = document.querySelectorAll("section[id]");
const navAnchorEls = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((sec) => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.id;
  });
  navAnchorEls.forEach((a) => {
    a.style.color = a.getAttribute("href") === `#${current}` ? "var(--neon-cyan)" : "";
  });
});

// ── Particle cursor glow (subtle) ──
document.addEventListener("mousemove", (e) => {
  const glow = document.getElementById("cursor-glow");
  if (glow) {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  }
});

// Create cursor glow element
const glowEl = document.createElement("div");
glowEl.id = "cursor-glow";
Object.assign(glowEl.style, {
  position: "fixed",
  width: "300px",
  height: "300px",
  borderRadius: "50%",
  background: "radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 70%)",
  transform: "translate(-50%, -50%)",
  pointerEvents: "none",
  zIndex: "0",
  transition: "left 0.1s ease, top 0.1s ease",
});
document.body.appendChild(glowEl);
