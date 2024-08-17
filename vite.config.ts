import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

const ReactCompilerConfig = {
  /* ... */
}

export default defineConfig({
  envDir: '.env',
  // base: import.meta.env.BASE_URL,
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
      },
    }),
    svgr({
      // A minimatch pattern, or array of patterns, which specifies the files in the build the plugin should include.
      include: '**/*.svg?react',
    }),
    visualizer({
      gzipSize: true,
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
      {
        find: '@action',
        replacement: fileURLToPath(new URL('./src/action', import.meta.url)),
      },
      {
        find: '@assets',
        replacement: fileURLToPath(new URL('./src/assets', import.meta.url)),
      },
      {
        find: '@component',
        replacement: fileURLToPath(new URL('./src/component', import.meta.url)),
      },
      {
        find: '@constants',
        replacement: fileURLToPath(new URL('./src/constants', import.meta.url)),
      },
      {
        find: '@config',
        replacement: fileURLToPath(new URL('./src/config', import.meta.url)),
      },
      {
        find: '@css',
        replacement: fileURLToPath(new URL('./src/css', import.meta.url)),
      },
      {
        find: '@theme',
        replacement: fileURLToPath(new URL('./src/css/theme', import.meta.url)),
      },
      {
        find: '@data',
        replacement: fileURLToPath(new URL('./src/data', import.meta.url)),
      },
      {
        find: '@event',
        replacement: fileURLToPath(new URL('./src/event', import.meta.url)),
      },
      {
        find: '@helper',
        replacement: fileURLToPath(new URL('./src/helper', import.meta.url)),
      },
      {
        find: '@hook',
        replacement: fileURLToPath(new URL('./src/hook', import.meta.url)),
      },
      {
        find: '@layout',
        replacement: fileURLToPath(new URL('./src/layout', import.meta.url)),
      },
      {
        find: '@page',
        replacement: fileURLToPath(new URL('./src/page', import.meta.url)),
      },
      {
        find: '@provider',
        replacement: fileURLToPath(new URL('./src/provider', import.meta.url)),
      },
      {
        find: '@route',
        replacement: fileURLToPath(new URL('./src/route', import.meta.url)),
      },
      {
        find: '@util',
        replacement: fileURLToPath(new URL('./src/util', import.meta.url)),
      },
    ],
  },
})
