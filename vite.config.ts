import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: './',
    minify: false,
    emptyOutDir: false,
    lib: {
      entry: 'index.js',
      formats: ['cjs'],
      fileName: 'index.cjs',
    },
  },
  plugins: [react()],
});
