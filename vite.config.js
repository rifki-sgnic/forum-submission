/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  server: {
    cors: {
      origin: '*',
    },
  },
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
});
