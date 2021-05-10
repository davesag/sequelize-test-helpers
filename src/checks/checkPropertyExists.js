const { isJestRunner, expect } = require('../utils/checkIsJestRunner')

const checkPropertyExists = instance => propName => {
  it(`has property ${propName}`, () => {
    isJestRunner ?
      expect(instance).toHaveProperty(propName) :
      expect(instance).to.have.property(propName)
  })
}

module.exports = checkPropertyExists
