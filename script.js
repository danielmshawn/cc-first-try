/* ═══════════════════════════════════════════════════════════════
   THE PERFORATED EDGE — Interactive JS
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ─── NAVIGATION ─────────────────────────────────────────────── */
(function initNav() {
  const nav    = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const menu   = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  burger.addEventListener('click', () => {
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => menu.classList.remove('open'));
  });
})();

/* ─── HERO FLOATING STAMPS ───────────────────────────────────── */
(function initHeroStamps() {
  const container = document.getElementById('heroStamps');
  if (!container) return;

  const colors = [
    { bg: '#c0392b', label: '3¢'  },
    { bg: '#2563a8', label: '5¢'  },
    { bg: '#2d7a4f', label: '10¢' },
    { bg: '#8f6e24', label: '1¢'  },
    { bg: '#6a3d9a', label: '2¢'  },
    { bg: '#b87333', label: '24¢' },
    { bg: '#1a5276', label: '4¢'  },
    { bg: '#784212', label: '8¢'  },
  ];

  function createHeroStamp() {
    const c   = colors[Math.floor(Math.random() * colors.length)];
    const el  = document.createElement('div');
    const size = 60 + Math.random() * 80;
    const startX = Math.random() * 100;
    const duration = 15 + Math.random() * 25;
    const delay    = Math.random() * 20;
    const rot = (Math.random() - 0.5) * 30;

    el.className = 'hero-stamp-item';
    el.style.cssText = `
      left: ${startX}%;
      bottom: -${size * 1.5}px;
      width: ${size}px;
      height: ${size * 1.2}px;
      background: ${c.bg};
      --rot: ${rot}deg;
      --max-opacity: ${0.08 + Math.random() * 0.1};
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
      border-radius: 2px;
    `;

    // Inner content
    el.innerHTML = `
      <div style="
        position: absolute; inset: 0;
        display: flex; flex-direction: column;
        align-items: center; justify-content: center;
        border: 1px solid rgba(255,255,255,0.2);
        margin: ${size * 0.06}px;
        font-family: 'Courier New', monospace;
        color: rgba(255,255,255,0.6);
        font-size: ${size * 0.12}px;
        letter-spacing: 0.1em;
      ">
        <span>${c.label}</span>
      </div>
    `;

    container.appendChild(el);
  }

  for (let i = 0; i < 16; i++) createHeroStamp();
})();

/* ─── SCROLL REVEAL ──────────────────────────────────────────── */
(function initReveal() {
  const elements = document.querySelectorAll(
    '.stamp-card, .event-item, .why-item, .stat, .tier, .gallery-item, .manifesto-large, blockquote'
  );

  elements.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 6) * 0.08}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
})();

/* ─── ANIMATED COUNTERS ──────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');

  const easeOut = t => 1 - Math.pow(1 - t, 3);

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start    = performance.now();

    function tick(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value    = Math.round(easeOut(progress) * target);
      el.textContent = value.toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

/* ─── FLOATING STAMPS (Quote Section) ───────────────────────── */
(function initFloatingStamps() {
  const container = document.getElementById('floatingStamps');
  if (!container) return;

  const stampData = [
    { color: '#c0392b', w: 90,  h: 108, rot: -12, top: '5%',  left: '5%' },
    { color: '#2563a8', w: 110, h: 132, rot: 6,   top: '10%', left: '45%' },
    { color: '#2d7a4f', w: 80,  h: 96,  rot: -5,  top: '40%', left: '20%' },
    { color: '#8f6e24', w: 100, h: 120, rot: 15,  top: '55%', left: '55%' },
    { color: '#6a3d9a', w: 85,  h: 102, rot: -8,  top: '70%', left: '0%' },
    { color: '#b87333', w: 95,  h: 114, rot: 10,  top: '25%', left: '70%' },
  ];

  stampData.forEach((s, i) => {
    const el = document.createElement('div');
    el.className = 'float-stamp';
    el.style.cssText = `
      width: ${s.w}px;
      height: ${s.h}px;
      background: ${s.color};
      top: ${s.top};
      left: ${s.left};
      transform: rotate(${s.rot}deg);
      border-radius: 2px;
      animation: floatBob ${3 + i * 0.4}s ease-in-out infinite alternate;
      animation-delay: ${i * 0.3}s;
    `;
    el.innerHTML = `
      <div style="
        position: absolute; inset: 6px;
        border: 1px solid rgba(255,255,255,0.2);
        display: flex; align-items: center;
        justify-content: center;
        font-family: 'Courier New', monospace;
        font-size: ${s.w * 0.11}px;
        color: rgba(255,255,255,0.5);
        letter-spacing: 0.1em;
      ">
        ${['3¢','5¢','10¢','1¢','2¢','24¢'][i]}
      </div>
    `;
    container.appendChild(el);
  });

  // Add keyframe animation dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatBob {
      from { transform: rotate(var(--rot, 0deg)) translateY(0); }
      to   { transform: rotate(var(--rot, 0deg)) translateY(-8px); }
    }
  `;
  document.head.appendChild(style);

  // Parallax on mouse move
  const section = container.closest('section');
  if (section) {
    section.addEventListener('mousemove', (e) => {
      const rect = section.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top)  / rect.height - 0.5;
      container.querySelectorAll('.float-stamp').forEach((stamp, i) => {
        const depth = 0.5 + (i % 3) * 0.3;
        stamp.style.transform = `rotate(${stampData[i].rot}deg) translate(${cx * 15 * depth}px, ${cy * 10 * depth}px)`;
      });
    });
  }
})();

/* ─── GALLERY ────────────────────────────────────────────────── */
(function initGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  const items = [
    { title: 'Liberty Red',         year: '1851', cat: 'usa',     color: '#c0392b', denom: '3¢'   },
    { title: 'Washington Green',    year: '1883', cat: 'usa',     color: '#2d7a4f', denom: '1¢'   },
    { title: 'Columbian Exposition',year: '1893', cat: 'usa',     color: '#8f6e24', denom: '$5'   },
    { title: 'Pan-American',        year: '1901', cat: 'airmail', color: '#2563a8', denom: '1¢'   },
    { title: 'Penny Lilac',         year: '1884', cat: 'europe',  color: '#6a3d9a', denom: '1d'   },
    { title: 'Victoria Jubilee',    year: '1897', cat: 'europe',  color: '#1a5276', denom: '6d'   },
    { title: 'Graf Zeppelin',       year: '1930', cat: 'airmail', color: '#784212', denom: '$2.60'},
    { title: 'Fuji Definitive',     year: '1952', cat: 'asia',    color: '#c0392b', denom: '¥5'   },
    { title: 'Korean Tiger',        year: '1954', cat: 'asia',    color: '#d35400', denom: '10h'  },
    { title: 'Moon Landing',        year: '1969', cat: 'usa',     color: '#1a1a3a', denom: '10¢'  },
    { title: 'Concorde First Flt.', year: '1976', cat: 'airmail', color: '#2c3e50', denom: '13¢'  },
    { title: 'Berlin Bear',         year: '1948', cat: 'europe',  color: '#7f8c8d', denom: '2pf'  },
  ];

  function renderGallery(filter) {
    grid.innerHTML = '';
    const filtered = filter === 'all' ? items : items.filter(i => i.cat === filter);

    filtered.forEach((item, idx) => {
      const el = document.createElement('div');
      el.className = 'gallery-item reveal';
      el.dataset.cat = item.cat;

      el.innerHTML = `
        <div class="gallery-item-inner">
          <div class="gallery-stamp-mini">
            <div class="stamp-perf-border">
              <div class="stamp-image-area" style="background: ${item.color}; width: 80px; height: 68px;">
                <div style="
                  position: absolute; inset: 4px;
                  border: 1px solid rgba(255,255,255,0.2);
                  display: flex; align-items: center; justify-content: center;
                  font-family: Georgia, serif;
                  font-size: 1.1rem;
                  color: rgba(255,255,255,0.7);
                  font-weight: 700;
                ">
                  ${item.denom}
                </div>
              </div>
            </div>
          </div>
          <div class="gallery-item-label">${item.title}</div>
          <div class="gallery-item-year">${item.year}</div>
        </div>
        <div class="gallery-item-overlay">
          <div class="gallery-overlay-title">${item.title}</div>
          <div class="gallery-overlay-meta">${item.year} · ${item.cat.toUpperCase()} · ${item.denom}</div>
        </div>
      `;

      el.style.transitionDelay = `${(idx % 4) * 0.07}s`;
      grid.appendChild(el);

      // Trigger reveal after paint
      requestAnimationFrame(() => {
        requestAnimationFrame(() => el.classList.add('visible'));
      });
    });
  }

  renderGallery('all');

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGallery(btn.dataset.filter);
    });
  });
})();

/* ─── JOIN FORM ──────────────────────────────────────────────── */
(function initForm() {
  const form    = document.getElementById('joinForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    // Simulate async submit
    setTimeout(() => {
      form.style.display = 'none';
      success.style.display = 'block';
      success.style.animation = 'fadeInUp 0.6s ease both';
    }, 1200);
  });
})();

/* ─── JOIN SECTION BACKGROUND STAMPS ────────────────────────── */
(function initJoinBg() {
  const container = document.getElementById('joinBgStamps');
  if (!container) return;

  const colors = ['#c0392b','#2563a8','#2d7a4f','#8f6e24','#6a3d9a','#b87333'];

  for (let i = 0; i < 20; i++) {
    const el = document.createElement('div');
    const size = 60 + Math.random() * 120;
    el.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size * 1.2}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      border-radius: 2px;
      transform: rotate(${(Math.random() - 0.5) * 40}deg);
      opacity: 0.15;
    `;
    container.appendChild(el);
  }
})();

/* ─── SMOOTH ANCHOR SCROLL ───────────────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

/* ─── MEMBERSHIP TIER SELECTOR ───────────────────────────────── */
(function initTierSync() {
  const tiers  = document.querySelectorAll('.tier');
  const select = document.getElementById('tier-select');
  if (!tiers.length || !select) return;

  tiers.forEach((tier, i) => {
    tier.style.cursor = 'pointer';
    tier.addEventListener('click', () => {
      select.selectedIndex = i;
      select.dispatchEvent(new Event('change'));
      // Visual feedback
      tiers.forEach(t => t.classList.remove('tier--featured'));
      tier.classList.add('tier--featured');
      // Scroll to form
      document.getElementById('joinForm')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
})();

/* ─── STAMP CARD TILT ────────────────────────────────────────── */
(function initCardTilt() {
  const cards = document.querySelectorAll('.stamp-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width  - 0.5;
      const cy = (e.clientY - rect.top)  / rect.height - 0.5;
      const rx = -cy * 8;
      const ry =  cx * 8;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease';
      setTimeout(() => card.style.transition = '', 400);
    });
  });
})();

/* ─── NAV ACTIVE LINK ────────────────────────────────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${entry.target.id}`
            ? 'var(--gold)'
            : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();
