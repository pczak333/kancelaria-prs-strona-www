# Plan: poprawki po audycie strony (03.08.2026)

## Skąd ten plan

Audyt całej strony przeprowadzony 03.08.2026 wielopoziomowym przeglądem
(5 niezależnych recenzji + adwersaryjna weryfikacja każdego znaleziska,
11 agentów). Zgłoszono 40 uwag, 30 przeszło weryfikację, po usunięciu
duplikatów zostaje **19 realnych spraw** (cztery recenzje niezależnie
znalazły ten sam problem z `index.html:109` — to najbardziej rzucający się
w oczy błąd na stronie).

Raport i pełne uzasadnienia: run `wf_8c657a31-c80`, journal w
`~/.claude/projects/.../subagents/workflows/wf_8c657a31-c80/journal.jsonl`.

**Właściciel zaakceptował listę i kolejność prac.** Punkty 1–2 wymagają
jeszcze jego potwierdzenia jako radcy przed wprowadzeniem (pytanie zadane,
odpowiedź nie padła — sesja została przerwana).

---

## ETAP 1 — błędy merytoryczne (najpilniejsze)

### 1. Art. 299 KSH przypisany S.A. i PSA — BŁĄD PRAWNY
- **Gdzie:** `www/uslugi-cennik.html:89`, `www/krs-guard.html:46`
- **Problem:** piszemy „sp. z o.o., PSA lub S.A." przy art. 299 KSH. Przepis
  dotyczy **wyłącznie sp. z o.o.** W PSA odpowiednikiem jest art. 300(132)
  KSH; w S.A. KSH nie przewiduje analogicznego przepisu.
- **Do zrobienia:** poprawić oba miejsca. Zdecydować z właścicielem, czy
  pakiet obejmuje też PSA (wtedy dopisać właściwy przepis), czy zawężamy do
  sp. z o.o.
- **Uwaga:** sprawdzić, czy tego samego uproszczenia nie ma w kalkulatorze
  ryzyka (osobne repo `Kalkulator_ryzyka_app`) i w `audyt-48h-form.html`.
- **STATUS: czeka na potwierdzenie właściciela (radcy).**

### 2. Zła droga odwoławcza i termin przy decyzjach ZUS — BŁĄD PRAWNY
- **Gdzie:** `www/blog-art-116-us-zus.html:82-83`, `www/uslugi-cennik.html:108`
- **Problem:** US i ZUS wrzucone do jednego worka — podajemy odwołanie
  „14 dni" i skargę do sądu administracyjnego. Dla ZUS to nieprawda:
  odwołanie idzie do **sądu okręgowego (sąd pracy i ubezpieczeń
  społecznych)**, za pośrednictwem ZUS, w terminie **miesiąca**
  (art. 83 ustawy o systemie ubezpieczeń społecznych).
- **Do zrobienia:** rozdzielić obie ścieżki: US (odwołanie do dyrektora izby
  administracji skarbowej → skarga do WSA) i ZUS (odwołanie do sądu
  okręgowego, miesiąc).
- **STATUS: czeka na potwierdzenie właściciela (radcy).**

### 2b. Niespójny opis przesłanki „wskazania mienia spółki"
- **Gdzie:** `www/blog-bezskuteczna-egzekucja.html:78` kontra
  `www/blog-art-116-us-zus.html:73`
- **Problem:** jeden artykuł pisze poprawnie („egzekucja umożliwi
  zaspokojenie zaległości **w znacznej części**"), drugi zaniża wymóg do
  „mienie, z którego możliwa jest egzekucja". Dodatkowo w jednym punkcie
  zlepione są dwie różne przesłanki z dwóch różnych ustaw.
- **Do zrobienia:** rozbić punkt na dwa, wszędzie konsekwentnie „w znacznej
  części".

---

## ETAP 2 — sprzeczności w ofercie

### 3. Strona główna obiecuje usługi, których nie świadczymy
- **Gdzie:** `www/index.html:109` (kafelek „Specjalizacja" w pasku atutów)
- **Problem:** „Koncentrujemy się na prawie spółek, KRS, obsłudze biznesowej
  oraz ochronie prawnej członków zarządu" — a 40 linii niżej odsyłamy sprawy
  KRS do Kancelarii PRS, a FAQ deklaruje „skupiamy się wyłącznie na ochronie
  członków zarządu". Pozostałość po starej marce.
- **Znaleziony przez 4 z 5 recenzji** — najbardziej widoczny błąd na stronie.
- **Do zrobienia:** zawęzić opis do ochrony zarządu. Przy okazji zawęzić
  sąsiedni kafelek („prawo gospodarcze" → konkret), żeby pasek mówił jednym
  głosem.

### 4. Pakiet „Zarząd SAFE" obiecuje zgłoszenia do KRS
- **Gdzie:** `www/uslugi-cennik.html:128`
- **Problem:** obiecujemy „poprawne złożenie i odnotowanie rezygnacji" oraz
  „zgłoszenia do KRS", a sześć linijek niżej ramka handoff odsyła KRS do
  Kancelarii PRS.
- **Do zrobienia:** doprecyzować, że przygotowujemy komplet dokumentów, a sam
  wniosek składa Kancelaria PRS. Sama rezygnacja z zarządu zostaje naszą usługą.

### 5. Audyt 48h ma trzy różne terminy realizacji
- **Gdzie:** `www/audyt-48h.html:55` („48 godzin"), artykuły na blogu
  („dwa dni robocze", 2×), `www/krs-guard.html` („dwa dni")
- **Problem:** dokumenty przysłane w piątek wieczorem = wg jednej wersji
  niedziela, wg drugiej wtorek. Przy usłudze sprzedawanej za szybkość to
  zaproszenie do reklamacji.
- **Do zrobienia:** ujednolicić na „w ciągu 2 dni roboczych od otrzymania
  kompletu dokumentów" w **czterech plikach**. Nazwa „Audyt 48h" zostaje
  jako marka.

### 6. Na stronie Audytu 48h nie ma ceny
- **Gdzie:** `www/audyt-48h.html` (cena jest w index, cenniku i FAQ, brak tutaj)
- **Problem:** klient trafia tu po kliknięciu „Zamów Audyt 48h" i idzie prosto
  do 7-krokowego formularza, nie widząc ceny. Czyta się to jako ukrywanie kosztu.
- **Do zrobienia:** dodać „od 900 zł netto" na stronie Audytu.

---

## ETAP 3 — formularz Audytu (tracimy klientów gotowych kupić)

### 7. Formularz blokuje zgłoszenie bez zwrotki
- **Gdzie:** `www/audyt-48h-form.html:459` (pole wymagane), `:463` (komunikat),
  walidacja `:964-970`
- **Problem:** pole „Załącz potwierdzenie doręczenia" jest **obowiązkowe**,
  a `blog-dokumenty-audyt-48h.html:70` i `faq.html:124` wprost obiecują, że
  braki niczego nie blokują. Wiele osób zwrotki nie ma (odebrał domownik,
  kurier, doręczenie elektroniczne).
- **Do zrobienia:** uczynić pole nieobowiązkowym.

### 8. Najpilniejszy klient nie ma jak się skontaktować
- **Gdzie:** `www/audyt-48h-form.html:302`
- **Problem:** gdy do terminu zostało bardzo mało czasu, formularz pokazuje
  czerwone ostrzeżenie „skontaktuj się z nami pilnie" — bez telefonu i e-maila.
  Strona formularza **nie ma menu**, więc nie da się z niej przejść nigdzie indziej.
- **Do zrobienia:** wstawić klikalny telefon i e-mail w ten komunikat
  (po uzupełnieniu prawdziwych danych kontaktowych). Docelowo dołożyć menu
  jak na pozostałych podstronach.

### 9. Dwie różne deklaracje czasu wypełniania
- **Gdzie:** `www/audyt-48h-form.html:212` („2–3 minuty") kontra
  `www/audyt-48h.html:59` („7 kroków, ok. 3–6 minut")
- **Do zrobienia:** ujednolicić.

### 10. Literówka w kodzie psuje układ nagłówka formularza na telefonie
- **Gdzie:** `www/audyt-48h-form.html:35`
- **Problem:** brakuje jednego średnika — na wąskim ekranie elementy nagłówka
  nie zawijają się do drugiej linii.
- **Do zrobienia:** dopisać średnik, obejrzeć formularz na telefonie.

### 11. Pierwsze pytanie formularza przypisuje klientowi pakiet
- **Gdzie:** `www/audyt-48h-form.html:226`
- **Problem:** jedna z czterech odpowiedzi ma dopisaną nazwę płatnego pakietu,
  pozostałe trzy nie. Na etapie diagnozy to przedwczesne — pakiet wybiera
  klient po otrzymaniu rekomendacji (patrz `memory/marka-krs-guard-profil.md`).
- **Do zrobienia:** zostawić sam rodzaj pisma („Pozew lub nakaz zapłaty od
  wierzyciela spółki").

### 12. Brak polityki prywatności i klauzuli o przetwarzaniu danych
- **Gdzie:** `www/audyt-48h-form.html:483` (jest tylko checkbox zgody na kontakt)
- **Problem:** klient wgrywa pozwy i decyzje urzędowe. W całym `www/` nie ma
  ani słowa „polityka", „RODO", „administrator".
- **Do zrobienia:** osobna podstrona „Polityka prywatności" + link w stopce
  (stopka identyczna wszędzie — podmiana skryptem) + krótka klauzula pod
  formularzem. Warto wspomnieć o tajemnicy zawodowej radcy prawnego — to też
  argument sprzedażowy.
- **Uwaga:** do zrobienia razem z prawdziwymi danymi kontaktowymi, przed publikacją.

---

## ETAP 4 — wygląd

### 13. Zdjęcie w banerze i czcionka ładują się z obcych serwerów
- **Gdzie:** `www/styles.css:159` (Unsplash), `www/styles.css:8` (Google Fonts)
- **Problem:** zdjęcia i tak praktycznie nie widać (zakrywa je biały panel
  o przezroczystości 82% z rozmyciem). Przy podglądzie bez internetu strona
  pokazuje zastępczy krój pisma i wygląda inaczej niż docelowo — **to tłumaczy
  część rozbieżności, które właściciel widział w podglądzie**. Dodatkowo dane
  odwiedzających idą do firm trzecich (istotne przy polityce prywatności).
- **Do zrobienia:** usunąć `url(...)` z `.hero-bg` (wizualnie nic się nie zmieni),
  pobrać Poppins do `www/assets/` i podlinkować lokalnie.

### 14. Logo w nagłówku nie stoi w jednej linii z treścią
- **Gdzie:** `www/styles.css:41` (`.header{padding:14px 22px 10px}`) i `:35`
  (`.container{padding:0 18px}`)
- **Problem:** marginesy się sumują — logo startuje 40 px od krawędzi, a tytuł
  strony i kafelki 18 px. „Schodki" widoczne na każdej podstronie, znikają
  dopiero powyżej ~1224 px szerokości (dlatego łatwo przeoczyć na dużym monitorze).
- **Do zrobienia:** `.header{padding:14px 0 10px}` — `.container` sam zadba o odstęp.

### 15. Dwa bliźniacze banery zrobione w dwóch różnych stylach
- **Gdzie:** `www/styles.css:448-490` (`.calc-banner` vs `.audyt-banner`)
- **Problem:** `.calc-banner` ma krój Georgia i 1,25 rem, `.audyt-banner` krój
  strony i 1,15 rem. `.calc-banner` ma `max-width:420px` bez `flex:1`, więc
  zostaje ~100 px pustego tła obok (przycisk spada pod baner przez
  `flex-wrap` w `.icon-cta`). Żaden z nich nie ma reguł na telefon — na
  ekranie 375 px na tekst zostaje 153 px, tytuł łamie się na 4 linijki.
- **Do zrobienia:** ujednolicić krój i wielkość, dodać `flex:1; min-width:220px`
  do `.calc-banner`, usunąć `max-width:420px`, dopisać wspólną regułę
  `@media (max-width:560px)` ustawiającą ikonę nad tekstem dla obu banerów.
- **Uwaga:** granat `#1a3a5c` może zostać (to kolor prawdziwej aplikacji
  kalkulatora), ale zapisać go jako nazwaną zmienną `--calc-navy`, żeby było
  widać, że to celowy wyjątek.

### 16. Strona główna jako jedyna nie ma głównego nagłówka
- **Gdzie:** `www/index.html:43`
- **Problem:** `<strong class="hero-title">` zamiast `<h1>`. Wszystkie
  pozostałe podstrony mają `<h1>` w linii 39–40. Wyszukiwarki traktują `<h1>`
  jako tytuł strony — strona główna jest gorzej opisana niż każda podstrona.
- **Do zrobienia:** zamienić na `<h1 class="hero-title">`, dopisać
  `h1.hero-title{margin-top:0}`. Wygląd nie zmieni się ani o piksel.

---

## ETAP 5 — drobiazgi (można przy okazji)

17. **Strona kalkulatora nie mówi tego, co Cennik** (`www/narzedzia.html:52`) —
    brakuje dwóch zdań: że wynik liczy algorytm, nie prawnik, i że odpowiedzi
    znikają po 24 h. To nie sprzeczność, tylko uzupełnienie; oba zdania dobrze
    sprzedają narzędzie.
18. **FAQ sugeruje start od Audytu** (`www/faq.html:84`), reszta serwisu mówi,
    że pierwszy krok to bezpłatny Kalkulator. Poprawka jednozdaniowa.
19. **Mylący przycisk „Wróć do KRS Guard"** (`www/narzedzia.html:76`) prowadzi
    na „Jak pomagamy" → zmienić napis na „Zobacz, jak pomagamy".
20. **Ikona stopera cieńszą kreską** (`stroke-width="1.6"` zamiast `"2"`) —
    `www/audyt-48h.html:48-51`, `www/uslugi-cennik.html:61-64`.
21. **Angielskie cudzysłowy zamykające w artykułach blogowych** — 10 miejsc,
    m.in. `www/blog-bezskuteczna-egzekucja.html:51`.
22. **FAQ nie informuje czytników ekranu o stanie rozwinięcia**
    (`www/faq.html:48`) — brak `aria-expanded`. Identyczny mechanizm działa
    już poprawnie przy pakietach na Cenniku, jest z czego skopiować.
23. **Porządki pod maską** (niewidoczne dla klienta, osobnym commitem):
    - ~100 linii martwych reguł w `styles.css` po starych wersjach:
      `.tagline`, `.krs-logo`/`.krs-logo-img`, `.tabs`/`.tab`, `.service-card`,
      `.card-stack`, `.service-tile.special`/`.special-inner`/`.spacer`,
      `.footnote`, `.badge`, `.section-title`, `.hl` + zmienna
      `--tagline-left` i `@media max-width:900px` dotyczące już tylko usuniętych rzeczy.
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
