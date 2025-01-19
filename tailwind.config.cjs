/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode:'class',
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {boxShadow:{
        'custom-shadow': '2px 4px 20px rgba(12, 9, 14, 0.81)'
      }},
    },
    plugins: [],
  }