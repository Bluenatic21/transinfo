@echo off
REM Добавляем все изменения и backend_debug.log явно (если вдруг был проигнорирован)
git add .
git add backend_debug.log

REM Просим ввести сообщение коммита
set /p msg="Введите сообщение коммита: "

git commit -m "%msg%"
git push

pause
