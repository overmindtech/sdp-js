/// <reference types="vitest" />

import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ['vitest.setup.ts'],
    coverage: {
      exclude: ['src/__generated__'],
    },
  },
})
