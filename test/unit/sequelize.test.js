// const { expect } = require('chai')

const sequelize = require('../../src/sequelize')
const staticMethods = require('../../src/constants/staticMethods')

describe('src/sequelize', () => {
  it('has define', () => {
    expect(sequelize).toHaveProperty('define')
    expect(sequelize.define).toBeFunction()
  })

  staticMethods.forEach(method => {
    it(`has static method ${method}`, () => {
      expect(sequelize[method]).toBeObject()
    })
  })
})
