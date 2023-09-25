import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from "vite-plugin-singlefile"

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4342
  },
  plugins: [vue(), viteSingleFile()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src')
    }
  },
})
