/// <reference types="vitest" />
/// <reference types="vite/client" />
/// <reference types="@testing-library/jest-dom" />
import solidPlugin from 'vite-plugin-solid';
import { defineConfig } from 'vitest/config';
// import devtools from 'solid-devtools/vite';

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
  plugins: [
    /*
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
  ],
});
