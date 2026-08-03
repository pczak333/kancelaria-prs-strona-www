---
name: stan-pracy-2026-08-03
description: Aktualny stan prac nad stroną KRS Guard (03.08.2026) — po audycie; lista poprawek czeka w plany/
metadata: 
  node_type: memory
  type: project
  originSessionId: 7e6b4554-eb29-4587-a046-c1568a1cc5b1
  modified: 2026-08-03T11:32:36.046Z
---

Bieżący punkt zapisu — **03.08.2026**. Zastępuje `stan-pracy-2026-07-31`
(tamten opisuje stan sprzed tej sesji; podgląd lokalny i pułapki testowe
nadal aktualne — patrz tamten plik). Na starcie sesji zsynchronizować się
z repo (repo wygrywa), patrz [[ciaglosc-sprawdzac-repo-na-starcie]].

**Stan:** makieta strony **KRS Guard** w `www/` — po przeglądzie treści
i grafiki, przed wprowadzeniem poprawek z audytu.

## NASTĘPNY KROK (to jest to, po co wracamy)

Właściciel zaakceptował listę poprawek z audytu i **przerwał sesję na 3
godziny, prosząc o zapisanie wszystkiego**. Po powrocie: wprowadzać
poprawki wg `plany/poprawki-po-audycie-2026-08-03.md` (19 spraw w 5 etapach,
z numerami linii).

**Zacząć od ETAPU 1 — ale najpierw zadać pytanie, które zostało bez
odpowiedzi:** dwa błędy prawne (art. 299 KSH przypisany S.A./PSA; zła droga
odwoławcza przy ZUS) wymagają potwierdzenia właściciela **jako radcy
prawnego**, zanim je wprowadzimy. Pytanie było zadane na końcu poprzedniej
sesji, odpowiedź nie padła.

## Zrobione 03.08.2026

1. **Odchudzenie strony głównej** (commit `17e667c`). Baner spłaszczony
   z 4 zagnieżdżonych ramek do jednej karty (usunięte `.hero-grid`,
   `.hero-left/right`, `.copy-box` z ciemną obwódką; nowe `.hero-title`,
   `.hero-lead`). Sekcja „Jak pomagamy" + pełne powielenie 3 pakietów
   zastąpione paskiem 3 przycisków `.quicklinks` → podstrony. Powód:
   właściciel zgłosił, że strona główna jest przeładowana i powiela podstrony.
2. **Uporządkowanie „Jak pomagamy"** (`25765c5`). Usunięta myląca metafora
   „Twoja tarcza" i wątek rejestracji spółek (to nie nasza usługa). Cztery
   rozrzucone, powtarzające się karty CTA na dole zastąpione jedną sekcją
   „Jak zacząć" z 3 ponumerowanymi krokami (ten sam wzór `.quicklinks` co na
   stronie głównej).
3. **Cennik — rozróżnienie Kalkulator vs Audyt** (`0b9f432`, ikony `16336df`).
   Dopisane notki: Kalkulator = algorytm, dane nigdzie nieprzesyłane, kasowane
   po 24 h; Audyt 48h = ocena radcy prawnego. Do obu kart dodane te same
   ikony/kolory co na ich podstronach.
4. **Kalkulator — poprawka w OSOBNYM repo** (`Kalkulator_ryzyka_app`,
   commit `5be2b71`): notka o ochronie danych zmieniona z 48h na **24h** +
   doprecyzowane, że dokumenty analizuje automatyczny algorytm, nikt z zespołu
   ich nie czyta. **Właściciel potwierdził: dane nigdzie nie są przesyłane.**
5. **FAQ rozbudowane** (`611095e`) — 6 nowych pytań: różnica kalkulator/audyt,
   bezpieczeństwo danych, kto wybiera pakiet + 3 „chwytliwe" (utrata majątku,
   skutki zignorowania pisma, brak dokumentów).
6. **6 pełnych artykułów na blogu** (`7adb607`) jako osobne podstrony
   `blog-*.html`: bezskuteczna egzekucja, pozew 299 KSH (pierwsze 7 dni),
   art. 116 US/ZUS, zmiana zarządu w KRS, bezpieczne odejście, dokumenty do
   Audytu. Każdy ma notkę „wersja robocza do akceptacji radcy" + stałe
   zastrzeżenie „nie stanowi porady prawnej". `main.js` podświetla „Blog"
   także wewnątrz artykułów (`path.indexOf('blog-') === 0`).
7. **Ujednolicenie czcionek + większe logo** (`8225eaf`). Nagłówek i wstęp
   na stronie głównej były mniejsze niż na podstronach (22px/16px zamiast
   34px/18px) — skutek uboczny przebudowy banera w pkt 1. Logo 80→104 px
   (mobile 60→74), napis „KRS Guard" 32→36 px.
8. **AUDYT CAŁEJ STRONY** (workflow `wf_8c657a31-c80`, 11 agentów, 5 recenzji
   + adwersaryjna weryfikacja). 40 zgłoszeń → 30 potwierdzonych → 19 spraw
   po deduplikacji. Wyniki w `plany/poprawki-po-audycie-2026-08-03.md`.
   Nic jeszcze NIE poprawione — to jest lista na następną sesję.

## Najważniejsze ustalenia z audytu (skrót)

- **2 błędy prawne**: art. 299 KSH dotyczy tylko sp. z o.o. (my piszemy
  „sp. z o.o., PSA lub S.A."); przy ZUS podajemy złą drogę odwoławczą
  (sąd administracyjny/14 dni zamiast sądu okręgowego/miesiąc).
- **`www/index.html:109`** — kafelek „Specjalizacja" wciąż obiecuje KRS
  i obsługę biznesową (pozostałość po starej marce). **Znalazły to 4 z 5
  recenzji** — najbardziej widoczny błąd na stronie.
- **Audyt 48h ma 3 różne terminy** w 4 plikach („48 godzin" / „dwa dni
  robocze" / „dwa dni").
- **Formularz wymaga zwrotki**, choć FAQ i blog obiecują, że braki nie blokują.
- **Zdjęcie w banerze (Unsplash) i czcionka Poppins ładują się z obcych
  serwerów** — to tłumaczy, czemu podgląd bez internetu wygląda inaczej
  niż docelowo (osobna sprawa od [[browser-preview-css-cache]]).

## Otwarte punkty (bez zmian — NIE ruszać bez prośby właściciela)

- Prawdziwe dane kontaktowe (placeholdery `.ph` w `www/kontakt.html`).
  **Powiązane:** polityka prywatności i klauzula przy formularzu (pkt 12
  planu) — do zrobienia razem, przed publikacją.
- Adres odesłania do Kancelarii PRS — `kancelaria-prs.vercel.app` → docelowy.
- Statystyki na stronie głównej (100+ / 4+ / 24h) — do decyzji.
- Hosting/domena oraz realna obsługa formularza Audytu 48h (dziś makieta).
- Treści blogowe i FAQ — do akceptacji radcy (mają widoczne notki robocze).
