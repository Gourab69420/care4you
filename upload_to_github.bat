@echo off
echo ========================================
echo Care4You - GitHub Upload Script
echo ========================================
echo.

cd /d "c:\Users\goura\Music\Impectus 2\Impectus 2\Impectus"

echo Creating .gitignore...
(
echo node_modules/
echo dist/
echo .env
echo server/.env
echo server/node_modules/
echo ml_service/__pycache__/
echo .vscode/
echo *.log
echo .DS_Store
echo build/
) > .gitignore

echo.
echo Initializing git repository...
git init

echo.
echo Adding remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/Gourab69420/care4you.git

echo.
echo Staging all files...
git add .

echo.
echo Committing changes...
git commit -m "feat: Complete Care4You telemedicine platform with Google OAuth, doctor registration, and real-time dashboard"

echo.
echo Pushing to GitHub...
git branch -M main
git push -u origin main --force

echo.
echo ========================================
echo Upload Complete!
echo ========================================
pause
