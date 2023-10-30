import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: './',
    minify: true,
    emptyOutDir: false,
    lib: {
      entry: 'index.js',
      formats: ['es', 'cjs'],
      fileName: 'tokens',
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'tokens.min.css';
          return assetInfo.name;
        },
      },
    },
  },
  plugins: [react()],
});
