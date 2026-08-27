@echo off
echo ========================================
echo   VR Construction - Full Stack Project
echo ========================================
echo.
echo Starting Frontend (Vite + React)...
echo Starting Backend (FastAPI + Python)...
echo.

REM Start Backend in new window
start "VR Construction Backend" cmd /k "cd backend && pip install -r requirements.txt && python main.py"

REM Start Frontend in new window
start "VR Construction Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo   Both servers starting!
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:8000
echo   API Docs: http://localhost:8000/docs
echo ========================================
echo.
pause
