import { defineConfig } from 'vite'
import typescript from 'rollup-plugin-typescript2'
import solidPlugin from 'vite-plugin-solid'

const path = require('path')

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    // target: 'esnext',
    // polyfillDynamicImport: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'proxy-client-solid',
      fileName: format => `index.${format}.js`
    },
    rollupOptions: {
      external: ['solid-js'],
      plugins: [
        typescript({
          include: ['src/**/*.ts', 'src/**/*.tsx']
        })
      ]
    }
  }
})
