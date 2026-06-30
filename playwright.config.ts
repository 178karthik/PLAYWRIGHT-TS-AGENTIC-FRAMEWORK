import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv'
import path from 'path';


const envFile = path.resolve(process.env.ENV?`.env${process.env.ENV}`:'.env')
dotenv.config({path:envFile})


export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : undefined,
  reporter: 'html',
  timeout : 360 *1000,
  use: {
  
    baseURL: 'https://petstore.swagger.io/',
    browserName:'chromium',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    headless:false,
    navigationTimeout: 60 *1000,
    actionTimeout : 30 *1000
  },
  expect:{
    timeout:25*1000
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name :'restful-booker-api',
    //   testMatch :'**/restfulBooker.spec.ts',
    //   use:{
    //     baseURL:'https://restful-booker.herokuapp.com/'
    //   }
    // }

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
