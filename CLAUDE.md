# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Co to za projekt

Strona internetowa marki **Zarząd Guard** — ochrona członków zarządu spółek
(pozew z art. 299 KSH, decyzje US/ZUS, bezpieczne odejście z zarządu). Repo
GitHub: `pczak333/kancelaria-prs-strona-www` (nazwa repo historyczna, sprzed
zmian marki — nie zmieniamy jej).

> **UWAGA — nazwa marki zmieniała się DWA razy.** „Kancelaria PRS" →
> „KRS Guard" (22.07.2026) → **„Zarząd Guard" (09.08.2026)**. Obowiązująca
> nazwa to **Zarząd Guard**; w `www/` nie ma już ani jednego „KRS Guard".
> Uwaga na mylące ślady starej nazwy, których świadomie NIE zmieniamy:
> nazwa repo, nazwy plików (`krs_guard_logo_transparent.png`,
> `krs-guard.html`), skrót na pulpicie „Podglad strony KRS Guard".
> Skrót „KRS" sam w sobie zostaje wszędzie tam, gdzie znaczy Krajowy
> Rejestr Sądowy — to nie jest nazwa marki.

**Profil i relacja do „Kancelarii PRS".** To osobna, samodzielna strona o
profilu Zarząd Guard. Rejestracją spółek (KRS/PRS/S24) zajmuje się partnerska
**Kancelaria PRS** — inna strona tej samej rodziny (syna właściciela),
`https://kancelaria-prs.vercel.app/` (docelowo `kancelariaprs.com`). Nasza
strona zwiększa zasięg Zarząd Guard; docelowo zapytania obsługuje Kancelaria
PRS. Usług rejestrowych NIE powielamy — tylko krótko odsyłamy do niej
(box „handoff" na stronie głównej, w cenniku, kontakcie i FAQ). Usługi
prawne realizuje Kancelaria PRS (wzmianka w stopce).

**Stack technologiczny (wybrany 22.07.2026): statyczna strona
HTML/CSS/JS bez narzędzia budującego (no build).** Powód: najprostsze,
najmniej awaryjne rozwiązanie — strona otwiera się przez zwykłe kliknięcie
w plik, działa na obu komputerach bez instalowania czegokolwiek i da się ją
postawić na dowolnym hostingu statycznym. To priorytet przy nietechnicznym
właścicielu. Hosting: JESZCZE NIE WYBRANY (osobna decyzja na etapie
publikacji — strona jest samowystarczalna w folderze `www/`, więc pójdzie
na dowolny hosting statyczny).

**Struktura repo:**

- `www/` — właściwa strona (deliverable). Podstrony: `index.html`,
  `uslugi-cennik.html` (Cennik — lejek + **pakiety** Zarząd Guard), `krs-guard.html`,
  `narzedzia.html` (intro kalkulatora → link do aplikacji Streamlit),
  `audyt-48h.html` + `audyt-48h-form.html` (wieloetapowy formularz,
  na razie makieta bez prawdziwego backendu), `kontakt.html`, `faq.html`,
  `blog.html` (szkielet). Wspólny wygląd: **`www/styles.css`** (jedno
  źródło prawdy dla CSS — koniec z duplikowaniem stylów w każdym pliku).
  Wspólny skrypt: **`www/main.js`** (podświetlanie aktywnej pozycji menu +
  rozwijanie FAQ + rozwijanie szczegółów pakietów na Cenniku). Grafiki/
  logotypy: `www/assets/`.
- `podglad-strony.bat` — w katalogu głównym repo; dwuklik otwiera stronę
  w Edge (patrz „Podgląd lokalny" niżej).
- `Dane_wejściowe/` — materiały źródłowe (m.in. stary prototyp
  `strona testowa_stara/` i wcześniejsze warianty logotypów), tylko do
  odczytu, NIE część strony.
- `logo/` — warianty logo-tarczy poza stroną: `LOGO-poprawione.png`
  (źródłowy plik wdrożonego znaku, 1680×1782), `PODGLAD-cale-logo.png`
  i `logo_wersja_alternatywna.png` (odrzucona wersja z Canvy — kremowy
  napis, kanciasty wierzch; zachowana na wypadek zmiany zdania).

**Marka i nawigacja.** Znak w nagłówku to **Zarząd Guard** (logo-tarcza
`assets/krs_guard_logo_transparent.png` — nazwa pliku historyczna — z napisem
„ZARZĄD" na tarczy i „GUARD" na wstędze, obok napis „Zarząd Guard" i podtytuł
„Ochrona zarządu"). Menu (odchudzone): Strona główna · Jak pomagamy
(`krs-guard.html`) · Cennik (`uslugi-cennik.html`) · Kalkulator ryzyka
(`narzedzia.html`) · Audyt 48h (`audyt-48h.html`) · FAQ · Kontakt · Blog.
Oferta ułożona jako lejek: **darmowy Kalkulator → Audyt 48h (od 900 zł) →
pakiety** (art. 299 KSH, US/ZUS, Zarząd SAFE). Nagłówek i stopka są
identyczne na każdej podstronie — przy zmianie podmieniać we wszystkich
naraz (wygodnie skryptem, jak `scratchpad/rebrand.py` z sesji rebrandingu).
Jedyne linki na zewnątrz: „handoff" do Kancelarii PRS oraz link do
kalkulatora Streamlit.

Kalkulator ryzyka NIE jest wbudowany w stronę — `narzedzia.html` linkuje do
działającej aplikacji `https://kalkulatorryzyka.streamlit.app/` (patrz
sekcja o kalkulatorze niżej).

Podgląd lokalny — otwieramy stronę wprost w **Edge** (nie w Chrome: Chrome
właściciela ma rozszerzenie blokujące otwieranie stron z pliku `file://`;
strona jest w pełni statyczna, więc w Edge działa z pliku bez serwera).

**WAŻNE — sposób zależy od komputera:**

- **Komputer właściciela (ten, na którym to piszemy): pliki `.bat` są
  zablokowane** — dwuklik w `.bat` NIC nie robi (najpewniej antywirus/
  ustawienia systemu; potwierdzone testem 31.07.2026 — plik `.bat` nie
  zostawił nawet logu, że się uruchomił). Dlatego na tym komputerze
  podgląd odpalamy przez skrót **`Podglad strony KRS Guard.lnk`** (ikona
  Edge) — leży w **katalogu głównym repo** (NIE na pulpicie) i jest
  zacommitowany, więc jedzie na drugi komputer. Utworzony PowerShellem
  (`WScript.Shell`), celuje w `msedge.exe` z argumentem
  `--new-window "file:///C:/Users/User/Desktop/kancelaria-prs-strona-www/www/index.html"`.
  **Ścieżka w argumencie jest bezwzględna** — zadziała na drugim komputerze
  tylko wtedy, gdy repo leży dokładnie w `C:\Users\User\Desktop\`. Jeśli nie,
  poprawić ją (prawy przycisk → Właściwości → pole „Element docelowy") albo
  utworzyć skrót od nowa (patrz `memory/stan-pracy-2026-07-31.md`).
- **Drugi komputer:** jeśli tam `.bat` NIE są blokowane, może zadziałać
  `podglad-strony.bat` (w katalogu głównym repo, ścieżki względne
  `%~dp0` — przenośny). Zostawiony właśnie na tę okazję.
- **Do własnych testów** (dowolny komputer) działa też lokalny serwer:
  w `www/` `python -m http.server 8765` → `http://localhost:8765/`.

**Pułapka przy testowaniu przez agenta:** Edge uruchomiony przez narzędzia
Claude Code startuje w innej sesji Windows (niewidocznej dla właściciela) i
przez mechanizm „jednej kopii Edge" (singleton) potrafi przechwycić kolejne
otwarcia — wtedy dwuklik właściciela nie pokazuje okna. Po testach
**pozamykać wszystkie procesy `msedge` i NIE uruchamiać Edge samemu**, gdy
prosimy właściciela, żeby kliknął — inaczej u niego „nic się nie otwiera".

## Kim jest użytkownik (ważne dla stylu współpracy)

Właściciel/współpracownik kancelarii — **nie jest osobą techniczną** (pisał
to wprost, przy okazji projektu-bliźniaka: "Nic z tego nie zrozumiałem, nie
jestem techniczny!"). Z tego wynika konkretna zasada pracy:

- Tłumacz decyzje i problemy **po ludzku**, bez żargonu (bez słów typu
  "framework", "endpoint", "deployment", "iframe" bez wyjaśnienia — albo
  wcale, albo z natychmiastowym prostym tłumaczeniem).
- Kiedy jest wybór między kilkoma podejściami technicznymi, **nie
  przedstawiaj menu opcji z tradeoffami do samodzielnej oceny** — użytkownik
  nie ma jak ich ocenić. Zaproponuj JEDNO, konkretne rozwiązanie, uzasadnij
  je krótko, i pytaj tylko o rzeczy, których naprawdę nie można rozstrzygnąć
  samodzielnie (np. treść/branding, nie architektura).
- Pracuje na **dwóch komputerach** naprzemiennie — patrz "Ciągłość pracy
  między komputerami" niżej.

## Relacja do kalkulatora ryzyka

Osobny, już działający projekt tej samej kancelarii: repo
`pczak333/Kalkulator_ryzyka_app` (Streamlit, Python), wdrożony pod
`https://kalkulatorryzyka.streamlit.app/`.

**Uwaga po zmianie nazwy marki (09.08.2026):** zmiana na „Zarząd Guard"
objęła WYŁĄCZNIE tę stronę (`www/`). Kalkulator to osobne repo i osobne
wdrożenie — **nie sprawdzano, jaką nazwą posługuje się on sam**. Jeśli
pojawi się temat ujednolicenia nazwy między stroną a kalkulatorem, najpierw
sprawdzić stan faktyczny w tamtym repo, nie zakładać.

**Decyzja (22.07.2026): kalkulator zostaje osobną, samodzielnie wdrożoną
aplikacją — ta strona ma do niego tylko linkować** (zwykły przycisk/link,
np. "Sprawdź swoje ryzyko prawne" → adres kalkulatora). Powody: kalkulator
już działa i jest przetestowany; przepisywanie go od zera w innym stacku to
duży, ryzykowny nakład pracy bez realnej korzyści na tym etapie; właściciel
nie jest techniczny, więc prostsze, mniej awaryjne rozwiązanie jest tu
priorytetem nad wizualną "bezszwowością".

Jeśli w przyszłości pojawi się decyzja o pełnym, natywnym scaleniu (żeby
kalkulator wizualnie *nie* wyglądał jak osobne narzędzie) — realną wartością
do przeniesienia byłyby wyłącznie **dane biznesowe** z folderu
`dane_wejściowe/` tamtego repo (reguły, punktacja, teksty w Excelu/CSV,
patrz `scoring_engine.py`/`scenario_selector.py` tamtego projektu), NIE kod
aplikacji Streamlit — ten folder jest jedyną częścią tamtego projektu
zaprojektowaną jako framework-agnostyczna. To osobna, duża decyzja — nie
podejmować jej mimochodem przy okazji innych zadań.

Sekrety/klucze API kalkulatora (Anthropic, Azure) są skonfigurowane w JEGO
WŁASNYM panelu Streamlit Cloud i nie mają nic wspólnego z tą stroną.

## Git workflow (obowiązujące od startu projektu)

Po każdej znaczącej zmianie — nowy plik, działająca funkcja, zmiana
konfiguracji — commit i push na GitHub, bez czekania na wyraźną prośbę:

```bash
git add <konkretne pliki>
git commit -m "krótki, konkretny opis co i dlaczego"
git push origin main
```

Nie łączyć niepowiązanych zmian w jednym commicie. To standing instruction
przeniesiona wprost z projektu-bliźniaka (`Kalkulator_ryzyka_app`) — tam
było to wyraźne życzenie użytkownika ("chcę mieć zawsze zapisaną wersję na
GitHubie") i dotyczy też tego projektu.

Tożsamość git w tym repo skonfigurowana lokalnie (nie globalnie, żeby nie
ruszać ustawień innych repozytoriów na tym komputerze): `Piotr Czak` /
`podzabotem@outlook.com` — ta sama, co w `Kalkulator_ryzyka_app`.

## Ciągłość pracy między komputerami (obowiązkowe)

Użytkownik pracuje naprzemiennie na dwóch komputerach. Pliki trybu
planowania (`~/.claude/plans/...`) i pamięć projektu
(`~/.claude/projects/.../memory/`) zapisują się **lokalnie, per komputer** —
bez poniższych zasad kontynuacja pracy gubi się przy zmianie komputera. Ten
sam mechanizm już sprawdził się w `Kalkulator_ryzyka_app` — tu wdrożony od
pierwszego dnia:

- **Plany**: po zaakceptowaniu planu (koniec trybu plan mode), skopiuj jego
  finalną treść do `plany/<opisowa-nazwa>.md` w repo i zacommituj. Lokalny
  plik planu zostaje jak jest (mechanizm harnessu) — kopia w `plany/` jest
  źródłem prawdy dla kontynuacji między komputerami.
- **Pamięć**: po każdej aktualizacji pliku w
  `~/.claude/projects/.../memory/`, skopiuj ten sam plik do `memory/` w
  repo i zacommituj. `memory/MEMORY.md` w repo ma być zawsze aktualną kopią
  lokalnego indeksu pamięci.
- **Na starcie sesji**: jeśli lokalna pamięć/plany różnią się od tego, co
  jest w `plany/`/`memory/` w repo (bo poprzednia sesja toczyła się na
  innym komputerze) — **repo wygrywa**, zsynchronizuj z niego do lokalnego
  magazynu. Sprawdzić to jako pierwszy krok nowej sesji, jeśli coś nie
  zgadza się z oczekiwaniami użytkownika.
- **Nie commitować** surowych logów sesji (`*.jsonl`, `subagents/`,
  `tool-results/`) — tylko wyselekcjonowane pliki `.md` z `memory/`.

Foldery `memory/` i `plany/` założone już teraz (patrz niżej) — nawet
zanim jest tu jakikolwiek kod, żeby konwencja obowiązywała od pierwszej
sesji, nie dopiero gdy ktoś sobie o niej przypomni.

## Skille Claude Code (od startu projektu)

Zainstalowane (`.agents/skills/` + `.claude/skills/` + `skills-lock.json`,
ten sam mechanizm co w `Kalkulator_ryzyka_app` — patrz tamtejszy
`memory/project_skills_setup.md` po pełną instrukcję instalowania/usuwania):

- **`frontend-design`** (anthropics/skills) — wskazówki projektowania UI,
  przydatne niezależnie od wybranego stacku.
- **`find-skills`** (vercel-labs/skills) — meta-skill do wyszukiwania i
  instalowania kolejnych skilli; użyć go, jak tylko wybierzemy technologię
  strony, żeby poszukać skilla dedykowanego dla tej technologii (np. skill
  do konkretnego frameworka).

Świadomie NIE zainstalowano (na razie) skilli specyficznych dla kalkulatora
KRS Guard (`developing-with-streamlit`, `regex-vs-llm-structured-text`,
`prompt-engineering-patterns`) ani subagenta `record-manager` — wszystkie
dotyczą wyłącznie logiki analizy dokumentów prawnych tamtego projektu, nie
mają zastosowania do strony internetowej. `agent-browser` (automatyzacja
przeglądarki, do testowania stron na żywo) też pominięty na razie — dodać,
gdy będzie już co testować w przeglądarce (wymaga dodatkowej instalacji
globalnej CLI per komputer, patrz notatka w projekcie-bliźniaku).

## Stan prac i co jeszcze do ustalenia

**Zrobione (22.07.2026):**
1. Pierwsza makieta strony w `www/` (wszystkie podstrony, wspólny
   `styles.css` i `main.js`). Plan: `plany/nowa-strona-makieta.md`.
2. **Rebranding na „KRS Guard" + odchudzenie treści** — zmiana marki
   „Kancelaria PRS" → „KRS Guard" wszędzie, przeorientowanie na ochronę
   zarządu (lejek Kalkulator → Audyt 48h → 3 pakiety), usunięcie części
   rejestrowej (handoff do Kancelarii PRS), skrócenie tekstów. Teksty
   przeredagowane przez subagentów. Plan: `plany/rebranding-krs-guard.md`.
Sprawdzone w przeglądarce.

**Zrobione (31.07.2026):**
3. **Opisy pakietów przeniesione na Cennik jako rozwijane.** Podstrona
   „Jak pomagamy" (`krs-guard.html`) była przeładowana — usunięto z niej
   trzy długie opisy pakietów, zostawiając krótki blok z przyciskiem
   „Zobacz nasze pakiety" → Cennik. Na Cenniku każdy pakiet ma przycisk
   „Szczegóły", który rozwija opis w miejscu (bez przechodzenia na inną
   podstronę); linki `...#pakiet-...` (np. ze strony głównej) auto-otwierają
   wskazany pakiet. Plan: `plany/pakiety-rozwijane-na-cenniku.md`.
4. **`podglad-strony.bat`** — dwuklik otwiera stronę w Edge (patrz
   „Podgląd lokalny").
5. **Poprawki po przeglądzie strony przez właściciela** (seria drobnych
   poprawek, każda osobnym commitem): usunięty mylący krok 3 „Pakiety
   obrony" z paska „Jak pomagamy — krok po kroku" na stronie głównej (dublował
   sekcję „Nasze pakiety" poniżej); poprawiony mylący opis na
   `krs-guard.html` sugerujący, że to kancelaria dobiera pakiet po Audycie
   48h (w rzeczywistości klient wybiera pakiet sam, dopasowany do swojej
   sytuacji); grafika na `narzedzia.html` zmieniona na wierną replikę
   nagłówka prawdziwej aplikacji kalkulatora (sześciokątny znak „K", ten sam
   granat); mała ikonka na dużym białym tle na `audyt-48h.html` zastąpiona
   kolorowym banerem w barwach marki. **Opisy pakietów na Cenniku
   zaakceptowane przez właściciela** — nie są już „do potwierdzenia".

**Zrobione (03.08.2026):**
6. **Odchudzenie strony głównej i „Jak pomagamy"** — właściciel zgłosił
   przeładowanie treścią. Baner spłaszczony z czterech zagnieżdżonych ramek
   do jednej karty; sekcja powielająca podstrony zastąpiona paskiem trzech
   przycisków (`.quicklinks`). Na „Jak pomagamy" usunięta myląca metafora
   „Twoja tarcza" i wątek rejestracji spółek; cztery rozrzucone karty CTA
   zastąpione jedną sekcją „Jak zacząć" z 3 krokami.
7. **Rozróżnienie Kalkulator vs Audyt 48h** na Cenniku — Kalkulator liczy
   ALGORYTM (dane nigdzie nieprzesyłane, kasowane po 24 h), Audyt to ocena
   RADCY PRAWNEGO. Ta sama poprawka (48h→24h + „analizuje algorytm, nikt
   z zespołu nie czyta") wprowadzona też w OSOBNYM repo kalkulatora.
8. **FAQ rozbudowane** o 6 pytań, **6 pełnych artykułów na blogu**
   (`blog-*.html`, każdy z notką roboczą i zastrzeżeniem „nie stanowi porady
   prawnej"), ujednolicone czcionki i powiększone logo.
9. **AUDYT CAŁEJ STRONY** (5 niezależnych recenzji + adwersaryjna
   weryfikacja, 11 agentów): 40 zgłoszeń → 30 potwierdzonych → **19 spraw
   do poprawy**. Lista z numerami linii i kolejnością prac:
   `plany/poprawki-po-audycie-2026-08-03.md`.
10. **Wszystkie 19 spraw z audytu wprowadzone (Etapy 1–5, plan zamknięty).**
    Oba błędy prawne
    poprawione po potwierdzeniu właściciela jako radcy: art. 299 KSH
    zawężony do sp. z o.o.; droga odwoławcza US/ZUS rozdzielona bez podawania
    konkretnych terminów. Sprzeczności w ofercie usunięte (kafelki na
    stronie głównej, pakiet Zarząd SAFE, jeden termin Audytu, cena na stronie
    Audytu). Formularz poprawiony (kontakt pilny, literówka, czas
    wypełniania, przedwczesny pakiet) + **nowa podstrona polityki
    prywatności** (szkielet, do uzupełnienia) linkowana wszędzie. Wygląd
    ujednolicony: zdjęcie/czcionka pobrane lokalnie (nie zależą już od
    serwerów Google/Unsplash), logo w linii z treścią, `<h1>` na stronie
    głównej, banery kalkulatora/audytu spójne i responsywne na telefonie,
    kolory ujednolicone na granat (`--calc-navy` jako świadomy, nazwany
    wyjątek dla brandingu kalkulatora). **Dodatkowo z inicjatywy
    właściciela:** dwuetapowy proces wyceny Audytu 48h (sprawdzenie
    kompletności i potwierdzenie ceny PRZED płatną analizą — rozwiązuje
    pytanie, co się dzieje z dokumentami przy odrzuceniu wyceny), usunięty
    przedwczesny przycisk „Zamów Audyt 48h" z hero strony głównej. **Etap 5
    (drobiazgi + porządki w CSS) też zrobiony** — szczegóły w
    `plany/poprawki-po-audycie-2026-08-03.md`.
11. **Poprawki po ponownym przeglądzie strony (spoza listy audytu).**
    Doprecyzowana różnica Audyt 48h vs pakiety obrony (zdanie-most na
    Cenniku + konkretne korzyści w opisach pakietów) i wyjaśnione, że
    reprezentacja w sądzie odbywa się zdalnie. Naprawiony układ banerów
    kalkulatora/audytu — przycisk obok banera ściskał go do wąskiej
    szerokości (baner i przycisk stoją teraz jeden pod drugim, każdy na
    pełną szerokość). W formularzu Audytu: pole „opisz sytuację" zrobione
    opcjonalnym z nowymi podpowiedziami (nie duplikują już pytań z
    formularza), doprecyzowane niejasne zdanie przy e-mailu. Jedyna
    otwarta rzecz: czy pole „potwierdzenie doręczenia" w formularzu
    powinno pozostać obowiązkowe w świetle dwuetapowego procesu wyceny.

**Zrobione (04.08.2026):**
12. **AUDYT KALKULATORA RYZYKA** (osobne repo `Kalkulator_ryzyka_app`, workflow
    13 agentów): 43 zgłoszenia → 19 potwierdzonych. Naprawiono 7 błędów, m.in.
    wynik nie przeliczał się po zmianie odpowiedzi (klient mógł pobrać
    nieaktualny PDF), wyrok zaoczny dawał poradę o nakazie zapłaty, ostrzeżenie
    o niepewnym odczycie nie docierało do klienta. Szczegóły w repo kalkulatora:
    `memory/project_audyt_przed_publikacja_2026-08-04.md`.
13. **WARIANT A — uczciwe oświadczenia o danych (WAŻNE).** Audyt wykazał, że
    strona obiecywała nieprawdę: kalkulator **wysyła wgrane dokumenty** do
    Microsoft Azure i Anthropic (imiona, sygnatury, kwoty), a mechanizmu
    „usuwanie po 24 godzinach" **nie ma w kodzie w ogóle**. Właściciel wybrał
    opisanie tego uczciwie zamiast wyłączania wgrywania. Przepisane teksty
    w `narzedzia.html`, `uslugi-cennik.html`, `faq.html`,
    `polityka-prywatnosci.html`: rozdzielone dwa tryby (formularz ręcznie = nic
    nie idzie do usług AI; wgranie pliku = treść czytają firmy zewnętrzne),
    Microsoft/Anthropic/Snowflake wymienieni z nazwy, informacja o przekazaniu
    poza EOG. **Nie zmieniać tych tekstów bez sprawdzenia, co realnie robi kod
    kalkulatora** — to oświadczenie o danych osobowych pod nazwiskiem radcy.
    Do potwierdzenia przez właściciela: umowy powierzenia z Microsoftem
    i Anthropic, podstawa przekazania poza EOG.

**Zrobione (07–09.08.2026):**
14. **Nowe logo-tarcza (Canva) wdrożone.** Stary plik okazał się
    powiększeniem ~5,2× obrazka 116×134 px — rozmyta była CAŁA tarcza, nie
    tylko napis. Znak narysowano od nowa w Canvie (projekt `DAHRvQt6Slo`,
    2000×2000, napisy jako prawdziwy tekst) i wdrożono jako
    `krs_guard_logo_transparent.png` (754×800), `krs_guard_logo.png`,
    `krs_guard_logo_tile.png` (512×512). HTML bez zmian — ścieżki te same.
    Pliki źródłowe w `logo/`. Plan i przebieg:
    `plany/logo-nowa-tarcza-canva-wersja2.md`,
    `plany/logo-trzy-poprawki-2026-08-09.md`.
15. **ZMIANA NAZWY MARKI: „KRS Guard" → „Zarząd Guard".** Objęła całe `www/`
    (121 wystąpień nowej nazwy, zero starej) — nagłówki, stopki, tytuły
    stron, teksty. Nazwy plików i repo świadomie bez zmian (patrz ramka na
    początku tego dokumentu).
16. **Menu w nagłówku w jednej linii.** Pozycja „Blog" spadała do drugiego
    rzędu — brakowało 31 px. Odzyskane na odstępach (`gap` 14→10 px,
    wypełnienie pozycji 6→4 px, odstępy nagłówka 18→14 i 12→8 px), bez
    zmniejszania logo ani nazwy marki. Próg menu mobilnego podniesiony
    980→1180 px, żeby na węższych ekranach pojawiał się „hamburger" zamiast
    łamanego paska. Sprawdzone pomiarem przy 1280, 1181 i 1100 px.

**Rozstrzygnięte decyzje:**

- Stack: statyczny HTML/CSS/JS bez build (patrz sekcja „Co to za projekt").
- Marka/profil: **Zarząd Guard** (od 09.08.2026), ochrona członków zarządu;
  rejestracja → odesłanie do partnerskiej Kancelarii PRS.
- Cennik: lejek + **3 pakiety** (art. 299 KSH, US/ZUS, Zarząd SAFE);
  Audyt 48h i Kalkulator to NIE pakiety, tylko wcześniejsze kroki lejka.
- Kalkulator: osobna aplikacja, strona tylko linkuje (patrz sekcja niżej).
- Dane kontaktowe: na razie **placeholdery** w `kontakt.html` (i w stopce)
  — wyraźnie oznaczone (klasa `.ph`), do podmiany przed publikacją.

**Wciąż do ustalenia:**

- **Prawdziwe dane kontaktowe** — imię i nazwisko radcy prawnego, telefon,
  e-mail, adres, NIP, godziny. Podmienić placeholdery w `www/kontakt.html`
  i stopkach.
- **Hosting** i **docelowy adres (domena)** strony — decyzja na etapie
  publikacji.
- **Realna obsługa formularza Audytu 48h** — obecnie makieta (tylko podgląd
  maila / `mailto:`, bez wysyłki na serwer). Docelowo podłączyć bezpieczną
  obsługę zgłoszeń.
- **Treści do zatwierdzenia** — pytania i odpowiedzi w `faq.html` oraz
  sześć artykułów `blog-*.html` to propozycje napisane od nowa; mają widoczne
  notki „wersja robocza / do akceptacji radcy", do usunięcia po zatwierdzeniu.
- **Polityka prywatności** — podstrona `www/polityka-prywatnosci.html` już
  istnieje (szkielet napisany 03.08.2026), ale ma placeholdery zamiast
  danych administratora/NIP. Uzupełnić razem z prawdziwymi danymi
  kontaktowymi, przed publikacją.
- **Adres w handoffie do Kancelarii PRS** — obecnie link do
  `https://kancelaria-prs.vercel.app/` (podgląd Vercel). Podmienić na
  docelowy adres (np. `kancelariaprs.com`), gdy będzie ustalony.
- **Identyfikacja wizualna** — ZAMKNIĘTE 09.08.2026. Marka Zarząd Guard ma
  własne logo-tarczę zrobione w Canvie (projekt `DAHRvQt6Slo`), wdrożone jako
  `assets/krs_guard_logo_transparent.png` (nazwa pliku historyczna). Plik
  źródłowy i wersja odrzucona leżą w `logo/`. Nie „poprawiać" tego znaku
  bez wyraźnej prośby właściciela.

Nie zgadywać nierozstrzygniętych decyzji — dopytać użytkownika, gdy nadejdzie
ich kolej, w prosty, niejargonowy sposób (patrz sekcja o stylu współpracy
wyżej).
