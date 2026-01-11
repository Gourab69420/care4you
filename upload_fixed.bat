@echo off
echo ========================================
echo Care4You - GitHub Upload Script (Fixed)
echo ========================================
echo.

cd /d "c:\Users\goura\Music\Impectus 2\Impectus 2\Impectus"

echo Removing problematic nested folder...
rmdir /s /q care4you 2>nul

echo.
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
echo care4you/
) > .gitignore

echo.
echo Removing old git...
rmdir /s /q .git 2>nul

echo.
echo Initializing fresh git repository...
git init

echo.
echo Adding remote repository...
git remote add origin https://github.com/Gourab69420/care4you.git

echo.
echo Staging all files...
git add .

echo.
echo Committing changes...
git commit -m "feat: Complete Care4You telemedicine platform with Google OAuth"

echo.
echo Pushing to GitHub...
git branch -M main
git push -u origin main --force

echo.
echo ========================================
echo Upload Complete!
echo ========================================
pause
