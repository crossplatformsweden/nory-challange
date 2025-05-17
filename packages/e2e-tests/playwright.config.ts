import { defineConfig, devices } from '@playwright/test';

// Read environment variable with fallback
const isCI = process.env.CI === 'true';

export default defineConfig({
  testDir: './src',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: 'html',
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
  },
});