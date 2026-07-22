# Plan: Rebranding na „KRS Guard" + odchudzenie treści

## Kontekst — po co to robimy

Makieta strony jest już zbudowana w `www/` (statyczny HTML/CSS/JS, sprawdzona
w przeglądarce). Po jej obejrzeniu pojawiły się dwie decyzje zmieniające
kierunek:

1. **Zmiana nazwy/marki.** „Kancelaria PRS" to marka strony syna użytkownika
   (`https://kancelaria-prs.vercel.app/`, „Prosta Rejestracja Spółek") —
   skupionej na rejestracji spółek (KRS/PRS/S24), BEZ tematu KRS Guard. Nasza
   strona to **osobny projekt o profilu KRS Guard** (ochrona członków
   zarządu), którego rolą jest zwiększenie zasięgu; docelowo wszystkie
   zapytania obsługuje kancelaria syna. Nowa nazwa/marka strony: **„KRS
   Guard"** (podtytuł „Ochrona zarządu"), z wykorzystaniem gotowego logo-tarczy.

2. **Treść jest przeładowana** — użytkownik wprost: „dostałem bólu głowy
   czytając to wszystko". Trzeba **znacząco uprościć** teksty na wszystkich
   podstronach, **nie zmieniając sensu** (te same fakty, ceny, terminy
   prawne — tylko krócej i czytelniej).

**Decyzje ustalone z użytkownikiem:**
- Nazwa: **KRS Guard**.
- Zakres: **skupiamy stronę na KRS Guard**; usługi rejestrowe (KRS/PRS/S24)
  tylko krótko sygnalizujemy, z ewentualnym odesłaniem do Kancelarii PRS
  (to teren strony syna — nie powielamy go).
- Uproszczenie treści: użyć skilli i subagentów (życzenie użytkownika).

## Efekt docelowy

Strona-marka **KRS Guard**, skupiona na ochronie zarządu, zbudowana wokół
czytelnego lejka:

**Kalkulator ryzyka (darmowy) → Audyt 48h (płatne wejście/diagnoza) → pakiety
(właściwa obrona).**

Kluczowe: **głównym efektem odchudzenia jest samo usunięcie części
rejestrowej** (4 karty usług + fragmenty o rejestracji). Dlatego **opisów
KRS Guard NIE tniemy agresywnie** — mają zostać jasne i konkretne, żeby klient
dokładnie wiedział, co dostaje. Skracamy tylko tam, gdzie tekst jest realnie
rozwlekły (np. 6-akapitowe „O Nas"). Rejestracja spółek → krótkie odesłanie do
Kancelarii PRS.

**Struktura oferty:**
- **Kalkulator ryzyka** — darmowe narzędzie (NIE pakiet), własne wyraźne
  miejsce (podstrona „Kalkulator ryzyka").
- **Audyt 48h** — płatne wejście/diagnoza (NIE pakiet), własne wyraźne miejsce
  (podstrona „Audyt 48h") jako pierwszy krok współpracy.
- **Pakiety (3, zostają wszystkie):** Pakiet art. 299 KSH, Pakiet US/ZUS,
  Zarząd SAFE — to one tworzą siatkę „pakietów/cennika".

## Zakres pracy

### 1. Rebranding „Kancelaria PRS" → „KRS Guard" (wszystkie pliki w `www/`)
- **Nagłówek:** zamiast wordmarku „KANCELARIA / PRS" (serif) — marka **KRS
  Guard**: logo-tarcza (`assets/krs_guard_logo_transparent.png`) + napis „KRS
  Guard" i podtytuł „Ochrona zarządu". Usunąć zdublowaną tarczę po prawej
  stronie (teraz to marka główna, nie dodatek).
- **Nawigacja — odchudzić** do istoty (mniej pozycji = mniej szumu):
  `Strona główna` · `Jak pomagamy` (krs-guard.html) · `Cennik`
  (uslugi-cennik.html) · `Kalkulator ryzyka` (narzedzia.html) · `Audyt 48h`
  (audyt-48h.html) · `FAQ` · `Kontakt` · `Blog`.
- **Podmienić wszędzie**: `<title>`, meta description, stopka (brand + nota),
  tagline, pasek górny formularza (`audyt-48h-form.html`), oraz teksty w
  treści mówiące „Kancelaria PRS to nowoczesna kancelaria…". Nasza strona to
  marka KRS Guard, nie „kancelaria" — unikać słowa „kancelaria" w odniesieniu
  do nas (usługi prawne realizuje partner — Kancelaria PRS; można to
  dyskretnie zaznaczyć w stopce).
- CSS: dodać w `styles.css` styl nowego wordmarku KRS Guard (nazwa + podtytuł),
  zachowując paletę.

### 2. Przeorientowanie na KRS Guard (mniej treści, inny akcent)
- **Strona główna (`index.html`):**
  - Hero: jeden jasny przekaz o ochronie zarządu (zamiast dwóch ścieżek
    PRS/KRS Guard) + 2 przyciski: „Sprawdź ryzyko" (kalkulator) i „Audyt 48h".
    Skrócić `copy-box`. Statystyki zostają (krótkie).
  - „O Nas": z 6 długich akapitów → **2 krótkie akapity** (kim jesteśmy + co
    robimy), bez powtórzeń.
  - Sekcja lejka: **Kalkulator ryzyka → Audyt 48h → pakiety** (czytelny
    ciąg 3 kroków, z przyciskami do odpowiednich podstron).
  - „Nasze pakiety": zamiast 4 kart rejestrowych → **3 karty pakietów**
    (Pakiet art. 299 KSH, Pakiet US/ZUS, Zarząd SAFE). Audyt 48h i Kalkulator
    NIE są w tej siatce — mają osobne, wcześniejsze miejsce (lejek wyżej).
  - **Jeden mały box-odesłanie**: „Rejestracja spółki lub zmiany w KRS? Tym
    zajmuje się Kancelaria PRS →" (link do strony syna — adres do
    potwierdzenia).
- **Cennik (`uslugi-cennik.html`):** najpierw lejek (Kalkulator = darmowy,
  Audyt 48h = płatne wejście z ceną), potem **3 karty pakietów** z cenami
  (art. 299 KSH, US/ZUS, Zarząd SAFE). Rejestracja tylko jako krótkie
  odesłanie. Skrócić wstęp; opisy pakietów zostawić konkretne.
- **Jak pomagamy (`krs-guard.html`):** zachować sens (dla kogo, pakiety,
  CTA), ale skrócić długie akapity do krótkich zdań / punktów.
- **Kalkulator (`narzedzia.html`), Audyt 48h (`audyt-48h.html`):** już
  zwięzłe — drobne skróty, zmiana marki.
- **FAQ (`faq.html`):** skrócić odpowiedzi do 2–3 zdań; usunąć/zmienić
  pytania czysto rejestrowe na KRS-Guard-owe (zachować te o zdalności,
  Audycie 48h, kalkulatorze, art. 299/US-ZUS).
- **Blog (`blog.html`):** kafelki są krótkie — zostają; ewentualnie akcent na
  tematy KRS Guard.
- **Kontakt (`kontakt.html`):** zmiana marki; dane nadal placeholder.
- **Formularz Audytu (`audyt-48h-form.html`):** logika i kroki bez zmian
  (już krótkie); tylko marka w pasku górnym.

### 3. Jak wykonamy uproszczenie (skille + agenci — życzenie użytkownika)
- Wczytać skill **`frontend-design`** (wskazówki hierarchii/czytelności).
- Uruchomić **subagentów równolegle** (po jednym na cięższą podstronę:
  index „O Nas"+hero, krs-guard, uslugi-cennik, faq). Każdy dostaje obecny
  tekst + reguły niżej i zwraca **skróconą polską treść**. Ja składam ją w
  HTML, pilnując spójności nagłówka/stopki/marki i linków.

**Reguły uproszczenia (dla agentów i dla mnie):**
- **Nie tnij agresywnie opisów KRS Guard** (pakiety, „dla kogo", Audyt 48h) —
  klient ma jasno wiedzieć, co dostaje. Skracaj głównie „O Nas", wstępy i
  powtórzenia; główne odchudzenie i tak daje usunięcie części rejestrowej.
- Tam, gdzie tekst jest rozwlekły: jedna myśl na sekcję, zero powtórzeń i
  „lania wody".
- Krótkie zdania i wypunktowania zamiast długich akapitów.
- **Zachować wszystkie fakty**: usługi, ceny, terminy prawne (art. 299 KSH,
  art. 116 O.p.), Audyt 48h, „3 dni robocze", zgody/RODO w formularzu.
- Ton rzeczowy, przystępny, „Ty" do klienta; bez żargonu.
- Nie dodawać nowych obietnic ani danych, których nie ma.

## Pliki do zmiany

Wszystkie w `www/`: `index.html`, `uslugi-cennik.html`, `krs-guard.html`,
`narzedzia.html`, `audyt-48h.html`, `audyt-48h-form.html`, `kontakt.html`,
`faq.html`, `blog.html`, `styles.css` (nowy wordmark). Grafiki: użyć
istniejących w `assets/` (logo-tarcza jako marka główna).

## Weryfikacja

Serwer podglądu działa (`http://localhost:8765/`). Sprawdzić:
1. Na każdej podstronie marka to **KRS Guard** (logo-tarcza + nazwa) —
   nigdzie nie zostało „Kancelaria PRS" jako NASZA nazwa (dozwolone tylko w
   odesłaniu do strony syna).
2. Teksty wyraźnie krótsze i czytelne (szczególnie „O Nas" i `krs-guard.html`)
   — bez utraty faktów, cen i terminów prawnych.
3. Strona główna i cennik prowadzą pakietami KRS Guard; rejestracja to tylko
   krótkie odesłanie.
4. Nawigacja odchudzona, wszystkie linki działają; kalkulator otwiera
   aplikację Streamlit; formularz Audytu przechodzi kroki.
5. Responsywność (zwężenie okna) — nic się nie rozjeżdża.

## Po realizacji (zgodnie z CLAUDE.md)

- Zaktualizować `CLAUDE.md` (nazwa marki KRS Guard, profil = ochrona zarządu,
  relacja do strony syna, rejestracja = odesłanie).
- Zaktualizować pamięć projektu (`memory/`) o decyzji o marce/profilu i
  skopiować do repo.
- Skopiować ten plan do `plany/rebranding-krs-guard.md` i zacommitować.
- Commity osobne, opisowe, push (git workflow z CLAUDE.md).
- Otwarte tematy bez zmian: prawdziwe dane kontaktowe, hosting/domena, realna
  wysyłka formularza; do potwierdzenia: docelowy adres w odesłaniu do
  Kancelarii PRS.
