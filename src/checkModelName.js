const { expect } = require('chai')

const checkModelName = model => modelName => {
  it(`is named '${modelName}'`, () => {
    expect(model.modelName).to.equal(modelName)
  })
}

module.exports = checkModelName
