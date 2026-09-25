import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    clearMocks: true,
    restoreMocks: true,
    unstubGlobals: true,
    unstubEnvs: true,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.{test,spec}.{ts,tsx}', 'src/**/{__tests__,__mothers__,__fixtures__,__mocks__}/**'],
    },
  },
});
