#!/bin/bash
echo "🚀 Building modern AHA Frontend..."
npm run build

echo "📤 Uploading to Hostinger VPS..."
scp -r dist/* root@2.25.151.68:/usr/share/nginx/ahawebsite/

echo "✅ Live website updated successfully!"
