# Plan: Nowa strona Kancelarii PRS (makieta od podstaw)

## Kontekst

Budujemy od podstaw nową stronę internetową dla kancelarii radcy prawnego
"Kancelaria PRS". Kancelaria działa głównie zdalnie (sprawy załatwiane
on-line, bez osobistego kontaktu) i specjalizuje się w dwóch obszarach:

1. **Postępowania rejestrowe KRS** przez system PRS (Portal Rejestrów
   Sądowych) i S24 — rejestracja spółek, zmiany danych itp.
2. **KRS Guard** — ochrona członków zarządu w sytuacjach kryzysowych.
   Lejek sprzedażowy: darmowy **Kalkulator Ryzyka** (już gotowy, osobna
   aplikacja pod `https://kalkulatorryzyka.streamlit.app/` — TYLKO
   linkujemy, zgodnie z decyzją z 22.07.2026 opisaną w `CLAUDE.md`) ma
   skłaniać do zakupu płatnego **Audytu 48h**.

Punktem wyjścia jest stary prototyp w `Dane_wejściowe/strona testowa_stara/`
— gotowy statyczny HTML/CSS/JS ze sprawdzoną treścią (opisy usług, ceny,
teksty "O nas") i dopracowanym stylem wizualnym, ale z realnym problemem
technicznym: cały CSS i nagłówek/stopka są wklejone osobno w każdym pliku
(zweryfikowane w `index.html` i `uslugi-cennik.html` — identyczny blok
`<style>` powtórzony w każdym pliku). Nowa strona ma to naprawić.

**Ustalenia z użytkownikiem (nie zmieniać bez pytania):**
- To na razie **makieta** z przykładowymi/placeholder danymi kontaktowymi
  (imię i nazwisko radcy prawnego, telefon, e-mail, adres) — prawdziwe dane
  zostaną podane później.
- Docelowy adres/domena tej strony **nie jest** `kancelariaprs.com` — pod
  tym adresem działa (też w budowie) zupełnie inna, niepowiązana strona tej
  samej kancelarii. Adres tej nowej strony ustalimy później.
- Styl wizualny: **kopiujemy jako bazę** wygląd ze starego prototypu
  (paleta kolorów, fonty, karty — patrz niżej).
- Cennik: forma **kart usług** (jak `uslugi-cennik.html`), NIE rozwijana
  tabela (`cennik.html` odrzucone).
- Kalkulator ryzyka: NIE przepisujemy logiki — strona ma tylko linkować do
  gotowej aplikacji Streamlit.

## Stack technologiczny

**Eleventy (`@11ty/eleventy` v3.x, szablony Nunjucks) + hosting/formularze
Netlify (plan darmowy).**

Uzasadnienie: Eleventy to najprostszy sensowny generator stron statycznych
— bierze pliki bardzo zbliżone do zwykłego HTML i sam wstawia do nich
wspólny nagłówek/stopkę/style z jednego miejsca, więc znika problem
duplikacji CSS widoczny w starym prototypie. Wynikiem jest zwykły płaski
HTML/CSS/JS — dokładnie to, co już działa, bez żadnego własnego serwera.
Netlify w jednym miejscu daje: automatyczne wdrożenie po `git push` na już
istniejące repo GitHub, oraz **Netlify Forms** — gotową obsługę formularzy
(Audyt 48h, Kontakt) bez pisania własnego backendu (Netlify sam wykrywa
formularz w HTML-u i zbiera zgłoszenia w swoim panelu / na e-mail).

## Struktura plików

```
src/
├── _data/site.json          # JEDNO miejsce z danymi kontaktowymi (placeholder), cenami, linkiem do kalkulatora
├── _includes/
│   ├── layouts/base.njk     # wspólny szkielet <head>+header+footer
│   └── partials/header.njk, footer.njk
├── css/style.css            # jeden plik, zmienne kolorów z prototypu (--bg #f3f0ea, --ink #0b2535, --brand #0f5670, itd.), Georgia (marka) + Poppins
├── assets/                  # loga skopiowane z Dane_wejściowe/loga i .../assets
├── index.njk                 # Strona główna (hero, "O nas", siatka usług) — treść z index.html
├── uslugi-cennik.njk          # Usługi i cennik — WYŁĄCZNIE karty usług (z uslugi-cennik.html)
├── krs-guard.njk               # opis KRS Guard, pakiety, CTA
├── kalkulator-ryzyka.njk       # krótki opis + duży przycisk-link do https://kalkulatorryzyka.streamlit.app/ (nowa karta), zero własnej logiki
├── audyt-48h.njk               # landing wprowadzający do Audytu 48h
├── audyt-48h-form.njk           # wieloetapowy formularz zgłoszeniowy, realnie podłączony do Netlify Forms (bazowany na audyt-48h-form.html, ale z prawdziwym <form data-netlify="true">, atrybutami name na polach, bez mailto)
├── audyt-48h-dziekujemy.njk     # strona potwierdzenia po wysłaniu
├── kontakt.njk                  # dane kontaktowe (placeholder) + prosty formularz (Netlify Forms)
├── polityka-prywatnosci.njk     # placeholder, potrzebny bo formularze zbierają dane osobowe
└── 404.njk
.eleventy.js, netlify.toml, package.json
```

Nawigacja (`header.njk`): Strona główna · Usługi i cennik · KRS Guard ·
Audyt 48h · Kontakt + wyróżniony CTA "Sprawdź swoje ryzyko" (link do
kalkulatora). **Usuwamy** stare linki w nawigacji prowadzące na
`kancelariaprs.com/blog`, `/kontakt/`, `/faq/`, `/formularz-zgloszeniowy/`
— to adresy innej, osobnej strony tej samej kancelarii i nie mogą się
mylić z nową witryną; Kontakt robimy własny, Blog/FAQ pomijamy na etapie
makiety.

## Treść i dane kontaktowe

Opisy usług, listy w kartach i ceny przenosimy **1:1** ze starego
prototypu (już zaakceptowana treść makiety) — źródła:
`Dane_wejściowe/strona testowa_stara/index.html`, `uslugi-cennik.html`,
`krs-guard.html`. Dane kontaktowe/osobowe radcy prawnego oraz ceny trafiają
do jednego pliku `src/_data/site.json`, jawnie oznaczone jako placeholder
(np. `"[Imię i Nazwisko radcy prawnego – PLACEHOLDER]"`), żeby później
podmienić je w jednym miejscu zamiast szukać po wszystkich podstronach.

## Formularz Audytu 48h / Kontakt

Formularz z `audyt-48h-form.html` (wieloetapowy wizard, JS) przenosimy z
zachowaniem UI, ale: opakowujemy w prawdziwy
`<form name="audyt-48h" method="POST" data-netlify="true" enctype="multipart/form-data">`,
dodajemy `name` do pól (obecnie mają tylko `id`), ukryte pole `form-name` i
honeypot na boty, usuwamy dotychczasową logikę `mailto:`
(`openEmailModal`/`sendMailtoFromPreview`). Po wysłaniu — przekierowanie na
`audyt-48h-dziekujemy.njk`. Prosty formularz kontaktowy na `kontakt.njk`
budujemy tym samym mechanizmem. Dodajemy `polityka-prywatnosci.njk` i
zgodę RODO przy checkboxie w formularzach.

## Kolejność pracy

1. Fundament: `npm init`, `@11ty/eleventy`, minimalny build, konto Netlify
   podłączone do repo GitHub, weryfikacja że `git push` realnie wdraża
   stronę (nawet pustą) — to sprawdzić najpierw, zanim zbudujemy resztę.
2. Szkielet wizualny: `base.njk`, `header.njk`, `footer.njk`, `style.css`
   z paletą/fontami z prototypu, `site.json` z placeholderami.
3. Strona główna (`index.njk`).
4. Usługi i cennik (`uslugi-cennik.njk`, forma kart).
5. KRS Guard (`krs-guard.njk`).
6. Kalkulator ryzyka (`kalkulator-ryzyka.njk`) — strona z linkiem/CTA.
7. Audyt 48h — landing + formularz + strona podziękowania, test wysyłki
   end-to-end (łącznie z załącznikami).
8. Kontakt + Polityka prywatności.
9. Dopięcie: 404, favicon, podstawowe meta/SEO, responsywność mobilna,
   aktywne stany nawigacji, przegląd że żaden placeholder nie "wyciekł"
   jako prawdziwa treść.

Po każdym etapie: commit + push (zgodnie z obowiązującym w repo git
workflow) — dzięki auto-deploy na Netlify właściciel będzie mógł na bieżąco
oglądać żywy podgląd strony pod adresem testowym Netlify, bez czekania na
finalną domenę. Po zakończeniu etapu 1 zaktualizować `CLAUDE.md` (sekcja
"Do ustalenia" → stack/hosting już wybrany).

## Krytyczne pliki referencyjne (stary prototyp)

- `Dane_wejściowe/strona testowa_stara/index.html`
- `Dane_wejściowe/strona testowa_stara/uslugi-cennik.html`
- `Dane_wejściowe/strona testowa_stara/krs-guard.html`
- `Dane_wejściowe/strona testowa_stara/audyt-48h-form.html`
- `Dane_wejściowe/strona testowa_stara/audyt-48h.html`
- `CLAUDE.md` (do aktualizacji po decyzji o stacku)

## Weryfikacja

- `npx eleventy` buduje się lokalnie bez błędów, wygenerowany HTML w
  `_site/` wygląda jak strony ze starego prototypu (ten sam styl).
- Po pierwszym pushu: strona faktycznie dostępna pod testowym adresem
  Netlify, wszystkie podstrony klikalne z nawigacji.
- Formularz Audytu 48h i formularz kontaktowy: wysłać testowe zgłoszenie i
  sprawdzić, że pojawia się w panelu Netlify Forms.
- Sprawdzić stronę na szerokości mobilnej (nawigacja, karty usług się nie
  psują).
- Przegląd końcowy: żaden placeholder danych kontaktowych nie jest
  pomylony z prawdziwą treścią, link do kalkulatora ryzyka faktycznie
  prowadzi na `https://kalkulatorryzyka.streamlit.app/`.
