/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ["primary-bg"]: "#002A59",
        ["secondary-bg"]: "#183F68",
        ["primary-text"]: "white",
        ["secondary-text"]: "#32A8B3",
        ["disabled-btn"]: "#65809E",
        ["active-btn"]: "#3BD1D1"
      }
    },
  },
  plugins: [],
}

