---
name: stan-pracy-2026-07-31
description: Aktualny stan prac nad stroną KRS Guard (na 31.07.2026) + otwarte punkty
metadata: 
  node_type: memory
  type: project
  originSessionId: 7e6b4554-eb29-4587-a046-c1568a1cc5b1
  modified: 2026-07-31T16:23:04.216Z
---

Bieżący punkt zapisu — **31.07.2026**. Zastępuje wcześniejszy
`stan-pracy-2026-07-22`. Na starcie sesji zsynchronizować się z repo
(repo wygrywa), patrz [[ciaglosc-sprawdzac-repo-na-starcie]].

**Stan:** makieta strony **KRS Guard** w `www/`, dopracowywana.

**Podgląd lokalny — UWAGA, sposób zależy od komputera:**
- **Komputer właściciela: pliki `.bat` są ZABLOKOWANE** — dwuklik w `.bat`
  nic nie robi (potwierdzone 31.07: plik testowy nie zostawił nawet logu
  uruchomienia; najpewniej antywirus/system). Podgląd odpalamy przez
  **skrót na pulpicie „Podglad strony KRS Guard"** (ikona Edge → otwiera
  `www/index.html` w Edge). Skrót jest lokalny (ścieżki bezwzględne, poza
  repo) — na drugim komputerze utworzyć od nowa PowerShellem:
  `WScript.Shell` → TargetPath = `...\msedge.exe`,
  Arguments = `--new-window "file:///…/www/index.html"`.
- `podglad-strony.bat` (w repo, ścieżki względne `%~dp0`) zostawiony na
  wypadek, gdyby na drugim komputerze `.bat` NIE były blokowane.
- Do własnych testów: `python -m http.server 8765` w `www/`.

**Pułapka przy testach agenta:** Edge odpalony przez narzędzia Claude Code
działa w innej (niewidocznej) sesji Windows i przez „singleton" przechwytuje
otwarcia — wtedy dwuklik właściciela nie pokazuje okna. Po testach zamknąć
wszystkie `msedge` i NIE uruchamiać Edge samemu, prosząc właściciela o klik.
Edge blokuje też schodzenie zrzutów poniżej ~492px CSS (min. viewport).

**Zrobione 31.07.2026:**
1. Sprzątanie repo: usunięto resztki po porzuconym podejściu build
   (`package.json`, `package-lock.json`, `node_modules`); przywrócono
   brakujące pliki skilli z repo.
2. Dodano `podglad-strony.bat` — dwuklik otwiera stronę w **Edge**
   (bez serwera, bez dodatkowych okien). Wcześniejsze wersje z lokalnym
   serwerem gubiły fokus (przeglądarka pod oknem serwera) — porzucone.
3. **Pakiety — opisy przeniesione na Cennik jako rozwijane** (commit
   `c16587b`):
   - `krs-guard.html` („Jak pomagamy") odchudzone — usunięto trzy długie
     opisy pakietów, w ich miejsce krótki blok + przycisk „Zobacz nasze
     pakiety" → Cennik. Reszta (KRS Guard, Audyt 48h, dolne kafelki) bez zmian.
   - `uslugi-cennik.html` — przy każdym pakiecie przycisk „Szczegóły"
     rozwija opis w miejscu (klasa `.pkg-details`, toggle `.open`), bez
     przechodzenia na inną podstronę. Kafelki mają `id` = `pakiet-299`,
     `pakiet-us-zus`, `pakiet-zarzad-safe`.
   - `main.js` — nowa funkcja `initPackages()` (wzorzec jak `initFaq()`):
     toggle + auto-otwieranie pakietu z linku `...#pakiet-...`.
   - `index.html` — przyciski „Szczegóły" prowadzą teraz na
     `uslugi-cennik.html#pakiet-...` (rozwijają wybrany pakiet po wejściu).
   Plan: `plany/pakiety-rozwijane-na-cenniku.md`.
4. **Menu „hamburger" na telefonie** (commit `94e4bb9`). Na ekranach
   ≤980px menu chowa się pod przyciskiem z trzema kreskami i rozwija po
   kliknięciu (pionowa lista); na komputerze bez zmian. Przycisk
   `.nav-toggle` + `id="mainnav"` dodane do wszystkich 8 podstron ze
   wspólnym nagłówkiem; obsługa `initNavToggle()` w `main.js`; style w
   `styles.css` (`.nav-toggle` + reguły w `@media (max-width:980px)`).
   UWAGA: `audyt-48h-form.html` jest samodzielna (własne style, własna
   klasa `.nav` = nawigacja kroków formularza) — celowo pominięta.

**Uwaga o kalkulatorze (osobny projekt):** na tym komputerze brakowało
pakietu Pythona `reportlab` — doinstalowany 31.07, kalkulator uruchamia się.
To NIE część tej strony (patrz CLAUDE.md, sekcja o kalkulatorze).

**Zrobione 31.07.2026 (dalszy ciąg — sesja poprawek po przeglądzie strony):**
5. **Strona główna — usunięty mylący krok 3 w pasku „Jak pomagamy — krok po
   kroku"** (commit `509505d` + centrowanie `bcbb128`). Krok 3 „Pakiety
   obrony" powielał sekcję „Nasze pakiety" tuż poniżej — usunięty, zostały
   tylko kroki 1 (Kalkulator) i 2 (Audyt 48h), wyśrodkowane w 2 kolumnach
   (`.funnel` w `styles.css`: `repeat(2,1fr)`, `margin:20px auto 0`,
   `max-width:640px`).
6. **`krs-guard.html` — poprawiony mylący opis kolejności wyboru pakietu**
   (commit `678300d`). Dwa miejsca sugerowały „po diagnozie [Audytu 48h]
   dobieramy pakiet za klienta" — nieprawda, klient sam wybiera pakiet
   dopasowany do swojej sytuacji (Art. 299 KSH / US-ZUS / Zarząd SAFE),
   audyt tylko o tym informuje. Zmienione zdania w sekcji „Zaczynamy od
   Audytu 48h" i w bloku „Nasze pakiety".
7. **`narzedzia.html` — grafika kalkulatora niezgodna z prawdziwą aplikacją**
   (commit `149423f`). Stary obrazek (waga+lupa, PNG) zastąpiony inline-SVG
   banerem będącym dokładną repliką nagłówka prawdziwej appki Streamlit
   (sześciokątny znak „K", granat `#1a3a5c`, tekst „KRS Guard — Kalkulator
   Ryzyka Prawnego" + podtytuł) — kolory/ścieżki SVG wzięte wprost z
   `Kalkulator_ryzyka_app/app/branding.py` (`logo_svg_light_on_dark`).
   Nowa klasa `.calc-banner` w `styles.css`. Stary plik
   `assets/kalkulator_ryzyka_logo.png` usunięty (nieużywany).
8. **`audyt-48h.html` — za dużo dominującej bieli wokół małej ikonki**
   (commit `975f308`+`bd226b2`). Mała ikonka zegara na dużej białej karcie
   zastąpiona kolorowym banerem (gradient `var(--brand)`→`var(--brand-2)`,
   `flex:1` żeby wypełniał kartę, większa czytelna ikona SVG zegara, tytuł
   „Audyt 48h" + krótki opis). Nowa klasa `.audyt-banner` w `styles.css`.
   Stary plik `assets/audyt_48h_logo.png` usunięty (nieużywany).
9. **Treść pakietów zaakceptowana przez właściciela** — opisy „Dla kogo / Co
   robimy / Efekt" na Cenniku (patrz pkt 3) uznane za dobre, bez zmian.
   Zdejmuje to punkt „do akceptacji przez radcę" z listy otwartych spraw.

**Uwaga narzędziowa (dla przyszłych sesji, nie dla właściciela):** podgląd w
wewnętrznej przeglądarce narzędzi Claude Code (Browser pane) w tej sesji
kilkukrotnie trzymał **stary `styles.css` w cache** mimo nowej karty/twardego
odświeżenia — zmiany na dysku były poprawne (zweryfikowane przez
`fetch(url,{{cache:'no-store'}})`), ale DOM pokazywał starą wersję. Nie walczyć
z tym w kółko — zweryfikować przez fetch no-store, i polegać na potwierdzeniu
właściciela w jego prawdziwym Edge (skrót na pulpicie), nie na tym podglądzie.

**Otwarte punkty (bez zmian — NIE ruszać bez prośby właściciela):**
- Prawdziwe dane kontaktowe (placeholdery `.ph` w `www/kontakt.html`).
- Adres odesłania do Kancelarii PRS — `kancelaria-prs.vercel.app` → docelowy.
- Statystyki na stronie głównej (100+ / 4+ / 24h) — do decyzji.
- Hosting/domena oraz realna obsługa formularza Audytu 48h (dziś makieta).
