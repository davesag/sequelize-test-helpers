// const { expect } = require('chai')
const NumericType = require('../../../src/types/NumericType')

describe('src/types/NumericType', () => {
  it('is a function', () => {
    expect(NumericType).toBeFunction()
  })

  it('returns itself', () => {
    expect(NumericType()).toEqual(NumericType)
  })

  it('has property UNSIGNED', () => {
    expect(NumericType).toHaveProperty('UNSIGNED', NumericType)
  })

  it('has property ZEROFILL', () => {
    expect(NumericType).toHaveProperty('ZEROFILL', NumericType)
  })
})
