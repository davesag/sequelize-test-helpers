// const { expect } = require('chai')
const Noop = require('../../../src/types/Noop')

describe('src/types/Noop', () => {
  it('is a function', () => {
    expect(Noop).toBeFunction()
  })

  it('returns itself', () => {
    expect(Noop()).toEqual(Noop)
  })
})
