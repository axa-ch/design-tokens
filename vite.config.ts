import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
          const [name] = assetInfo.names;
          if (name === 'tokens.css') return 'tokens.min.css';
          return name;
        },
      },
    },
  },
  plugins: [react()],
});
