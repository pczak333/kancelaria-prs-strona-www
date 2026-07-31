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
Podgląd lokalny: `podglad-strony.bat` (dwuklik) albo w `www/`
`python -m http.server 8765` → `http://localhost:8765/`.

**Zrobione 31.07.2026:**
1. Sprzątanie repo: usunięto resztki po porzuconym podejściu build
   (`package.json`, `package-lock.json`, `node_modules`); przywrócono
   brakujące pliki skilli z repo.
2. Dodano `podglad-strony.bat` — podgląd strony jednym kliknięciem.
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

**Uwaga o kalkulatorze (osobny projekt):** na tym komputerze brakowało
pakietu Pythona `reportlab` — doinstalowany 31.07, kalkulator uruchamia się.
To NIE część tej strony (patrz CLAUDE.md, sekcja o kalkulatorze).

**Otwarte punkty (bez zmian — NIE ruszać bez prośby właściciela):**
- Prawdziwe dane kontaktowe (placeholdery `.ph` w `www/kontakt.html`).
- Adres odesłania do Kancelarii PRS — `kancelaria-prs.vercel.app` → docelowy.
- Statystyki na stronie głównej (100+ / 4+ / 24h) — do decyzji.
- Treść pakietów — propozycja do akceptacji przez radcę.
- Hosting/domena oraz realna obsługa formularza Audytu 48h (dziś makieta).
