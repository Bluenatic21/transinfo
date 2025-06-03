@echo off
REM Запускает backend (FastAPI) в отдельном окне
start "Backend" cmd /k "cd backend && run_backend.bat"

REM Запускает frontend (Next.js) в отдельном окне
start "Frontend" cmd /k "cd frontend && run_frontend.bat"

echo ===============================
echo Все сервера запущены!
echo ===============================
pause