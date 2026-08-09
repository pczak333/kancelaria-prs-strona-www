# Plan: trzy poprawki logo wskazane przez właściciela

## Kontekst

Logo-tarcza (wersja 2 z Canvy) jest zapisane jako edytowalny projekt
`DAHRvQt6Slo` (2000×2000, oba napisy to prawdziwy tekst). Właściciel obejrzał
je i zaznaczył na `Desktop\testy\obraz2_rzeczy_do _poprawy.png` **trzy** rzeczy
do poprawy. Wyraźnie zastrzegł: **nic innego nie zmieniać**.

**Kolor napisu „ZARZĄD" zostaje szary — decyzja właściciela.** Wczoraj z własnej
inicjatywy zmieniłem go na kremowy i zatwierdziłem w Canvie; właściciel tego
nie chce. **Pierwszą operacją jest cofnięcie tej zmiany** — przywrócenie
oryginalnego `#a6a6a6` na elemencie `PBt7G3jLC0h5y1v4-LBLVDxrs5P1kvtj8`.

Pogrubienie „GUARD" (`bold`, ciemniejszy granat `#00214A`) też jest już
zatwierdzone — to zostaje, właściciel je zaakceptował.

## Trzy poprawki

### 1. Przesunąć napis „ZARZĄD" do góry
Element tekstowy `PBt7G3jLC0h5y1v4-LBLVDxrs5P1kvtj8`, obecnie `pos: 691.184,506`
na płótnie 2000×2000. Przesunąć w górę operacją `position_element`
(orientacyjnie o 90–130 px, czyli `top` ≈ 380–415), tak żeby między dolną
krawędzią liter a wstęgą powstał wyraźny odstęp. Wartość dobrać wzrokowo na
miniaturce, **nie ruszając** pozycji poziomej (`left` zostaje 691.184).

### 2. Rozmazana litera „R" w napisie „GUARD"
Przyczyna nie leży w tekście: w obrazie wstęgi (`mediaId=MAHRs_zK2zs`) jest
ciemna plama — usterka generatora — a granatowa litera „R" w nią wpada i
gubi kontur. Pomiar jasności wstęgi wzdłuż napisu: pod „GUA" 214–241, pod
„RD" spada do 114–148.

Ponieważ plama siedzi w grafice wstęgi, a nie w tekście, edycja tekstu jej nie
usunie. Naprawa **po eksporcie**, na gotowym pliku PNG: lokalne odtworzenie
gładkiego, szczotkowanego srebra w miejscu plamy, z zachowaniem samej litery
(litera ma ostrą krawędź i cień, plama jest miękka i rozmyta). Obszar jest
mały i leży na jednolitym pasie, więc rekonstrukcja jest bezpieczna.

Gdyby efekt nie był czysty — zatrzymać się i pokazać właścicielowi, zamiast
mnożyć próby.

### 3. Lekko pogrubić „GUARD"
Element `PBt7G3jLC0h5y1v4-LBZ5cPc2N5Fqk4jq`. `font_weight: bold` jest już
ustawione. Dołożyć niewielkie zwiększenie `font_size` (z 213,3 do ok. 225–230)
— „lekko", bez zmiany proporcji napisu do wstęgi.

## Czego NIE ruszamy

Kompozycji tarczy, kształtu i kolorów wstęgi, kroju pisma, ogonka przy „Ą",
pozycji napisu „GUARD" w poziomie, rozmiaru i **koloru** „ZARZĄD".
Właściciel zastrzegł to wprost.

## Wykonanie

1. `read-design` z `open_transaction: true` → operacje: `format_text`
   (przywrócenie szarego `#a6a6a6` na ZARZĄD), `position_element`
   (ZARZĄD w górę), `format_text` (rozmiar GUARD) → porównać miniaturkę
   → `commit`.
2. `export-design` PNG, `transparent_background: true`, `lossless: true`,
   szerokość 2000 px.
3. Retusz plamy przy „R" na wyeksportowanym pliku.
4. Przyciąć przezroczysty margines do samej tarczy (żeby logo nie zmalało
   w nagłówku względem obecnego — stary plik jest pionowy 601×779, nowy
   kwadratowy).

## Sprawdzenie przed pokazaniem

Na gotowym pliku zmierzyć: przezroczyste tło (są piksele `alpha == 0`),
kolor „ZARZĄD" ≈ `166,166,166` (szary, jak w oryginale — **nie** kremowy),
jasność wstęgi pod „R" zbliżona do tej pod
„GUA" (≥ 200). Zrobić podgląd w realnym rozmiarze nagłówka (wysokość 104 px)
na kremowym tle `#F7F6F1` i sprawdzić, czy „GUARD" czyta się w całości.

Wynik skopiować do `C:\Users\User\Desktop\testy\` (nazwa `LOGO-poprawione.png`
+ podgląd w realnym rozmiarze) — **grafiki pokazywać tylko przez ten folder**,
w rozmowie się właścicielowi nie wyświetlają. Na stronę podmieniać dopiero
po jego akceptacji.
