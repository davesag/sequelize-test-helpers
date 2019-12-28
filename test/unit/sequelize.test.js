const { expect } = require('chai')

const sequelize = require('../../src/sequelize')
const staticMethods = require('../../src/constants/staticMethods')

describe('src/sequelize', () => {
  it('has define', () => {
    expect(sequelize).to.have.property('define')
    expect(sequelize.define).to.be.a('function')
  })

  staticMethods.forEach(method => {
    it(`has static method ${method}`, () => {
      expect(sequelize[method]).to.be.a('function')
    })
  })
})
