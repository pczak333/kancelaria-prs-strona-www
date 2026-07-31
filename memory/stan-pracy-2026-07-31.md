---
name: stan-pracy-2026-07-31
description: Aktualny stan prac nad stroną KRS Guard (na 31.07.2026) + otwarte punkty
metadata:
  node_type: memory
  type: project
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

**Otwarte punkty (bez zmian — NIE ruszać bez prośby właściciela):**
- Prawdziwe dane kontaktowe (placeholdery `.ph` w `www/kontakt.html`).
- Adres odesłania do Kancelarii PRS — `kancelaria-prs.vercel.app` → docelowy.
- Statystyki na stronie głównej (100+ / 4+ / 24h) — do decyzji.
- Treść pakietów — propozycja do akceptacji przez radcę.
- Hosting/domena oraz realna obsługa formularza Audytu 48h (dziś makieta).
