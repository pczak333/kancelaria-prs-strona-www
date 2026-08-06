# Plan: prawdziwy sposób kontaktu dla Zarząd SAFE + formularz ogólny

## Kontekst

Przycisk „Zapytaj o wycenę Zarząd SAFE" (dodany w poprzednim kroku) prowadzi na stronę
Kontakt, ale tam użytkownik nie ma jak nic napisać — jest tylko karta z placeholderowymi
danymi (telefon, e-mail — nieklikalne) i lista linków do innych stron. Właściciel to
trafnie nazwał: strona nie umożliwia bezpośredniej wysyłki wiadomości.

Dodatkowy problem: pakiet Zarząd SAFE wymaga wyceny na podstawie dokumentów (uchwały,
odpis z KRS) — sam opis pakietu to mówi wprost. Zwykły formularz kontaktowy tego nie
załatwia.

Właściciel zaproponował dwa oddzielne rozwiązania i poprosił o przemyślany plan:
1. **krótki, dedykowany formularz** dla zapytań o Zarząd SAFE,
2. **ogólny formularz kontaktowy** (wzorowany na przesłanym przykładzie innej kancelarii —
   Imię, Nazwisko, Email, Telefon, Temat, Treść wiadomości) dla pozostałych spraw.

Strona jest w pełni statyczna (bez serwera) — każdy formularz musi działać w tym samym
duchu, co już istniejący formularz Audytu 48h: bez prawdziwej wysyłki na serwer.

**Dwie świadome poprawki względem wzorca Audytu 48h** (obie wynikają z zasady, którą
właściciel już raz ustalił przy kalkulatorze ryzyka — uczciwie opisywać, co kod naprawdę
robi, zamiast obiecywać funkcję, której nie ma):

- Formularz Audytu wysyła testowego maila **do samego użytkownika** (symulacja). Te dwa
  nowe formularze będą wysyłać mail **naprawdę do kancelarii** (na razie na adres-
  placeholder, tak jak reszta strony) — to nie atrapa, to działający mechanizm `mailto:`,
  który zacznie realnie działać, gdy tylko właściciel wpisze prawdziwy e-mail. Różnica:
  Audyt to złożony kwestionariusz jawnie czekający na przyszły system; te dwa formularze
  mają jeden cel — żeby dało się już dziś napisać do kancelarii.
- **Bez pola „załącz plik".** Mechanizm `mailto:` fizycznie nie potrafi dołączać
  załączników (to ograniczenie przeglądarek). Formularz Audytu ma pole pliku, ale cały ten
  ekran jest jawnie oznaczony „tryb testowy" — tu, gdzie reszta formularza ma NAPRAWDĘ
  zadziałać, dekoracyjne pole „załącz plik" byłoby myląco nieuczciwe. Zamiast tego: jasna
  instrukcja tekstowa, jakie dokumenty przygotować i dołączyć ręcznie w oknie maila, które
  się otworzy.
- Z tego samego powodu pomijam captchę z przesłanego wzoru — bez serwera weryfikacja
  captchy i tak byłaby czystą dekoracją.

## Rozwiązanie

**Nowa strona `www/zarzad-safe-formularz.html`** — krótki, jednokrokowy formularz (bez
wizarda jak w Audycie), z tym samym nagłówkiem/menu/stopką co inne podstrony. Pola: imię
i nazwisko, e-mail, telefon (opcjonalnie), nazwa spółki (opcjonalnie), krótki opis
sytuacji, checkbox zgody z linkiem do polityki prywatności, lista „co przygotować"
(uchwała, odpis z KRS, umowa spółki), przycisk „Przygotuj wiadomość" → podgląd treści →
„Otwórz w programie pocztowym" (`mailto:` do `kontakt@[domena].pl`, ten sam placeholder co
w reszcie serwisu). Link powrotny do `uslugi-cennik.html#pakiet-zarzad-safe` — kafelek
Zarząd SAFE rozwinie się automatycznie (mechanizm już istnieje w `main.js` linie 64-66,
czyta `location.hash`). Strona **nie** trafia do głównego menu — dokładnie tak jak istniejący
`audyt-48h-form.html` nie jest w menu, tylko `audyt-48h.html` tam jest.

**`www/uslugi-cennik.html`** — przycisk „Zapytaj o wycenę Zarząd SAFE →" dostaje
`href="zarzad-safe-formularz.html"` zamiast `kontakt.html`.

**`www/kontakt.html`** — karta „Dane kontaktowe" zostaje bez zmian. Karta „Jak zacząć
współpracę?" zostaje skrócona do zwięzłej listy 4 linków (bez dwóch dodatkowych,
dublujących się przycisków pod spodem). Poniżej całej siatki — nowa karta pełnej
szerokości „Piszesz w innej sprawie?" z formularzem ogólnym (Imię, Nazwisko, Email,
Telefon, Temat, Treść wiadomości — dokładnie jak w przesłanym wzorze), tym samym
mechanizmem mailto co formularz Zarząd SAFE. Dzięki skróceniu istniejącej karty strona nie
staje się dużo cięższa mimo nowego formularza — ważne, bo właściciel już wcześniej zwracał
uwagę na przeładowanie innych podstron.

**`www/styles.css`** — jeden nowy blok klas formularzowych (pola, błędy, zgoda, panel
sukcesu, modal podglądu maila), dodany raz, używany przez oba nowe formularze. Zweryfikowane:
wszystkie potrzebne zmienne (`--brand`, `--line`, `--ink`, `--ink2`, `--muted`, `--bg`,
`--shadow`) i klasy (`.card`, `.btn`/`.btn.ghost`, `.note`, `.list`, `.backlink`,
`.ph`) już istnieją i zostaną ponownie użyte, nie duplikowane.

**`www/main.js`** — jeden wspólny „silnik" prostego formularza mailowego (walidacja pól,
budowa treści maila, modal podglądu, `mailto:`), wywoływany osobno dla każdego z dwóch
formularzy z inną konfiguracją pól/tematu/treści. Dopisywany do istniejącego jednego bloku
`DOMContentLoaded` (main.js linia 85), z tymi samymi zabezpieczeniami `if (!el) return`, co
reszta pliku — więc na innych stronach nic się nie wykona. **`audyt-48h-form.html` zostaje
całkowicie nietknięty** — to świadomie osobny, izolowany wizard z własnym inline
CSS/JS (ustalone w poprzedniej sesji), nie ma powodu tego zmieniać.

### Treść e-maili (obie w prostym, uprzejmym tonie, bez żargonu)

**Zarząd SAFE** — temat: `Zarząd SAFE — zapytanie o wycenę ({imię i nazwisko})`; treść:
dane kontaktowe + opis sytuacji, zamykająca notatka że wiadomość powstała z formularza na
stronie.

**Formularz ogólny** — temat: `Wiadomość ze strony KRS Guard — {temat}`; treść: treść
wiadomości + dane kontaktowe, ta sama zamykająca notatka.

Obie strony dostają widoczny `.note` z uczciwym wyjaśnieniem: „to prosty formularz bez
własnego serwera — mail trafi do nas dopiero, gdy klikniesz Wyślij w swoim programie
pocztowym; dokumenty dołączasz ręcznie w tym oknie".

## Kolejność wdrożenia

1. `styles.css` — dodać nowy blok klas (bez widocznego efektu, bo jeszcze nieużywane — bezpieczny krok).
2. `main.js` — dodać wspólny silnik formularza + dwie funkcje inicjujące (zabezpieczone `if (!el) return` — bezpieczny krok, zero wpływu na inne strony).
3. Utworzyć `www/zarzad-safe-formularz.html`.
4. `uslugi-cennik.html` — podmienić link przycisku.
5. `kontakt.html` — skrócić prawą kartę, dodać nową kartę z formularzem ogólnym.
6. Test ręczny w przeglądarce (obu formularzy + szybki przegląd stron współdzielących `styles.css`/`main.js`, żeby nic nie zepsuć).

## Weryfikacja (brak testów automatycznych, brak backendu)

**Zarząd SAFE:** Cennik → rozwiń kafelek → „Zapytaj o wycenę" → sprawdzić przekierowanie;
kliknąć „Przygotuj wiadomość" na pustym formularzu (błędy widoczne, nic się nie wysyła);
błędny e-mail bez `@` (komunikat); wypełnić poprawnie ale bez zgody (błąd zgody); zaznaczyć
zgodę → panel sukcesu; „Podgląd treści" (poprawne polskie znaki, poprawny adresat/temat);
„Otwórz w programie pocztowym" (próba otwarcia domyślnego klienta poczty); test mobilny
(pola się nie rozjeżdżają); „← Wróć do cennika" → kafelek Zarząd SAFE rozwinięty
automatycznie.

**Formularz ogólny na Kontakt:** te same kroki dla pól Imię/Nazwisko/Email/Telefon/Temat/
Treść; sprawdzić że karta „Dane kontaktowe" wygląda jak wcześniej, a skrócona karta „Jak
zacząć" linkuje poprawnie (w tym nowy link do `zarzad-safe-formularz.html`).

**Regresja** (bo `styles.css`/`main.js` są współdzielone): szybki przegląd `index.html`,
`faq.html`, `uslugi-cennik.html` — podświetlanie menu, rozwijanie FAQ i pakietów działają
jak wcześniej; menu-hamburger na telefonie; konsola przeglądarki bez błędów JS na każdej
dotkniętej stronie.

Uwaga do dalszej pracy: Browser pane w tej sesji był dziś niestabilny (znany, wcześniej
udokumentowany problem) — weryfikację najlepiej zrobić przez lokalny podgląd w Edge
(skrót na pulpicie), tak jak Pan zwykle testuje.
