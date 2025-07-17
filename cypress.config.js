const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1024,
  viewportWidth: 1700,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      fixturesFolder = false;
    },
  },
  scripts: {},
});
