@echo off
REM Удаляем backend_debug.log из .gitignore, если есть
findstr /c:"backend_debug.log" .gitignore >nul && powershell -Command "(Get-Content .gitignore) | Where-Object {$_ -ne 'backend_debug.log'} | Set-Content .gitignore"

REM Добавляем файл в индекс
git add backend_debug.log

REM Делаем коммит с объяснением
git commit -m "Временно включаю логирование для отладки"

echo ===================================
echo Логирование ВКЛЮЧЕНО! Логи будут пушиться в репозиторий.
echo ===================================
pause