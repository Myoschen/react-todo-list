/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: 'hsl(var(--primary))',
        success: 'hsl(var(--success))',
        error: 'hsl(var(--error))',
        border: 'hsl(var(--border))',
      },
    },
  },
}
