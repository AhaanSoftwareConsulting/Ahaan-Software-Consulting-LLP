// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'vendor-motion'
            if (id.includes('leaflet')) return 'vendor-leaflet'
            if (id.includes('@phosphor-icons')) return 'vendor-icons'
            if (id.includes('axios') || id.includes('react-hook-form') || id.includes('react-toastify')) {
              return 'vendor-utils'
            }
            if (id.includes('react-router-dom') || id.includes('react-dom') || id.includes('/react/')) {
              return 'vendor-react'
            }
            return 'vendor-other'
          }
        },
      },
    },
  },
})