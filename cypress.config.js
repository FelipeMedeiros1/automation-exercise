const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    reportFilename: 'index',
    reportPageTitle: 'Automation Exercise - Resultados E2E',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveJson: true,
    saveAllAttempts: true,
  },
  e2e: {
    baseUrl: 'https://www.automationexercise.com',
    specPattern: 'cypress/e2e/**/*.js',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
  viewportWidth: 1280,
  viewportHeight: 800,
  defaultCommandTimeout: 10000,
  video: true,
  screenshotOnRunFailure: true,
  retries: { runMode: 1, openMode: 0 },
});
