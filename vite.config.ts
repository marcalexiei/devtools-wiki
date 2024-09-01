import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

import { APP_BASE_PATH } from './src/AppBasePath';

// https://vitejs.dev/config/
// biome-ignore lint/style/noDefaultExport: vite requires default export
export default defineConfig({
  base: `/${APP_BASE_PATH}/`,
  plugins: [solidPlugin()],
  build: {
    target: 'esnext',
  },
});
