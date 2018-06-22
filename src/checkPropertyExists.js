const { expect } = require('chai')

const checkPropertyExists = instance => propName => {
  it(`has property ${propName}`, () => {
    expect(instance).to.have.property(propName)
  })
}

module.exports = checkPropertyExists
