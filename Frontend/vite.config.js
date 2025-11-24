import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path for GitHub Pages deployment
// Set to repository name if deploying to project pages (e.g., '/RentokilAdmin/')
// Set to '/' for root domain or custom domain
const base = process.env.VITE_BASE_PATH || '/'

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})

