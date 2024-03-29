import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import paths from 'vite-tsconfig-paths'

export default defineConfig({
  base: '/',
  plugins: [react(), paths()],
})
