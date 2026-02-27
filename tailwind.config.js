import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import containerQueries from '@tailwindcss/container-queries'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#835816',
        secondary: '#FCE2A0',
        charcoal: '#272426',
        'background-light': '#F2EBE0',
        'background-alt': '#DFD1C4',
        'background-dark': '#1a1a1a',
        'surface-dark': '#272426',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Raleway', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '2px',
        lg: '4px',
      },
      letterSpacing: {
        widest: '.2em',
      },
    },
  },
  plugins: [forms, typography, containerQueries],
}
