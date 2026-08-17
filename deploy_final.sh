#!/bin/bash
set -e

echo "============================================="
echo "⚡ AHA Technologies - Performance Deployment ⚡"
echo "============================================="

cd /home/adminpc/ahawebsite/AHA-Website/aha-frontend

echo "[1/4] Building Vite Application (Chunking & Minifying)..."
npm run build

echo "[2/4] Uploading compressed assets to Hostinger VPS..."
echo "You will be prompted for your VPS password:"
scp -r dist/* root@2.25.151.68:/usr/share/nginx/ahawebsite/

echo "[3/4] Applying VPS Nginx Cache & Gzip Configuration..."
echo "You will be prompted for your VPS password again:"
bash apply_nginx_perf.sh

echo "[4/4] Committing all performance features to Git..."
cd /home/adminpc/ahawebsite/AHA-Website
git add -A
git commit -m "perf: Optimize to PageSpeed 90+ (WebP, Vite chunks, Nginx Gzip, Lazy loading)"
git push origin main

echo "============================================="
echo "🎉 DEPLOYMENT COMPLETE! Hard refresh your website! 🎉"
echo "============================================="
