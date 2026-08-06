---
name: stan-pracy-2026-08-06
description: "Aktualny stan prac (06.08.2026) — dokończenie badania marketingowego, prawdziwy formularz kontaktowy Zarząd SAFE, pełny przepis opisu pakietu Zarząd SAFE na bazie realnego researchu prawnego, dopisanie ścieżki zapobiegawczej na stronie głównej i Jak pomagamy. WAŻNE: równoległa praca dwóch sesji Claude na tym samym repo (Claude Code + zwykły Claude na drugim komputerze) — czytać sekcję 'Praca równoległa' przed kolejną sesją"
metadata:
  node_type: memory
  type: project
  originSessionId: 7e6b4554-eb29-4587-a046-c1568a1cc5b1
  modified: 2026-08-06T21:26:30.110Z
---

Bieżący punkt zapisu — **06.08.2026**. Zastępuje `stan-pracy-2026-08-04` jako
najnowszy. Na starcie sesji zsynchronizować się z repo (repo wygrywa), patrz
[[ciaglosc-sprawdzac-repo-na-starcie]].

**Stan:** strona KRS Guard — dziś głównie dopracowywano pakiet **Zarząd SAFE**
(prewencja) i realny sposób kontaktu z kancelarią.

## WAŻNE: praca równoległa dwóch sesji Claude na tym samym repo

Właściciel dziś jednocześnie pracował na dwóch komputerach: w tej sesji (Claude
Code) oraz w osobnej rozmowie ze zwykłym Claude (claude.ai) na drugim
komputerze, która też miała dostęp do repo i samodzielnie commitowała/pushowała
zmiany (m.in. dwa dokumenty Word z researchem prawnym, sekcję „Dlaczego my" na
stronie głównej z ulepszeniami bloga). To spowodowało w tej sesji spore
zamieszanie — commity i pliki pojawiały się „znikąd" w historii git, a ja
błędnie wziąłem sekcję „Dlaczego my" (z odniesieniem do konkurencji) za
kontekst zadania, którym nie była.

**Wniosek na przyszłość:** jeśli po przerwie coś w repo wygląda znajomo, ale nie
pamiętam, żebyśmy to razem robili — **nie zakładać, że to błąd pamięci lub
kompresji kontekstu; zapytać wprost, czy równolegle działa inna sesja**, zanim
zacznę budować teorie. Tego dnia doszło też kilkukrotnie do martwych plików
blokady gita (`HEAD.lock`, `index.lock`) po commitach drugiej sesji — bezpiecznie
usuwać, gdy `ps aux | grep git` jest pusty i plik ma nieaktualny znacznik czasu
(nie usuwać bez sprawdzenia, jeśli druga sesja może działać w tej samej chwili).

## Co zrobiono 06.08.2026 (w tej sesji, Claude Code)

### 1. Dokończenie badania marketingowego (kontynuacja z 05.08)
- Sprostowano w Excelu i plikach `.md` **4 zmyślone/nieścisłe twierdzenia**
  wykryte przy weryfikacji na żywo przez właściciela (KSK, UpStart Legal,
  Jakubowska-Zawada, PW Restrukturyzacja) — patrz nowa standing rule
  [[weryfikacja-tresci-ze-stron-www]]: każde twierdzenie z badania webowego
  wymaga cytatu + URL albo „NIE ZNALEZIONO".
- Kluczowa poprawiona liczba: **0 z 21** (nie 1 z 21) najbliższych konkurentów
  działa w pełni zdalnie — UpStart Legal też ma biuro.
- Zaktualizowano `plany/plan-marketingowy-2026-08-05.md` i
  `plany/lista-konkurencji-2026-08-05.md` o te poprawki.

### 2. Naprawa pakietu Zarząd SAFE — brak dalszego kroku
Właściciel zgłosił: kliknięcie „Szczegóły" przy pakiecie Zarząd SAFE na Cenniku
nie dawało żadnej ścieżki dalej (w odróżnieniu od pozostałych dwóch pakietów,
które kończą Audytem 48h — a Zarząd SAFE jest prewencyjny, więc Audyt 48h do
niego nie pasuje). Naprawiono: dodano wyjaśnienie + przycisk do kontaktu, potem
dodano brakującą 4. ścieżkę na `kontakt.html`.

### 3. Prawdziwy formularz kontaktowy — długa iteracja
Kilka rund poprawek na bazie testów właściciela na żywo:
1. Nowa strona `zarzad-safe-formularz.html` + ogólny formularz na `kontakt.html`
   — najpierw na `mailto:` (jak formularz Audytu).
2. Test na żywo: bez skonfigurowanego programu pocztowego Windows pokazuje
   mylący dialog wyboru aplikacji — **`mailto:` to zawodny mechanizm dla wielu
   użytkowników**, nie tylko niedogodność.
3. Uproszczono do jednego przycisku + „Skopiuj treść" (Clipboard API, działa
   zawsze) / „Otwórz w programie pocztowym" (opcjonalna wygoda). Dodano pole
   numer KRS spółki.
4. Właściciel: „za dużo kombinujesz, dlaczego Wyślij nie wysyła po prostu?" —
   wyjaśniono ograniczenie (strona bez backendu = bez własnego serwera).
   Sprawdzono bezpośrednio (nie z podsumowań wyszukiwarki, które już raz podały
   złą cenę) ofertę Formspree: plan z załącznikami od 10 USD/mies., ale **jego
   regulamin wprost zabrania zbierania „wrażliwych danych osobowych" bez jasnej
   umowy powierzenia** — nieodpowiednie dla dokumentów prawnych klientów.
5. Formularze przerobione na prawdziwe wysyłanie `POST`/`fetch` z `FormData` do
   zewnętrznej usługi — **ale adres usługi to wciąż placeholder**
   (`[ADRES_USLUGI_FORMULARZY — uzupełnić po wyborze dostawcy]` w `main.js`,
   linie 202 i 223) — **wybór konkretnego, zgodnego z RODO dostawcy z DPA to
   wciąż otwarta decyzja właściciela**, nie techniczna.
6. Właściciel: „uzupełnij formularz o opcję wysyłania dokumentów, jakie będą
   potrzebne to ja jako radca prawny zdecyduję" — dodano opcjonalne pole
   wielu plików (`zs_files[]`, accept pdf/jpg/png) do formularza Zarząd SAFE.
   `FormData` już automatycznie obsługuje pliki — nie trzeba było zmieniać
   mechanizmu wysyłki, tylko dodać pole w HTML.

### 4. Pełny przepis opisu pakietu Zarząd SAFE (kluczowa zmiana dnia)
Właściciel: opis nie tłumaczył, dlaczego usługa kosztuje >2500 zł (brzmiał jak
proste sprawdzenie KRS), a zdanie o przekazywaniu złożenia wniosku Kancelarii
PRS sugerowało dodatkowy zarobek na kliencie.

W międzyczasie równoległa sesja (patrz wyżej) przygotowała **dwa dokumenty Word
z realnym researchem prawnym** (`dokumenty-zarzad-safe/*.docx`, z cytatami
orzeczeń SN/NSA/WSA i przepisów) — przeczytałem je (python-docx, bo brak
pandoc w tym środowisku) i na ich podstawie przepisałem opis pakietu:
- Dwutorowa usługa: **przed objęciem funkcji** (analiza 7 kategorii
  dokumentów — bo nowy członek zarządu odpowiada od dnia 1 też za długi
  sprzed powołania, uchwała SN III CZP 143/07) oraz **przy odejściu**
  (zabezpieczenie ~10 dokumentów-dowodów + **jeśli spółka zwleka z
  wykreśleniem z KRS — pełne postępowanie przed sądem rejestrowym**:
  wezwanie → zawiadomienie sądu → postępowanie przymuszające → wykreślenie
  z urzędu).
- Usunięto akapit „Jak zamówić" i zdanie o Kancelarii PRS — **KRS Guard
  prowadzi całość sam, łącznie ze zgłoszeniem do KRS**.
- Dokumenty źródłowe mają na końcu sekcje „Zastrzeżenia i punkty do decyzji
  radcy prawnego" (np. status w postępowaniu przymuszającym, długość
  postępowania) — świadomie NIE użyto tych niepewnych szczegółów w opisie
  na stronie, zgodnie ze standing rule o weryfikacji.
- **Same dokumenty `.docx` są oznaczone „WERSJA ROBOCZA" i wymagają
  merytorycznej weryfikacji radcy prawnego przed jakimkolwiek użyciem wobec
  klientów** — to samo zastrzeżenie dotyczy pośrednio treści na stronie,
  która z nich korzysta.

### 5. Ścieżka zapobiegawcza dopisana do strony głównej i „Jak pomagamy"
Właściciel zauważył: cała strona główna i `krs-guard.html` opisywały tylko
sytuację reaktywną („already got sued"), ścieżka zapobiegawcza (Zarząd SAFE)
była prawie nieobecna. Dopisano:
- `krs-guard.html`: zdanie o prewencji w leadzie + nowy punkt „przed objęciem
  funkcji" w liście „Dla kogo" + rozbudowany punkt o bezpiecznym odejściu.
- `index.html`: nowy akapit w „O nas" + kafelek specjalizacji rozszerzony z
  „bezpieczne odejście z zarządu" na „bezpieczne wejście i wyjście z zarządu".
- Świadomie NIE zmieniono głównych nagłówków (H1) — zostają mocnym,
  reaktywnym hookiem, bo to wciąż najpilniejszy scenariusz konwersji.

## Otwarte punkty (do kolejnej sesji)

- **Wybór dostawcy formularzy z RODO/DPA obsługującego załączniki** — Formspree
  odrzucony (zakaz wrażliwych danych bez DPA), nie wybrano jeszcze alternatywy.
  Bez tego oba formularze (Zarząd SAFE, ogólny kontakt) pokazują komunikat
  „formularz nie jest jeszcze podłączony" zamiast faktycznie wysyłać.
- **Merytoryczna weryfikacja dokumentów Word** (`dokumenty-zarzad-safe/*.docx`)
  przez właściciela jako radcę prawnego — kilka punktów jawnie oznaczonych
  jako niepewne (status w postępowaniu przymuszającym, długość postępowania,
  numery przepisów ZUS).
- Pozostałe, znane wcześniej: prawdziwe dane kontaktowe (nadal placeholdery),
  usunięcie notek „wersja robocza" po zatwierdzeniu treści, hosting/domena
  (Vercel + krsguard.pl zaproponowane, nie kupione), klucz Azure kalkulatora.
- Nie przeglądałem szczegółowo treści dodanych przez równoległą sesję (sekcja
  „Dlaczego my" na stronie głównej z odniesieniem do konkurencji, ulepszenia
  bloga, nowy artykuł o różnicach radca/adwokat/prawnik/doradca) — warto to
  przejrzeć na spokojnie na początku kolejnej sesji, jeśli właściciel o to
  poprosi.
