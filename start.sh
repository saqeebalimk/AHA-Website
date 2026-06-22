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

# Start React frontend using Vite (background)
echo "[2/2] Starting React frontend with Vite (npm run dev) ..."
cd aha-frontend
npm run dev -- --port 5173 &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Both servers are running!"
echo "   Frontend  → http://localhost:5173"
echo "   Backend   → http://localhost:8001"
echo "   Admin     → http://localhost:8001/admin"
echo ""
echo "Press Ctrl+C to stop all servers."

# Wait for Ctrl+C and clean up
trap "echo 'Stopping servers...'; kill $DJANGO_PID $FRONTEND_PID 2>/dev/null" EXIT
wait
