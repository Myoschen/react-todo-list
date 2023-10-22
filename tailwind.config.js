import forms from '@tailwindcss/forms';
import {fontFamily} from 'tailwindcss/defaultTheme';

import colors from './colors.preset';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  presets: [colors],
  content: ['src/app.tsx', 'src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans Variable', ...fontFamily.sans],
      },
    },
  },
  plugins: [forms],
};
