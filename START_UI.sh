#!/bin/bash
echo "🚀 Starting Skaviyo — Single App, Role-Based UI"
echo ""
echo "📌 Login Page     → http://localhost:5173"
echo "📌 Admin UI       → http://localhost:5173/admin       (login as Admin)"
echo "📌 Vendor UI      → http://localhost:5173/vendor      (login as Vendor)"
echo "📌 Customer Shop  → http://localhost:5173/shop        (login as Customer)"
echo ""
cd "$(dirname "$0")/client" && npm run dev -- --port 5173
