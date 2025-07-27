import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

import { APP_BASE_PATH } from './src/AppBasePath.ts';

// https://vitejs.dev/config/
export default defineConfig({
  base: `/${APP_BASE_PATH}/`,
  plugins: [solidPlugin()],
  build: {
    target: 'esnext',
  },
});
