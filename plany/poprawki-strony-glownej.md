# Plan: Poprawki strony głównej KRS Guard + szczegóły pakietów

## Kontekst — po co to robimy

Użytkownik obejrzał makietę po rebrandingu na „KRS Guard" (ocena: „zdecydowanie
lepiej") i zgłosił konkretne poprawki, głównie do **strony głównej**, oraz
prośbę o **szczegóły pakietów** (dziś przycisk „Szczegóły" prowadzi tylko na
ogólną podstronę „Jak pomagamy"). Cel: dopracować stronę główną i dać realną,
konkretną treść pakietów, którą klient może przeczytać po kliknięciu „Szczegóły".

## Decyzje ustalone z użytkownikiem

- Hasło pod nagłówkiem lejka: **„Im wcześniej zareagujesz, tym więcej możesz
  ochronić."** (zastępuje „Bierzesz tyle, ile naprawdę potrzebujesz").
- Wzmianka „Usługi prawne realizuje partnerska Kancelaria PRS" — **usunąć
  wszędzie** (O nas, stopka na każdej podstronie, Kontakt). Strona ma sprawiać
  wrażenie samodzielnej kancelarii. **Zostaje** tylko odesłanie do Kancelarii
  PRS w sprawach rejestracji (normalne skierowanie, nie podważa samodzielności).

## Zakres pracy

### A. Strona główna (`www/index.html`)
1. **Usunąć cały blok „Bezpieczeństwo / Doradztwo / Dokumentacja"** — czyli
   `<aside class="hero-right">…</aside>` (obecne linie ~65–104). Hero zostaje
   jednokolumnowe: nagłówek + 2 przyciski (Sprawdź ryzyko / Audyt 48h) + statystyki.
   - W `styles.css`: `.hero-grid` → jedna kolumna (klasa używana już tylko na
     stronie głównej); zadbać, by treść hero nie „rozjeżdżała się" na całą
     szerokość (rozsądny max-width dla `.copy-box`/CTA, statystyki mogą zostać
     w 3 kolumnach).
2. **„O nas"**: usunąć ostatnie zdanie „Usługi prawne realizuje partnerska
   Kancelaria PRS." (linia ~120). Reszta akapitu bez zmian.
3. **Hasło lejka**: w `services-sub` zmienić drugie zdanie na
   „Im wcześniej zareagujesz, tym więcej możesz ochronić."
4. **Przyciski „Szczegóły" przy 3 pakietach** → linkować do konkretnych
   sekcji: `krs-guard.html#pakiet-299`, `#pakiet-us-zus`, `#pakiet-zarzad-safe`
   (zamiast ogólnego `krs-guard.html`).

### B. Logo w belce za małe (`www/styles.css`)
- Zwiększyć `.brand-logo` z `height:58px` do ok. **80px** (i odpowiednio na
  mobile z 48px do ~60px). W razie potrzeby drobna korekta odstępów w nagłówku,
  by belka nie urosła nadmiernie.

### C. Usunięcie wzmianki o partnerze (wszystkie podstrony)
- **Stopka** (identyczna na wszystkich stronach): zmienić `foot-note` z
  „…(art. 299 KSH, US/ZUS). Usługi prawne realizuje partnerska Kancelaria PRS.
  Makieta —…" na „…(art. 299 KSH, US/ZUS). Makieta —…". Podmiana skryptem
  (jak `scratchpad/rebrand.py`), bo blok jest wszędzie taki sam.
- **Kontakt** (`kontakt.html`): usunąć wiersz „Obsługa prawna — Kancelaria PRS
  (partner)". Bullet o rejestracji z odesłaniem do Kancelarii PRS **zostaje**.

### D. Szczegóły pakietów (`www/krs-guard.html`)
Rozwinąć sekcję „Nasze pakiety": zamiast 3 krótkich kart — 3 pełniejsze bloki
z **id** (kotwice), każdy: dla kogo · co robimy · efekt · cena. Przyciski
„Szczegóły" ze strony głównej i cennika prowadzą do tych kotwic.

**Proponowana treść (do akceptacji przez radcę — standardowe elementy obrony,
nie zmieniamy stanu prawnego):**

- **Pakiet Art. 299 KSH — od 2500 zł netto** (`id="pakiet-299"`)
  - *Dla kogo:* obecni i byli członkowie zarządu sp. z o.o., PSA lub S.A.,
    którzy otrzymali pozew lub nakaz zapłaty z art. 299 KSH.
  - *Co robimy:* analiza pozwu i dokumentów, ustalenie linii obrony (m.in.
    przesłanki zwalniające — wniosek o upadłość we właściwym czasie, brak
    szkody wierzyciela, brak winy), przygotowanie sprzeciwu / odpowiedzi na
    pozew, reprezentacja w sądzie.
  - *Efekt:* gotowe pisma procesowe i strategia; dążymy do oddalenia powództwa
    lub ograniczenia odpowiedzialności.

- **Pakiet US / ZUS — od 2500 zł netto** (`id="pakiet-us-zus"`)
  - *Dla kogo:* członkowie zarządu, na których US lub ZUS przeniósł
    odpowiedzialność za zaległości podatkowe/składkowe (art. 116 Ordynacji
    podatkowej).
  - *Co robimy:* analiza decyzji, odwołanie i dalsze pisma, argumentacja
    (m.in. przesłanki uwalniające — zgłoszenie upadłości we właściwym czasie,
    wskazanie mienia spółki, brak winy), reprezentacja w postępowaniu, w razie
    potrzeby skarga do sądu administracyjnego.
  - *Efekt:* odwołanie i dalsze pisma; dążymy do uchylenia decyzji lub
    ograniczenia odpowiedzialności.

- **Zarząd SAFE (prewencja) — wycena indywidualna** (`id="pakiet-zarzad-safe"`)
  - *Dla kogo:* menedżerowie, którzy chcą bezpiecznie odejść z zarządu albo z
    wyprzedzeniem ograniczyć osobiste ryzyko.
  - *Co robimy:* audyt sytuacji (uchwały, mandaty, wpisy w KRS), poprawne
    złożenie i odnotowanie rezygnacji, weryfikacja terminowości zgłoszeń,
    rekomendacje ograniczające ryzyko z art. 299 KSH i art. 116 O.p.
  - *Efekt:* raport z audytu i komplet poprawnych dokumentów (rezygnacja,
    zgłoszenia do KRS).

### E. Spójność
- Przycisk „Szczegóły" w cenniku (`uslugi-cennik.html`) też skierować na
  kotwice pakietów (`krs-guard.html#…`).

## Pliki do zmiany
`www/index.html`, `www/styles.css`, `www/krs-guard.html`,
`www/uslugi-cennik.html`, `www/kontakt.html` oraz stopka we wszystkich
podstronach `www/*.html` (podmiana skryptem).

## Weryfikacja (podgląd `http://localhost:8765/`)
1. Strona główna: brak bloku Bezpieczeństwo/Doradztwo/Dokumentacja; hero
   wygląda dobrze w jednej kolumnie; logo w belce wyraźnie większe.
2. „O nas" bez zdania o Kancelarii PRS; nowe hasło lejka na miejscu.
3. „Szczegóły" przy każdym pakiecie przewija do właściwej sekcji z opisem
   (dla kogo / co robimy / efekt / cena) na „Jak pomagamy".
4. Wzmianka „Usługi prawne realizuje partnerska Kancelaria PRS" nie występuje
   nigdzie (stopki, Kontakt); odesłanie do rejestracji (Kancelaria PRS) zostaje.
5. Responsywność (zwężenie okna) — nic się nie rozjeżdża.

## Po realizacji
Commit(y) osobne i push (git workflow z CLAUDE.md). Treść pakietów oznaczyć
jako propozycję do akceptacji przez radcę.
