# Plan: poprawa napisu „ZARZĄD" na logo-tarczy (wersja ostra/wektorowa)

> Status: **plan zaakceptowany przez właściciela (07.08.2026), wykonanie NIE
> rozpoczęte.** Właściciel przechodzi na komputer na stałe, żeby pokazać
> plik logo z lokalnego folderu „testy" (niewidoczny z sesji w chmurze) —
> **przed startem wykonania sprawdzić na komputerze, czy ten plik zmienia
> poniższe podejście**, patrz sekcja „Otwarta sprawa" niżej.

## Kontekst

7.08.2026 o 11:31 na logo (tarcza + wstęga „GUARD") zamieniono napis „KRS" na
„ZARZĄD" — ale zrobiono to metodą „wklej tekst na gotowy obrazek", przez co
napis „ZARZĄD" wyszedł rozmyty, z widoczną „poświatą" wokół liter, podczas
gdy reszta grafiki (tarcza, srebrna ramka, wstęga, napis „GUARD") ma ostre,
czyste krawędzie. Właściciel to zauważył i polecił poprawić — **tarcza,
ramka i wstęga zostają dokładnie takie, jak są; poprawiamy wyłącznie sam
napis „ZARZĄD"**, tym razem w sposób, który daje ostry, czytelny,
profesjonalny wynik niezależnie od rozmiaru wyświetlania (czyli „wektorowo").

Sprawdzone bezpośrednio w repozytorium: logo nigdy nie istniało w wersji
wektorowej — jest tylko plikiem obrazka (PNG). Problem z rozmyciem nie
wynika z tego, że plik jest „za mały" (jest wystarczająco duży) — wynika z
techniki, jaką dokładnie ten jeden napis został doklejony.

**Uwaga o przebiegu tej sesji (ważne dla kontynuacji):** wcześniej w tej
samej rozmowie było nieporozumienie — zasugerowano 4 zupełnie nowe koncepcje
logo wygenerowane przez Canva AI (różne tarcze, inny styl). Właściciel to
odrzucił i sprecyzował z frustracją, że chodzi wyłącznie o naprawę jakości
istniejącego napisu „ZARZĄD", NIE o nowy projekt. Plan poniżej uwzględnia tę
poprawkę zakresu — nie wracać do kierunku „cztery nowe koncepcje w Canvie".

**Otwarta sprawa, do wyjaśnienia przed startem:** właściciel wspomniał o
pliku logo w folderze „testy" — niewidocznym z sesji w chmurze (prawdopodobnie
plik lokalny na komputerze, nieprzesłany do repo). Właściciel zdecydował się
przejść na komputer na stałe właśnie po to, żeby ten plik pokazać. **Przed
rozpoczęciem wykonania: zapytać o ten plik / obejrzeć go — jeśli to gotowy
wzór lub wskazówka wizualna, może zmienić rekomendowane podejście poniżej.**
Jeśli okaże się nieistotny dla tego zadania — plan poniżej jest gotowy do
realizacji bez niego.

## Rekomendowane podejście

Zamiast rysować całą tarczę od nowa (ryzykowne — trudno ręcznie odtworzyć
fotorealistyczny połysk i cień 3D, a i tak miał zostać zachowany bez zmian),
podejście precyzyjniejsze:

1. **Wymazać** stary, rozmyty napis „ZARZĄD" z tła tarczy — łatając to
   miejsce gładkim granatowym gradientem odtworzonym z sąsiednich,
   nieuszkodzonych pikseli tarczy (tak, żeby nie było widać śladu po starym
   napisie).
2. **Dołożyć nowy napis „ZARZĄD" jako prawdziwy wektor** (nie wklejony
   obrazek tekstu) — w profesjonalnym, wysokokontrastowym kroju szeryfowym
   (proponowany: **Cinzel**, krój często używany w herbach/marce prawniczej/
   luksusowej, z pełnym polskim „Ą"), w tym samym kremowym kolorze co
   dotychczas (`#f0f0e4`).
3. Złożyć to w plik źródłowy `.svg` (wektor = zawsze ostry, niezależnie od
   rozmiaru) i **wyeksportować z niego gotowy, ostry obrazek PNG** — czyli
   ostateczny plik na stronie nadal będzie zwykłym PNG (żeby nic w kodzie 18
   podstron nie trzeba było ruszać), tylko wyprodukowanym w dużo lepszej
   jakości.
4. Zanim cokolwiek zostanie podmienione na żywej stronie — pokazać
   porównanie „przed/po" (zbliżenie na sam napis) do akceptacji właściciela.

Poprawić tak **wszystkie 4 pliki logo** w `www/assets/` (na stronie widoczny
jest tylko jeden z nich, ale pozostałe trzy mają dokładnie tę samą wadę i
mogą się kiedyś przydać — np. do ulotek), zaczynając od tego widocznego na
stronie jako priorytet.

## Kroki wykonania

1. Pobrać (jednorazowo, z bezpiecznych źródeł: npm/pip) krój pisma Cinzel i
   narzędzie do eksportu wektor→obrazek; sprawdzić od razu, że krój ma
   poprawne polskie „Ą" (inaczej: zapasowy krój Playfair Display).
2. Dla pliku widocznego na stronie (`krs_guard_logo_transparent.png`,
   601×779 px): wymazać stary napis, dołożyć nowy jako wektor, wyeksportować,
   porównać ze starą wersją (ostrość liter + upewnić się, że nic poza samym
   napisem się nie zmieniło).
3. Po akceptacji: podmienić plik na stronie oraz jego identyczną kopię
   (`krs_guard_logo.png`).
4. Tą samą metodą poprawić pozostałe dwa warianty (`zarzadguard_logo_marketing.png`
   — 1803×2337, `krs_guard_logo_tile.png` — 512×512) — **osobno**, bo mają inne
   kadrowanie tarczy niż plik główny (nie są prostymi przeskalowaniami tego
   samego kadru — pozycja/rozmiar napisu trzeba kalibrować dla każdego z
   osobna).
5. Sprawdzić wynik na żywym podglądzie strony (nagłówek na kilku
   podstronach, także w wersji mobilnej, gdzie logo jest mniejsze — CSS:
   `.brand-logo{height:104px;width:auto}`, mobile `height:74px`,
   `www/styles.css` linie 66-71 i 624).

## Pliki do zmiany

- `www/assets/krs_guard_logo_transparent.png` — podmieniony (główny, widoczny na stronie, w 18 plikach HTML)
- `www/assets/krs_guard_logo.png` — podmieniony (identyczna kopia powyższego, dotąd nieużywana w HTML/CSS/JS)
- `www/assets/zarzadguard_logo_marketing.png` — podmieniony (materiał do ulotek, nieużywany dziś na stronie)
- `www/assets/krs_guard_logo_tile.png` — podmieniony (nieużywany dziś na stronie)
- `www/assets/logo-src/*.svg` (nowe) — źródła wektorowe, na przyszłość, gdyby znów trzeba było zmienić napis
- **Bez zmian:** żaden z 18 plików HTML, `styles.css`, `main.js` — na stronie nadal jest zwykły obrazek PNG pod tą samą nazwą

## Ryzyka (żeby nie było niespodzianek)

- Przy bardzo dokładnym wpatrywaniu się w pełnej rozdzielczości może być
  drobno widoczny ślad łatania gradientu — przy realnym rozmiarze
  wyświetlania na stronie (logo w nagłówku ma tam ok. 1 cm wysokości) to
  praktycznie niezauważalne; do sprawdzenia razem na zrzucie ekranu.
- Krój Cinzel to propozycja stylistyczna Claude'a — nie jest to dokładnie
  ten sam krój co „GUARD" na wstędze (nie ma dostępu do jego oryginalnego
  źródła), ale ma pasować stylem. Właściciel zobaczy wynik przed ostateczną
  podmianą na stronie.
- Środowisko wykonawcze w chmurze nie ma zainstalowanych narzędzi
  graficznych (ImageMagick/Inkscape/Pillow/cairosvg) — trzeba je doinstalować
  (potwierdzone: `pip install cairosvg` i `npm view @fontsource/cinzel`
  działają, sieć do pypi.org i registry.npmjs.org jest osiągalna; Google
  Fonts bezpośrednio jest zablokowane w tym środowisku, stąd font przez npm).
  Jeśli wykonanie odbędzie się na komputerze lokalnym zamiast w chmurze,
  dostępność tych narzędzi/sieci może być inna — zweryfikować na miejscu.

## Weryfikacja

Przed podmianą jakiegokolwiek pliku na stronie: pokazać zbliżenie starego i
nowego napisu obok siebie do akceptacji. Po podmianie: sprawdzić nagłówek na
kilku podstronach (komputer + telefon), żeby potwierdzić, że nic się nie
rozjechało w układzie strony.
