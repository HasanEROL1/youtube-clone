/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "0F0F0F",
        secondary: "#3e403f",
      }
    },
  },
  plugins: [],
}
