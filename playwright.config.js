const { devices } = require("@playwright/test");

const config = {
  testDir: "./tests",

  timeout: 60 * 1000,

  expect: {
    timeout: 5000,
  },

  retries: 1,
  fullyParallel: true,

  use: {
    launchOptions: {
      // args: ["--start-maximized"],
      //   slowMo: 200,
    },
    headless: false,
    // browserName: "chromium",
    // browserName: "firefox",
    // browserName: "webkit",
    // viewport: { width: 1366, height: 768 },
    trace: "on",
  },

  projects: [
    {
      name: "Chrome",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    // {
    //   name: "Firefox",
    //   use: {
    //     ...devices["Desktop Firefox"], // Issues with Firefox
    //   },
    // },
    {
      name: "Safari",
      use: {
        ...devices["Desktop Safari"],
      },
    },
    {
      name: "Microsoft Edge",
      use: {
        channel: "msedge",
      },
    },
  ],
};

module.exports = config;
