const { isJestRunner, expect } = require('../../src/utils/checkIsJestRunner')

const sequelize = require('../../src/sequelize')
const staticMethods = require('../../src/constants/staticMethods')

describe('src/sequelize', () => {
  it('has define', () => {
    isJestRunner ?
      expect(sequelize).toHaveProperty('define') :
      expect(sequelize).to.have.property('define')
    isJestRunner ?
      expect(sequelize.define).toBeFunction() :
      expect(sequelize.define).to.be.a('function')
  })

  staticMethods.forEach(method => {
    it(`has static method ${method}`, () => {
      isJestRunner ?
        expect(sequelize[method]).toBeObject() :
        expect(sequelize[method]).to.be.a('function')
    })
  })
})
