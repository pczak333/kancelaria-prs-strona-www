# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Co to za projekt

Strona internetowa **Kancelarii PRS** (kancelaria prawna). Repo GitHub:
`pczak333/kancelaria-prs-strona-www`.

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
  `uslugi-cennik.html` (usługi w formie **kart**), `krs-guard.html`,
  `narzedzia.html` (intro kalkulatora → link do aplikacji Streamlit),
  `audyt-48h.html` + `audyt-48h-form.html` (wieloetapowy formularz,
  na razie makieta bez prawdziwego backendu), `kontakt.html`, `faq.html`,
  `blog.html` (szkielet). Wspólny wygląd: **`www/styles.css`** (jedno
  źródło prawdy dla CSS — koniec z duplikowaniem stylów w każdym pliku).
  Wspólny skrypt: **`www/main.js`** (podświetlanie aktywnej pozycji menu +
  rozwijanie FAQ). Grafiki/logotypy: `www/assets/`.
- `Dane_wejściowe/` — materiały źródłowe (m.in. stary prototyp
  `strona testowa_stara/`), tylko do odczytu, NIE część strony.

**Nawigacja jest samodzielna** — menu prowadzi wyłącznie do własnych
podstron w `www/`. Strona pod `kancelariaprs.com` to inny, równolegle
rozwijany projekt tej samej kancelarii; nowa strona będzie pod innym
adresem i **nie linkuje** do kancelariaprs.com. Nagłówek i stopkę trzymamy
wpisane w każdej podstronie (mała objętość, działa bez serwera) —
utrzymywać je spójnie między plikami.

Kalkulator ryzyka NIE jest wbudowany w stronę — `narzedzia.html` linkuje do
działającej aplikacji `https://kalkulatorryzyka.streamlit.app/` (patrz
sekcja o kalkulatorze niżej).

Podgląd lokalny (rozszerzenie Chrome blokuje `file://`): w folderze `www/`
uruchom `python -m http.server 8765` i wejdź na `http://localhost:8765/`.

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

## Relacja do kalkulatora ryzyka "KRS Guard"

Osobny, już działający projekt tej samej kancelarii: repo
`pczak333/Kalkulator_ryzyka_app` (Streamlit, Python), wdrożony pod
`https://kalkulatorryzyka.streamlit.app/`.

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

**Zrobione (22.07.2026):** pierwsza makieta strony w `www/` — wszystkie
podstrony, wspólny `styles.css` i `main.js`, styl wizualny przeniesiony ze
starego prototypu, nawigacja samodzielna, link do kalkulatora. Sprawdzone
wizualnie w przeglądarce. Plan: `plany/nowa-strona-makieta.md`.

**Rozstrzygnięte decyzje:**

- Stack: statyczny HTML/CSS/JS bez build (patrz sekcja „Co to za projekt").
- Cennik: w formie **kart usług** (nie rozwijanej tabeli).
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
  przykładowe kafelki w `blog.html` to propozycje napisane od nowa; blog nie
  ma jeszcze realnych wpisów.
- **Identyfikacja wizualna kancelarii** — obecnie logo „KANCELARIA / PRS"
  (serif) przeniesione z prototypu; kalkulator ma celowo odrębny znak
  (plakietka z literą K). Jeśli kancelaria zechce własne, docelowe logo —
  osobny temat.

Nie zgadywać nierozstrzygniętych decyzji — dopytać użytkownika, gdy nadejdzie
ich kolej, w prosty, niejargonowy sposób (patrz sekcja o stylu współpracy
wyżej).
