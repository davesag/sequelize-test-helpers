const { isJestRunner, expect } = require('../utils/checkIsJestRunner')

const checkModelName = model => modelName => {
  it(`is named '${modelName}'`, () => {
    isJestRunner
      ? expect(model.modelName).toEqual(modelName)
      : expect(model.modelName).to.equal(modelName)
  })
}

module.exports = checkModelName
