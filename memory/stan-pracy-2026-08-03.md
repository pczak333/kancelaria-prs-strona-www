---
name: stan-pracy-2026-08-03
description: "Aktualny stan prac nad stroną KRS Guard (03.08.2026) — Etapy 1-4 audytu zrobione, Etap 5 (drobiazgi) czeka"
metadata: 
  node_type: memory
  type: project
  originSessionId: 7e6b4554-eb29-4587-a046-c1568a1cc5b1
  modified: 2026-08-03T16:36:20.419Z
---

Bieżący punkt zapisu — **03.08.2026, po przerwie w sesji (kontynuacja tego
samego dnia)**. Zastępuje `stan-pracy-2026-07-31` (tamten opisuje stan
sprzed tej sesji; podgląd lokalny i pułapki testowe nadal aktualne — patrz
tamten plik). Na starcie sesji zsynchronizować się z repo (repo wygrywa),
patrz [[ciaglosc-sprawdzac-repo-na-starcie]].

**Stan:** makieta strony **KRS Guard** w `www/` — **wszystkie 16 poprawek
z Etapów 1–4 audytu (03.08.2026) wprowadzone i wypchnięte na GitHub.**
Etap 5 (drobiazgi) jeszcze nie zrobiony.

## NASTĘPNY KROK (to jest to, po co wracamy)

Właściciel podziękował za sesję i **przerwał na 3 godziny**, prosząc o
zapisanie wszystkiego. Po powrocie, w kolejności:

1. **Zapytać, czy kontynuować z Etapem 5** (drobiazgi z audytu — lista niżej
   i w `plany/poprawki-po-audycie-2026-08-03.md`) — to jedyna niezrobiona
   część oryginalnego planu.
2. **Do zweryfikowania przy okazji:** pole „potwierdzenie doręczenia" w
   formularzu Audytu 48h jest nadal `required` w walidacji JS
   (`audyt-48h-form.html:964-970`) — sprawdzić, czy to nadal spójne z nowym
   dwuetapowym procesem wyceny (patrz punkt 10 niżej). Nie zakładać, że to
   już naprawione — nie było w tym jawnie dotykane.
3. Poza tym — brak pilnych otwartych pytań do właściciela. Można normalnie
   zapytać, czym się dziś zajmujemy.

## Zrobione 03.08.2026 (cała sesja, oba bloki przed i po przerwie)

**Przed przerwą — przygotowanie do audytu i przegląd strony:**
1. Odchudzenie strony głównej (`17e667c`) — baner do jednej karty, sekcja
   „Jak pomagamy" do paska 3 przycisków `.quicklinks`.
2. Uporządkowanie „Jak pomagamy" (`25765c5`) — usunięta metafora „Twoja
   tarcza", 4 karty CTA → 1 sekcja „Jak zacząć" z 3 krokami.
3. Cennik — rozróżnienie Kalkulator (algorytm, 24h, nieprzesyłane) vs Audyt
   (radca prawny) — `0b9f432`, ikony `16336df`.
4. Poprawka w OSOBNYM repo `Kalkulator_ryzyka_app` (`5be2b71`) — notka o
   danych: 48h→24h, dopisane „automatyczny algorytm, nikt z zespołu nie czyta".
5. FAQ +6 pytań (`611095e`).
6. 6 pełnych artykułów na blogu jako `blog-*.html` (`7adb607`).
7. Ujednolicenie czcionek + logo na stronie głównej (`8225eaf`).
8. **AUDYT CAŁEJ STRONY** (workflow `wf_8c657a31-c80`) — 40 zgłoszeń → 30
   potwierdzonych → 19 spraw. Plan: `plany/poprawki-po-audycie-2026-08-03.md`.

**Po przerwie — wprowadzenie poprawek z audytu (Etapy 1–4, WSZYSTKIE zrobione):**

9. **Etap 1 — błędy prawne.** Właściciel potwierdził oba jako radca:
   - Art. 299 KSH zawężony do sp. z o.o. (usunięte PSA/S.A.) — `3d0710c`.
   - Droga odwoławcza US/ZUS rozdzielona, BEZ konkretnych terminów
     (odesłanie do pouczenia w decyzji, na życzenie właściciela) — `1be46a1`.
   - Przesłanki uwalniające (art. 299 vs art. 116) rozbite na dwa punkty,
     ujednolicone „w znacznej części" — `70f151e`.
10. **Etap 2 — sprzeczności w ofercie.**
    - Kafelki atutów na stronie głównej przestały obiecywać KRS/obsługę
      biznesową — `3101cc4`.
    - Pakiet Zarząd SAFE doprecyzowany (dokumenty przygotowujemy MY, wniosek
      do KRS składa Kancelaria PRS) — `5c534be`.
    - Termin Audytu ujednolicony w 5 miejscach — `5a71a17` (patrz też pkt 12,
      podstawa czasu zmieniła się jeszcze raz przy okazji dwuetapowego procesu).
    - Cena „od 900 zł netto" dodana na stronie Audytu 48h — `f012488`.
11. **Etap 3 — formularz.**
    - Klikalny telefon/e-mail (placeholder `.ph`) w komunikacie pilnym — `afcc49c`.
    - **Dwuetapowy proces Audytu 48h — NOWOŚĆ spoza pierwotnej listy 19,
      z inicjatywy właściciela** (`c3de8df`): (1) klient wysyła dokumenty →
      (2) sprawdzamy kompletność i potwierdzamy cenę, właściwa analiza
      JESZCZE się nie zaczyna → (3) klient akceptuje i płaci → (4) w 2 dni
      robocze OD AKCEPTACJI dostaje rekomendację. Brak akceptacji = brak
      opłaty + dokumenty usuwamy. To odpowiedź na realny problem
      biznesowy: co robić z przesłanymi dokumentami, gdy klient nie
      zaakceptuje wyceny. Spójnie w 5 plikach.
    - Polityka prywatności — nowa podstrona (szkielet z placeholderami),
      link w stopce wszystkich 14 podstron + przy formularzu — `16b5e29`.
      **Ta sama commit** zawiera też: literówkę w CSS formularza (brakujący
      średnik), ujednolicony czas wypełniania („3–6 min"), usunięcie
      przedwczesnej etykiety pakietu z pierwszego pytania formularza.
12. **Etap 4 — wygląd.** Wszystko w commicie `8d088b6`:
    - Zdjęcie z Unsplash usunięte z tła hero; czcionka Poppins pobrana i
      wgrana lokalnie (`www/assets/fonts/`, 8 plików woff2 latin+latin-ext).
    - Logo w nagłówku — naprawiony podwójny margines (`.header{padding:14px 0 10px}`).
    - Główny nagłówek `<h1>` dodany na stronie głównej (był `<strong>`).
    - Banery kalkulatora i audytu ujednolicone (krój, wielkość, `flex:1`) +
      responsywność na telefonie (ikona nad tekstem ≤560px).
    - **Dodatkowo z inicjatywy właściciela:** usunięty przycisk „Zamów Audyt
      48h" z hero na stronie głównej (zostało tylko „Sprawdź swoje ryzyko" —
      darmowe, nie wymaga wcześniejszego tłumaczenia). Kolory ujednolicone:
      `.quicklinks` i baner Audytu zmienione z turkusu (`var(--brand)`) na
      granat (`var(--ink)`), zgodny z przyciskami „Szczegóły" na Cenniku.
      Granat kalkulatora `#1a3a5c` sformalizowany jako zmienna `--calc-navy`
      (świadomy wyjątek — replika kolorów prawdziwej appki kalkulatora, NIE
      pomyłka, nie ujednolicać go z resztą). Martwe CSS `.tabs`/`.tab` usunięte.

## Najważniejsze do zapamiętania na przyszłość

- **`--calc-navy` (#1a3a5c) to świadomy wyjątek** — kolor repliki prawdziwej
  aplikacji kalkulatora (Streamlit), nie błąd niespójności. Nie „poprawiać"
  go na granat reszty strony.
- **Dwuetapowy proces wyceny Audytu 48h** to teraz oficjalny model
  biznesowy opisany na stronie — jeśli w przyszłości podłączymy prawdziwy
  backend formularza, będzie potrzebny dodatkowy krok „akceptacja
  wyceny" (np. link w mailu) między przesłaniem dokumentów a rozpoczęciem
  płatnej pracy. To nie jest jeszcze zaimplementowane technicznie (formularz
  to wciąż makieta) — tylko opisane w treści strony.
- Workflow audytu (`wf_8c657a31-c80`) użył customowego scenariusza, nie
  gotowego skilla — 5 recenzentów + 5 adwokatów diabła + 1 synteza = 11 agentów.

## Otwarte punkty (bez zmian — NIE ruszać bez prośby właściciela)

- **ETAP 5 z audytu — 7 drobiazgów, jeszcze nie zrobione** (pełna lista w
  `plany/poprawki-po-audycie-2026-08-03.md`): brak info o algorytmie/24h na
  stronie kalkulatora, FAQ sugerujące start od Audytu, mylący przycisk
  „Wróć do KRS Guard", cieńsza ikona stopera, angielskie cudzysłowy na
  blogu, brak `aria-expanded` w FAQ, ogólne porządki w martwym CSS.
- Prawdziwe dane kontaktowe (placeholdery `.ph` w `kontakt.html`,
  `polityka-prywatnosci.html`, `audyt-48h-form.html`). **Powiązane:**
  uzupełnienie polityki prywatności — do zrobienia razem, przed publikacją.
- Adres odesłania do Kancelarii PRS — `kancelaria-prs.vercel.app` → docelowy.
- Statystyki na stronie głównej (100+ / 4+ / 24h) — do decyzji.
- Hosting/domena oraz realna obsługa formularza Audytu 48h (dziś makieta;
  patrz uwaga o dwuetapowym procesie wyżej — wpłynie na kształt backendu).
- Treści blogowe i FAQ — do akceptacji radcy (mają widoczne notki robocze).
