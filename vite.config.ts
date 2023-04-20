import { defineConfig } from 'vite'
import * as path from 'path'
import react from '@vitejs/plugin-react'
import pages from 'vite-plugin-react-pages'
import dts from 'vite-plugin-dts'
import tsConfigPaths from 'vite-tsconfig-paths'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import * as packageJson from './package.json'

const libConfig = defineConfig({
  plugins: [
    dts({
      outputDir: 'dist',
    }),
    tsConfigPaths(),
    react(),
    cssInjectedByJsPlugin(),
  ],
  build: {
    lib: {
      entry: path.resolve('src', 'index.tsx'),
      name: packageJson.name,
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
  },
});

const docConfig = defineConfig({
  plugins: [
    react(),
    tsConfigPaths(),
    pages({
      pagesDir: path.join(__dirname, 'docs'),
    }),
  ]
})

export default process.env.BUILD_TYPE === 'doc' ? docConfig : libConfig;