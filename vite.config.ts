import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor libraries into their own chunks
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          'vendor-framer': ['framer-motion'],
          'vendor-ui': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog', 
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-label',
            '@radix-ui/react-slot'
          ],
          'vendor-charts': ['recharts'],
          'vendor-icons': ['lucide-react', '@remixicon/react'],
          'vendor-utils': ['clsx', 'tailwind-merge', 'class-variance-authority'],
          'vendor-animations': ['@tsparticles/engine', '@tsparticles/react', '@tsparticles/slim'],
          'vendor-tremor': ['@tremor/react'],
          'vendor-supabase': ['@supabase/supabase-js']
        }
      }
    },
    // Reduce chunk size warning limit
    chunkSizeWarningLimit: 500,
    // Enable source maps for better debugging
    sourcemap: false
  }
});
