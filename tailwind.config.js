/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
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
