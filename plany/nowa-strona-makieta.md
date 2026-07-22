# Plan: Nowa strona Kancelarii PRS (makieta na bazie starego prototypu)

## Kontekst — po co to robimy

Kancelaria prawna (radca prawny) potrzebuje **nowej strony internetowej**.
Model działania kancelarii: większość spraw online, bez osobistego kontaktu.
Dwie specjalizacje:
1. **Postępowania rejestrowe** — zgłoszenia do KRS przez Portal Rejestrów
   Sądowych (PRS) oraz S24.
2. **KRS Guard** — ochrona członków zarządu w sytuacjach kryzysowych;
   narzędziem wejściowym jest kalkulator ryzyka, który ma skłaniać do
   płatnego Audytu 48h.

Punktem wyjścia jest gotowy, dopracowany **statyczny prototyp HTML** leżący w
`Dane_wejściowe/strona testowa_stara/` (9 plików HTML + `assets/`). Ma on
gotowe treści (opisy usług, cennik, teksty „O nas", KRS Guard, Audyt 48h) i
gotowy styl wizualny. Problem prototypu: każdy plik ma osobno wklejone ~530
linii **identycznego CSS** (brak wspólnego arkusza), część linków prowadzi na
zewnętrzną stronę `kancelariaprs.com`, a formularze działają tylko przez
`mailto:`.

**Cel tego etapu:** zbudować z tego czystą, spójną **makietę nowej,
samodzielnej strony** — z jednym wspólnym arkuszem stylów, spójną nawigacją
wskazującą wyłącznie własne podstrony, oraz przykładowymi (placeholder)
danymi kontaktowymi do podmiany w kolejnym kroku.

## Decyzje ustalone z użytkownikiem

- **Osobna, samodzielna strona** pod innym adresem niż `kancelariaprs.com`
  (tamta to równoległy, inny projekt). Menu prowadzi tylko do własnych
  podstron — żadnych linków do `kancelariaprs.com`.
- **Styl wizualny kopiujemy** ze starego prototypu (kremowe tło `#f3f0ea`,
  morsko-granatowe kolory `--ink #0b2535` / `--brand #0f5670`, font Poppins,
  logo „PRS" w serif Georgia, zaokrąglone karty).
- **Cennik w formie kart usług** (jak `uslugi-cennik.html`), nie rozwijanej
  tabeli. Plik `cennik.html` (tabela) pomijamy.
- **Dane kontaktowe = placeholdery** (nazwisko radcy, telefon, e-mail, adres)
  — wyraźnie oznaczone do podmiany.
- **Kalkulator ryzyka = link do działającej aplikacji**
  `https://kalkulatorryzyka.streamlit.app/` — zgodnie z decyzją projektu
  (22.07.2026) kalkulator zostaje osobną aplikacją. Lokalny prototyp
  `kalkulator-ryzyka.html` **nie jest przenoszony**.
- **Zakres podstron makiety:** trzon (Strona główna, Usługi i cennik, KRS
  Guard, Narzędzia) + wszystkie cztery dodatki: **Kontakt, Formularz Audytu
  48h, FAQ, Blog**.

## Wybór technologii (do zapisania w CLAUDE.md przy realizacji)

**Statyczna strona HTML/CSS/JS bez żadnego narzędzia budującego (no build).**

Uzasadnienie (krótko, po ludzku): stary prototyp już jest w tej technologii i
działa; taka strona otwiera się przez zwykłe kliknięcie w plik (bez
instalowania czegokolwiek na obu komputerach), można ją postawić na dowolnym,
najprostszym hostingu, i jest najmniej awaryjna — a to priorytet przy
nietechnicznym właścicielu. Poprawiamy jedyną realną wadę prototypu:
**wydzielamy wspólny arkusz stylów `styles.css`** (koniec z duplikowaniem CSS
w każdym pliku) i wspólny `main.js` (drobna interaktywność + podświetlanie
aktywnej pozycji menu). Nagłówek i stopkę trzymamy wpisane w każdej stronie
(mała objętość, działa bez serwera przez `file://`), utrzymywane spójnie.

Hosting zostaje do ustalenia na etapie publikacji (osobna decyzja) — strona
będzie samowystarczalna w jednym folderze, więc da się ją opublikować na
dowolnym hostingu statycznym.

## Struktura plików (folder `www/` w repo)

Cała strona w jednym folderze `www/` — oddzielona od materiałów wejściowych
(`Dane_wejściowe/`) i plików projektowych (CLAUDE.md, memory/, plany/).

```
www/
├── index.html            # Strona główna (hero + O nas + atuty + Nasze usługi)
├── uslugi-cennik.html    # Usługi i cennik — KARTY usług (od uslugi-cennik.html)
├── krs-guard.html        # KRS Guard — opis, grupy docelowe, CTA
├── narzedzia.html        # Narzędzia — intro kalkulatora → link do Streamlit
├── audyt-48h.html        # Audyt 48h — strona wprowadzająca
├── audyt-48h-form.html   # Formularz Audytu 48h (wieloetapowy, mailto/placeholder)
├── kontakt.html          # NOWA — dane kontaktowe (placeholdery)
├── faq.html              # NOWA — najczęstsze pytania (treść do napisania)
├── blog.html             # NOWA — szkielet bloga (bez wpisów)
├── styles.css            # WSPÓLNY arkusz stylów (wydzielony z prototypu)
├── main.js               # Wspólny JS (aktywne menu + interaktywność form/FAQ)
└── assets/               # Skopiowane logotypy/ikony z prototypu
    ├── krs_guard_logo_transparent.png
    ├── kalkulator_ryzyka_logo.png
    ├── audyt_48h_logo.png
    └── (pozostałe użyte ikony/kafelki)
```

## Wspólna nawigacja (nowa, samodzielna)

Nagłówek identyczny na każdej podstronie (logo „KANCELARIA / PRS" po lewej,
logo KRS Guard po prawej). Menu — wyłącznie własne podstrony:

`Strona główna` · `Usługi i cennik` · `KRS Guard` · `Narzędzia` ·
`Formularz zgłoszeniowy` (→ audyt-48h.html) · `Blog` · `Kontakt` · `FAQ`

Aktywna pozycja podświetlana przez `main.js` (klasa `.active` wg nazwy pliku),
zamiast ręcznego `aria-current` w każdym pliku.

## Zakres pracy — krok po kroku

1. **`styles.css`** — wyodrębnić wspólny CSS z prototypu (zmienne `:root`,
   header/nav, hero, karty usług `.service-tile`, sekcje „O nas"/atuty,
   `.footer`, style stron wprowadzających `.icon-cta`/`.callout`, responsywność).
   Jedno źródło prawdy dla wyglądu całej strony.
2. **`main.js`** — podświetlanie aktywnej pozycji menu; przełącznik pytań FAQ
   (rozwijanie), obsługa wieloetapowego formularza Audytu 48h (przeniesiona z
   prototypu, nadal `mailto:`/placeholder — bez prawdziwego backendu).
3. **`index.html`** — przenieść treść strony głównej 1:1 (hero z dwiema
   ścieżkami, „O Nas", 3 atuty, „Nasze Usługi" — 5 kart), podmienić linki
   zewnętrzne na własne podstrony, podłączyć `styles.css` + `main.js`.
4. **`uslugi-cennik.html`** — karty usług (5 kafelków: Rejestracja w KRS,
   Zmiany w KRS, Portal S24, Pozostałe, KRS Guard) z cenami; przyciski
   „Wybierz usługę" → własne podstrony (KRS Guard → krs-guard.html; pozostałe
   → np. Kontakt/formularz, bez linku do kancelariaprs.com).
5. **`krs-guard.html`** — opis, „Dla kogo", „Co to oznacza", karty CTA →
   Audyt 48h, cennik (uslugi-cennik.html), kalkulator (narzedzia.html).
6. **`narzedzia.html`** — intro kalkulatora ryzyka; przycisk „Uruchom
   Kalkulator Ryzyka" → `https://kalkulatorryzyka.streamlit.app/`
   (`target="_blank"`); zachować boks „Najczęstsze błędy w pierwszych 7 dniach".
7. **`audyt-48h.html`** + **`audyt-48h-form.html`** — przenieść stronę
   wprowadzającą i wieloetapowy formularz; wyraźnie oznaczyć, że wysyłka to na
   razie makieta (mailto/placeholder), do podłączenia realnej obsługi później.
8. **`kontakt.html`** (nowa) — sekcja danych kontaktowych z placeholderami
   (np. „radca prawny [Imię Nazwisko]", „tel. +48 000 000 000",
   „kontakt@[domena]", „[adres kancelarii]"), wyraźnie oznaczone jako do
   podmiany. Spójny styl z resztą.
9. **`faq.html`** (nowa) — układ pytań i odpowiedzi (rozwijane), 6–10
   przykładowych pytań osadzonych w specjalizacji (PRS/S24/KRS, KRS Guard,
   Audyt 48h, forma zdalna). Treść napisana od nowa, oznaczona jako propozycja
   do akceptacji.
10. **`blog.html`** (nowa) — szkielet listy wpisów (karty/placeholdery), bez
    realnych artykułów; przygotowany pod przyszłe treści.
11. **`assets/`** — skopiować z `Dane_wejściowe/strona testowa_stara/assets/`
    tylko realnie używane pliki (logo KRS Guard, logo kalkulatora, logo Audyt
    48h, ikony kafelków). Tło hero (Unsplash) na razie zostaje jako link
    zewnętrzny (można zlokalizować później).

## Pliki wejściowe (źródło treści, tylko do odczytu)

- `Dane_wejściowe/strona testowa_stara/index.html` — strona główna + wzorzec CSS
- `Dane_wejściowe/strona testowa_stara/uslugi-cennik.html` — karty usług
- `Dane_wejściowe/strona testowa_stara/krs-guard.html` — treść KRS Guard
- `Dane_wejściowe/strona testowa_stara/kalkulator.html` — intro kalkulatora
- `Dane_wejściowe/strona testowa_stara/audyt-48h.html` + `audyt-48h-form.html`
- `Dane_wejściowe/strona testowa_stara/assets/` — logotypy i ikony

## Weryfikacja (jak sprawdzimy, że działa)

1. Otworzyć `www/index.html` przez podwójne kliknięcie (przez `file://`) —
   strona ma się wyświetlić w pełni ostylowana, bez uruchamiania serwera.
2. Przejść całą nawigację: każda pozycja menu prowadzi do istniejącej,
   ostylowanej podstrony; aktywna pozycja jest podświetlona; **żaden link nie
   prowadzi do `kancelariaprs.com`**.
3. Sprawdzić responsywność (zwężenie okna / tryb telefonu w przeglądarce) —
   układ przechodzi na jedną kolumnę, nic się nie rozjeżdża.
4. Kliknąć „Uruchom Kalkulator Ryzyka" na `narzedzia.html` — otwiera się
   `kalkulatorryzyka.streamlit.app` w nowej karcie.
5. Przejść formularz Audytu 48h — kroki się przełączają; na końcu widać
   podgląd (na razie makieta, bez realnej wysyłki).
6. Rozwijanie pytań na `faq.html` działa.
7. Sprawdzić, że logotypy w `assets/` się ładują (nagłówek KRS Guard, logo
   kalkulatora i Audytu 48h).

## Po realizacji (zgodnie z CLAUDE.md — ciągłość pracy)

- **Zaktualizować `CLAUDE.md`**: wpisać wybrany stack (statyczny HTML/CSS/JS,
  folder `www/`, struktura, gdzie jest link do kalkulatora) — dziś sekcja „Do
  ustalenia" zakłada, że ta decyzja dopiero zapadnie.
- **Skopiować ten plan** do `plany/nowa-strona-makieta.md` w repo i
  zacommitować (ciągłość między komputerami).
- **Commity** po każdym znaczącym kroku (osobne, opisowe) i push na GitHub —
  zgodnie z git workflow w CLAUDE.md. Nie łączyć niepowiązanych zmian.
- Rozważyć skorzystanie ze skilla `find-skills`, by po wyborze stacku
  poszukać ewentualnego skilla przydatnego przy stronach statycznych.
