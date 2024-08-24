import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

// https://vitejs.dev/config/
// biome-ignore lint/style/noDefaultExport: vite requires default export
export default defineConfig({
  base: '/devtools-wiki/',
  plugins: [solidPlugin()],
  build: {
    target: 'esnext',
  },
});
