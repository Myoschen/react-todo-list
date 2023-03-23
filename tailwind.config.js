/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'light-blue': {
          100: '#fcfdff',
          200: '#f9fbff',
          300: '#f5fafe',
          400: '#f2f8fe',
          500: '#eff6fe',
          600: '#bfc5cb',
          700: '#8f9498',
          800: '#606266',
          900: '#303133',
        },
        'light-purple': {
          100: '#fbfbff',
          200: '#f7f8ff',
          300: '#f4f4ff',
          400: '#f0f1ff',
          500: '#ecedff',
          600: '#bdbecc',
          700: '#8e8e99',
          800: '#5e5f66',
          900: '#2f2f33',
        },
      },
    },
  },
  plugins: [],
};
