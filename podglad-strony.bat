@echo off
rem Podglad strony KRS Guard: kliknij dwa razy ten plik.
rem Otworzy sie przegladarka z adresem http://localhost:8765/
rem To okno musi zostac otwarte, poki ogladasz strone. Zamkniecie okna = wylaczenie podgladu.
cd /d "%~dp0www"
start "" http://localhost:8765/
python -m http.server 8765
