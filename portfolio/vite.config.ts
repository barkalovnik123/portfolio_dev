// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    nodePolyfills({
      include: ['buffer'], // Только buffer
      globals: { Buffer: true }
    })
  ],
  optimizeDeps: {
    include: ['gray-matter'] // Убедимся, что Vite правильно обработает CJS-пакет
  }
});