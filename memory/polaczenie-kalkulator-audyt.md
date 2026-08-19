---
name: polaczenie-kalkulator-audyt
description: "Guard-www: formularz Audytu przyjmuje wynik z Kalkulatora (zrobione 19.08.2026), ale dopiero po potwierdzeniu klienta, że to ta sama sprawa. Przycisk po stronie Kalkulatora czeka na decyzję — Guard-www MA już adres, więc da się go zrobić"
metadata: 
  node_type: memory
  type: project
  originSessionId: b581ef9c-946a-4d10-bbd1-de3a2c016ba6
  modified: 2026-08-19T18:46:04.793Z
---

19.08.2026, projekt **Guard-www**. Plan: `plany/kalkulator-i-audyt-polaczenie.md`.
Uwaga na nazewnictwo: [[nazewnictwo-portal-guardwww]].

## Zrobione

Formularz `www/audyt-48h-form.html` (7 kroków) przyjmuje wynik z Kalkulatora.
Dane jadą w części adresu **po znaku `#`** — przeglądarki nie wysyłają jej na
żaden serwer. Kody są **własnymi kodami Kalkulatora** (`K1_POZEW_SPOLKA`,
`RISK_HIGH` itd., z `dane_wejściowe/csv/08_4_Formularz_6_krokow.csv`).

**Najważniejsza zasada — nic nie wypełnia się samo.** Klient najpierw widzi
konkretne przypomnienie („W Kalkulatorze sprawdzałeś — pismo: …, kwota: …")
i wybiera „Tak, to ta sama sprawa" albo „Nie — wypełnię od nowa". To odpowiedź
na uwagę właściciela: klient mógł testować Kalkulator na przypadkowych pismach,
a zgłaszać inną sprawę. Adres czyszczony od razu, żeby dane nie zostały
w historii przeglądarki.

Poziom ryzyka trafia do kancelarii **tylko po potwierdzeniu**; gdy klient potem
poprawi przeniesione odpowiedzi — dochodzi ostrzeżenie o możliwej
nieaktualności oceny.

**Przypisania celowo niepełne:** pismo z ZUS/urzędu (Kalkulator nie rozdziela US
od ZUS), kwota 150–500 tys. (widełki rozjeżdżają się na 200 tys.), wyrok
zaoczny / wezwanie sądowe / pismo komornicze / wezwanie przedsądowe. **Nie
przenosimy** kwadracika „3 dni robocze" (Kalkulator liczy kalendarzowo, a ten
kwadracik blokuje przejście dalej).

## Czego NIE ruszać

Cztery teksty o danych osobowych (`narzedzia.html`, `faq.html`,
`polityka-prywatnosci.html` ×2) **uzupełnione o jedno zdanie**, nie przepisane —
istniejące obietnice są nadal prawdziwe, bo dane wędrują tylko wewnątrz
przeglądarki klienta. **Czekają na akceptację właściciela jako radcy**
(zasada „Wariant A" w `CLAUDE.md`).

## Ślepy zaułek na końcu Kalkulatora

Zrzut właściciela (`testy/obraz1.png`): po wyliczeniu widać „Ocena ryzyka",
zwinięty przełącznik „Zobacz pełny raport", „Pobierz jako PDF", „Wyczyść
kalkulator" i panel techniczny — **żadnego przejścia dalej**. Jego słowa:
„klient głupieje".

**Kluczowe:** tekst zachęcający do Audytu 48h **już istnieje**
(`app/text_builder.py:74-119`, pięć wariantów), ale trafia na koniec pełnego
raportu, który jest **domyślnie zwinięty** (`app/app.py:1622`). Poprawka to
w dużej części **pokazanie tego, co już napisane**.

## Otwarte — i zmiana sytuacji

- **Przycisk w Kalkulatorze.** Właściciel odrzucił go 19.08.2026 („nic nie
  zmieniaj w kalkulatorze"), ale **decyzja zapadła przy założeniu, że strona
  nie ma adresu** — bo rozmowa dotyczyła wtedy Portalu. **Guard-www adres MA**:
  `https://pczak333.github.io/kancelaria-prs-strona-www/`. Przycisk da się więc
  zrobić od razu; rzeczywista decyzja brzmi: czy kierować klientów z działającego
  Kalkulatora na tymczasowy podgląd (przykładowe dane kontaktowe, formularz bez
  prawdziwej wysyłki), czy czekać na docelową domenę. **Do potwierdzenia
  z właścicielem — nie zakładać, że odmowa nadal obowiązuje.**
- Tabela przypisań rodzaju pisma — do potwierdzenia przez radcę.
- Kalkulator wita nazwą **„KRS Guard"**, strona mówi „Zarząd Guard" — właściciel
  odłożył to do osobnej pracy nad Kalkulatorem. **Nie robić mimochodem.**
