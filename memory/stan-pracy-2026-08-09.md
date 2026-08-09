---
name: stan-pracy-2026-08-09
description: "Aktualny stan prac (09.08.2026) — nowe logo-tarcza z Canvy wdrożone, ZMIANA NAZWY MARKI na „Zarząd Guard\" w całym www/, menu w nagłówku w jednej linii. Zawiera opis techniki, która wreszcie zadziałała (kolor kontrolny do maski liter, dwa renderingi do przezroczystości) oraz ostrą lekcję o zgadywaniu i przedwczesnym ogłaszaniu sukcesu"
metadata: 
  node_type: memory
  type: project
  originSessionId: 7b55432a-43e4-49a0-8486-1d8b03e937e1
  modified: 2026-08-09T08:55:32.336Z
---

Bieżący punkt zapisu — **09.08.2026**. Zastępuje [[stan-pracy-2026-08-08]].

## Zrobione: nowe logo-tarcza wdrożone na stronę

Projekt Canva: **`DAHRvQt6Slo`** („Classic Heraldic Shield with Silver Border",
2000×2000) — na koncie właściciela. Powstał z wersji 2 wybranej z czterech
propozycji. Oba napisy są w nim **edytowalnym tekstem**:
- `ZARZĄD` — element `PBt7G3jLC0h5y1v4-LBLVDxrs5P1kvtj8`, `#a6a6a6` (szary),
  `pos: left=506, top=560`, fontSize 226,84
- `GUARD` — element `PBt7G3jLC0h5y1v4-LBZ5cPc2N5Fqk4jq`, `#00214a`, bold,
  fontSize 228

Poprawki na życzenie właściciela: napis ZARZĄD przesunięty w górę, GUARD
pogrubiony i lekko powiększony, usunięta ciemna plama w grafice wstęgi.

W repo: `www/assets/krs_guard_logo_transparent.png` (754×800, jedyny używany —
linkowany w 18 plikach HTML), plus odświeżone `krs_guard_logo.png` i
`krs_guard_logo_tile.png` (512×512). HTML bez zmian. W nagłówku logo jest
o 18 px szersze niż poprzednio (98 px zamiast 80 przy wysokości 104).

## Zrobione: ZMIANA NAZWY MARKI na „Zarząd Guard"

Druga zmiana nazwy w tym projekcie: „Kancelaria PRS" → „KRS Guard"
(22.07.2026) → **„Zarząd Guard" (09.08.2026)**. Powód: nowe logo ma na
tarczy napis „ZARZĄD", a teksty strony mówiły „KRS Guard" — właściciel
wychwycił niespójność na zrzucie ekranu.

Objęła **całe `www/`**: nagłówki, stopki, tytuły stron (`<title>`), opisy
meta, teksty. Stan po zmianie: **121 wystąpień „Zarząd Guard", zero
„KRS Guard"**.

**Świadomie NIE zmienione** (mylące przy następnej sesji — nie „poprawiać"):
nazwa repo `kancelaria-prs-strona-www`, nazwy plików
(`krs_guard_logo_transparent.png`, `krs-guard.html`), plik skrótu
`Podglad strony KRS Guard.lnk`. Skrót „KRS" zostaje wszędzie tam, gdzie
znaczy Krajowy Rejestr Sądowy — to nie nazwa marki.

**Sprostowanie lokalizacji skrótu do podglądu:** wcześniejsze notatki (i
`CLAUDE.md`) mówiły „skrót na pulpicie". Nieprawda — sprawdzone 09.08.2026:
na pulpicie go nie ma, leży w **katalogu głównym repo**. Od 09.08.2026 jest
zacommitowany, więc jedzie na drugi komputer. Zadziała tam jednak tylko, gdy
repo leży w `C:\Users\User\Desktop\` — argument skrótu ma ścieżkę
bezwzględną do `www/index.html`.

**Kalkulatora to NIE objęło** — osobne repo, osobne wdrożenie; nie
sprawdzano, jaką nazwą posługuje się on sam. Nie zakładać, że jest spójny.

## Zrobione: menu w nagłówku w jednej linii

Pozycja „Blog" spadała do drugiego rzędu. Pomiar: pasek potrzebował 758 px,
miał 727 — brakowało 31 px. Odzyskane wyłącznie na odstępach, **bez
zmniejszania logo ani nazwy marki** (`.nav` gap 14→10 px, `.nav a` padding
6→4 px, `.header-inner` gap 18→14 px, `.nav` margin-left 12→8 px) — razem
60 px. Dodatkowo `flex-wrap: nowrap`.

Próg menu mobilnego podniesiony **980 → 1180 px**: poniżej 1180 px nie ma
miejsca na 8 pozycji, więc menu chowa się pod „hamburgerem" zamiast łamać
na dwa rzędy. Kluczowa obserwacja: kontener ma `max-width:1180px` +
`padding:0 18px`, czyli **stałe 1144 px na każdym szerszym ekranie** —
wystarczy dopasować się raz, działa na wszystkich rozdzielczościach.

Sprawdzone pomiarem (`getBoundingClientRect` przez JS, nie na oko):
1280 px i 1181 px → jeden rząd, bez wychodzenia poza nagłówek i bez
poziomego przewijania; 1100 px → hamburger.

## Techniki, które zadziałały (zapamiętać na przyszłość)

Dwa problemy, których nie dało się rozwiązać „na oko", i ich rozwiązania:

1. **Plama na wstędze miała dokładnie ten sam granat co litery** (`#00214a`),
   więc każda maska kolorystyczna albo zostawiała plamę, albo zamalowywała
   literę na kluchę. Rozwiązanie: **przemalować napis w Canvie na kolor
   kontrolny** (`#FF00FF`), wyeksportować, zbudować z tego maskę liter co do
   piksela, przywrócić kolor. Potem łatać wyłącznie `plama AND NOT litera`.
   Dodatkowo pomaga eksport z `opacity: 0` na napisie — daje czystą wstęgę
   bez liter do inpaintingu.

2. **Przezroczystość** — eksport PNG z `transparent_background: true` jest
   w Canvie **płatny (plan Free tego nie ma)**. Progowanie jasności zawodzi:
   srebrne końcówki wstęgi robiły się półprzezroczyste, a zalewanie „dziur"
   dawało białe plamy w prześwitach między wstęgą a tarczą. Rozwiązanie:
   **dwa renderingi — na białym i na zielonym tle** (wstawić `insert_shape`
   na całą stronę + `layer_element: back`, potem `delete_element`).
   Z różnicy kanałów R i B liczy się dokładna alfa:
   `α = 1 − (C_biały − C_zielony)/255`, kolor: `F = (C_biały − (1−α)·255)/α`.
   Zero progów, zero zgadywania.

**Pułapka `position_element`:** parametry `left`/`top` w tym MCP działają
zamienione — podanie `left=X, top=Y` ustawia `top=X, left=Y`. Sprawdzać
wynik w zwróconym `document`.

Miniaturki i eksporty Canvy pobiera się curlem **tylko z nagłówkiem
User-Agent przeglądarki**.

## Lekcja (ważniejsza niż samo logo)

Temat ciągnął się dwa dni i mocno zirytował właściciela („powiedz szczerze
czy jesteś w stanie rozwiązać problem"). Powody były po mojej stronie:

- **Sięgałem po najszybciej wyglądające obejście zamiast po metodę pewną.**
  Pięć niepewnych podejść zajęło wielokrotnie więcej niż jedno porządne.
  Przy zadaniu typu „to wygląda źle" opłaca się od razu zbudować pomiar/
  procedurę dającą jednoznaczny wynik.
- **Ogłaszałem sukces na podstawie pomniejszonych podglądów.** Dwukrotnie
  napisałem, że jest zrobione, gdy nie było — właściciel to wychwycił.
  **Zasada: przed każdym „gotowe" otworzyć finalny plik w pełnej
  rozdzielczości dokładnie w miejscu, o które pytał użytkownik.**
- **Diagnozę brałem z notatki zamiast z pliku** (08.08: zakładałem, że
  rozmyty jest tylko napis — patrz [[stan-pracy-2026-08-08]]).

Właściciel skutecznie zaznacza usterki na zrzutach ekranu (`obraz2_rzeczy_do
_poprawy.png`) — to najszybszy kanał informacji zwrotnej, warto o niego prosić.
Grafiki nadal pokazywać przez `C:\Users\User\Desktop\testy\` (w rozmowie mu
się nie wyświetlają). Właściciel założył też katalog `logo/` w repo i wrzuca
tam warianty — **od 09.08.2026 jest już śledzony przez gita** (razem
z `Dane_wejściowe/`, które wcześniej istniało tylko lokalnie i nie trafiłoby
na drugi komputer).

## Otwarte punkty

- `www/assets/zarzadguard_logo_marketing.png` (1803×2337) to **stara, rozmyta**
  wersja — nieużywana w HTML, ale jeśli kiedyś pójdzie do druku/social mediów,
  wygenerować ją na nowo z projektu `DAHRvQt6Slo`.
- Ogonek przy „Ą" ma nietypowy kształt (duży zawijas w lewo, jak przy „ç") —
  to wina kroju użytego przez Canvę, a `format_text` w MCP **nie pozwala
  zmienić kroju pisma**. Właściciel widział i nie zgłosił zastrzeżeń; zmiana
  wymagałaby ręcznej edycji w Canvie.
- Pozostałe, znane wcześniej: prawdziwe dane kontaktowe, dostawca formularzy
  z RODO/DPA, hosting/domena, usunięcie notek „wersja robocza".
