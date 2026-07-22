# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Co to za projekt

Strona internetowa **Kancelarii PRS** (kancelaria prawna). Repo GitHub:
`pczak333/kancelaria-prs-strona-www`.

**Stack technologiczny: JESZCZE NIE WYBRANY.** To pierwsza rzecz do
ustalenia, zanim zacznie się pisać kod — patrz sekcja "Do ustalenia" niżej.
Jak tylko zapadnie decyzja (framework, hosting, struktura katalogów), **ten
plik trzeba od razu zaktualizować** — reszta sekcji poniżej zakłada, że ta
decyzja już zapadła.

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

## Do ustalenia (pierwsze decyzje projektu)

- Stack technologiczny strony (statyczny HTML/CSS/JS? generator stron
  statycznych? WordPress? coś innego?) — zależnie m.in. od tego, kto
  docelowo będzie tę stronę utrzymywał (sam użytkownik, czy zewnętrzna
  firma/deweloper).
- Hosting.
- Struktura/zawartość strony (podstrony, treści kancelarii, gdzie dokładnie
  ma się znaleźć przycisk/link do kalkulatora KRS Guard).
- Branding strony vs branding kalkulatora — kalkulator ma już własny,
  celowo odrębny znak graficzny (plakietka z literą K, patrz
  `Kalkulator_ryzyka_app`); dla tej strony trzeba będzie osobno ustalić
  identyfikację wizualną kancelarii.

Nie zgadywać żadnej z tych decyzji — dopytać użytkownika, gdy nadejdzie ich
kolej, w prosty, niejargonowy sposób (patrz sekcja o stylu współpracy
wyżej).
