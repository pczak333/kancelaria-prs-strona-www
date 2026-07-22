---
name: stack-decyzja-statyczny-html
description: Wybrany stack strony — statyczny HTML/CSS/JS bez build; odrzucono wcześniejszy plan Eleventy+Netlify
metadata: 
  node_type: memory
  type: project
  originSessionId: f22145cd-69fd-46c5-98dc-86d2ff0b8522
  modified: 2026-07-22T17:00:47.668Z
---

Stack nowej strony Kancelarii PRS (decyzja 22.07.2026, potwierdzona przez
użytkownika): **statyczna strona HTML/CSS/JS bez narzędzia budującego**.
Kod w folderze `www/` (wspólny `styles.css` + `main.js`, podstrony wpisują
nagłówek/stopkę inline). Makieta zbudowana i sprawdzona w przeglądarce.

**Why:** priorytet projektu to najprostsze, najmniej awaryjne rozwiązanie
(nietechniczny właściciel, praca na dwóch komputerach) — strona otwiera się
kliknięciem, bez instalowania czegokolwiek.

**Ważny kontekst:** w repo istniał wcześniejszy plan
`plany/nowa-strona-eleventy-netlify.md` (prawdopodobnie z sesji na drugim
komputerze) proponujący Eleventy (generator stron) + Netlify Forms.
Użytkownik świadomie wybrał prostszą wersję zamiast tamtego planu. Działające
formularze i publikację (Netlify Forms działa też ze zwykłym HTML) można
dołożyć później BEZ Eleventy — to osobny, przyszły krok. Tamten plan
oznaczony jako nieaktualny (banner na górze pliku).

**How to apply:** rozwijać stronę jako zwykły statyczny HTML w `www/`. NIE
wprowadzać Eleventy/generatora bez wyraźnej prośby. Otwarte tematy: prawdziwe
dane kontaktowe (placeholdery w `www/kontakt.html`), hosting/domena, realna
wysyłka formularza Audytu 48h (dziś makieta). Patrz [[ciaglosc-sprawdzac-repo-na-starcie]].
