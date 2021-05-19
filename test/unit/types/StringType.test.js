const { isJestRunner, expect } = require('../../../src/utils/checkIsJestRunner')
const StringType = require('../../../src/types/StringType')

describe('src/types/StringType', () => {
  it('is a function', () => {
    isJestRunner ? expect(StringType).toBeFunction() : expect(StringType).to.be.a('function')
  })

  it('returns itself', () => {
    isJestRunner
      ? expect(StringType()).toEqual(StringType)
      : expect(StringType()).to.equal(StringType)
  })

  it('has property BINARY', () => {
    isJestRunner
      ? expect(StringType).toHaveProperty('BINARY', StringType)
      : expect(StringType).to.have.property('BINARY', StringType)
  })
})
