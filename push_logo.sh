#!/bin/bash
# This script directly uploads the correct AHA logo to the VPS
echo "Uploading correct AHA logo to the live server..."
echo "Please enter your VPS root password when prompted:"

scp /home/adminpc/ahawebsite/AHA-Website/tmp_aha_extract/AHA_website_new/logo.png \
    root@2.25.151.68:/usr/share/nginx/ahawebsite/logo.png

echo ""
echo "Done! Please hard refresh ahaservices.tech (Ctrl+Shift+R in browser)"
