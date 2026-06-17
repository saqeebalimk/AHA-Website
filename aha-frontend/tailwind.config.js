/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          brandTeal: { DEFAULT: '#5EA19B', dark: '#4a827d', light: '#a3d1cd' },
          brandDark: { DEFAULT: '#222222', 900: '#111111', 800: '#1a1a1a' }
      },
      fontFamily: {
          sans: ['Inter', 'sans-serif'],
          heading: ['Montserrat', 'sans-serif'],
      },
      animation: {
          'scroll': 'scroll 40s linear infinite',
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
          scroll: {
              '0%': { transform: 'translateX(0)' },
              '100%': { transform: 'translateX(calc(-250px * 8))' },
          }
      }
    },
  },
  plugins: [],
}
