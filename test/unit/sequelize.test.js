const { expect } = require('chai')

const sequelize = require('../../src/sequelize')

const STATIC_METHODS = [
  'and',
  'cast',
  'col',
  'fn',
  'json',
  'literal',
  'or',
  'useCLS',
  'where'
]

describe('src/sequelize', () => {
  it('has define', () => {
    expect(sequelize).to.have.property('define')
    expect(sequelize.define).to.be.a('function')
  })

  STATIC_METHODS.forEach(method => {
    it(`has static method ${method}`, () => {
      expect(sequelize[method]).to.be.a('function')
    })
  })
})
