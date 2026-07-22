---
name: stan-pracy-2026-07-22
description: Na czym skończyliśmy 22.07.2026 (koniec dnia) — stan makiety KRS Guard i otwarte punkty
metadata: 
  node_type: memory
  type: project
  originSessionId: f22145cd-69fd-46c5-98dc-86d2ff0b8522
  modified: 2026-07-22T18:56:49.343Z
---

Punkt zapisu na koniec dnia **22.07.2026**. Użytkownik następnego dnia
(23.07.2026) pracuje na **drugim komputerze** — na starcie zsynchronizować się
z repo (repo wygrywa), patrz [[ciaglosc-sprawdzac-repo-na-starcie]].

**Stan:** makieta strony **KRS Guard** gotowa i dopracowana w `www/`.
Ostatni commit: `3c4fab3`. Podgląd lokalny: w `www/` uruchom
`python -m http.server 8765` → `http://localhost:8765/`.

**Zrobione dziś (kolejno):**
1. Pierwsza makieta strony (statyczny HTML/CSS/JS) — patrz
   [[stack-decyzja-statyczny-html]].
2. Rebranding „Kancelaria PRS" → **KRS Guard** + odchudzenie treści +
   przeorientowanie na ochronę zarządu (lejek Kalkulator → Audyt 48h →
   3 pakiety) — patrz [[marka-krs-guard-profil]].
3. Poprawki strony głównej: usunięto blok atutów, większe logo, nowe hasło
   lejka, usunięto wzmiankę o partnerskiej Kancelarii PRS (stopki/O nas/
   Kontakt), dodano **szczegóły 3 pakietów** (kotwice `#pakiet-299`,
   `#pakiet-us-zus`, `#pakiet-zarzad-safe` na `krs-guard.html`).

Plany w repo: `plany/nowa-strona-makieta.md`, `plany/rebranding-krs-guard.md`,
`plany/poprawki-strony-glownej.md`.

**Otwarte punkty (użytkownik: „na razie wszystko zostaw" — NIE zmieniać bez
jego prośby):**
- Prawdziwe dane kontaktowe (placeholdery `.ph` w `www/kontakt.html`).
- Adres odesłania do Kancelarii PRS — obecnie `kancelaria-prs.vercel.app`,
  do podmiany na docelowy (np. `kancelariaprs.com`).
- Statystyki na stronie głównej (100+ / 4+ / 24h) — zostawić / zmienić /
  usunąć (do decyzji).
- Treść 3 pakietów (art. 299 KSH, US/ZUS, Zarząd SAFE) — propozycja do
  akceptacji przez radcę.
- Hosting/domena oraz realna obsługa formularza Audytu 48h (dziś makieta).

**Uwaga techniczna:** w tej sesji zrzuty ekranu przez rozszerzenie Chrome
się zacinały (timeout) — weryfikacja szła przez `get_page_text`/grep. Na
drugim komputerze może działać normalnie.
