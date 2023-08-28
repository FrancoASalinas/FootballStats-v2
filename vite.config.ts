import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/FootballStats-v2/',
  plugins: [react(),   VitePWA({
    workbox: {
      cleanupOutdatedCaches: true,
      
    },
    registerType: 'autoUpdate',
    devOptions: {
      enabled: true
    },
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
    manifest: {
      name: 'Football Stats v2',
      short_name: 'FS',
      description: 'Football Stats is an app that aims to get everyone in touch with the statistics of their favorite teams and players.',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
  }})]
})
