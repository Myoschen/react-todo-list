/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'noto-sans': ['Noto Sans', 'sans-serif'],
      },
      colors: {
        'bg-blue': '#eff6fe',
        'bg-purple': '#f1ecff',
        progress: '#94aefb',
        indigo: {
          100: '#e4e9f6',
          200: '#c9d3ec',
          300: '#aebce3',
          400: '#93a6d9',
          500: '#7890d0',
          600: '#6073a6',
          700: '#48567d',
          800: '#303a53',
          900: '#181d2a',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
