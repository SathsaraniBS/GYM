// tailwind.config.js (full fixed file)
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // FIXED: Ensure Tailwind scans all JS/JSX/TS/TSX files in src/
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}