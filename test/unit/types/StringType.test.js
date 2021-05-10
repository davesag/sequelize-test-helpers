// const { expect } = require('chai')
const StringType = require('../../../src/types/StringType')

describe('src/types/StringType', () => {
  it('is a function', () => {
    expect(StringType).toBeFunction()
  })

  it('returns itself', () => {
    expect(StringType()).toEqual(StringType)
  })

  it('has property BINARY', () => {
    expect(StringType).toHaveProperty('BINARY', StringType)
  })
})
