"use strict";

// ── Nav scroll effect ──────────────────────────────────────────────
const nav = document.querySelector(".nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ── Mobile menu ────────────────────────────────────────────────────
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

hamburger?.addEventListener("click", () => {
  const isOpen = hamburger.classList.toggle("open");
  mobileMenu.classList.toggle("open", isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "";
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    mobileMenu.classList.remove("open");
    document.body.style.overflow = "";
  });
});

// ── Active nav link on scroll ──────────────────────────────────────
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const activateLink = () => {
  let current = "";
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`,
    );
  });
};

window.addEventListener("scroll", activateLink, { passive: true });

// ── Reveal on scroll ───────────────────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    }),
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

// ── Product category tabs ──────────────────────────────────────────
const tabs = document.querySelectorAll(".tab-btn");
const cards = document.querySelectorAll(".product-card[data-category]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    const filter = tab.dataset.filter;
    cards.forEach((card) => {
      const show = filter === "all" || card.dataset.category === filter;
      card.style.display = show ? "" : "none";
    });
  });
});

// ── Contact form ───────────────────────────────────────────────────
const form = document.querySelector(".contact-form");

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const btn = form.querySelector('[type="submit"]');
  const name = form.querySelector("#nome").value.trim();
  const email = form.querySelector("#email").value.trim();
  const msg = form.querySelector("#mensagem").value.trim();

  if (!name || !email || !msg) return;

  const original = btn.textContent;
  btn.textContent = "Enviando...";
  btn.disabled = true;

  // WhatsApp fallback — sends form data via WhatsApp
  const text = encodeURIComponent(
    `Olá, Lux Gold! 👋\n\nNome: ${name}\nEmail: ${email}\n\nMensagem:\n${msg}`,
  );
  setTimeout(() => {
    window.open(`https://wa.me/5551996534892?text=${text}`, "_blank");
    btn.textContent = "Mensagem Enviada!";
    btn.style.background = "#25D366";
    form.reset();
    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
      btn.style.background = "";
    }, 3000);
  }, 600);
});

// ── Smooth scroll for anchor links ────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

// ── Parallax subtle on hero ────────────────────────────────────────
const heroGrid = document.querySelector(".hero-grid");
if (
  heroGrid &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      heroGrid.style.transform = `translateY(${y * 0.15}px)`;
    },
    { passive: true },
  );
}
