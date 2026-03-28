import { fileURLToPath, URL } from 'node:url' // 1. เพิ่มบรรทัดนี้
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      // 2. เพิ่มส่วนนี้เพื่อให้ @ หมายถึงโฟลเดอร์ src
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})