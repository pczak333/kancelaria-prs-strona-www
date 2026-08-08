# Plan: nowe logo-tarcza KRS Guard (wersja 2 z Canvy) — poprawki i wdrożenie

## Kontekst

Logo na stronie (`www/assets/krs_guard_logo_transparent.png`, 601×779) to
powiększenie ~5,2× obrazka 116×134 px. Rozmyta jest przez to **cała tarcza** —
srebrna ramka, granatowe tło i wstęga — a nie tylko napis. Wcześniejsza próba
naprawy samego napisu została słusznie odrzucona przez właściciela, bo nie
dotykała prawdziwej przyczyny. Logo trzeba narysować od nowa w dużym rozmiarze.

Na polecenie właściciela zrobiła to Canva. Z czterech propozycji wybrał
**wersję 2** (`https://www.canva.com/d/fpbNelVp05mM372`, kandydatura
`dg-dca47598-e4fc-416c-a555-ffb551daecc1`). Sama tarcza jest dobra: ostra,
symetryczna (3,3% odchylenia kształtu), z metalicznym połyskiem i wstęgą
wychodzącą poza krawędzie — tak jak w oryginale.

Analiza pliku podglądowego wykazała jednak sześć wad. Trzy załatwia właściwy
eksport, trzy dotyczą napisów i wymagają edycji projektu.

### Wady do usunięcia

| # | Wada | Pomiar / dowód | Jak naprawiamy |
|---|------|----------------|----------------|
| 1 | Białe tło zamiast przezroczystego | plik RGB, 0 pikseli przezroczystych; na kremowym tle strony widać biały prostokąt | eksport z `transparent_background: true` |
| 2 | Napis „ZARZĄD" szary, nie kremowy | `165,165,165` zamiast `242,238,227`; kontrast do granatu spadł z **9,82:1 do 4,62:1** | zmiana koloru tekstu na `#F7F2E6` |
| 3 | „GUARD" nieczytelny w realnym rozmiarze | przy 104 px litery zlewają się w „GUAI D" | powiększyć/rozstrzelić napis, odsunąć od krawędzi wstęgi, w razie potrzeby pogrubić |
| 4 | **Ogonek przy „Ą" oderwany od litery** | w powiększeniu 9× widać przerwę; ogonek wisi pośrodku pod A zamiast przy prawej nóżce, ma kształt zawijasa nie haczyka | wpisanie tekstu „ZARZĄD" krojem z prawdziwym polskim `Ą` |
| 5 | Inne proporcje niż obecne logo | stary plik pionowy 601×779 (0,77), nowy kwadratowy 400×400 (1,00) — przy `height:104px; width:auto` nagłówek się przesunie | przyciąć płótno do tarczy przy eksporcie i/lub skorygować CSS |
| 6 | Plik ma tylko 400×400 px | to podgląd kandydatury, nie eksport | eksport ≥1200 px, żeby nie powtórzyć błędu z rozmyciem |

## Wykonanie

### Etap 1 — zapisanie projektu i rozpoznanie
1. `create-design-from-candidate` dla kandydatury wersji 2 → projekt trafia na
   konto Canva właściciela.
2. `read-design` z `open_transaction: true` — sprawdzić, **czy „ZARZĄD" i
   „GUARD" są edytowalnymi elementami tekstowymi**, czy częścią wygenerowanego
   obrazu.
   - **Są tekstem** → Etap 2.
   - **Są wtopione w obraz** → zatrzymać się i wrócić do właściciela: edycja
     napisów w Canvie jest wtedy niemożliwa i trzeba wybrać inną drogę
     (kolejna tura propozycji albo nałożenie napisów krojem Cinzel).
     Nie decydować o tym samodzielnie — właściciel odrzucił już raz metodę
     „doklejania" napisów.

### Etap 2 — poprawki napisów (edit-design)
Operacje w otwartej transakcji, po każdej porównać miniaturkę przed/po:
- `replace_text` na elemencie „ZARZĄD" — wpisać tekst z prawdziwym `Ą`.
- `format_text` — kolor `#F7F2E6`, krój szeryfowy (Cinzel / Trajan, jeśli
  dostępny), rozmiar dopasowany do obecnego.
- „GUARD": zwiększyć rozmiar i odstępy, sprawdzić odsunięcie od krawędzi
  wstęgi; kolor granatowy zostawić, chyba że test w realnym rozmiarze pokaże,
  że nie wystarcza.
- `commit` dopiero po wzrokowym potwierdzeniu, że oba napisy są poprawne.

### Etap 3 — eksport
`get-export-formats` → `export-design` jako PNG:
`transparent_background: true`, `lossless: true`, szerokość **≥1200 px**.
Pobrać plik do scratchpada.

### Etap 4 — test PRZED podmianą (obowiązkowy)
Zanim cokolwiek trafi do `www/assets/`, sprawdzić na pobranym pliku:
- przezroczystość: są piksele o `alpha == 0`, narożniki przezroczyste;
- kolor napisu „ZARZĄD" ≈ `247,242,230`, kontrast do granatu **≥ 9:1**;
- ogonek przy `Ą` doczepiony do litery (podgląd w powiększeniu);
- **próba w realnym rozmiarze**: przeskalować do wysokości 104 px, wkleić na
  kremowe tło `#F7F6F1` i obejrzeć — czy „GUARD" jest czytelny, czy nie ma
  białej obwódki.

Wyniki (obecne logo / nowe, oba w realnym rozmiarze) skopiować do
`C:\Users\User\Desktop\testy\` pod czytelnymi nazwami i pokazać właścicielowi
do akceptacji. **Grafiki pokazywać wyłącznie przez ten folder** — wysyłane
w rozmowie nie wyświetlają mu się.

### Etap 5 — podmiana na stronie (dopiero po akceptacji)
- Podmienić `www/assets/krs_guard_logo_transparent.png` — to jedyny plik logo
  faktycznie używany, linkowany w **18 plikach HTML** (`index.html`,
  `krs-guard.html`, `uslugi-cennik.html`, `narzedzia.html`, `audyt-48h.html`,
  `kontakt.html`, `faq.html`, `polityka-prywatnosci.html`,
  `zarzad-safe-formularz.html`, `blog.html` + 8 artykułów `blog-*.html`).
  Sam HTML **nie wymaga zmian** — ścieżka zostaje ta sama.
- Odświeżyć warianty pochodne z tego samego eksportu:
  `krs_guard_logo.png`, `krs_guard_logo_tile.png` (kwadratowy),
  `zarzadguard_logo_marketing.png` (obecnie nieużywany w HTML).
- Jeśli test z Etapu 4 pokaże przesunięcie nagłówka przez inne proporcje —
  skorygować `.brand-logo` w `www/styles.css` (linia 66, `height:104px`;
  wersja mobilna linia 624, `height:74px`).

### Etap 6 — sprawdzenie w przeglądarce i zapis
- Obejrzeć nagłówek na `index.html` i dwóch innych podstronach, w tym w widoku
  telefonu (logo ma tam 74 px).
- Uwaga na pułapkę z `CLAUDE.md`: po testach **pozamykać wszystkie procesy
  `msedge`**, zanim właściciel sam otworzy podgląd.
- Commit i push (osobno: pliki graficzne, ewentualna korekta CSS).
- Zaktualizować `memory/stan-pracy-2026-08-08.md` i skopiować do `memory/`
  w repo.

## Czego NIE robimy

- Nie ruszamy kompozycji tarczy — jest dobra i zaakceptowana.
- Nie próbujemy „wyostrzać" starego pliku; to ślepa uliczka zamknięta
  w `plany/logo-poprawka-wektorowa-zarzad.md`.
- Nie podmieniamy niczego w `www/assets/` przed akceptacją właściciela.
