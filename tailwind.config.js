/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        "cps-gold": "#DCA843",
        "cps-grey": "#BABABA",
        "cps-black": "#161617",
      }
    },

    fontFamily: {
      "allotrix-font": ['Poppins', 'sans-serif'],
      "allotrix-font-secondary": ['Montserrat', 'sans-serif'],
      "cinzel": ['Cinzel', 'serif'],
      "playfair": ['Playfair Display', 'serif'],
    },
  },

  plugins: [],
}

