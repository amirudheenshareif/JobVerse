import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
    compression({
      algorithm: 'brotliCompress', // 'gzip' is also an option
      ext: '.br',
      deleteOriginFile: false, // Keep original file for fallback
      threshold: 10240 // Only compress files larger than 10KB
    }),
  ],
  build: {
    target: 'esnext', // Use latest JS features
    minify: 'esbuild', // Fast minification
    sourcemap: false, // Disable source maps for smaller builds
    treeshake: true, // Enable tree-shaking
    chunkSizeWarningLimit: 500, // Warn if a chunk exceeds 500kb
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Split vendor code into a separate chunk
          }
        }
      }
    }
  },
  esbuild: {
    keepNames: true, // Keep function names for better debugging
    treeShaking: true
  },
})





