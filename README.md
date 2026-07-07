# AHA Technologies - Luxury Audio Engineering

This repository contains the high-performance, purely static React application representing the official digital storefront for AHA Technologies.

Built specifically for extremely high performance, dynamic luxury UI aesthetics (using Framer Motion), and perfect SEO, it handles direct dynamic lead-generation via WhatsApp without the need for a complex backend framework.

---

## 🛠️ 1. Technical Stack

- **Framework**: React 18 
- **Build Tool**: Vite (Lightning fast compilation)
- **Styling**: Tailwind CSS + Custom PostCSS
- **Animations**: Framer Motion
- **Architecture**: 100% Static Single Page Application (SPA)

---

## 💻 2. Running Locally (For Developers)

To run this project on your personal computer and preview any changes before pushing them live, you need **Node.js** installed (v18+).

### Step-by-Step Setup:
1. Open your terminal and navigate to the project directory:
   ```bash
   cd ahawebsite/aha-frontend
   ```
2. Install the necessary dependencies (only needed the very first time):
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. **View the site:** Open your browser and go to `http://localhost:5173`. Any changes you make in VS Code will instantly update on your screen!

---

## 🚀 3. Building for Production

When you are ready to publish new changes for the world to see, you must "build" the application. This process minifies the React code into tiny, hyper-functional static `js/css/html` browser files.

Under the `aha-frontend` directory, simply run:
```bash
npm run build
```
*This will create a `dist` folder. The contents of this folder are the ONLY things that get uploaded to the live server.*

---

## 🌍 4. Deploying to the Live Server

This website is currently hosted on a **Hostinger AlmaLinux VPS** via **Nginx** (acting as a static web server on Port 80/443).

### Option A: The "One-Click" Deploy Script (Recommended)
If you are working on the primary administrative machine that has SSH access to the VPS, we created a single fast script to handle building and deploying simultaneously!

1. Open a terminal to the `aha-frontend` directory.
2. Run the deployment script:
   ```bash
   ./deploy.sh
   ```
3. When prompted in the terminal, type the `root` password for the VPS. 
4. That's it! The script will build your files and instantly securely copy (`scp`) them to `/usr/share/nginx/ahawebsite/` on the live server.

### Option B: Manual Server Upload
If you are a new developer or the deployment script is unavailable:
1. Make sure you have run `npm run build`.
2. Securely copy the `dist` files to the VPS (Replace `x.x.x.x` with the server IP):
   ```bash
   scp -r dist/* root@x.x.x.x:/usr/share/nginx/ahawebsite/
   ```

---

## 🔒 5. SEO and Domain Note

- SEO is fully handled within `aha-frontend/index.html`. 
- **Redirects:** If changing primary domains (e.g. from `ahatech.in` to `ahaservices.tech`), the Nginx configuration on the VPS handles the **301 Permanent Redirect** to ensure absolutely zero SEO ranking loss from Google.
