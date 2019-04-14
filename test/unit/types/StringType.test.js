const { expect } = require('chai')
const StringType = require('../../../src/types/StringType')

describe('src/types/StringType', () => {
  it('is a function', () => {
    expect(StringType).to.be.a('function')
  })

  it('returns itself', () => {
    expect(StringType()).to.equal(StringType)
  })

  it('has property BINARY', () => {
    expect(StringType).to.have.property('BINARY', StringType)
  })
})
