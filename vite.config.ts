import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

import tailwindcss from '@tailwindcss/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vitejs.dev/config/

export default defineConfig({
  envDir: '.env',
  // base: import.meta.env.BASE_URL,
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              test: /node_modules/,
              name: 'vendor',
            },
          ],
        },
      },
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    babel({
      presets: [reactCompilerPreset()],
    }),
    react(),
    svgr({
      // A minimatch pattern, or array of patterns, which specifies the files in the build the plugin should include.
      include: '**/*.svg?react',
    }),
    visualizer({
      gzipSize: true,
    }),
    tailwindcss(),
  ],
})
