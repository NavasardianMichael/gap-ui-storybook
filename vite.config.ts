import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/gap-ui-storybook/',
  plugins: [react(), tailwindcss()],
  server: {
    port: 5179,
    open: true,
  },
})
