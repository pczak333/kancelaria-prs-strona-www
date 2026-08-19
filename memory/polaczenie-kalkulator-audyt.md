---
name: polaczenie-kalkulator-audyt
description: "ODRZUCONE 19.08.2026 — powiązanie Kalkulatora ryzyka z formularzem Audytu 48h zostało zbudowane, przetestowane i w całości wycofane decyzją właściciela. Nie proponować ponownie bez nowej rozmowy"
metadata: 
  node_type: memory
  type: project
  originSessionId: b581ef9c-946a-4d10-bbd1-de3a2c016ba6
  modified: 2026-08-19T19:04:48.418Z
---

**Nie proponować tego ponownie z własnej inicjatywy.** 19.08.2026 zbudowaliśmy
pełne powiązanie Kalkulatora ryzyka z formularzem Audytu 48h — działało,
zostało przetestowane od końca do końca na opublikowanej stronie — i **w całości
je wycofano** decyzją właściciela.

## Co było zrobione (i cofnięte)

- Formularz Audytu przyjmował odpowiedzi z Kalkulatora przez część adresu po
  znaku `#` (ta część nie jedzie na żaden serwer), po potwierdzeniu klienta,
  że Audyt dotyczy tej samej sprawy.
- Poziom ryzyka dołączał się do podsumowania dla kancelarii.
- Cztery teksty o danych osobowych dostały po jednym dopisanym zdaniu.
- Strona Audytu odsyłała do Kalkulatora.
- Kalkulator (osobny folder `Kalkulator_ryzyka_app`) miał na końcu sekcję
  „Co dalej?" z przyciskiem do formularza.

Wszystko cofnięte: zapis „Wycofaj powiazanie Kalkulatora z Audytem 48h" tutaj
oraz osobny w folderze Kalkulatora. Kod pozostaje w historii — gdyby temat
kiedyś wrócił, da się go odzyskać, ale **wracamy do niego tylko na wyraźną
prośbę właściciela**.

## Powód odrzucenia (istotny — to nie kaprys)

Słowa właściciela: *„Audyt jest trochę inaczej zbudowany, nie ma kroków i są
trochę inne pytania. To wszystko może być mylące dla klienta."*

Ten sam problem widać było w danych i **zgłaszałem go już przy tabeli
przypisań**, zanim zapadła decyzja:

- Kalkulator ma **13 rodzajów pism**, formularz Audytu **4** — cztery rodzaje
  (wyrok zaoczny, wezwanie sądowe, pismo komornicze, wezwanie przedsądowe)
  nie pasowały do żadnej opcji Audytu.
- Kalkulator nie rozdziela **US od ZUS**, a formularz Audytu tak.
- **Widełki kwot się rozjeżdżają** — przedział 150–500 tys. zł Kalkulatora
  przecina granicę 200 tys. zł w Audycie.

Wniosek na przyszłość: **dwa narzędzia pytają o co innego**. Zanim ktokolwiek
znów zaproponuje przenoszenie odpowiedzi między nimi, trzeba by najpierw
ujednolicić same pytania — inaczej przeniesienie zawsze będzie częściowe
i mylące. To znacznie większa praca niż samo połączenie.

## Co z tego zostało (bo było odrębną wartością)

- Ustalone nazwy projektów — patrz [[nazewnictwo-portal-guardwww]].
- Ustalenie o Kalkulatorze, wciąż aktualne i **niezależne od tego tematu**:
  kończy się ślepym zaułkiem (po ocenie nie ma dokąd pójść), a zachęta do
  Audytu 48h **istnieje** (`app/text_builder.py:74-119`), tylko trafia na
  koniec pełnego raportu, który jest **domyślnie zwinięty**
  (`app/app.py:1622`). Gdyby właściciel kiedyś chciał to poprawić, wystarczy
  pokazać to, co już napisane — **bez** przenoszenia jakichkolwiek danych.
- `tools/regression_test.py` w Kalkulatorze pomija wszystkie 31 przypadków,
  bo szuka dokumentów w `Desktop\testy`, a na tym komputerze pulpit jest
  w OneDrive — patrz [[skrot-podgladu-onedrive-pulpit]].
- Pułapka testowa: `AppTest` **nie pokazuje przycisków-linków**
  (`st.link_button`) — do ich sprawdzenia trzeba uruchomić aplikację
  w przeglądarce.
