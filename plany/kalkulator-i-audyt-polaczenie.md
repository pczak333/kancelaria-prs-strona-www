# Połączenie Kalkulatora ryzyka z Audytem 48h (Guard-www)

> **STAN NA 19.08.2026 — Etap A ZROBIONY.** Formularz Audytu w Guard-www
> przyjmuje wynik z Kalkulatora, po potwierdzeniu klienta, że to ta sama sprawa.
> **Etap B (przycisk w Kalkulatorze) — TEŻ ZROBIONY 19.08.2026.** Kalkulator ma
> sekcję „Co dalej?" z przyciskiem prowadzącym do formularza Audytu.

## Nazewnictwo projektów (ustalone 19.08.2026)

- **Guard-www** = folder `kancelaria-prs-strona-www` — **ten projekt**.
- **Portal** = folder `portal-zarzad-guard` — osobne przedsięwzięcie, sieć
  współpracujących kancelarii w miastach.

Te prace dotyczą **wyłącznie Guard-www**. Zostały omyłkowo wprowadzone najpierw
w Portalu i stamtąd cofnięte (zapis „Cofnij polaczenie Kalkulatora z Audytem").
Formularze różnią się: Guard-www ma **7 kroków**, Portal **8** (dodany wybór
formy obsługi i miasta). **Nie kopiować plików między projektami** — trzeba
przenosić samą zmianę.

## Po co to robimy

Kalkulator ryzyka (`kalkulatorryzyka.streamlit.app`) i formularz Audytu 48h to
były dwa osobne światy:

1. Klient wypełniał to samo dwa razy — kalkulator i formularz pytają o rodzaj
   pisma, daty, rolę w zarządzie i kwotę.
2. Kancelaria nie widziała oceny z kalkulatora, więc dłużej wyceniała sprawę.
3. Kalkulator kończy się **ślepym zaułkiem** — po wyniku nie ma dokąd pójść.

## Co zostało zrobione (Etap A)

Wszystko w `www/audyt-48h-form.html` plus cztery teksty.

**Przekazywanie danych.** Kalkulator ma zbudować adres, w którym po znaku `#`
doklejone są kody odpowiedzi i poziom ryzyka. Wszystko po `#` przeglądarka
zatrzymuje u siebie — **nie wysyła tego na żaden serwer**. Format
(`zg=1` to numer wersji, żeby późniejsze zmiany nie popsuły starych linków):

```
audyt-48h-form.html#zg=1&k1=K1_NAKAZ_CZLONEK_ZARZADU&k4=K4_BOARD_RESIGNED&k5=K5_KRS_NOT_UPDATED&k6=K6_GOAL_DEFENSE&k7=K7_AMOUNT_50K_150K&ryz=RISK_HIGH&dd=2026-08-10&td=2026-09-15
```

Kody to **własne kody Kalkulatora** (plik `dane_wejściowe/csv/08_4_Formularz_6_krokow.csv`
w jego folderze), więc po tamtej stronie nie trzeba niczego tłumaczyć.

**Nic nie wypełnia się samo.** Klient najpierw widzi ramkę z konkretnym
przypomnieniem („W Kalkulatorze sprawdzałeś — pismo: …, kwota: …, doręczenie: …")
i wybiera **„Tak, to ta sama sprawa"** albo **„Nie — wypełnię od nowa"**.
Powód: klient mógł testować Kalkulator na przypadkowych pismach, a do Audytu
zgłaszać zupełnie inną sprawę — ciche wypełnienie wprowadziłoby w błąd i jego,
i kancelarię, która na tej podstawie wycenia. Adres jest czyszczony od razu przy
wejściu, żeby dane nie zostały w historii przeglądarki.

**Podsumowanie dla kancelarii.** Poziom ryzyka trafia do wiadomości **tylko po
potwierdzeniu**. Jeśli klient potem poprawi którąś z przeniesionych odpowiedzi,
dochodzi ostrzeżenie: „Klient zmienił dane po ocenie z Kalkulatora — poziom
ryzyka może być nieaktualny".

**Przypisania celowo niepełne — nie zgadujemy:**

| Kalkulator | Formularz | |
|---|---|---|
| Pozew / nakaz zapłaty (spółka lub członek zarządu) | krok 1 → „Pozew lub nakaz zapłaty…" | |
| Inne / nie wiem | krok 1 → „nie wiem" | |
| Pismo z ZUS lub urzędu | **puste** | Kalkulator nie rozdziela US od ZUS |
| Wyrok zaoczny, wezwanie sądowe, pismo komornicze, wezwanie przedsądowe | **puste** | żadna opcja kroku 1 nie pasuje wprost |
| Status: nadal pełnię / rezygnacja | krok 4 | |
| KRS: tak / nie / nie wiem | krok 4 | |
| Cel: obrona / zyskać czas / nie wiem | krok 6 | |
| Kwota do 50 tys., 50–150 tys., >500 tys., nie wiem | krok 5 | |
| Kwota **150–500 tys.** | **puste** | widełki rozjeżdżają się na granicy 200 tys. |
| Data doręczenia + termin | krok 3 | |

**Nie przenosimy** zaznaczenia „termin w ciągu 3 dni roboczych" — Kalkulator
liczy w dniach kalendarzowych, a ten kwadracik całkowicie blokuje przejście
dalej. Formularz wylicza pilność sam, ze zwykłych dat.

**Cztery teksty o danych osobowych** (`narzedzia.html`, `faq.html`,
`polityka-prywatnosci.html` ×2) zostały **uzupełnione o jedno zdanie**, nie
przepisane. Istniejące obietnice („nigdzie nie zapisujemy") są nadal prawdziwe,
bo dane wędrują wyłącznie wewnątrz przeglądarki klienta. **Do akceptacji
właściciela jako radcy** — to materiał pod jego nazwiskiem („Wariant A"
w `CLAUDE.md`).

**Strona Audytu** (`audyt-48h.html`) odsyła teraz do Kalkulatora — wcześniej
link działał tylko w jedną stronę.

## Etap B — przycisk w Kalkulatorze (ZROBIONE)

**Potwierdzony problem** (zrzut `testy/obraz1.png`): kalkulator po wyliczeniu
pokazuje „Ocena ryzyka", pigułkę poziomu, zwinięty przełącznik „Zobacz pełny
raport", „Pobierz jako PDF", „Wyczyść kalkulator" i panel techniczny —
**żadnego przejścia dalej**. Słowa właściciela: „klient głupieje".

**Ważne ustalenie:** tekst zachęcający do Audytu 48h **już istnieje**
(`app/text_builder.py:74-119`, pięć wariantów, plus zabezpieczenie w `:373-374`,
że musi się pojawić). Trafia jednak na **koniec pełnego raportu**, a raport jest
**domyślnie zwinięty** (`app/app.py:1622`). Kto go nie rozwinie — nie widzi nic.
Część poprawki to więc **pokazanie tego, co już napisane**.

**Co zostało zrobione** (`Kalkulator_ryzyka_app/app/app.py`, decyzja właściciela
19.08.2026: „na razie wszystko jeszcze jest w trybie testowym"):

1. Stała **`AUDYT_48H_URL`** na górze pliku — **jedyne miejsce do zmiany**, gdy
   dojdzie docelowa domena. Dziś wskazuje na tymczasowy podgląd
   `https://pczak333.github.io/kancelaria-prs-strona-www/`.
2. Sekcja **„Co dalej?"** z przyciskiem **„Przejdź do Audytu 48h →"**, tuż pod
   oceną ryzyka — czyli tam, gdzie klient patrzy, a nie w zwiniętym raporcie.
3. Adres budowany z kodów już zaznaczonych przez klienta (`k1`, `k4`, `k5`,
   `k6`, `k7`) i wyliczonego poziomu ryzyka; daty tylko wtedy, gdy klient je
   podał (inaczej te zmienne w kodzie nie istnieją).

**Czego w Kalkulatorze NIE ruszać:** liczenia punktów i poziomu ryzyka,
scenariuszy, treści raportu, generowania PDF, obsługi wgrywanych dokumentów,
nazwy marki („KRS Guard" — właściciel zajmie się tym osobno), nazw plików CSV.

**Pułapka:** w tej aplikacji nie wolno zmieniać wartości pól formularza po ich
wyświetleniu — w czerwcu wywalało to całą aplikację (naprawa `360d1dd`). Nasza
zmiana tylko **czyta** wartości, ale po niej i tak uruchomić
`tools/smoke_test_ui.py`.

## Jak to sprawdzić

W folderze `www/`: `python -m http.server 8766`, potem ręcznie przygotowany link
testowy, np.
`http://localhost:8766/audyt-48h-form.html#zg=1&k1=K1_NAKAZ_CZLONEK_ZARZADU&k7=K7_AMOUNT_50K_150K&ryz=RISK_HIGH`

Cztery ścieżki (wszystkie sprawdzone 19.08.2026):

1. **Wejście z przeniesieniem** — ramka pyta, **żadne pole nie jest wypełnione**,
   adres w pasku już wyczyszczony.
2. **„Nie — wypełnię od nowa"** — pola puste, ramka znika, w podglądzie
   wiadomości **żadnej wzmianki o Kalkulatorze**.
3. **„Tak, to ta sama sprawa"** — wypełnia się 7 pozycji; „Usuń przeniesiony
   wynik" czyści je; podgląd wiadomości zawiera poziom ryzyka.
4. **„Tak, ale potem poprawiam"** — po zmianie odpowiedzi w podglądzie pojawia
   się ostrzeżenie o nieaktualnej ocenie.

Plus: wejście **bez** `#` (formularz działa jak dotąd) i pełne przejście
kroków 1→7.

Po testach **pozamykać okna Edge** — inaczej dwuklik w skrót podglądu może nie
pokazać okna (patrz `CLAUDE.md`).

## Czego nie robić

- Nie przepisywać istniejących zdań o danych osobowych — tylko dopisywać,
  i tylko po akceptacji właściciela.
- Nie wypełniać żadnego pola bez wyraźnego potwierdzenia klienta.
- Nie zaznaczać automatycznie kwadracika o trzydniowym terminie.
- Nie zgadywać przypisań rodzaju pisma — niejednoznaczne zostają puste.
- Nie kopiować tych plików do Portalu — ma inny formularz (8 kroków).
