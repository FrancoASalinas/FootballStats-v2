/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      anton: 'Anton, sans-serif',
      roboto: 'Roboto, sans-serif',
    },
    extend: {
      colors: {
        light: '#D0CCD0',
        dark: '#342E37',
        primary: '#0A8754',
      },
    },
  },
  plugins: [],
};
