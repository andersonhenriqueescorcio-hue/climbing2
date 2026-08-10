/* ============================================
   BASE.JS — menu mobile, animação de entrada
   e linha de via (route rail). Usado em TODAS as páginas.
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ---------- Menu mobile ----------
  const burger = document.getElementById('burgerBtn');
  const menu = document.getElementById('mobileMenu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      const open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        burger.setAttribute('aria-expanded', false);
      });
    });
  }

  // ---------- Reveal on scroll ----------
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  // ---------- Route rail (linha de via com progresso) ----------
  const rail = document.querySelector('.route-rail');
  if (rail) {
    const svg = rail.querySelector('svg');
    const progressLine = document.getElementById('routeProgress');
    const sections = Array.from(document.querySelectorAll('[data-route]'));
    let clips = [];

    function layout() {
      const railHeight = rail.getBoundingClientRect().height;
      svg.setAttribute('viewBox', '0 0 28 ' + railHeight);
      rail.querySelectorAll('.clip').forEach(function (c) { c.remove(); });
      clips = [];
      sections.forEach(function (sec) {
        const rect = sec.getBoundingClientRect();
        const docTop = rect.top + window.scrollY;
        const totalDocHeight = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = totalDocHeight > 0 ? docTop / totalDocHeight : 0;
        const clip = document.createElement('div');
        clip.className = 'clip';
        clip.style.top = (ratio * 100) + '%';
        rail.appendChild(clip);
        clips.push({ el: clip, sec: sec });
      });
    }

    function update() {
      const scrollTop = window.scrollY;
      const totalDocHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = totalDocHeight > 0 ? Math.min(scrollTop / totalDocHeight, 1) : 0;
      const railHeight = rail.getBoundingClientRect().height;
      progressLine.setAttribute('y2', pct * railHeight);
      clips.forEach(function (c) {
        const top = parseFloat(c.el.style.top);
        c.el.classList.toggle('active', pct * 100 >= top - 1);
      });
    }

    window.addEventListener('resize', function () { layout(); update(); });
    window.addEventListener('scroll', update, { passive: true });
    layout();
    update();
  }

  // ---------- Marca o link de navegação da página atual ----------
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navlinks a, .mobile-menu a').forEach(function (a) {
    const href = a.getAttribute('href');
    if (href === currentPage) a.classList.add('active');
  });
});
