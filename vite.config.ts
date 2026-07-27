import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves project pages from /<repo>/, Render/custom domain from /.
// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/zabolotnyi-studio/' : '/',
  plugins: [react()],
})
