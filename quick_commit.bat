@echo off
set /p MSG="Введите короткое описание коммита: "
git add -A
git commit -m "%MSG%"
git push
pause