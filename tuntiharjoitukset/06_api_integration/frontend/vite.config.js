import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The proxy forwards any request starting with /api from the Vite dev server
// (localhost:5177) to the Express backend (localhost:3001).
// This means fetch('/api/notes') in your React code hits the backend without
// any CORS issues — both appear to come from the same origin during development.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5177,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
