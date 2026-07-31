---
name: browser-preview-css-cache
description: Wewnętrzny podgląd (Browser pane) narzędzi Claude Code potrafi trzymać stary styles.css w cache mimo nowej karty/odświeżenia
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7e6b4554-eb29-4587-a046-c1568a1cc5b1
  modified: 2026-07-31T16:23:22.053Z
---

Podgląd strony w Browser pane (narzędzia `mcp__Claude_Browser__*`) w tym
projekcie kilkukrotnie (31.07.2026) pokazywał **starą wersję `www/styles.css`**
mimo świeżo zapisanych zmian na dysku — nawet po `location.reload(true)`,
nowej karcie (`tabs_create`) i twardej nawigacji. Dopiero potwierdzenie
właściciela w jego prawdziwym Edge (skrót na pulpicie) pokazywało poprawny
wygląd.

**Why:** to wyłącznie cache po stronie narzędzia podglądu (proces Edge
uruchomiony przez Claude Code, osobna sesja Windows — patrz
[[stan-pracy-2026-07-31]], sekcja „Pułapka przy testach agenta"), nie błąd w
kodzie. Zweryfikowane: `fetch(url, {cache:'no-store'})` na plik `styles.css`
zawsze pokazywał poprawną, nową treść, podczas gdy `document.styleSheets`
załadowany do DOM-u tej samej karty wciąż miał starą regułę.

**How to apply:** przy weryfikacji zmian CSS w tym projekcie NIE walczyć w
kółko z odświeżaniem podglądu (nowe karty, reload(true) — nie pomagają).
Zamiast tego:
1. Zweryfikować treść pliku na dysku przez `fetch(..., {cache:'no-store'})`
   albo bezpośrednio odczytać plik (Read/Grep) — to potwierdza, że zmiana
   faktycznie się zapisała.
2. Nie raportować „gotowe" właścicielowi na podstawie wyglądu w Browser pane,
   jeśli podejrzewasz cache — poprosić o potwierdzenie w jego własnym Edge
   (skrót na pulpicie, patrz [[stan-pracy-2026-07-31]]).
3. Nie tracić czasu na kolejne próby wymuszenia świeżego CSS w tym samym
   podglądzie — to nie jest naprawialne od strony kodu strony.
