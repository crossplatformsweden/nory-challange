import { defineConfig, devices } from '@playwright/test';

// Read environment variable with fallback
const isCI = process.env.CI === 'true';

export default defineConfig({
  testDir: './src',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI ? 'dot' : 'dot', // Use both reporters locally, only dot in CI
  use: {
    trace: 'on-first-retry',
    baseURL: 'http://localhost:3001',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'cd ../../apps/web && pnpm dev',
    url: 'http://localhost:3001',
    reuseExistingServer: !isCI,
    stdout: 'pipe',
    stderr: 'pipe',
    timeout: isCI ? 180000 : 120000, // 3 minutes timeout in CI, 2 minutes locally
  },
  // Increase timeouts for CI environment
  timeout: isCI ? 60000 : 30000, // 60 seconds in CI, 30 seconds locally
  expect: {
    timeout: isCI ? 10000 : 5000, // 10 seconds in CI, 5 seconds locally
  },
});