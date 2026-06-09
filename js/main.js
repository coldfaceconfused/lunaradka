/* ════════════════════════════════════════════════════════════
   Luna Radka — main.js
   Czysty JavaScript (bez bibliotek). Każdy moduł sam sprawdza,
   czy jego elementy istnieją na danej stronie, więc jeden plik
   obsługuje wszystkie podstrony.
   ════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Menu mobilne ──────────────────────────────────────── */
  function initNav() {
    var nav = document.querySelector('.lr-nav');
    if (!nav) return;
    var toggle = nav.querySelector('.lr-nav-toggle');
    var label = nav.querySelector('.lr-nav-toggle-label');

    function setOpen(open) {
      nav.classList.toggle('is-open', open);
      if (toggle) toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (label) label.textContent = open ? 'zamknij' : 'menu';
      document.body.style.overflow = open ? 'hidden' : '';
    }

    if (toggle) {
      toggle.addEventListener('click', function () {
        setOpen(!nav.classList.contains('is-open'));
      });
    }
    // klik w tło overlay zamyka menu
    var overlay = nav.querySelector('.lr-nav-overlay');
    if (overlay) overlay.addEventListener('click', function (e) {
      if (e.target === overlay) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) setOpen(false);
    });
  }

  /* ── Reveal przy przewijaniu ───────────────────────────── */
  function initReveal() {
    var items = document.querySelectorAll('.lr-tile, .lr-reveal');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ── Hero: parallax + przygaszanie + zjazd do galerii ──── */
  function initHero() {
    var hero = document.querySelector('.lr-hero');
    if (!hero) return;
    var wrap = hero.querySelector('.lr-hero-img-wrap');
    var cue = hero.querySelector('.lr-scroll-cue');
    var gallery = document.querySelector('#galeria');

    var raf = null;
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        var y = window.scrollY;
        if (wrap) wrap.style.transform = 'translateY(' + (y * 0.18) + 'px) scale(' + (1 + y * 0.00006) + ')';
        hero.style.opacity = Math.max(0, 1 - y / 620);
        raf = null;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    if (cue && gallery) {
      cue.addEventListener('click', function () {
        gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }

  /* ── Lightbox galerii ──────────────────────────────────── */
  function initLightbox() {
    var lb = document.querySelector('.lr-lightbox');
    var tiles = Array.prototype.slice.call(document.querySelectorAll('.lr-tile'));
    if (!lb || !tiles.length) return;

    var imgEl   = lb.querySelector('.lr-lb-img img');
    var idxEl   = lb.querySelector('.lr-lb-index');
    var titleEl = lb.querySelector('.lr-lb-title');
    var rokEl   = lb.querySelector('[data-spec="rok"]');
    var techEl  = lb.querySelector('[data-spec="technika"]');
    var dimEl   = lb.querySelector('[data-spec="wymiary"]');
    var noteEl  = lb.querySelector('.lr-lb-note');
    var total   = tiles.length;
    var current = 0;

    function render(i) {
      var t = tiles[i].dataset;
      imgEl.src = t.file;
      imgEl.alt = t.title;
      idxEl.textContent = pad(i + 1) + ' / ' + pad(total);
      titleEl.textContent = t.title;
      rokEl.textContent = t.year;
      techEl.textContent = t.tech;
      dimEl.textContent = t.dim;
      noteEl.textContent = t.note;
    }
    function pad(n) { return n < 10 ? '0' + n : '' + n; }

    function open(i) {
      current = i;
      render(i);
      lb.hidden = false;
      lb.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      lb.hidden = true;
      lb.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    function nav(dir) {
      current = (current + dir + total) % total;
      render(current);
    }

    tiles.forEach(function (tile, i) {
      tile.addEventListener('click', function () { open(i); });
    });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    lb.querySelector('.lr-lb-close').addEventListener('click', close);
    lb.querySelector('.lr-lb-prev').addEventListener('click', function (e) { e.stopPropagation(); nav(-1); });
    lb.querySelector('.lr-lb-next').addEventListener('click', function (e) { e.stopPropagation(); nav(1); });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') nav(1);
      if (e.key === 'ArrowLeft') nav(-1);
    });
  }

  /* ── Formularz kontaktowy ──────────────────────────────── */
  function initForm() {
    var form = document.querySelector('.lr-form');
    if (!form) return;
    var sent = document.querySelector('.lr-form-sent');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (sent) {
        form.hidden = true;
        sent.hidden = false;
      }
    });
  }

  /* ── Portret na stronie „o artystce" ───────────────────── */
  function initPortrait() {
    var frame = document.querySelector('.lr-portrait-frame');
    if (!frame) return;
    var img = frame.querySelector('img');
    if (!img) return;
    // jeśli pliku portretu brak — pokaż komunikat zastępczy
    img.addEventListener('error', function () {
      img.style.display = 'none';
      frame.classList.add('is-empty');
    });
    if (img.complete && img.naturalWidth === 0) {
      img.style.display = 'none';
      frame.classList.add('is-empty');
    }
  }

  /* ── Start ─────────────────────────────────────────────── */
  function init() {
    initNav();
    initReveal();
    initHero();
    initLightbox();
    initForm();
    initPortrait();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
