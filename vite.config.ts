import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), 
    tsconfigPaths()
  ],
  resolve: {
    alias: {
      'node-fetch': 'isomorphic-fetch',
    },
  },
  css: {
    modules: {
      localsConvention: "camelCase",
      generateScopedName: "[name]__[local]__[hash:base64:2]"
    }
  },
})
