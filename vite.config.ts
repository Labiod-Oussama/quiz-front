import { AliasOptions, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//@ts-ignore
import path from "path";

//@ts-ignore
const root = path.resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
    minify: 'esbuild',
    target: 'es2022'
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      }
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "src": root,
    } as AliasOptions,
  },
});