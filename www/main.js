/* =========================================================================
   Kancelaria PRS — wspólny skrypt strony.
   1) Podświetla aktywną pozycję w menu (wg nazwy bieżącego pliku).
   2) Obsługuje rozwijanie pytań w sekcji FAQ.
   3) Obsługuje rozwijanie szczegółów pakietów na Cenniku.
   4) Obsługuje menu „hamburger” na telefonie.
   5) Wspólny silnik prostych formularzy mailowych (Zarząd SAFE + Kontakt
      ogólny) — bez backendu: podgląd treści + mailto: do kancelarii.
   Formularz Audytu 48h ma własny, osobny, izolowany skrypt na swojej
   podstronie (bespoke wizard 7-krokowy) — ten silnik go nie dotyczy.
   ========================================================================= */
(function () {
  'use strict';

  // 1) Aktywna pozycja menu
  function markActiveNav() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    if (path === '') path = 'index.html';
    // Artykuły bloga (blog-*.html) podświetlają pozycję "Blog".
    if (path.indexOf('blog-') === 0) path = 'blog.html';
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
        var open = item.classList.toggle('open');
        q.setAttribute('aria-expanded', open ? 'true' : 'false');
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

  // 4) Menu „hamburger” na telefonie
  function initNavToggle() {
    var btn = document.querySelector('.nav-toggle');
    var nav = document.getElementById('mainnav');
    if (!btn || !nav) return;
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu');
    });
  }

  // 5) Wspólny silnik prostych formularzy — prawdziwe wysyłanie (POST do usługi
  //    pośredniczącej wskazanej w config.actionUrl), bez własnego serwera.
  //    Dopóki actionUrl nie jest realnym adresem (zaczyna się od "["), formularz
  //    pokazuje jasną informację, że nie jest jeszcze podłączony — nigdy nie
  //    udaje, że coś wysłał, skoro nie ma dokąd.
  var FORM_NOT_CONFIGURED_PREFIX = '[';

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  }

  function mfSetFieldError(fieldEl, errorEl, show) {
    if (fieldEl) fieldEl.classList.toggle('invalid', show);
    if (errorEl) errorEl.style.display = show ? 'block' : 'none';
  }

  function validateForm(config) {
    var messages = [];
    config.fields.forEach(function (f) {
      var el = document.getElementById(f.id);
      var errorEl = document.getElementById(f.id + '_error');
      var value = el ? el.value.trim() : '';
      var bad = false;
      if (f.required && !value) bad = true;
      if (!bad && f.type === 'email' && value && !isValidEmail(value)) bad = true;
      mfSetFieldError(el, errorEl, bad);
      if (bad) messages.push(f.errorMsg || ('Uzupełnij pole: ' + f.label));
    });

    var consentEl = document.getElementById(config.consentId);
    var consentErrorEl = document.getElementById(config.consentId + '_error');
    var consentOk = consentEl ? consentEl.checked : false;
    if (consentErrorEl) consentErrorEl.style.display = consentOk ? 'none' : 'block';
    if (!consentOk) messages.push('Zaznacz zgodę, aby wysłać zgłoszenie.');

    var summaryEl = document.getElementById(config.errorSummaryId);
    if (summaryEl) {
      if (messages.length) {
        var list = messages.map(function (m) { return '<li>' + m + '</li>'; }).join('');
        summaryEl.innerHTML = '<b>Uzupełnij, proszę:</b><ul>' + list + '</ul>';
        summaryEl.style.display = 'block';
      } else {
        summaryEl.style.display = 'none';
      }
    }

    return { ok: messages.length === 0 };
  }

  function showFormResult(box, kind, title, html) {
    if (!box) return;
    box.className = 'form-result form-result-' + kind;
    box.innerHTML = '<h3>' + title + '</h3><p>' + html + '</p>';
    box.style.display = 'block';
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function initRealForm(config) {
    var formEl = document.getElementById(config.formId);
    var submitBtn = document.getElementById(config.submitBtnId);
    var resultBox = document.getElementById(config.resultBoxId);
    if (!formEl || !submitBtn) return;

    var originalLabel = submitBtn.textContent;

    submitBtn.addEventListener('click', function () {
      var result = validateForm(config);
      if (!result.ok) {
        if (resultBox) resultBox.style.display = 'none';
        var summaryEl = document.getElementById(config.errorSummaryId);
        if (summaryEl) summaryEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      if (!config.actionUrl || config.actionUrl.indexOf(FORM_NOT_CONFIGURED_PREFIX) === 0) {
        showFormResult(resultBox, 'warn', 'Formularz nie jest jeszcze podłączony',
          'Ten formularz nie ma jeszcze skonfigurowanego adresu usługi wysyłkowej — ' +
          'to się pojawi, gdy wybierzemy dostawcę. Na razie prosimy o kontakt na adres ' +
          '<span class="ph">kontakt@[domena].pl</span>.');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Wysyłanie…';

      fetch(config.actionUrl, {
        method: 'POST',
        body: new FormData(formEl),
        headers: { 'Accept': 'application/json' }
      }).then(function (resp) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
        if (resp.ok) {
          showFormResult(resultBox, 'ok', 'Dziękujemy!', config.successText);
          formEl.reset();
        } else {
          showFormResult(resultBox, 'error', 'Coś poszło nie tak',
            'Nie udało się wysłać zgłoszenia. Spróbuj ponownie albo napisz bezpośrednio na adres ' +
            '<span class="ph">kontakt@[domena].pl</span>.');
        }
      }, function () {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
        showFormResult(resultBox, 'error', 'Coś poszło nie tak',
          'Nie udało się wysłać zgłoszenia (sprawdź połączenie z internetem). Spróbuj ponownie albo napisz bezpośrednio na adres ' +
          '<span class="ph">kontakt@[domena].pl</span>.');
      });
    });
  }

  function initZarzadSafeForm() {
    if (!document.getElementById('zsForm')) return;
    initRealForm({
      formId: 'zsForm',
      actionUrl: '[ADRES_USLUGI_FORMULARZY — uzupełnić po wyborze dostawcy]',
      fields: [
        { id: 'zs_name', label: 'Imię i nazwisko', required: true, type: 'text', errorMsg: 'Podaj imię i nazwisko.' },
        { id: 'zs_email', label: 'E-mail', required: true, type: 'email', errorMsg: 'Podaj poprawny adres e-mail.' },
        { id: 'zs_phone', label: 'Telefon', required: false, type: 'tel' },
        { id: 'zs_company', label: 'Nazwa spółki', required: false, type: 'text' },
        { id: 'zs_krs', label: 'Numer KRS spółki', required: false, type: 'text' },
        { id: 'zs_description', label: 'Opis sytuacji', required: true, type: 'textarea', errorMsg: 'Opisz krótko swoją sytuację.' }
      ],
      consentId: 'zs_consent',
      resultBoxId: 'zsSuccess',
      submitBtnId: 'zsSubmit',
      errorSummaryId: 'zsErrorSummary',
      successText: 'Otrzymaliśmy Twoje zgłoszenie w sprawie pakietu Zarząd SAFE — odezwiemy się zwykle w ciągu 24 godzin i wskażemy, jak bezpiecznie przesłać dalsze dokumenty, jeśli będą potrzebne.'
    });
  }

  function initContactGeneralForm() {
    if (!document.getElementById('ctForm')) return;
    initRealForm({
      formId: 'ctForm',
      actionUrl: '[ADRES_USLUGI_FORMULARZY — uzupełnić po wyborze dostawcy]',
      fields: [
        { id: 'ct_first', label: 'Imię', required: true, type: 'text', errorMsg: 'Podaj imię.' },
        { id: 'ct_last', label: 'Nazwisko', required: true, type: 'text', errorMsg: 'Podaj nazwisko.' },
        { id: 'ct_email', label: 'E-mail', required: true, type: 'email', errorMsg: 'Podaj poprawny adres e-mail.' },
        { id: 'ct_phone', label: 'Numer telefonu', required: false, type: 'tel' },
        { id: 'ct_subject', label: 'Temat', required: true, type: 'text', errorMsg: 'Podaj temat wiadomości.' },
        { id: 'ct_message', label: 'Treść wiadomości', required: true, type: 'textarea', errorMsg: 'Napisz treść wiadomości.' }
      ],
      consentId: 'ct_consent',
      resultBoxId: 'ctSuccess',
      submitBtnId: 'ctSubmit',
      errorSummaryId: 'ctErrorSummary',
      successText: 'Otrzymaliśmy Twoją wiadomość — odezwiemy się zwykle w ciągu 24 godzin.'
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    markActiveNav();
    initFaq();
    initPackages();
    initNavToggle();
    initZarzadSafeForm();
    initContactGeneralForm();
  });
})();
