/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ECC863",
        ferra: "#6C4F4C",
        accent: "#E9DCC0",
        xanadu: "#7B8A7F",
      },
    },
  },
  plugins: [],
};
