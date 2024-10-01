/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'steam-dark': '#171a21',
        'steam-blue': '#66c0f4',
        'steam-text': '#c6d4df',
        'steam-bg': '#1b2838',
      },
    },
  },
  plugins: [],
}