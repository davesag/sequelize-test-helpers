const { expect } = require('chai')
const NumericType = require('../../../src/types/NumericType')

describe('src/types/NumericType', () => {
  it('is a function', () => {
    expect(NumericType).to.be.a('function')
  })

  it('returns itself', () => {
    expect(NumericType()).to.equal(NumericType)
  })

  it('has property UNSIGNED', () => {
    expect(NumericType).to.have.property('UNSIGNED', NumericType)
  })

  it('has property ZEROFILL', () => {
    expect(NumericType).to.have.property('ZEROFILL', NumericType)
  })
})
