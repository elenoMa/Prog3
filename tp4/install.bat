@echo off
echo ========================================
echo Instalando Gestor de Personas
echo ========================================

echo.
echo Instalando dependencias del Backend...
cd Backend
call npm install
if %errorlevel% neq 0 (
    echo Error al instalar dependencias del backend
    pause
    exit /b 1
)

echo.
echo Instalando dependencias del Frontend...
cd ..\Frontend
call npm install
if %errorlevel% neq 0 (
    echo Error al instalar dependencias del frontend
    pause
    exit /b 1
)

echo.
echo ========================================
echo Instalacion completada exitosamente!
echo ========================================
echo.
echo Para ejecutar la aplicacion:
echo.
echo 1. Backend: cd Backend && npm run dev
echo 2. Frontend: cd Frontend && npm run dev
echo.
echo El backend estara en: http://localhost:3000
echo El frontend estara en: http://localhost:5173
echo.
pause 