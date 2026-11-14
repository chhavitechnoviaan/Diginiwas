/** @type {import('tailwindcss').Config} */
export default {
  content: [  "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
   theme: {
  extend: {
    colors: {
      primary: "#0d2633",
      green: "#57f26c",
      gold: "#fcc470"
    }
  }
}
  },
  plugins: [],
}

