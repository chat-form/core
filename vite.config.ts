import { defineConfig } from 'vite'
import * as path from 'path'
import react from '@vitejs/plugin-react'
import pages from 'vite-plugin-react-pages'
import dts from 'vite-plugin-dts'
import tsConfigPaths from 'vite-tsconfig-paths'
import * as packageJson from './package.json'

const libConfig = defineConfig({
  plugins: [
    dts({
      include: ['src/component/'],
    }),
    tsConfigPaths(),
    react()
  ],
  build: {
    lib: {
      entry: path.resolve('src', 'index.tsx'),
      name: packageJson.name,
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
  },
});

const docConfig = defineConfig({
  plugins: [
    react(),
    pages({
      pagesDir: path.join(__dirname, 'docs'),
    }),
  ]
})

export default process.env.BUILD_TYPE === 'doc' ? docConfig : libConfig;