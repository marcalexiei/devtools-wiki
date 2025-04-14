import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

import { APP_BASE_PATH } from './src/AppBasePath';

// https://vitejs.dev/config/
export default defineConfig({
  base: `/${APP_BASE_PATH}/`,
  plugins: [solidPlugin()],
  build: {
    target: 'esnext',
  },
  css: {
    /** @see https://vitejs.dev/config/shared-options.html#css-preprocessoroptions */
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
});
