const { isJestRunner, expect } = require('../../../src/utils/checkIsJestRunner')
const fileFilter = require('../../../src/utils/fileFilter')

describe('src/utils/fileFilter', () => {
  const input = ['test.js', 'skip-this', 'index.js', '.skip.this.js']
  const expected = ['test.js']

  it('filters correctly', () => {
    isJestRunner ?
      expect(input.filter(fileFilter('.js'))).toEqual(expected) :
      expect(input.filter(fileFilter('.js'))).to.deep.equal(expected)
  })
})
