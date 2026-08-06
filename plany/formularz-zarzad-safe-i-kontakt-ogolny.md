# Plan (kolejna rewizja): prawdziwe wysyłanie formularza Zarząd SAFE, bez „kombinacji"

## Kontekst

Poprzednia wersja (jeden przycisk „Wyślij zapytanie" → gotowa treść + „Skopiuj treść" /
„Otwórz w programie pocztowym") wciąż nie odpowiada na sedno pytania właściciela: **dlaczego
kliknięcie „Wyślij" nie wysyła po prostu wiadomości samo z siebie?**

Odpowiedź techniczna: ta strona to same pliki bez własnego serwera — jak dokument otwarty
w przeglądarce, nie działający program. Przycisk może zrobić tylko to, co potrafi sama
przeglądarka bez pomocy z zewnątrz (otworzyć program pocztowy użytkownika, skopiować
tekst). Żeby naprawdę wysłać zgłoszenie — w tym załączone dokumenty — trzeba połączyć
formularz z zewnętrzną usługą, która ma serwer po drugiej stronie i przekazuje zgłoszenia
jako e-mail. To nie wymaga budowania własnego serwera ani zmiany podejścia „strona to
zwykłe pliki" — wystarczy, że formularz wysyła dane pod adres takiej usługi (`<form
action="...">`), zamiast tylko otwierać mailto.

**Sprawdziłem bezpośrednio na stronie jednego z popularnych dostawców takich usług
(Formspree), zamiast polegać na streszczeniach z wyszukiwarki** (już raz w tej sesji takie
streszczenie podało błędną cenę — 15$ zamiast faktycznych 10$). Dwa istotne ustalenia:
- Plan z obsługą załączników zaczyna się od **10 USD/mies.** (200 zgłoszeń, 1 GB na pliki).
- **Regulamin (Privacy Policy) tego dostawcy wprost zabrania używania ich usługi do
  zbierania „wrażliwych danych osobowych" i zrzeka się odpowiedzialności za takie dane** —
  bez jasno opisanej unijnej umowy powierzenia danych. Dla kancelarii prawnej, która
  chciałaby tą drogą odbierać dokumenty spraw klientów (uchwały, dane spółki), to realny
  sygnał ostrzegawczy — nie sama cena jest tu problemem, tylko to, komu i na jakich
  warunkach powierzylibyśmy dokumenty klientów.

To rozstrzyga, dlaczego nie mogę po prostu podłączyć pierwszej lepszej usługi tego typu —
wybór konkretnego dostawcy dla **dokumentów prawnych klientów** to decyzja wymagająca
oceny radcy prawnego, nie tylko techniczna. Rozdzielam więc problem na dwie części o różnym
ryzyku, żeby nie blokować tego, co można bezpiecznie zrobić już teraz.

## Rozwiązanie

**Część 1 — dane z formularza (imię, e-mail, telefon, numer KRS, opis sytuacji) zaczynają
być NAPRAWDĘ wysyłane, jednym kliknięciem, bez żadnych dodatkowych kroków.** Formularz
łączy się z usługą pośredniczącą, która odbiera zgłoszenie i przekazuje je e-mailem na
adres kancelarii — bez potrzeby posiadania własnego programu pocztowego przez klienta.
Znika „Skopiuj treść" / „Otwórz w programie pocztowym" — zostaje jeden przycisk „Wyślij
zapytanie", a po kliknięciu widać tylko potwierdzenie: „Dziękujemy, otrzymaliśmy Twoje
zgłoszenie — odezwiemy się w ciągu 24 godzin." Same pola tekstowe (bez dokumentów) to
znacznie niższe ryzyko niż przesyłanie akt sprawy, więc tu mogę zaproponować konkretnego
dostawcę bez czekania na dodatkową decyzję — ale nadal nie zakładam za Pana konta ani nie
płacę (to musi Pan zrobić sam, zgodnie z zasadami tej sesji) — przygotuję formularz
gotowy do podłączenia, z jasną instrukcją, co dokładnie kliknąć.

**Część 2 — dokumenty (uchwały, wypis z KRS, umowa spółki) NIE trafiają na ten formularz.**
Zamiast obiecywać upload, którego nie da się bezpiecznie zrobić na tym etapie, formularz
kończy się jasną informacją: „Po otrzymaniu zgłoszenia napiszemy do Ciebie i wskażemy
bezpieczny sposób przesłania dokumentów." To nie jest wymówka — to standardowa praktyka
kancelarii: dokumentów sprawy nie przesyła się przez formularz na stronie marketingowej,
tylko w bezpośredniej korespondencji z konkretną, znaną już osobą po pierwszym kontakcie.
Numer KRS (już w formularzu) w międzyczasie pozwala wstępnie zorientować się w sytuacji
spółki z jawnego rejestru.

Ten podział de facto **rozwiązuje główną skargę** („po co te kombinacje") dla zwykłego
zgłoszenia, a jednocześnie nie naraża dokumentów klientów na niejasne warunki obcej firmy
bez Pana świadomej zgody jako radcy prawnego.

## Do decyzji (nie mogę tego rozstrzygnąć sam)

- **Wybór konkretnego dostawcy** dla Części 1 — potrzebuję Pana zgody, zanim cokolwiek
  podłączę na stałe, bo to Pan zakłada tam konto i wpisuje dane rozliczeniowe (ja tego nie
  zrobię). Zanim to ustalimy, przygotuję formularz technicznie gotowy, z placeholderem do
  podmiany na adres usługi — analogicznie jak `kontakt@[domena].pl` czeka na prawdziwy
  e-mail. Jeśli chce Pan, żebym najpierw dokładniej sprawdził 2-3 dostawców z jasną,
  europejską umową powierzenia danych (nawet dla samych pól tekstowych, dla pewności) —
  proszę dać znać, zrobię to przed wdrożeniem.
- **Kiedy i jak wracamy do tematu dokumentów** — czy zostawiamy to tak, jak opisano wyżej
  (dokumenty tylko po nawiązaniu bezpośredniego kontaktu), czy chce Pan w przyszłości
  zbadać dostawcę z jasną umową powierzenia danych specjalnie do tego celu.

## Zmiany techniczne

- **`www/zarzad-safe-formularz.html`** i **`www/kontakt.html`**: formularze zamieniają się
  z JS-owej walidacji + copy/mailto na zwykłe wysyłanie `<form method="POST"
  action="[adres usługi — do uzupełnienia]">`, z zachowaniem tych samych pól i tej samej
  walidacji „na oko" (błędy przy polach) doszytej w JS przed wysłaniem, żeby nie wysyłać
  pustych zgłoszeń. Po wysłaniu — prosty komunikat potwierdzenia zamiast bloku z treścią
  do skopiowania (bo tym razem naprawdę dociera do kancelarii, nie trzeba pokazywać
  „dowodu" w postaci tekstu).
- **`www/main.js`**: obecny „silnik" kopiowania/mailto (`initMailForm` i pochodne) zostaje
  zastąpiony dużo prostszym kodem — tylko walidacja pól przed wysłaniem formularza,
  bez budowania treści maila ręcznie (to teraz robi usługa pośrednicząca).
- Widoczna, jasna notatka na obu stronach: „Twoje zgłoszenie trafia bezpośrednio do nas.
  Dokumentów prosimy nie załączać tutaj — poprosimy o nie po pierwszym kontakcie."

## Weryfikacja

Po podłączeniu adresu usługi: wysłać testowe zgłoszenie z obu formularzy i sprawdzić, że
faktycznie przychodzi e-mail na adres kancelarii (na koncie testowym/docelowym, które Pan
założy). Do tego czasu — bez adresu usługi — formularz nie ma jak wysłać niczego naprawdę,
więc ten krok czeka na Pana decyzję z sekcji „Do decyzji" wyżej.
