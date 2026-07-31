@echo off
rem Podglad strony KRS Guard: kliknij dwa razy ten plik.
rem
rem Otworzy sie:
rem  1) male okno "serwer podgladu" (czarne) - to silnik podgladu,
rem     zostaw je otwarte, poki ogladasz strone. Zamkniecie = koniec podgladu.
rem  2) przegladarka z adresem http://localhost:8765/ (na wierzchu).

cd /d "%~dp0www"

rem Serwer w osobnym oknie (nie blokuje otwarcia przegladarki):
start "KRS Guard - serwer podgladu (nie zamykaj)" cmd /k python -m http.server 8765

rem Chwila na uruchomienie serwera, zeby strona od razu sie zaladowala:
timeout /t 2 /nobreak >nul

rem Przegladarka jako ostatnia - dzieki temu wychodzi na wierzch:
start "" http://localhost:8765/

exit
