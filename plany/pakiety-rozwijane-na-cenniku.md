# Plan: opisy pakietów na Cennik (rozwijane), odchudzenie „Jak pomagamy"

## Kontekst (po co to robimy)

Podstrona **„Jak pomagamy"** (`www/krs-guard.html`) jest przeładowana —
poza opisem KRS Guard zawiera pełne, długie opisy trzech pakietów
(obraz1 w folderze `testy`). Właściciel chce ją odchudzić: zostawić tylko
informacje o KRS Guard i Kalkulatorze (obraz3), a opisy pakietów zastąpić
krótkim odesłaniem „zobacz nasze pakiety" na Cennik.

Na **Cenniku** (`www/uslugi-cennik.html`) przyciski „Szczegóły" prowadzą
dziś do tamtych opisów na innej podstronie. Docelowo klik ma **rozwinąć
opis w tym samym miejscu**, bez przeskoku na inną podstronę.

Skutek uboczny: przyciski „Szczegóły" istnieją też na stronie głównej
(`www/index.html`) i wskazują na te same, usuwane kotwice. Decyzja
właściciela: mają przenosić na Cennik i **od razu rozwijać** wybrany pakiet.

## Zakres zmian

### 1. `www/krs-guard.html` — usuń opisy pakietów, dodaj odesłanie
- Usuń całą sekcję **„Nasze pakiety"** — nagłówek `<h2>Nasze pakiety</h2>`
  i trzy karty `#pakiet-299`, `#pakiet-us-zus`, `#pakiet-zarzad-safe`
  (linie ~58–79).
- W ich miejsce jeden krótki blok: nagłówek „Nasze pakiety" + zdanie
  („Po diagnozie dobieramy właściwy pakiet obrony.") + przycisk
  **„Zobacz nasze pakiety"** linkujący do `uslugi-cennik.html`
  (klasa `btn`, jak istniejące przyciski).
- **Zostaw bez zmian**: wstęp, „Dla kogo", „Co to oznacza", „Zaczynamy od
  Audytu 48h" oraz dwa dolne kafelki „Poznaj szczegóły KRS Guard" /
  „Nie wiesz od czego zacząć?" (obraz3).

### 2. `www/uslugi-cennik.html` — rozwijane szczegóły pakietów
- Do każdego kafelka `.service-tile` w sekcji „Pakiety obrony" dodaj:
  - stały `id` na `<article>`: `pakiet-299`, `pakiet-us-zus`,
    `pakiet-zarzad-safe` (żeby dało się je otwierać z linku z hashem).
  - ukryty panel `<div class="pkg-details">` z treścią przeniesioną
    z `krs-guard.html` (bloki **Dla kogo / Co robimy / Efekt** dla każdego
    z trzech pakietów — treść 1:1 z obecnych kart).
  - zamień link `<a class="tile-btn" href="krs-guard.html#...">Szczegóły</a>`
    na `<button type="button" class="tile-btn" aria-expanded="false">Szczegóły</button>`.

### 3. `www/main.js` — obsługa rozwijania + auto-otwieranie z hasha
- Nowa funkcja `initPackages()` (wzorowana na istniejącym `initFaq()`):
  - klik w `.tile-btn` (button) przełącza klasę `.open` na nadrzędnym
    `.service-tile`, aktualizuje `aria-expanded` i tekst przycisku
    („Szczegóły" ⇄ „Zwiń").
  - przy wejściu na `uslugi-cennik.html#pakiet-...` (np. ze strony głównej)
    rozwiń odpowiedni pakiet i przewiń go do widoku.
- Dodać wywołanie w istniejącym `DOMContentLoaded`.

### 4. `www/styles.css` — widoczność panelu
- `.pkg-details{display:none; ...}` oraz `.service-tile.open .pkg-details{display:block}`
  (analogicznie do `.faq-a` / `.faq-item.open .faq-a`, linie 474–475).
- Drobny odstęp/oddzielenie panelu; przycisk `.tile-btn` już stylowany.

### 5. `www/index.html` — przekieruj „Szczegóły" na Cennik
- Zmień trzy linki (linie 171, 184, 198) z `krs-guard.html#pakiet-...`
  na `uslugi-cennik.html#pakiet-...`. Dzięki auto-otwieraniu z hasha
  (pkt 3) klik przeniesie na Cennik i rozwinie właściwy pakiet.

## Weryfikacja
- Podgląd: `www/` → `python -m http.server 8765` → `http://localhost:8765/`
  (albo `podglad-strony.bat`).
- „Jak pomagamy": brak długich opisów pakietów; jest przycisk „Zobacz nasze
  pakiety" → prowadzi na Cennik; dolne kafelki (obraz3) na miejscu.
- „Cennik": klik „Szczegóły" rozwija opis pod kafelkiem **bez** zmiany
  podstrony; ponowny klik zwija; adres w pasku się nie zmienia na inną stronę.
- Strona główna: klik „Szczegóły" przenosi na Cennik i rozwija wybrany pakiet.
- Sprawdzić, że nigdzie nie zostały linki do `krs-guard.html#pakiet-...`.

## Po wdrożeniu (zasady projektu)
- Commit + push każdej pliku-zmiany (git workflow z CLAUDE.md).
- Zaktualizować `memory/` (stan prac) i skopiować ten plan do
  `plany/` w repo (ciągłość między komputerami).
