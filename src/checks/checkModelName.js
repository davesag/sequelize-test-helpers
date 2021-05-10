// const { expect } = require('chai')

const checkModelName = model => modelName => {
  it(`is named '${modelName}'`, () => {
    expect(model.modelName).toEqual(modelName)
  })
}

module.exports = checkModelName
