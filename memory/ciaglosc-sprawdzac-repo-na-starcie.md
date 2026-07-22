---
name: ciaglosc-sprawdzac-repo-na-starcie
description: Na starcie sesji NAJPIERW sprawdzić plany/ i memory/ w repo — mogą być z drugiego komputera
metadata: 
  node_type: memory
  type: feedback
  originSessionId: f22145cd-69fd-46c5-98dc-86d2ff0b8522
  modified: 2026-07-22T17:01:05.321Z
---

Na starcie każdej sesji sprawdzić zawartość `plany/` i `memory/` w repo
ZANIM zacznie się planować/kodować. Użytkownik pracuje na dwóch komputerach;
poprzednia sesja mogła zostawić w repo plan lub pamięć, których lokalny
magazyn na tym komputerze nie ma.

**Why:** 22.07.2026 pominąłem ten krok i zaplanowałem stronę od nowa, nie
widząc, że w repo leżał już wcześniejszy plan
(`plany/nowa-strona-eleventy-netlify.md`) z innym stackiem. Powstał konflikt,
który trzeba było wyjaśniać z użytkownikiem w trakcie pracy. Zasada jest
zapisana w `CLAUDE.md` („Ciągłość pracy między komputerami" → „Na starcie
sesji… Sprawdzić to jako pierwszy krok").

**How to apply:** pierwszą rzeczą w sesji zajrzeć do `plany/*.md` i
`memory/*.md` w repo. Jeśli różnią się od oczekiwań/lokalnego stanu — repo
wygrywa, zsynchronizować. Jeśli istniejący plan opisuje inne podejście niż
to, które użytkownik teraz proponuje — surface'ować to od razu, nie budować
po cichu wersji sprzecznej z wcześniejszą decyzją. Patrz
[[stack-decyzja-statyczny-html]].
