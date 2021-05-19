const isJestRunner =
  process.env.SEQUELIZE_TEST_HELPERS_JEST_RUNNER === 'true' ||
  process.env.SEQUELIZE_TEST_HELPERS_JEST_RUNNER === true

module.exports = {
  isJestRunner,
  expect: isJestRunner ? expect : require('chai').expect, // jest's expect is global
  sinon: isJestRunner ? () => {} : require('sinon')
}
