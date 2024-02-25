import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [VantResolver(),ElementPlusResolver()],
      // "types": ["element-plus/global"]
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets/*' : fileURLToPath(new URL("./src/assets/*", import.meta.url))
    }
  },
  server : {
    proxy : {
      '/api' : {
        target: 'http://127.0.0.1:12011',
        rewrite: path => path.replace(/^\/api/, ''), 
        changeOrigin: true,
      }
    }
  },
  base : "./"
  
  // 
})
