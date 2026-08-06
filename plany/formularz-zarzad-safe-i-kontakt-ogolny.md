# Plan (rewizja): uprość formularze Zarząd SAFE + Kontakt ogólny, dodaj numer KRS

## Kontekst

Poprzedni etap (formularz Zarząd SAFE + ogólny formularz na Kontakt, `mailto:` do
kancelarii) został wdrożony, ale test na żywo pokazał realny problem, którego nie dało
się przewidzieć bez sprawdzenia na komputerze bez skonfigurowanego programu pocztowego:
kliknięcie „Otwórz w programie pocztowym” pokazuje systemowe okno Windows „Jak chcesz
otwierać elementy tego typu?" (Chrome/Edge/Outlook/sklep) zamiast po prostu wysłać
wiadomość — bo `mailto:` działa tylko wtedy, gdy na komputerze jest ustawiony domyślny
program pocztowy, a wielu ludzi (szczególnie tych korzystających głównie z poczty w
przeglądarce, np. Gmaila) go nie ma. To realny ślepy zaułek dla części użytkowników, nie
tylko niedogodność.

Właściciel zgłosił też, że układ jest przekombinowany: osobny przycisk „Przygotuj
wiadomość" (który tylko waliduje i pokazuje kolejny panel), a w nim osobny przycisk
„Podgląd treści" (który dopiero pokazuje samą wiadomość) — trzy kliknięcia zamiast
jednego, bez jasnego powodu. Do tego brakuje pola na numer KRS spółki, które jest istotne
dla wyceny — a jego dodanie rozwiązuje też problem z dokumentami: **mając numer KRS,
sprawdzimy podstawowe dane spółki (skład zarządu, uchwały, wpisy) sami w publicznym
rejestrze KRS, bez konieczności proszenia klienta o przesyłanie dokumentów na tym etapie**.
Dokumenty, których nie ma w jawnym rejestrze (np. umowa spółki), można domówić już w
bezpośredniej korespondencji po pierwszym kontakcie — nie trzeba tego rozwiązywać w tym
krótkim formularzu.

## Rozwiązanie

**Jeden przycisk zamiast trzech kroków.** Formularz ma teraz tylko przycisk „Wyślij
zapytanie" (Zarząd SAFE) / „Wyślij" (formularz ogólny — bez zmian nazwy). Po kliknięciu:
walidacja jak dotychczas (błędy przy polach + podsumowanie na górze), a jeśli wszystko
poprawne — **od razu, w tym samym miejscu, pojawia się gotowa treść wiadomości** (bez
dodatkowego klikania „podgląd"). Nie ma już osobnego „panelu sukcesu" oddzielonego od
treści ani modala z podglądem — to, co wcześniej było w modalu, staje się głównym,
widocznym wynikiem.

**Dwie równorzędne opcje wysyłki, obie widoczne od razu, żadna nie jest jedynym wyjściem:**
- **„Skopiuj treść”** (nowość — Clipboard API) — kopiuje gotowy tekst (adresat, temat,
  treść) do schowka jednym kliknięciem, z krótkim potwierdzeniem „Skopiowano!”. Nie zależy
  od żadnej konfiguracji systemu — działa zawsze, niezależnie od tego, czy ktoś ma Gmaila
  w przeglądarce, Outlooka, czy cokolwiek innego. To robi się **główną, zalecaną ścieżką**
  (przycisk `.btn`, wyraźny).
- **„Otwórz w programie pocztowym”** (istniejący mechanizm `mailto:`) — zostaje jako
  dodatkowa wygoda dla osób, które mają skonfigurowany program pocztowy, ale wyraźnie
  opisana jako opcjonalna, nie jako główna ścieżka (przycisk `.btn.ghost`, drugorzędny).

Treść wiadomości jest zawsze pokazana wprost na stronie (czytelny blok tekstu), więc
nawet jeśli oba przyciski zawiodą, użytkownik i tak widzi gotowy tekst do ręcznego
skopiowania — żadnego ślepego zaułka.

**Nowe pole: „Numer KRS spółki”** (w formularzu Zarząd SAFE, nie w ogólnym formularzu
kontaktowym — tam nie ma to zastosowania). Opcjonalne (nie blokuje wysłania), ale
umieszczone przy „Nazwa spółki” z krótką podpowiedzią „10 cyfr — znajdziesz go np. w
KRS lub w umowie spółki", placeholder „np. 0000123456". Trafia do treści wiadomości
razem z pozostałymi danymi.

**Usuwam listę „co przygotować" (uchwała/odpis KRS/umowa spółki)** — była myląca, bo
sugerowała przesyłanie załączników, których formularz i tak nie potrafi przyjąć. Zastępuję
ją jednym krótkim zdaniem tłumaczącym, po co jest numer KRS: „Numer KRS pozwala nam od
razu sprawdzić podstawowe dane spółki. O dodatkowe dokumenty (np. umowę spółki) poprosimy,
jeśli będą potrzebne — już w bezpośredniej rozmowie.”

**Uproszczona notatka** pod formularzem — zamiast tłumaczenia mechaniki `mailto:` (co
okazało się mylące), krótkie: „To prosty formularz bez własnego serwera. Po kliknięciu
„Wyślij zapytanie" zobaczysz gotową treść — skopiuj ją do swojej poczty albo spróbuj
otworzyć program pocztowy, jeśli masz go na tym komputerze skonfigurowany.”

## Zmiany techniczne (ta sama filozofia co poprzednio: wspólny silnik, bez duplikacji)

- **`www/main.js`** — uproszczenie wspólnego silnika formularzy: `initMailForm(config)`
  traci `previewBtnId`/`modalId` (modal znika całkowicie z obu stron), zyskuje
  `copyBtnId` i `resultBoxId` (blok z gotową treścią, widoczny od razu po poprawnej
  walidacji, nie osobny „panel sukcesu"). Kopiowanie przez `navigator.clipboard.writeText()`
  z krótkim komunikatem zwrotnym na przycisku (np. zmiana tekstu na „Skopiowano!” na 1,5 s).
  Do configu formularza Zarząd SAFE dochodzi pole `zs_krs` (opcjonalne, bez walidacji
  formatu — tylko podpowiedź w interfejsie, żeby nie utrudniać wysyłki komuś, kto nie
  pamięta numeru na pamięć) i trafia do treści maila.
- **`www/zarzad-safe-formularz.html`** — usunięcie modala (`#zsMailModal`), usunięcie
  `#zsPreviewBtn`, przycisk `#zsSubmit` zmienia etykietę na „Wyślij zapytanie”, nowe pole
  `#zs_krs`, nowy blok wyniku (dawny `#zsSuccess`, teraz pokazuje też treść wiadomości
  bezpośrednio, plus przyciski „Skopiuj treść” / „Otwórz w programie pocztowym”), usunięcie
  listy „co przygotować”, skrócona notatka.
- **`www/kontakt.html`** — analogiczne uproszczenie formularza ogólnego (usunięcie
  `#ctMailModal`, `#ctPreviewBtn`, ten sam wzorzec wyniku z „Skopiuj treść”), bez nowych pól
  (numer KRS dotyczy tylko Zarząd SAFE).
- **`www/styles.css`** — modal (`.mailmodal-*`) można usunąć jako nieużywany, albo
  zostawić nieużywany (nie szkodzi, ale sprzątam, skoro i tak edytuję plik — usuwam, żeby
  nie zostawiać martwego kodu). Reszta klas formularzowych (`.field`, `.form-row`, `.note`,
  `.form-errorsummary`, `.btn`/`.btn.ghost`) zostaje, dochodzi mały styl na blok wyniku z
  widoczną treścią (można wykorzystać istniejącą `.mailmodal-box` typografię — przenieść ją
  pod nową nazwę `.msg-box`, żeby nie zależeć od skasowanych klas modala).

## Weryfikacja

Ręcznie w przeglądarce (Pana Edge), na obu formularzach: puste pole → błędy; wypełnić
poprawnie (w Zarząd SAFE też wpisać numer KRS) → od razu widoczna treść wiadomości bez
dodatkowego klikania; „Skopiuj treść” → wkleić gdziekolwiek (np. w notatnik) i sprawdzić,
że treść jest kompletna i poprawna; „Otwórz w programie pocztowym” → sprawdzić, że nadal
działa tam, gdzie jest skonfigurowany program pocztowy (u Pana pewnie pokaże to samo okno
wyboru co poprzednio — to oczekiwane, bo to ograniczenie Windows, nie błąd formularza,
ale teraz nie jest to już jedyna droga). Szybki rzut oka na `index.html`/`faq.html`, że
nic się nie zepsuło (współdzielony `main.js`/`styles.css`).
