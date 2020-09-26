const { expect } = require('chai')
const Noop = require('../../../src/types/Noop')

describe('src/types/Noop', () => {
  it('is a function', () => {
    expect(Noop).to.be.a('function')
  })

  it('returns itself', () => {
    expect(Noop()).to.equal(Noop)
  })
})
