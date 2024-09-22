// @ts-check
require("dotenv").config();

const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./e2e",
  timeout: 60000,
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
      name: "qauto",
      testMatch: "**.qauto.spec.js",
      use: {
        headless: false,
        baseURL: process.env.BASE_URL,
        httpCredentials: {
          username: process.env.USER_NAME || "defaultUsername",
          password: process.env.USER_PASSWORD || "defaultPassword",
        },
      },
    },
    /*  {
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
    }, */
  ],
});
