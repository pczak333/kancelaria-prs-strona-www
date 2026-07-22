/* =========================================================================
   Kancelaria PRS — wspólny skrypt strony.
   1) Podświetla aktywną pozycję w menu (wg nazwy bieżącego pliku).
   2) Obsługuje rozwijanie pytań w sekcji FAQ.
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

  document.addEventListener('DOMContentLoaded', function () {
    markActiveNav();
    initFaq();
  });
})();
