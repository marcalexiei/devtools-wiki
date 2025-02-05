/// <reference types="vitest" />
/// <reference types="vite/client" />
/// <reference types="@testing-library/jest-dom" />
import { defineConfig } from 'vitest/config';
import solidPlugin from 'vite-plugin-solid';
// import devtools from 'solid-devtools/vite';

// biome-ignore lint/style/noDefaultExport: vite requires default export
export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['node_modules/@testing-library/jest-dom/vitest'],
    // if you have few tests, try commenting this
    // out to improve performance:
    isolate: true,
  },
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    conditions: ['development', 'browser'],
  },
  css: {
    /** @see https://vitejs.dev/config/shared-options.html#css-preprocessoroptions */
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  plugins: [
    /*
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
  ],
});
