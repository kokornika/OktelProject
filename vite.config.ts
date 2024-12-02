import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  build: {
    sourcemap: command === 'serve',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  base: '/'
}));
