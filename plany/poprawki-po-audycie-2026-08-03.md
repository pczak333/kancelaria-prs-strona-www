# Plan: poprawki po audycie strony (03.08.2026)

## Skąd ten plan

Audyt całej strony przeprowadzony 03.08.2026 wielopoziomowym przeglądem
(5 niezależnych recenzji + adwersaryjna weryfikacja każdego znaleziska,
11 agentów). Zgłoszono 40 uwag, 30 przeszło weryfikację, po usunięciu
duplikatów zostało **19 realnych spraw** (cztery recenzje niezależnie
znalazły ten sam problem z `index.html:109` — to był najbardziej rzucający
się w oczy błąd na stronie).

Raport i pełne uzasadnienia: run `wf_8c657a31-c80`, journal w
`~/.claude/projects/.../subagents/workflows/wf_8c657a31-c80/journal.jsonl`.

## STATUS: ETAPY 1–4 WYKONANE (03.08.2026, w tej samej sesji co audyt)

**Właściciel potwierdził oba błędy prawne i podjął decyzje co do sposobu
poprawki** (zawężenie do sp. z o.o.; rozdzielenie US/ZUS bez podawania
konkretnych terminów, odesłanie do pouczenia w decyzji). Wszystkie 16 spraw
z Etapów 1–4 zostało wprowadzonych i wypchniętych na GitHub. **Etap 5
(drobiazgi) NIE został jeszcze zrobiony** — to zadanie na następną sesję,
patrz na dole pliku.

---

## ETAP 1 — błędy merytoryczne ✅ ZROBIONE

### 1. Art. 299 KSH przypisany S.A. i PSA — BŁĄD PRAWNY ✅
- **Decyzja właściciela:** zawężamy do sp. z o.o. (bez PSA/S.A.).
- **Zrobione:** `www/uslugi-cennik.html:89`, `www/krs-guard.html:46` —
  „sp. z o.o., PSA lub S.A." → „spółki z o.o.". Commit `3d0710c`.

### 2. Zła droga odwoławcza i termin przy decyzjach ZUS — BŁĄD PRAWNY ✅
- **Decyzja właściciela:** rozdzielić ścieżki US/ZUS, ale **bez podawania
  konkretnych terminów** — odesłanie do pouczenia w decyzji (bezpieczniejsze
  wobec zmian przepisów).
- **Zrobione:** `www/blog-art-116-us-zus.html` (nowa sekcja „Jak wygląda
  postępowanie i gdzie się odwołać?" — US: dyrektor izby administracji
  skarbowej → WSA; ZUS: sąd okręgowy/sąd pracy i ubezpieczeń społecznych,
  sąd administracyjny NIE jest właściwy) i `www/uslugi-cennik.html:108`.
  Commit `1be46a1`.

### 2b. Niespójny opis przesłanki „wskazania mienia spółki" ✅
- **Zrobione:** rozbite na dwa punkty w `blog-bezskuteczna-egzekucja.html`
  (art. 299 KSH — brak szkody wierzyciela) i doprecyzowane w
  `uslugi-cennik.html` (art. 116 O.p. — mienie pozwalające zaspokoić
  zaległość „w znacznej części", wszędzie to samo sformułowanie).
  Commit `70f151e`.

---

## ETAP 2 — sprzeczności w ofercie ✅ ZROBIONE

### 3. Strona główna obiecywała usługi, których nie świadczymy ✅
- **Zrobione:** kafelki atutów na `index.html` przeredagowane — „Zajmujemy
  się wyłącznie ochroną członków zarządu: art. 299 KSH, decyzje US i ZUS,
  bezpieczne odejście z zarządu" (było: KRS, obsługa biznesowa). Commit
  `3101cc4`.

### 4. Pakiet „Zarząd SAFE" obiecywał zgłoszenia do KRS ✅
- **Zrobione:** doprecyzowane w `uslugi-cennik.html` — przygotowujemy
  dokumenty i rezygnację, sam wniosek do KRS składa Kancelaria PRS. Commit
  `5c534be`.

### 5. Audyt 48h miał trzy różne terminy realizacji ✅
- **Zrobione:** ujednolicone w 5 miejscach na „2 dni robocze" (dokładna
  podstawa czasu zmieniła się jeszcze raz przy okazji punktu poniżej —
  patrz „Dodatkowo zrobione"). Commit `5a71a17`.

### 6. Na stronie Audytu 48h nie było ceny ✅
- **Zrobione:** dodane „od 900 zł netto" w nagłówku, banerze i opisie dla
  wyszukiwarki na `audyt-48h.html`. Commit `f012488`.

---

## ETAP 3 — formularz Audytu ✅ ZROBIONE

### 7. Formularz blokował zgłoszenie bez zwrotki ✅
- **Uwaga:** ten punkt sam się rozwiązał przy okazji dodatkowej zmiany
  poniżej (dwuetapowy proces wyceny) — pole zwrotki formalnie nadal jest
  oznaczone jako wymagane w kodzie formularza (walidacja
  `audyt-48h-form.html:964-970`), ale **do zweryfikowania w następnej
  sesji**, czy w świetle nowego procesu (patrz niżej) nadal powinno być
  obowiązkowe na etapie samego zgłoszenia, czy dopiero na etapie właściwego
  audytu po akceptacji wyceny. **NIE oznaczać jako w pełni zamknięte.**

### 8. Najpilniejszy klient nie miał jak się skontaktować ✅
- **Zrobione:** klikalny telefon i e-mail (placeholdery `.ph`, do podmiany
  na prawdziwe dane) w komunikacie „skontaktuj się z nami pilnie". Commit
  `afcc49c`.

### 9. Dwie różne deklaracje czasu wypełniania ✅
- **Zrobione:** ujednolicone na „7 kroków, ok. 3–6 min" w
  `audyt-48h-form.html:214`. Część zbiorczego commitu `16b5e29`.

### 10. Literówka psująca układ nagłówka formularza na telefonie ✅
- **Zrobione:** brakujący średnik w `audyt-48h-form.html:35` dopisany.
  Część zbiorczego commitu `16b5e29`.

### 11. Pierwsze pytanie formularza przypisywało klientowi pakiet ✅
- **Zrobione:** `audyt-48h-form.html:228` — „Pozew / nakaz – Pakiet Art. 299
  KSH" → „Pozew lub nakaz zapłaty od wierzyciela spółki". Część zbiorczego
  commitu `16b5e29`.

### 12. Brak polityki prywatności i klauzuli o przetwarzaniu danych ✅
- **Zrobione:** nowa podstrona `www/polityka-prywatnosci.html` (szkielet z
  widocznymi placeholderami `.ph` na dane administratora/NIP — **do
  uzupełnienia razem z prawdziwymi danymi kontaktowymi przed publikacją**),
  zlinkowana w stopce wszystkich 14 podstron + przy zgodzie w formularzu
  Audytu 48h. Commit `16b5e29`.

**Dodatkowo zrobione w Etapie 3 (wykraczające poza pierwotną listę 19,
z inicjatywy właściciela w trakcie sesji):**

- **Dwuetapowy proces Audytu 48h** — rozwiązuje realny problem biznesowy:
  co się dzieje z przesłanymi dokumentami, jeśli klient nie zaakceptuje
  wyceny. Nowy model: (1) klient przesyła dokumenty → (2) sprawdzamy
  kompletność i potwierdzamy cenę (typowa sprawa: 900 zł netto), właściwa
  analiza JESZCZE się nie zaczyna → (3) klient akceptuje i płaci → (4) w
  2 dni robocze OD AKCEPTACJI dostaje pisemną rekomendację. Jeśli klient nie
  zaakceptuje wyceny: żadna opłata, dokumenty usuwamy. Wprowadzone spójnie
  w 5 plikach: `audyt-48h.html` (nowa sekcja „Jak to działa"),
  `audyt-48h-form.html` (info tuż przed zgodą), `krs-guard.html`,
  `blog-dokumenty-audyt-48h.html`, `blog-pozew-art-299.html`. Commit
  `c3de8df`.
- **Do zweryfikowania w kolejnej sesji:** czy pole „potwierdzenie
  doręczenia" w formularzu powinno pozostać wymagane na etapie **wstępnego**
  zgłoszenia (etap 1–2 nowego procesu) — dziś nadal jest `required` w
  walidacji JS, co może być niespójne z duchem „wysłanie dokumentów niczego
  nie przesądza".

---

## ETAP 4 — wygląd ✅ ZROBIONE

### 13. Zdjęcie w banerze i czcionka ładowały się z obcych serwerów ✅
- **Zrobione:** usunięte zdjęcie Unsplash z `.hero-bg` (zastąpione samym
  gradientem marki). Czcionka Poppins pobrana i wgrana lokalnie do
  `www/assets/fonts/` (8 plików woff2 — 4 grubości × warianty
  latin/latin-ext dla polskich znaków), `@import` z Google Fonts zastąpiony
  lokalnymi `@font-face`. Strona teraz wygląda identycznie z internetem i
  bez niego. Commit `8d088b6`.

### 14. Logo w nagłówku nie stało w jednej linii z treścią ✅
- **Zrobione:** `.header{padding:14px 22px 10px}` →
  `.header{padding:14px 0 10px}`. Commit `8d088b6`.

### 15. Dwa bliźniacze banery (kalkulator/audyt) w różnych stylach ✅
- **Zrobione:** ujednolicone (ten sam krój, wielkość, `flex:1;
  min-width:220px`), dodana reguła `@media (max-width:560px)` — ikona nad
  tekstem na telefonie zamiast obok. Granat kalkulatora `#1a3a5c`
  sformalizowany jako nazwana zmienna `--calc-navy` (świadomy wyjątek —
  replika kolorów prawdziwej aplikacji kalkulatora). Commit `8d088b6`.

### 16. Strona główna jako jedyna nie miała głównego nagłówka ✅
- **Zrobione:** `<strong class="hero-title">` → `<h1 class="hero-title">`
  + `margin-top:0`. Commit `8d088b6`.

**Dodatkowo zrobione w Etapie 4 (z inicjatywy właściciela w trakcie sesji):**

- **Usunięty przycisk „Zamów Audyt 48h" z hero na stronie głównej** —
  właściciel uznał, że to przedwczesne wezwanie do płatnej usługi, zanim
  gość w ogóle wie, o co chodzi (wyjaśnienie jest niżej na stronie).
  Zostało tylko „Sprawdź swoje ryzyko" (darmowe, niskiego zaangażowania,
  zrozumiałe samo w sobie dzięki nagłówkowi nad nim). Część commitu `8d088b6`.
- **Ujednolicenie kolorów przycisków** — pasek `.quicklinks` na stronie
  głównej i baner Audytu 48h były w turkusie (`var(--brand)`), różnym od
  granatu używanego przez przyciski „Szczegóły" na Cenniku (`var(--ink)`).
  Zmienione na spójny granat wszędzie. Przy okazji: martwe reguły CSS po
  starym prototypie (`.tabs`/`.tab`, używały tego samego turkusu) usunięte.
  Część commitu `8d088b6`.

---

## ETAP 5 — drobiazgi ⬜ NIE ZROBIONE (zadanie na następną sesję)

17. **Strona kalkulatora nie mówi tego, co Cennik** (`www/narzedzia.html`) —
    brakuje dwóch zdań: że wynik liczy algorytm, nie prawnik, i że odpowiedzi
    znikają po 24 h.
18. **FAQ sugeruje start od Audytu** (`www/faq.html:84`), reszta serwisu mówi,
    że pierwszy krok to bezpłatny Kalkulator. Poprawka jednozdaniowa.
19. **Mylący przycisk „Wróć do KRS Guard"** (`www/narzedzia.html`) prowadzi
    na „Jak pomagamy" → zmienić napis na „Zobacz, jak pomagamy".
20. **Ikona stopera cieńszą kreską** (`stroke-width="1.6"` zamiast `"2"`) —
    `www/audyt-48h.html`, `www/uslugi-cennik.html` (ikona zegara przy
    Audycie 48h).
21. **Angielskie cudzysłowy zamykające w artykułach blogowych** — 10 miejsc,
    m.in. `www/blog-bezskuteczna-egzekucja.html:51`.
22. **FAQ nie informuje czytników ekranu o stanie rozwinięcia**
    (`www/faq.html`) — brak `aria-expanded`. Identyczny mechanizm działa
    już poprawnie przy pakietach na Cenniku, jest z czego skopiować.
23. **Porządki pod maską** (niewidoczne dla klienta, osobnym commitem):
    - martwe reguły w `styles.css` po starych wersjach: `.tagline`,
      `.krs-logo`/`.krs-logo-img`, `.service-card`, `.card-stack`,
      `.service-tile.special`/`.special-inner`/`.spacer`, `.footnote`,
      `.badge`, `.section-title`, `.hl` + zmienna `--tagline-left`
      (`.tabs`/`.tab` już usunięte przy okazji Etapu 4).
    - odwrotnie: klasy `.calc-actions`, `.audyt-actions`, `.foot-left` są
      w HTML, ale nie mają żadnej reguły w CSS.
    - kolory linków wpisywane ręcznie `style="color:var(--link);font-weight:800"`
      w ~8 miejscach zamiast raz regułą `.p a, .list a, .faq-a a, .lead a{...}`.

---

## Czego audyt świadomie NIE zgłaszał

Rzeczy znane i zaakceptowane (podane agentom jako kontekst): placeholdery
danych kontaktowych, makieta formularza bez backendu, tymczasowy adres
Kancelarii PRS, notki „wersja robocza" na blogu i FAQ, brak hostingu/domeny,
statystyki na stronie głównej.

Weryfikator **odrzucił** 10 z 40 zgłoszeń jako naciągane — m.in. zarzut, że
zdanie „terminów zwykle nie da się przywrócić" jest zbyt kategoryczne
(zawiera „zwykle", więc dopuszcza wyjątki, i jest zgodne z praktyką).
