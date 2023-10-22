import forms from '@tailwindcss/forms';

import colors from './colors.preset.js';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  presets: [colors],
  content: ['src/app.tsx', 'src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'noto-sans': ['Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [forms],
};
