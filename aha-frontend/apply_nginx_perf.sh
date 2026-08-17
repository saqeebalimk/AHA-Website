#!/bin/bash
echo "🛡️  Applying Advanced Nginx Performance Configuration (Gzip & Caching) to VPS..."
echo "Please enter your VPS root password when prompted:"

ssh root@2.25.151.68 << 'EOF'
  # Create optimal performance configuration for AHA
  cat << 'INNER_EOF' > /etc/nginx/conf.d/ahawebsite.conf
  server {
      listen 80;
      server_name ahaservices.tech www.ahaservices.tech;
      
      root /usr/share/nginx/ahawebsite;  
      index index.html;

      # Gzip Compression
      gzip on;
      gzip_vary on;
      gzip_min_length 1024;
      gzip_proxied expired no-cache no-store private auth;
      gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/javascript application/json application/xml image/svg+xml;

      # Cache Static Assets (1 Year)
      location ~* \.(jpg|jpeg|gif|png|webp|svg|ico|css|js|woff2|woff|ttf)$ {
          expires 1y;
          add_header Cache-Control "public, max-age=31536000, immutable";
          try_files $uri $uri/ =404;
      }

      # No-cache for HTML (Ensure immediate updates)
      location = /index.html {
          expires -1;
          add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
      }

      # React SPA Routing
      location / {
          try_files $uri $uri/ /index.html;
      }
  }
INNER_EOF

  # Test Nginx and Reload
  nginx -t
  if [ $? -eq 0 ]; then
      systemctl reload nginx
      echo "✅ Nginx Performance Optimizations successfully applied!"
  else
      echo "❌ Nginx configuration error detected. Please check VPS."
  fi
EOF
