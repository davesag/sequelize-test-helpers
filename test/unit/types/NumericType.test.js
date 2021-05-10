const { isJestRunner, expect } = require('../../../src/utils/checkIsJestRunner')
const NumericType = require('../../../src/types/NumericType')

describe('src/types/NumericType', () => {
  it('is a function', () => {
    isJestRunner ?
      expect(NumericType).toBeFunction() :
      expect(NumericType).to.be.a('function')
  })

  it('returns itself', () => {
    isJestRunner ?
      expect(NumericType()).toEqual(NumericType) :
      expect(NumericType()).to.equal(NumericType)
  })

  it('has property UNSIGNED', () => {
    isJestRunner ?
      expect(NumericType).toHaveProperty('UNSIGNED', NumericType) :
      expect(NumericType).to.have.property('UNSIGNED', NumericType)
  })

  it('has property ZEROFILL', () => {
    isJestRunner ?
      expect(NumericType).toHaveProperty('ZEROFILL', NumericType) :
      expect(NumericType).to.have.property('ZEROFILL', NumericType)
  })
})
