---
name: weryfikacja-tresci-ze-stron-www
description: Standing rule - przy kazdym badaniu opartym na przegladaniu stron WWW wymagac doslownego cytatu + URL albo "NIE ZNALEZIONO", zeby ograniczyc ryzyko zmyslonych/nieścislych twierdzen (konfabulacji) w zestawieniach
metadata:
  node_type: memory
  type: feedback
  originSessionId: ca3a4059-f934-409d-b70b-5c94b93f664c
  modified: 2026-08-06T00:00:00.000Z
---

Zasada obowiązująca przy KAŻDYM badaniu/zestawieniu opartym na przeglądaniu wielu stron WWW
(nie tylko lista konkurencji) — wprowadzona po tym, jak w zestawieniu konkurencji KRS Guard
(`plany/lista-konkurencji-KRS-Guard-2026-08-05.xlsx`) właściciel osobiście wychwycił kilka
zmyślonych/nieścisłych twierdzeń, mimo że wcześniej zostały opisane jako „zweryfikowane z
pierwszej ręki". Przy kontrolnym sprawdzeniu 4 zakwestionowanych wpisów (06.08.2026) 2 okazały
się częściowo lub całkowicie zmyślone (nieistniejące FAQ u Jakubowskiej-Zawady, wymyślone liczby
w case study PW Restrukturyzacja), jeden istotnie nieścisły (UpStart Legal opisany jako
działający „wyłącznie zdalnie" mimo posiadania biura). Błędy nie ograniczały się do jednej
kolumny — dotyczyły też opisu modelu obsługi i cen, nie tylko pola „ciekawe pomysły".

**Why:** subagenci wywoływani do przeglądania stron nie kopiują treści 1:1 — generują
streszczenie/syntezę. Przy prostym odczycie ("co jest napisane") ryzyko małe. Przy prośbie o
wniosek/ocenę/"ciekawy pomysł" model czasem dopisuje szczegół brzmiący wiarygodnie (bo pasuje do
wzorca typowego dla takich stron), zamiast trzymać się wyłącznie tego, co faktycznie zobaczył na
TEJ konkretnej stronie. To nie jest losowe — nasila się przy każdej prośbie o syntezę, nie tylko
przy jednym konkretnym typie pytania.

**How to apply (obowiązkowe przy każdym kolejnym takim zadaniu, w tym i w bliźniaczym repo
`Kalkulator_ryzyka_app`):**

1. Każde twierdzenie faktograficzne w zestawieniu (komórka Excela, punkt w raporcie) musi mieć
   albo dosłowny cytat w cudzysłowie + adres URL konkretnej podstrony źródłowej, albo wprost
   „NIE ZNALEZIONO" — nigdy parafraza bez zakotwiczenia w cytacie.
2. Dotyczy to też pól typu „ciekawe pomysły", „ocena", „wnioski" — muszą wskazywać konkretny,
   zaobserwowany element strony (co dokładnie i gdzie), nie wolno „wymyślać" ulepszenia bez
   podstawy źródłowej. To właśnie tu skupiły się błędy przy pierwszym podejściu.
3. W promptach do subagentów przeglądających strony wprost dopisywać: „Jeśli nie możesz
   zacytować dokładnego fragmentu, napisz 'nie znalazłem' — nie zgaduj i nie parafrazuj z
   pamięci ogólnej wiedzy o takich stronach."
4. Przed przedstawieniem czegokolwiek jako „zweryfikowane", samodzielnie (nie tylko przez
   subagenta, na słowo) sprawdzić chociaż próbkę — 2–3 najważniejsze/najbardziej ryzykowne
   twierdzenia — bezpośrednio w przeglądarce, zanim się to nazwie gotowym. Nie nazywać czegoś
   „zweryfikowanym z pierwszej ręki", jeśli weryfikacja polegała tylko na tym, że INNY subagent
   to napisał — to nie jest weryfikacja, to drugie źródło tego samego ryzyka.
5. W finalnym zestawieniu dodawać widoczny status weryfikacji per wiersz/twierdzenie (np.
   „zweryfikowano źródłowo: TAK / CZĘŚCIOWO / NIE"), żeby użytkownik od razu widział, czemu może
   zaufać bez sprawdzania, a co jeszcze wymaga jego spojrzenia — zamiast przedstawiać cały
   dokument jako jednolicie pewny.
6. Gdy właściciel zgłasza wątpliwość co do konkretnego twierdzenia — sprawdzać ją NAPRAWDĘ (żywy
   browsing, nie założenie z pamięci), nawet jeśli wcześniejsza wersja wyglądała solidnie.

Patrz też [[ciaglosc-sprawdzac-repo-na-starcie]] — ta sama rodzina zasad: nie ufać bezkrytycznie
poprzednim ustaleniom (własnym lub cudzym), sprawdzać źródło, gdy coś jest istotne.
