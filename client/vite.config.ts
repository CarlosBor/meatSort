import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import mdx from "@mdx-js/rollup"

// Export config with plugins
export default defineConfig({
  plugins: [
    mdx(),
    react(),
  ],
});
