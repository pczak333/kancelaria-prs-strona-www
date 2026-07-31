/* =========================================================================
   Kancelaria PRS — wspólny skrypt strony.
   1) Podświetla aktywną pozycję w menu (wg nazwy bieżącego pliku).
   2) Obsługuje rozwijanie pytań w sekcji FAQ.
   3) Obsługuje rozwijanie szczegółów pakietów na Cenniku.
   Formularz Audytu 48h ma własny, osobny skrypt na swojej podstronie.
   ========================================================================= */
(function () {
  'use strict';

  // 1) Aktywna pozycja menu
  function markActiveNav() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    if (path === '') path = 'index.html';
    var links = document.querySelectorAll('.nav a[href]');
    links.forEach(function (a) {
      var href = a.getAttribute('href').split('/').pop();
      if (href === path) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  // 2) Rozwijane pytania FAQ
  function initFaq() {
    var items = document.querySelectorAll('.faq-item');
    items.forEach(function (item) {
      var q = item.querySelector('.faq-q');
      if (!q) return;
      q.addEventListener('click', function () {
        item.classList.toggle('open');
      });
    });
  }

  // 3) Rozwijane szczegóły pakietów na Cenniku
  function setTileOpen(tile, open) {
    var btn = tile.querySelector('.tile-btn');
    tile.classList.toggle('open', open);
    if (btn) {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? 'Zwiń' : 'Szczegóły';
    }
  }

  function initPackages() {
    var tiles = document.querySelectorAll('.service-tile');
    tiles.forEach(function (tile) {
      var btn = tile.querySelector('.tile-btn');
      // Reaguj tylko na przyciski (rozwijanie), nie na linki <a>.
      if (!btn || btn.tagName !== 'BUTTON') return;
      btn.addEventListener('click', function () {
        setTileOpen(tile, !tile.classList.contains('open'));
      });
    });

    // Wejście z linku typu ...#pakiet-299 (np. ze strony głównej):
    // rozwiń wskazany pakiet i przewiń go do widoku.
    var hash = window.location.hash.replace('#', '');
    if (!hash) return;
    var target = document.getElementById(hash);
    if (target && target.classList.contains('service-tile')) {
      setTileOpen(target, true);
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    markActiveNav();
    initFaq();
    initPackages();
  });
})();
