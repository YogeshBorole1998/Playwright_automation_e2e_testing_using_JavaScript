// @ts-check
const { defineConfig, devices } = require('@playwright/test')

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  /* Retries the testcase 1 times once failed */
  retries: 1,
  /* Opt out of parallel tests on CI. */
  // workers: 8,
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  // reporter: [["html", { open: "always" }]],
  // reporter: [["html", { outputFolder: "my-report" }]],
  // reporter: "dot",
  // reporter: "list",
  // reporter: [["list"], ["json", { outputFile: "test-results.json" }]],
  /* For custom Reports : See https://playwright.dev/docs/test-reporters#custom-reporters */

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    /* Capture screenshot of failed test */
    screenshot: 'only-on-failure',

    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    headless: true,
    ignoreHTTPSErrors: true,
    viewport: { width: 1280, height: 720 },
    video: 'on-first-retry'
  },
  /* Maximum time one test can run for. See https://playwright.dev/docs/test-timeouts */
  timeout: 30 * 1000,
  /* Maximum time expect() should wait for condition to be met. */
  expect: {
    timeout: 5000
  },

  /* Folder for test artifacts such as screenshots, videos, tarces, etc. */
  // outputDir: "test-results/",

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: true,
        // want to handle go-location
        permissions: ['geolocation'],
        // To handle SSL Certificate error Automatically
        ignoreHTTPSErrors: true
        // To change the browser view
        // viewport: { width: 720, height: 720 },
      }
    }

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },

    // /* Test against mobile viewports. */
    // {
    //   name: "Mobile Chrome",
    //   use: { ...devices["Pixel 5"] },
    // },
    // {
    //   name: "Mobile Safari",
    //   use: { ...devices["iPhone 12"] },
    // },

    // /* Test against branded browsers. */
    // {
    //   name: "Microsoft Edge",
    //   use: { ...devices["Desktop Edge"], channel: "msedge" },
    // },
    // {
    //   name: "Google Chrome",
    //   use: { ...devices["Desktop Chrome"], channel: "chrome" },
    // },
  ]

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
})
