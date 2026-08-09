---
name: slownictwo-bez-zargonu
description: "Konkretne słowa, których NIE używać w rozmowie z właścicielem (m.in. „repo") i czym je zastępować — wyłapane na żywo, uzupełnia ogólną zasadę o niejargonowym stylu"
metadata:
  node_type: memory
  type: feedback
---

Właściciel zapytał wprost: „nie rozumiem dlaczego folder
»kancelaria-prs-strona-www« nazywasz repo" (09.08.2026). To nie było pytanie
o Gita — to sygnał, że używam słowa, które dla niego nic nie znaczy, i robię
to od wielu sesji.

**Why:** właściciel jest radcą prawnym, nie osobą techniczną (patrz sekcja
„Kim jest użytkownik" w `CLAUDE.md`). Żargon nie tylko utrudnia mu
zrozumienie — sprawia, że musi przerywać pracę i dopytywać, co kosztuje czas
nas obu. Ogólna zasada „pisz po ludzku" jest w `CLAUDE.md` od początku, ale
najwyraźniej za mało konkretna, skoro „repo" przechodziło mi przez palce
w prawie każdej wiadomości.

**How to apply:** zamiast żargonu pisać wprost, co to jest fizycznie:

| Nie pisać | Pisać |
|---|---|
| repo, repozytorium | folder projektu; folder `kancelaria-prs-strona-www` |
| katalog główny repo | bezpośrednio w folderze `kancelaria-prs-strona-www` (nie w podfolderze) |
| commit / zacommitować | zapisać wersję; zapisać zmianę |
| push / wypchnąć | wysłać na GitHub |
| pull | pobrać najnowszą wersję z GitHuba |
| branch | (nie używamy — pracujemy na jednej wersji) |

Jeśli jakieś pojęcie techniczne jest naprawdę potrzebne, podać je **razem
z wyjaśnieniem w tym samym zdaniu**, a nie licząc, że kontekst wystarczy.

Reguła ogólna: przed wysłaniem wiadomości sprawdzić, czy nie ma w niej słowa,
którego właściciel nie usłyszałby od kolegi z kancelarii. Patrz też
[[stan-pracy-2026-08-09]] — tam lekcja o tym, że lepiej raz zrobić porządnie
niż pięć razy po łebkach; to ten sam wzorzec: pośpiech kosztem zrozumienia.
