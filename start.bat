@echo off
echo Starting SynergeReader...
echo.

echo Checking if Docker is installed...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker is not installed or not running.
    echo Please install Docker Desktop and try again.
    pause
    exit /b 1
)

echo Docker is available. Starting SynergeReader with Docker Compose...
echo.

cd /d "%~dp0"
docker-compose up --build

echo.
echo SynergeReader is starting up...
echo Frontend will be available at: http://localhost:3000
echo Backend API will be available at: http://localhost:5000
echo.
echo Press Ctrl+C to stop the application.
pause
