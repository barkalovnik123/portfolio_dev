import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  optimizeDeps: {
    include: ['gray-matter'] // Убедимся, что Vite правильно обработает CJS-пакет
  },
  assetsInclude: ['**/*.md'],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
});