import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import solidPlugin from 'vite-plugin-solid'

const path = require('path')

export default defineConfig({
  plugins: [solidPlugin(), dts()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'proxy-client-solid',
      fileName: format => `index.${format}.js`
    },
    rollupOptions: {
      external: ['solid-js']
    }
  }
})
