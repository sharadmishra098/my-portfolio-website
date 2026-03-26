import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  base: '/my-portfolio-website/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'framer-motion'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          motion: ['gsap', '@studio-freight/lenis'],
        },
      },
    },
  },
});
