import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative asset paths allow the generated /docs build to work on
  // GitHub Pages regardless of the repository name.
  base: './',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
})
