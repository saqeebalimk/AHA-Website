#!/usr/bin/env bash
# ─── AHA Technologies — Start All Servers ────────────────────────────────────
# Run this script from /home/adminpc/ahawebsite to start both servers.

echo "──────────────────────────────────────────────"
echo "  AHA Technologies — Starting Services"
echo "──────────────────────────────────────────────"

# Export API Key so Django can read it natively
# Keys are loaded automatically by decouple from aha_backend/.env
# Do not hardcode API keys here!

# Start Django API backend on port 8001 (background)
echo "[1/2] Starting Django backend on http://localhost:8001 ..."
cd aha_backend
python3 manage.py runserver 8001 &
DJANGO_PID=$!
cd ..

sleep 1

# Start static frontend on port 8000 (background)
echo "[2/2] Starting frontend on http://localhost:8000 ..."
cd "AHA_website_new-20260610T084524Z-3-001/AHA_website_new"
python3 -m http.server 8000 &
FRONTEND_PID=$!
cd ../..

echo ""
echo "✅ Both servers are running!"
echo "   Frontend  → http://localhost:8000"
echo "   Backend   → http://localhost:8001"
echo "   Admin     → http://localhost:8001/admin"
echo ""
echo "Press Ctrl+C to stop all servers."

# Wait for Ctrl+C and clean up
trap "echo 'Stopping servers...'; kill $DJANGO_PID $FRONTEND_PID 2>/dev/null" EXIT
wait
