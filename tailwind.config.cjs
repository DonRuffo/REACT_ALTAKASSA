/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode:'class',
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
      {
        pattern: /border-(yellow|red|blue|green|purple|sky)-\d{3}/,
      },
      {
        pattern: /shadow-(yellow|red|blue|green|purple|sky)-\d{3}/,
      },
    ],
    theme: {
      extend: {boxShadow:{
        'custom-shadow': '2px 4px 20px rgba(0, 227, 243, 0.93)'
      }},
    },
    plugins: [],
  }