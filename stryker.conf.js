module.exports = {
  // concurrency: 2,
  mutate: ['src/**/*.js', '!src/checks/check*.js', '!src/mockModels.js'],
  packageManager: 'npm',
  reporters: ['clear-text'],
  testRunner: 'mocha',
  mochaOptions: {
    spec: ['./test/unit/**/*.test.js'],
    require: ['./test/unitTestHelper.js']
  },
  coverageAnalysis: 'perTest',
  thresholds: { high: 80, low: 70, break: null }
}
