@echo off
REM Добавить backend_debug.log в .gitignore, если его там нет
findstr /c:"backend_debug.log" .gitignore >nul || echo backend_debug.log>>.gitignore

REM Удалить файл из индекса git (но локально оставить)
git rm --cached backend_debug.log

REM Коммитим изменения в .gitignore и удаление лога из гита
git add .gitignore
git commit -m "Отключаю логирование, лог больше не коммитится"

echo ===================================
echo Логирование ВЫКЛЮЧЕНО! Лог-файл больше не будет попадать в git.
echo ===================================
pause