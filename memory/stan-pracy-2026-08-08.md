---
name: stan-pracy-2026-08-08
description: "Aktualny stan prac (08.08.2026) — logo tarczy: ustalono, że plik na stronie to ~5x powiększenie miniaturki (rozmyta CAŁA tarcza, nie tylko napis), więc łatanie napisu było ślepą uliczką; Canva wygenerowała 4 ostre wersje, właściciel ma wybrać. Zawiera też wniosek o diagnozowaniu przed pracą i o tym, że obrazki trzeba kopiować na pulpit, bo nie wyświetlają się w rozmowie"
metadata: 
  node_type: memory
  type: project
  originSessionId: 7b55432a-43e4-49a0-8486-1d8b03e937e1
  modified: 2026-08-08T11:43:31.457Z
---

Bieżący punkt zapisu — **08.08.2026**. Zastępuje [[stan-pracy-2026-08-06]] jako
najnowszy. Na starcie sesji zsynchronizować się z repo (repo wygrywa), patrz
[[ciaglosc-sprawdzac-repo-na-starcie]].

**Temat dnia: poprawa logo-tarczy KRS Guard.** Sesja zamknięta w połowie —
właściciel musiał skończyć. Czeka na jego decyzję (wybór wersji).

## Kluczowe ustalenie: przyczyną rozmycia jest rozdzielczość źródła

`www/assets/krs_guard_logo_transparent.png` ma 601×779 px, ale zmierzone:
to **powiększenie ~5,2× obrazka 116×134 px** (średnia różnica względem
`upscale(116px)` = 62/255; ostrość srebrnej ramki tylko 6,81). Dlatego
rozmyta jest **cała tarcza** — srebrna ramka, niebieskie tło, wstęga —
a nie tylko napis. Tego **nie da się wyostrzyć**; logo trzeba narysować
od nowa w dużym rozmiarze.

Oryginał 116×134 z commita `cfdd27d` jest bit w bit identyczny z plikami
w `Desktop\testy\krs_guard_*.png` (jeszcze z napisem „KRS").

## Ślepa uliczka — NIE powtarzać

Plan `plany/logo-poprawka-wektorowa-zarzad.md` (z 07.08) zakładał, że wadliwy
jest **tylko napis „ZARZĄD"** i wystarczy go wymazać i dołożyć wektorowo.
Wykonałem to w całości (inpainting OpenCV + napis Cinzel 700 zamieniony na
krzywe, dopasowany co do piksela: wysokość liter 59 px, szerokość 383 px,
lewa krawędź x=107, linia bazowa y=255). Napis rzeczywiście wyszedł ostry,
**ale właściciel odrzucił wynik** — bo reszta tarczy pozostała rozmyta, a o to
mu chodziło od początku. Skrypty zostały w scratchpadzie sesji (`build_logo.py`,
`make_text_svg.py`), ale **ta droga jest zamknięta**.

## Co zrobiono: 4 nowe wersje z Canvy

Właściciel polecił wprost: „Nie poprawiaj logo tylko używając Canvy zaprojektuj
nowe takie same". Canva (`generate-design`, `design_type: "logo"`) z
drobiazgowym opisem istniejącej tarczy zwróciła **4 kandydatury — wszystkie
ostre i wszystkie z poprawnym polskim „Ą"**. Pliki (400×400 PNG) leżą w
`C:\Users\User\Desktop\testy\` jako `WERSJA-1.png` … `WERSJA-4.png` +
zestawienie `canva-wybor.png` (obecne rozmyte logo obok czterech nowych).

Adresy kandydatur w Canvie (mogą wygasnąć — wtedy wygenerować ponownie,
to tanie):
- 1 — `https://www.canva.com/d/M3s1fuvoCqkLfJO`
- 2 — `https://www.canva.com/d/fpbNelVp05mM372`  ← **rekomendowana**
- 3 — `https://www.canva.com/d/Tn24ER-cLHp_oa7`
- 4 — `https://www.canva.com/d/ANIk01MYGIx-k4M`

**Rekomendacja: wersja 2** — jako jedyna ma wstęgę wychodzącą poza krawędzie
tarczy i z podwiniętymi końcami, tak jak oryginał. W 1 i 3 wstęga jest
schowana w obrysie tarczy; 4 ma bardziej kanciasty, płaski wierzch.

## Następny krok (po powrocie właściciela)

1. Odebrać wybór wersji (albo prośbę o poprawki: jasność granatu, wielkość
   napisów, kolejna tura propozycji).
2. `create-design-from-candidate` → `get-export-formats` → `export-design`
   jako PNG, duży rozmiar, `transparent_background: true`.
3. Podmienić `www/assets/krs_guard_logo_transparent.png` (widoczny na stronie,
   linkowany w 18 plikach HTML) + `krs_guard_logo.png`, a osobno warianty
   `zarzadguard_logo_marketing.png` i `krs_guard_logo_tile.png`.
4. Sprawdzić nagłówek na kilku podstronach, też mobilnie
   (`.brand-logo{height:104px}`, mobile `74px` — `www/styles.css`).
5. Zaktualizować `plany/logo-poprawka-wektorowa-zarzad.md` — jego założenie
   („poprawiamy wyłącznie napis") jest już nieaktualne.

## Wnioski robocze z tej sesji (ważne)

- **Najpierw zmierzyć, potem naprawiać.** Straciłem sporo czasu i
  zirytowałem właściciela, bo przyjąłem diagnozę z planu („wadliwy jest tylko
  napis") zamiast sprawdzić plik. Jedno porównanie z upscalem miniaturki
  rozstrzygnęłoby sprawę w minutę. Przy każdym zgłoszeniu „to wygląda źle"
  najpierw zmierzyć obiektywnie, co jest nie tak.
- **Obrazki wysyłane w rozmowie nie wyświetlały się właścicielowi** — dwa razy
  napisał „nie widzę". Zadziałało dopiero **skopiowanie plików do
  `C:\Users\User\Desktop\testy\`** z czytelnymi nazwami, do otwarcia dwuklikiem.
  Tak pokazywać mu wszystkie grafiki.
- **Canva sprawdziła się do odtworzenia istniejącego logo**, wbrew notatce z
  07.08 (tam odrzucono Canvę, ale dlatego, że poproszono ją o *nowe koncepcje*).
  Różnica jest w promptcie: drobiazgowy opis istniejącej kompozycji zamiast
  „zaproponuj logo".
- Miniaturki Canvy (`design.canva.ai/...`) pobiera się curlem **tylko z
  nagłówkiem User-Agent przeglądarki** — bez niego wraca strona HTML zamiast PNG.
- `Desktop\testy\obraz1.png` to zrzut ekranu nagłówka strony sprzed zmiany
  („KRS Guard · OCHRONA ZARZĄDU", w tarczy jeszcze „KRS") — nie wzór do
  odtworzenia, tylko ilustracja problemu.
