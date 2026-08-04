---
name: stan-pracy-2026-08-04
description: "Aktualny stan prac (04.08.2026) — audyt kalkulatora ryzyka, Wariant A (uczciwe oświadczenia o danych), 7 błędów kalkulatora naprawionych"
metadata: 
  node_type: memory
  type: project
  originSessionId: 7e6b4554-eb29-4587-a046-c1568a1cc5b1
  modified: 2026-08-04T21:30:37.072Z
---

Bieżący punkt zapisu — **04.08.2026**. Zastępuje `stan-pracy-2026-08-03`
(tamten opisuje audyt STRONY i jego 19 poprawek — wszystkie zrobione).
Na starcie sesji zsynchronizować się z repo (repo wygrywa), patrz
[[ciaglosc-sprawdzac-repo-na-starcie]].

**Stan:** strona **KRS Guard** gotowa treściowo i wizualnie. Dziś pracowano
głównie nad **kalkulatorem ryzyka** (osobne repo `Kalkulator_ryzyka_app`),
bo właściciel uznał go za kluczowy dla wiarygodności całej oferty.

## NASTĘPNY KROK

Brak pilnych zadań technicznych. Do publikacji strony brakuje wyłącznie rzeczy
**po stronie właściciela** (patrz „Otwarte punkty" niżej) — przede wszystkim
prawdziwych danych kontaktowych i usunięcia notek „makieta / wersja robocza".

## Co zrobiono 04.08.2026

### 1. Rola „potencjalny klient" — ocena strony oczami odbiorcy
Właściciel poprosił o wcielenie się w byłego członka zarządu z pozwem z art. 299.
Wnioski: treść i ton trafiają w sytuację, ceny podane wprost budują zaufanie,
dwuetapowy proces wyceny uspokaja. **Ale**: widoczne notki „to makieta" i
„wersja robocza" na stronie Audytu i w artykułach oraz placeholdery zamiast
danych kontaktowych to największa dziura zaufania — klient z realnym terminem
zamyka kartę, bo nie widzi żywego człowieka po drugiej stronie. To nie są
kosmetyczne szczegóły „na kiedyś" — to priorytet przed publikacją.

### 2. AUDYT KALKULATORA (workflow `wf_78abe00a-26d`, 13 agentów)
43 zgłoszenia → 19 potwierdzonych. Recenzje „zgodność kodu z regułami CSV"
i „ścieżka dokumentu" nie dały ani jednego potwierdzonego znaleziska.
**Pełny opis w repo kalkulatora:** `memory/project_audyt_przed_publikacja_2026-08-04.md`.

### 3. NAJWAŻNIEJSZE: obietnice o danych były NIEPRAWDZIWE
Strona w 4 miejscach mówiła, że dane „nigdzie nie są przesyłane" i są
„usuwane po 24 godzinach". Weryfikacja w kodzie:
- **Wgrany dokument JEST wysyłany** — do Microsoft Azure (skany) i do Anthropic
  (pierwsze 4000 znaków tekstu, przy KAŻDYM dokumencie): imiona, nazwiska,
  sygnatura, kwoty.
- **Odpowiedzi z formularza** nie idą do usług AI (to prawda), ale przechodzą
  przez serwer aplikacji — Streamlit działa server-side, więc wcześniejszy
  skrót „nie opuszczają przeglądarki" był nieścisły.
- **Mechanizmu usuwania po 24h NIE MA w kodzie.** Nic nie jest zapisywane na
  dysk ani do bazy; dane znikają z końcem sesji, czyli SZYBCIEJ niż obiecywano.

**Decyzja właściciela: WARIANT A** — opisać uczciwie, nie wyłączać wgrywania
(„odczyt dokumentów zwiększa wiarygodność kalkulatora"). Wdrożone:
- Strona (`c5f47c5`): przepisane teksty w `narzedzia.html`, `uslugi-cennik.html`,
  `faq.html`, `polityka-prywatnosci.html` — rozdzielone dwa tryby (formularz
  ręcznie vs wgranie pliku), Microsoft/Anthropic/Snowflake wymienieni z nazwy,
  informacja o przekazaniu poza EOG, sekcja o okresach przechowywania.
- Kalkulator (`650fc8c`): notka PRZED przyciskiem wgrywania (nie po analizie),
  poprawiony baner po analizie, notka o danych na początku formularza
  (widoczna też przy ręcznym wypełnianiu).

**DO POTWIERDZENIA PRZEZ WŁAŚCICIELA JAKO RADCĘ:** czy faktycznie są zawarte
umowy powierzenia z Microsoftem i Anthropic; czy przekazanie poza EOG opieracie
na standardowych klauzulach umownych; czy doprecyzować retencję po stronie
dostawców (Anthropic domyślnie przechowuje dane wejściowe API przez pewien czas).

### 4. Jakość odczytu dokumentów — przetestowana realnie
Zbudowano 6 realistycznych polskich pism ze znaną prawidłową odpowiedzią.
**Wszystkie 6 odczytane bezbłędnie**, łącznie z celowo zepsutym zdjęciem
z telefonu (45% rozdzielczości, obrót, szum). Faktura za prąd poprawnie
odrzucona jako dokument niesądowy.

**ALE: klucz Azure NIE DZIAŁA (401)** — oba klucze z `klucze.txt` odrzucone,
zweryfikowane oficjalnym SDK. Zasób w Azure istnieje, więc problem to same
klucze. Skutek: każdy skan idzie ścieżką zapasową (Claude) — działa, ale
**55–65 s na stronę** i drożej. Do sprawdzenia w portalu Azure (zasób
`krs-guard` → Keys and Endpoint) oraz w panelu Streamlit Cloud (produkcja ma
własne sekrety). Klucz Anthropic działa.

### 5. Siedem błędów kalkulatora naprawionych (każdy zweryfikowany testem)
1. **Wynik nie przeliczał się po zmianie odpowiedzi** — klient widział starą
   ocenę ryzyka i mógł pobrać niezgodny PDF (`c8ee153`).
2. **Wyrok zaoczny → porada o nakazie zapłaty** (`b303d3a`, dokończone `189f9a4`).
3. **Ostrzeżenie o niepewnym odczycie nie docierało** do klienta (`02d5a08`).
4. **„pozostało -201 dni"** przy starej dacie (`00529ab`).
5. **Sprzeczność przy minionym terminie** (`64b3125`).
6. **Obietnica, że Audyt zdąży przed terminem** przy 2–3 dniach (`64b3125`).
7. **Czerwony błąd zamiast formularza** przy dziwnej dacie (`64b3125`).

## LEKCJA z tej sesji (ważna na przyszłość)

Poprawka wyroku zaocznego początkowo **nie działała w większości spraw** —
podmiana nazwy dokumentu wyliczała warianty zdania ręcznie i pokrywała 3 z 5
faktycznie występujących w CSV, więc 204 z 360 osiągalnych kombinacji nadal
mówiło „nakaz zapłaty". **Wykryte dopiero po pytaniu właściciela o dokumentację,
nie przez mój test.** Naprawione regexem, zweryfikowane na wszystkich 720
kombinacjach.

Wniosek: przy podmianach tekstu opartych na dopasowaniu frazy **nie wystarczy
sprawdzić jednego przykładu** — trzeba przejść wszystkie osiągalne kombinacje
przez prawdziwy łańcuch obliczeń (poziom ryzyka nie jest dowolny, wyznacza go
punktacja i twarde reguły).

## Otwarte punkty

**Blokujące publikację strony (po stronie właściciela):**
- **Prawdziwe dane kontaktowe** — nazwisko radcy, telefon, e-mail, adres, NIP.
  Placeholdery `.ph` w `kontakt.html`, `polityka-prywatnosci.html`,
  `audyt-48h-form.html`.
- **Usunięcie notek „makieta / wersja robocza"** — strona Audytu, FAQ,
  6 artykułów blogowych. Do zrobienia po zatwierdzeniu treści przez radcę.

**Do decyzji radcy:**
- Zapisy o umowach powierzenia i przekazaniu poza EOG (patrz pkt 3).
- Czy kalkulator ma powoływać konkretny przepis przy przesunięciu terminu
  z dnia wolnego — usunięto zakwestionowane „art. 115 KPC", został sam opis reguły.

**Techniczne, niepilne:**
- Klucz Azure (patrz pkt 4).
- Pole „potwierdzenie doręczenia" w formularzu Audytu nadal `required` —
  do przemyślenia przy podłączaniu prawdziwego backendu.
- Hosting/domena, realna obsługa formularza Audytu, docelowy adres Kancelarii PRS,
  statystyki na stronie głównej (100+/4+/24h).
- Warto powtórzyć test odczytu na 2–3 prawdziwych, zanonimizowanych pismach.
