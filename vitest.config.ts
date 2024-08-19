/// <reference types="vitest" />

import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ['vitest.setup.ts'],
    coverage: {
      include: ['src/**/*'],
      exclude: ['src/__generated__/**/*', 'src/__tests__/**/*'],
    },
  },
})
