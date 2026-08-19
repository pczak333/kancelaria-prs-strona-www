---
name: skrot-podgladu-onedrive-pulpit
description: "Skrót do podglądu strony miał zły adres, bo na tym komputerze pulpit jest wewnątrz OneDrive — nie C:\Users\User\Desktop, tylko C:\Users\User\OneDrive\Desktop. Poprawione 11.08.2026"
metadata:
  node_type: memory
  type: project
---

11.08.2026 właściciel zgłosił, że nie może otworzyć skrótu **„Podglad strony
KRS Guard"**. Przyczyna: skrót ma w sobie na sztywno wpisany adres pliku
(`file:///C:/Users/User/Desktop/kancelaria-prs-strona-www/www/index.html`),
a **na tym komputerze folder projektu leży wewnątrz folderu OneDrive**
(`C:\Users\User\OneDrive\Desktop\kancelaria-prs-strona-www\`), nie
bezpośrednio na pulpicie. Adres w skrócie nie pasował, więc kliknięcie nic
nie otwierało.

**Why:** `CLAUDE.md` już wcześniej ostrzegał, że adres w skrócie jest
„sztywny" i zadziała tylko wtedy, gdy folder projektu leży dokładnie
w `C:\Users\User\Desktop\` — ale nie było zapisane, który z dwóch
komputerów właściciela ma pulpit przekierowany do OneDrive. Teraz wiadomo:
**ten komputer (na którym trwała ta sesja) ma pulpit w OneDrive.**

**How to apply:** jeśli w przyszłości znowu skrót do podglądu nie działa,
najpierw sprawdzić, w jakim dokładnie folderze leży projekt na danym
komputerze (widać to już w ścieżce katalogu roboczego sesji — jeśli zawiera
`OneDrive\Desktop`, adres w skrócie musi też zawierać `OneDrive\Desktop`).
Poprawka zrobiona PowerShellem przez `WScript.Shell` (ten sam sposób, co przy
tworzeniu skrótu pierwszy raz — patrz `CLAUDE.md`), zapisana i wysłana na
GitHub. Jeśli drugi komputer NIE ma pulpitu w OneDrive, ten sam plik `.lnk`
znów przestanie działać tam — to nieunikniona konsekwencja trzymania
bezwzględnego adresu w jednym pliku współdzielonym między dwoma różnie
ułożonymi komputerami. Patrz [[ciaglosc-sprawdzac-repo-na-starcie]].
