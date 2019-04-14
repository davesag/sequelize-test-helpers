const { expect } = require('chai')
const noop = require('../../../src/types/noop')

describe('src/types/noop', () => {
  it('is a function', () => {
    expect(noop).to.be.a('function')
  })

  it('does nothing', () => {
    expect(noop()).to.be.undefined
  })
})
