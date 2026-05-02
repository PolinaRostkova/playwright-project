import { defineConfig, devices } from '@playwright/test'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Loads .env.local by default
// To use staging: ENV=staging yarn test
dotenv.config({
  path: path.resolve(__dirname, `config/.env.${process.env.ENV || 'local'}`)
})

export default defineConfig({

  // ── Where tests are ────────────────────────────────────────────────
  testDir: './playwright/tests',
  testMatch: '**/*.spec.ts',

  // ── How tests run ──────────────────────────────────────────────────
  fullyParallel: true,
  workers: process.env.CI ? 4 : 2,

  // ── Retries ────────────────────────────────────────────────────────
  retries: process.env.CI ? 2 : 0,

  // ── Timeouts ───────────────────────────────────────────────────────
  timeout: 60_000,
  expect: {
    timeout: 10_000
  },

  // ── Reports ────────────────────────────────────────────────────────
  reporter: [
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['list'],
    // Uncomment to enable Allure reports:
    // ['allure-playwright', { outputFolder: 'allure-results' }]
  ],

  // ── Global setup / teardown ────────────────────────────────────────
  // Runs once before / after the whole test suite
  // Uncomment when ready:
  // globalSetup: './helpers/global.setup.ts',
  // globalTeardown: './helpers/global.teardown.ts',

  use: {
    baseURL: process.env.BASE_URL,

    headless: false,
    launchOptions: {
      slowMo: 1000,
    },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  // ── Browser projects ───────────────────────────────────────────────
  projects: [

    // Auth setup — runs once before tests to save login session
    // Uncomment when login is ready:
    // {
    //   name: 'setup:auth',
    //   testMatch: '**/auth.setup.ts',
    // },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Uncomment after auth setup is ready:
        // storageState: 'playwright/.auth/user.json',
      },
      // dependencies: ['setup:auth'],
    },

    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },

    // Uncomment when needed:
    // {
    //   name: 'mobile-chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
  ],

  outputDir: 'test-results',
})
