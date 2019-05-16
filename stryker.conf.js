module.exports = function(config) {
  config.set({
    maxConcurrentTestRunners: 2, // workaround for https://github.com/stryker-mutator/stryker/issues/1525
    mutate: ['src/**/*.js', '!src/checks/check*.js', '!src/mockModels.js'],
    mutator: 'javascript',
    packageManager: 'npm',
    reporters: ['clear-text', 'progress'],
    testRunner: 'mocha',
    mochaOptions: {
      spec: ['./test/unit/**/*.test.js'],
      require: ['./test/unitTestHelper.js']
    },
    transpilers: [],
    testFramework: 'mocha',
    coverageAnalysis: 'perTest',
    thresholds: { high: 80, low: 70, break: null }
  })
}
