module.exports = function(config) {
  config.set({
    mutate: ['src/**/*.js', '!src/checks/check*.js', '!src/mockModels.js'],
    mutator: 'javascript',
    packageManager: 'npm',
    reporters: ['clear-text', 'progress'],
    testRunner: 'mocha',
    mochaOptions: {
      files: ['test/unit/**/*.test.js'],
      require: ['test/unit/testHelper.js']
    },
    transpilers: [],
    testFramework: 'mocha',
    coverageAnalysis: 'perTest',
    thresholds: { high: 80, low: 70, break: null }
  })
}
