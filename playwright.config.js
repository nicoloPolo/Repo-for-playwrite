// @ts-check
const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./e2e",
  timeout: 3000,
  retries: 2,
  fullyParallel: true,

  reporter: "html",
  use: {
    baseURL: "http://google.com",
    headless: false,
    trace: "on-first-retry",
    screenshot: "on",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"], headless: true },
    },
  ],
});