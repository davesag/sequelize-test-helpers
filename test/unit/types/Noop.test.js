const { isJestRunner, expect } = require('../../../src/utils/checkIsJestRunner')
const Noop = require('../../../src/types/Noop')

describe('src/types/Noop', () => {
  it('is a function', () => {
    isJestRunner ? expect(Noop).toBeFunction() : expect(Noop).to.be.a('function')
  })

  it('returns itself', () => {
    isJestRunner ? expect(Noop()).toEqual(Noop) : expect(Noop()).to.equal(Noop)
  })
})
