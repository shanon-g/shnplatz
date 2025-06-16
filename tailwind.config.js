/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        introFadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        logoPop: {
          '0%': { transform: 'scale(0.6)', opacity: 0 },
          '30%': { transform: 'scale(1.2)', opacity: 1 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
      
    },
    screens: {
      xs: '480px',
      sm: '640px',
      xl: '1920px'
    },
  },
  plugins: [],
}
