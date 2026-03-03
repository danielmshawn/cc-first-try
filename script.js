'use strict';

/* ============================================================
   HUGHES STAMP CLUB — script.js
   ============================================================ */

// ---- Next Meeting Date Calculator --------------------------

function getNthWednesdaysInMonth(year, month) {
  const wednesdays = [];
  const days = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= days; d++) {
    if (new Date(year, month, d).getDay() === 3) {
      wednesdays.push(new Date(year, month, d));
    }
  }
  // Return 2nd and 4th Wednesday (indices 1 and 3)
  return [wednesdays[1], wednesdays[3]].filter(Boolean);
}

function getNextMeeting() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let offset = 0; offset <= 3; offset++) {
    const ref = new Date(today.getFullYear(), today.getMonth() + offset, 1);
    const meetings = getNthWednesdaysInMonth(ref.getFullYear(), ref.getMonth());
    for (const m of meetings) {
      if (m >= today) return m;
    }
  }
  return null;
}

function fmt(date, style) {
  if (!date) return 'TBD';
  if (style === 'hero') {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  }
  if (style === 'short') {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' });
  }
  // full with year
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function updateDates() {
  const next = getNextMeeting();
  const targets = [
    { id: 'next-meeting-date',  style: 'hero'  },
    { id: 'auction-next-date',  style: 'short' },
    { id: 'meeting-next-date',  style: 'full'  },
  ];
  targets.forEach(({ id, style }) => {
    const el = document.getElementById(id);
    if (el) el.textContent = fmt(next, style);
  });
}


// ---- Nav ---------------------------------------------------

function initNav() {
  const nav    = document.getElementById('nav');
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');

  // Scrolled shadow
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 16);
  }, { passive: true });

  // Mobile toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on link click
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}


// ---- Scroll Reveal -----------------------------------------

function initReveal() {
  const targets = document.querySelectorAll(
    '.benefit-card, .meeting-card, .about-text, .about-stamp-wrap, .auction-ticket'
  );

  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings in the same grid
        const delay = getSiblingIndex(entry.target) * 80;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => observer.observe(el));
}

function getSiblingIndex(el) {
  let i = 0;
  let sib = el.previousElementSibling;
  while (sib) { i++; sib = sib.previousElementSibling; }
  return i;
}


// ---- Init --------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  updateDates();
  initNav();
  initReveal();
});
