/* ═══════════════════════════════════════════════════════
   main.js  —  LifexLife Foundation
   Runs on EVERY page (index + all pages/*)
════════════════════════════════════════════════════════ */

/* ── 1. NAV INJECTION ─────────────────────────────────
   Replaces the hard-coded nav on every HTML file with
   the canonical, fully-working nav structure.
──────────────────────────────────────────────────────── */
(function injectNav() {
  const inPg = !!window.location.pathname.match(/\/pages\//);
  const r    = inPg ? '../' : '';      // root relative path
  const pg   = inPg ? ''   : 'pages/'; // pages/ relative path

  const NAV = `<nav class="nav">
  <div class="nav-inner">
    <a href="${r}index.html" class="nav-logo">Lifex<em>Life</em></a>
    <div class="nav-links">
      <div class="nav-item">
        <button class="nav-link">Iniciativas <span class="nav-arrow">▾</span></button>
        <div class="nav-dropdown">
          <a href="${pg}spark.html">🎨 SPARK — Arte Creativo</a>
          <a href="${pg}rooted.html">🌿 ROOTED — Bienestar Natural</a>
          <a href="${pg}thrive.html">🤝 THRIVE — Salud Mental</a>
          <a href="${pg}lead.html">⭐ LEAD — Liderazgo</a>
        </div>
      </div>
      <a href="${pg}impacto.html"  class="nav-link">Impacto</a>
      <a href="${pg}nosotros.html" class="nav-link">Nosotros</a>
      <a href="${pg}blog.html"     class="nav-link">Blog</a>
      <a href="${pg}contacto.html" class="nav-link">Contacto</a>
    </div>
    <div class="nav-right">
      <button class="lang-btn">ES</button>
      <label class="theme-switch" title="Modo oscuro">
        <input type="checkbox" id="themeToggle">
        <span class="ts-track"><span class="ts-thumb"></span></span>
      </label>
      <a href="${pg}donar.html"><button class="nav-cta">Donar →</button></a>
    </div>
    <div class="nav-mobile-actions">
      <a href="${pg}donar.html"><button class="nav-cta nav-cta-sm">Donar →</button></a>
      <button class="nav-mobile-btn" id="navMobileBtn">☰</button>
    </div>
  </div>
</nav>`;

  const MM = `<div class="mobile-menu" id="mobileMenu">
  <button class="mobile-close" id="mobileClose">✕</button>
  <a href="${r}index.html">Inicio</a>
  <a href="${pg}iniciativas.html">Iniciativas</a>
  <a href="${pg}spark.html"  class="mobile-sub">↳ SPARK</a>
  <a href="${pg}rooted.html" class="mobile-sub">↳ ROOTED</a>
  <a href="${pg}thrive.html" class="mobile-sub">↳ THRIVE</a>
  <a href="${pg}lead.html"   class="mobile-sub">↳ LEAD</a>
  <a href="${pg}impacto.html">Impacto</a>
  <a href="${pg}nosotros.html">Nosotros</a>
  <a href="${pg}blog.html">Blog</a>
  <a href="${pg}contacto.html">Contacto</a>
  <div class="mobile-bottom">
    <a href="${pg}donar.html" class="mobile-donate">Donar →</a>
    <div class="mobile-footer-row">
      <button class="lang-btn">ES</button>
      <label class="theme-switch">
        <input type="checkbox" id="themeToggleMobile">
        <span class="ts-track"><span class="ts-thumb"></span></span>
      </label>
    </div>
  </div>
</div>`;

  const existNav = document.querySelector('nav.nav');
  const existMM  = document.getElementById('mobileMenu');
  if (existNav)  existNav.outerHTML = NAV;
  if (existMM)   existMM.outerHTML  = MM;
  else           document.querySelector('nav.nav')?.insertAdjacentHTML('afterend', MM);

  /* Mark active link based on current filename */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[href]').forEach(a => {
    if ((a.getAttribute('href') || '').split('/').pop() === page)
      a.classList.add('active');
  });
})();

/* ── 2. NAV SCROLL ────────────────────────────────────── */
window.addEventListener('scroll', () => {
  document.querySelector('.nav')?.classList.toggle('scrolled', window.scrollY > 16);
}, { passive: true });

/* ── 3. THEME — default LIGHT ─────────────────────────── */
const root  = document.documentElement;
const saved = localStorage.getItem('lxl-theme') || 'light';
root.setAttribute('data-theme', saved);
syncSwitches(saved);

function syncSwitches(t) {
  document.querySelectorAll('#themeToggle, #themeToggleMobile').forEach(inp => {
    if (inp) inp.checked = (t === 'dark');
  });
}
document.addEventListener('change', e => {
  if (e.target.id === 'themeToggle' || e.target.id === 'themeToggleMobile') {
    const t = e.target.checked ? 'dark' : 'light';
    root.setAttribute('data-theme', t);
    localStorage.setItem('lxl-theme', t);
    document.querySelectorAll('#themeToggle, #themeToggleMobile').forEach(inp => {
      if (inp) inp.checked = e.target.checked;
    });
  }
});

/* ── 4. MOBILE MENU ───────────────────────────────────── */
document.addEventListener('click', e => {
  if (e.target.closest('#navMobileBtn'))
    document.getElementById('mobileMenu')?.classList.toggle('open');
  if (e.target.closest('#mobileClose'))
    document.getElementById('mobileMenu')?.classList.remove('open');
});

/* ── 5. HERO SLIDESHOW ────────────────────────────────── */
const slides = document.querySelectorAll('.slide');
const sdots  = document.querySelectorAll('.s-dot');
const pbar   = document.querySelector('.progress-bar');
let cur = 0, stimer = null;
const SLIDE_INTERVAL = 5200;

function goSlide(i) {
  if (!slides.length) return;
  slides[cur].classList.remove('active');
  sdots[cur]?.classList.remove('active');
  cur = ((i % slides.length) + slides.length) % slides.length;
  slides[cur].classList.add('active');
  sdots[cur]?.classList.add('active');
  if (pbar) {
    pbar.style.transition = 'none'; pbar.style.width = '0';
    requestAnimationFrame(() => {
      pbar.style.transition = `width ${SLIDE_INTERVAL}ms linear`;
      pbar.style.width = '100%';
    });
  }
  clearInterval(stimer);
  stimer = setInterval(() => goSlide(cur + 1), SLIDE_INTERVAL);
}
document.querySelectorAll('.s-arr').forEach(b =>
  b.addEventListener('click', () => goSlide(cur + (b.dataset.dir === 'next' ? 1 : -1))));
sdots.forEach((d, i) => d.addEventListener('click', () => goSlide(i)));
if (slides.length) goSlide(0);

/* ── 6. HOME NEWS — dynamic from localStorage ─────────── */
(function loadHomeNews() {
  const track = document.getElementById('newsTrack');
  if (!track) return;

  const KEY = 'lxl_blog_posts';
  const CAT_EMOJI = {spark:'🎨',rooted:'🌿',thrive:'🤝',lead:'⭐',general:'📰'};
  const CAT_LABEL = {spark:'SPARK',rooted:'ROOTED',thrive:'THRIVE',lead:'LEAD',general:'GENERAL'};
  const blogHref  = window.location.pathname.match(/\/pages\//) ? 'blog.html' : 'pages/blog.html';

  const FALLBACK = [
    {id:1,cat:'spark', title:'Nuevos talleres de teatro comunitario en el Distrito Pacífico Sur',desc:'Más de 80 jóvenes participaron en el primer ciclo de primavera 2026.',img:'',date:'2026-04-10'},
    {id:2,cat:'lead',  title:'Tercera generación de Raíces y Caminos completa su programa',      desc:'24 jóvenes líderes graduados listos para multiplicar el impacto.',   img:'',date:'2026-03-28'},
    {id:3,cat:'rooted',title:'Huerto comunitario de Watts celebra su primer aniversario',         desc:'Más de 300 libras de vegetales frescos para familias locales.',        img:'',date:'2026-03-15'},
    {id:4,cat:'thrive',title:'Primeros auxilios emocionales llega a tres nuevas escuelas',        desc:'45 maestros capacitados como facilitadores de bienestar mental.',     img:'',date:'2026-02-22'},
    {id:5,cat:'spark', title:'Mural comunitario "Raíces Vivas" inaugurado en South LA',           desc:'30 jóvenes artistas crearon un mural de 80 pies de largo.',            img:'',date:'2026-01-30'},
    {id:6,cat:'lead',  title:'LifexLife recibe grant de Google for Nonprofits',                  desc:'El reconocimiento permitirá expandir LEAD a dos nuevas comunidades.',  img:'',date:'2026-01-15'},
  ];

  function fmtDate(d) {
    try { return new Date(d+'T12:00:00').toLocaleDateString('es-MX',{month:'short',day:'numeric',year:'numeric'}).toUpperCase(); }
    catch(e) { return d; }
  }

  function cardHTML(p) {
    const label = CAT_LABEL[p.cat] || p.cat.toUpperCase();
    const emoji = CAT_EMOJI[p.cat] || '📰';
    const img   = p.img
      ? `<img src="${p.img}" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">`
      : emoji;
    return `<div class="news-card">
      <div class="news-img"><span class="news-tag">${label}</span>${img}</div>
      <div class="news-body">
        <h4>${p.title}</h4>
        <p>${p.desc}</p>
        <div class="news-meta">
          <span class="news-date">${fmtDate(p.date)}</span>
          <a href="${blogHref}" class="news-read">Leer más →</a>
        </div>
      </div>
    </div>`;
  }

  const stored = JSON.parse(localStorage.getItem(KEY) || '[]');
  const posts  = (stored.length ? stored : FALLBACK).slice(0, 8);
  track.innerHTML = posts.map(cardHTML).join('');
})();

/* ── 7. NEWS CAROUSEL ─────────────────────────────────── */
(function initCarousel() {
  const track    = document.getElementById('newsTrack');
  const dotsWrap = document.getElementById('cDots');
  const cPrev    = document.getElementById('cPrev');
  const cNext    = document.getElementById('cNext');
  if (!track) return;

  const outer = track.parentElement;
  const GAP   = 14;
  let ci = 0, autoTimer = null;

  function isMobile()   { return window.innerWidth <= 900; }
  function allCards()   { return Array.from(track.querySelectorAll('.news-card')); }
  function visCount()   { return isMobile() ? 1 : 3; }
  function maxIndex()   { return Math.max(0, allCards().length - visCount()); }

  function cardWidth() {
    /* subtract carousel-outer padding from both sides */
    const style  = getComputedStyle(outer);
    const padL   = parseFloat(style.paddingLeft)  || 0;
    const padR   = parseFloat(style.paddingRight) || 0;
    const inner  = outer.offsetWidth - padL - padR;
    const vis    = visCount();
    return (inner - GAP * (vis - 1)) / vis;
  }

  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    if (isMobile()) return; /* mobile: CSS scroll handles it, no dots */
    const max = maxIndex();
    for (let i = 0; i <= max; i++) {
      const d = document.createElement('button');
      d.className = 'c-dot' + (i === ci ? ' active' : '');
      d.addEventListener('click', () => go(i));
      dotsWrap.appendChild(d);
    }
  }

  function go(i) {
    if (isMobile()) return; /* don't fight CSS scroll on mobile */
    const max = maxIndex();
    ci = Math.max(0, Math.min(i, max));
    const cw = cardWidth();
    track.style.transform = `translateX(-${ci * (cw + GAP)}px)`;
    dotsWrap?.querySelectorAll('.c-dot').forEach((d, idx) => d.classList.toggle('active', idx === ci));
    if (cPrev) cPrev.disabled = ci === 0;
    if (cNext) cNext.disabled = ci >= max;
    restartAuto();
  }

  function restartAuto() {
    clearInterval(autoTimer);
    if (isMobile()) return;
    autoTimer = setInterval(() => go(ci >= maxIndex() ? 0 : ci + 1), 4200);
  }

  outer.addEventListener('mouseenter', () => clearInterval(autoTimer));
  outer.addEventListener('mouseleave', restartAuto);

  cPrev?.addEventListener('click', () => go(ci - 1));
  cNext?.addEventListener('click', () => go(ci + 1));

  window.addEventListener('resize', () => { buildDots(); go(0); }, { passive: true });

  buildDots();
  go(0);
  restartAuto();
})();

/* ── 8. NEWSLETTER ────────────────────────────────────── */
document.querySelectorAll('.nl-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const inp = form.querySelector('input[type=email]');
    if (!inp?.value.includes('@')) return;
    form.style.opacity = '0.4';
    form.style.pointerEvents = 'none';
    form.closest('.newsletter')?.querySelector('.nl-success')?.classList.add('show');
  });
});

/* ── 9. COUNTER ANIMATION ─────────────────────────────── */
function animateCount(el) {
  const target = +el.dataset.target, suffix = el.dataset.suffix || '';
  const step = target / (2000 / 16);
  let val = 0;
  const iv = setInterval(() => {
    val = Math.min(val + step, target);
    el.textContent = Math.round(val).toLocaleString() + suffix;
    if (val >= target) clearInterval(iv);
  }, 16);
}
const cObs = new IntersectionObserver(es => {
  es.forEach(e => { if (e.isIntersecting) { animateCount(e.target); cObs.unobserve(e.target); } });
}, { threshold: 0.5 });
document.querySelectorAll('.count-up').forEach(el => cObs.observe(el));

/* ── 10. DONATE AMOUNTS ───────────────────────────────── */
document.querySelectorAll('.amount-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    const custom = document.getElementById('customAmount');
    if (custom) btn.dataset.amount !== 'custom' ? (custom.value = btn.dataset.amount) : custom.focus();
  });
});

/* ── 11. i18n INIT ────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof LXL_I18N !== 'undefined') LXL_I18N.init();
});
