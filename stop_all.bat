@echo off
REM Останавливаем FastAPI (uvicorn)
taskkill /IM uvicorn.exe /F >nul 2>nul

REM Останавливаем Next.js (node)
taskkill /IM node.exe /F >nul 2>nul

echo ===============================
echo Все сервера остановлены!
echo ===============================
pause