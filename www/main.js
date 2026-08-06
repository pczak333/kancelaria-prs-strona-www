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

  // 5) Wspólny silnik prostych formularzy mailowych (bez backendu)
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  }

  function mfSetFieldError(fieldEl, errorEl, show) {
    if (fieldEl) fieldEl.classList.toggle('invalid', show);
    if (errorEl) errorEl.style.display = show ? 'block' : 'none';
  }

  function mfCollectValues(config) {
    var values = {};
    config.fields.forEach(function (f) {
      var el = document.getElementById(f.id);
      values[f.id] = el ? el.value.trim() : '';
    });
    return values;
  }

  function validateMailForm(config) {
    var messages = [];
    var values = mfCollectValues(config);
    config.fields.forEach(function (f) {
      var el = document.getElementById(f.id);
      var errorEl = document.getElementById(f.id + '_error');
      var value = values[f.id];
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
    if (!consentOk) messages.push('Zaznacz zgodę, aby przygotować wiadomość.');

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

    return { ok: messages.length === 0, values: values };
  }

  function mfBuildPayload(config) {
    var values = mfCollectValues(config);
    return {
      to: config.toAddress,
      subject: config.buildSubject(values),
      body: config.buildBody(values)
    };
  }

  function initMailForm(config) {
    var submitBtn = document.getElementById(config.submitBtnId);
    var previewBtn = document.getElementById(config.previewBtnId);
    var sendBtn = document.getElementById(config.sendBtnId);
    var successBox = document.getElementById(config.successBoxId);
    var modal = document.getElementById(config.modalId);
    if (!submitBtn) return;

    submitBtn.addEventListener('click', function () {
      var result = validateMailForm(config);
      if (!result.ok) {
        if (successBox) successBox.style.display = 'none';
        var summaryEl = document.getElementById(config.errorSummaryId);
        if (summaryEl) summaryEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
      if (successBox) {
        successBox.style.display = 'block';
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    if (previewBtn && modal) {
      previewBtn.addEventListener('click', function () {
        var payload = mfBuildPayload(config);
        var toEl = modal.querySelector('[data-role="to"]');
        var subjEl = modal.querySelector('[data-role="subject"]');
        var bodyEl = modal.querySelector('[data-role="body"]');
        if (toEl) toEl.textContent = payload.to;
        if (subjEl) subjEl.textContent = payload.subject;
        if (bodyEl) bodyEl.textContent = payload.body;
        modal.style.display = 'flex';
      });
    }

    if (modal) {
      modal.querySelectorAll('[data-role="close"]').forEach(function (el) {
        el.addEventListener('click', function () { modal.style.display = 'none'; });
      });
      modal.addEventListener('click', function (e) {
        if (e.target === modal) modal.style.display = 'none';
      });
    }

    if (sendBtn) {
      sendBtn.addEventListener('click', function () {
        var payload = mfBuildPayload(config);
        var href = 'mailto:' + encodeURIComponent(payload.to)
          + '?subject=' + encodeURIComponent(payload.subject)
          + '&body=' + encodeURIComponent(payload.body);
        window.location.href = href;
      });
    }
  }

  function initZarzadSafeForm() {
    if (!document.getElementById('zsForm')) return;
    initMailForm({
      toAddress: 'kontakt@[domena].pl',
      fields: [
        { id: 'zs_name', label: 'Imię i nazwisko', required: true, type: 'text', errorMsg: 'Podaj imię i nazwisko.' },
        { id: 'zs_email', label: 'E-mail', required: true, type: 'email', errorMsg: 'Podaj poprawny adres e-mail.' },
        { id: 'zs_phone', label: 'Telefon', required: false, type: 'tel' },
        { id: 'zs_company', label: 'Nazwa spółki', required: false, type: 'text' },
        { id: 'zs_description', label: 'Opis sytuacji', required: true, type: 'textarea', errorMsg: 'Opisz krótko swoją sytuację.' }
      ],
      consentId: 'zs_consent',
      modalId: 'zsMailModal',
      successBoxId: 'zsSuccess',
      submitBtnId: 'zsSubmit',
      previewBtnId: 'zsPreviewBtn',
      sendBtnId: 'zsSendBtn',
      errorSummaryId: 'zsErrorSummary',
      buildSubject: function (v) {
        return 'Zarząd SAFE — zapytanie o wycenę (' + v.zs_name + ')';
      },
      buildBody: function (v) {
        return [
          'Dzień dobry,',
          '',
          'Piszę w sprawie pakietu Zarząd SAFE (bezpieczne odejście z zarządu / ograniczenie ryzyka).',
          '',
          'Dane kontaktowe:',
          '- Imię i nazwisko: ' + v.zs_name,
          '- E-mail: ' + v.zs_email,
          '- Telefon: ' + (v.zs_phone || '—'),
          '- Nazwa spółki: ' + (v.zs_company || '—'),
          '',
          'Opis sytuacji:',
          v.zs_description,
          '',
          'Pozdrawiam,',
          v.zs_name,
          '',
          '(Wiadomość przygotowana z formularza na stronie KRS Guard — zarzad-safe-formularz.html)'
        ].join('\n');
      }
    });
  }

  function initContactGeneralForm() {
    if (!document.getElementById('ctForm')) return;
    initMailForm({
      toAddress: 'kontakt@[domena].pl',
      fields: [
        { id: 'ct_first', label: 'Imię', required: true, type: 'text', errorMsg: 'Podaj imię.' },
        { id: 'ct_last', label: 'Nazwisko', required: true, type: 'text', errorMsg: 'Podaj nazwisko.' },
        { id: 'ct_email', label: 'E-mail', required: true, type: 'email', errorMsg: 'Podaj poprawny adres e-mail.' },
        { id: 'ct_phone', label: 'Numer telefonu', required: false, type: 'tel' },
        { id: 'ct_subject', label: 'Temat', required: true, type: 'text', errorMsg: 'Podaj temat wiadomości.' },
        { id: 'ct_message', label: 'Treść wiadomości', required: true, type: 'textarea', errorMsg: 'Napisz treść wiadomości.' }
      ],
      consentId: 'ct_consent',
      modalId: 'ctMailModal',
      successBoxId: 'ctSuccess',
      submitBtnId: 'ctSubmit',
      previewBtnId: 'ctPreviewBtn',
      sendBtnId: 'ctSendBtn',
      errorSummaryId: 'ctErrorSummary',
      buildSubject: function (v) {
        return 'Wiadomość ze strony KRS Guard — ' + v.ct_subject;
      },
      buildBody: function (v) {
        return [
          'Dzień dobry,',
          '',
          v.ct_message,
          '',
          'Dane kontaktowe:',
          '- Imię i nazwisko: ' + v.ct_first + ' ' + v.ct_last,
          '- E-mail: ' + v.ct_email,
          '- Telefon: ' + (v.ct_phone || '—'),
          '- Temat: ' + v.ct_subject,
          '',
          'Pozdrawiam,',
          v.ct_first + ' ' + v.ct_last,
          '',
          '(Wiadomość przygotowana z formularza na stronie KRS Guard — kontakt.html)'
        ].join('\n');
      }
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
