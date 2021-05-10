// const { expect } = require('chai')

const checkPropertyExists = instance => propName => {
  it(`has property ${propName}`, () => {
    expect(instance).toHaveProperty(propName)
  })
}

module.exports = checkPropertyExists
