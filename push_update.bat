@echo off
cd /d "c:\Users\goura\Music\Impectus 2\Impectus 2\Impectus"
git add .
git commit -m "feat: Add Railway backend URL"
git push origin main
echo Done! Now deploy frontend on Railway
pause
