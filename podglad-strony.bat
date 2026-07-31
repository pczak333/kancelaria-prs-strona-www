@echo off
rem ============================================================
rem  Podglad strony KRS Guard.
rem  Kliknij dwa razy ten plik - strona otworzy sie w przegladarce Edge.
rem  Bez serwera, bez dodatkowych czarnych okien - po prostu strona.
rem
rem  (Uzywamy Edge, bo Chrome ma na tym komputerze rozszerzenie,
rem   ktore blokuje otwieranie strony wprost z pliku.)
rem ============================================================

setlocal
set "STRONA=%~dp0www\index.html"
set "EDGE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if not exist "%EDGE%" set "EDGE=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"

if exist "%EDGE%" start "" "%EDGE%" --new-window "%STRONA%"
if not exist "%EDGE%" start msedge --new-window "%STRONA%"
endlocal
