const { expect } = require('chai')
const { serialCommaList } = require('../../../src/utils')

describe('src/utils/serialCommaList', () => {
  const doTest = ([words, expected]) => {
    it(`displays '${words}' as '${expected}'`, () => {
      expect(serialCommaList(words)).to.equal(expected)
    })
  }

  ;[
    [undefined, undefined],
    ['not an array', 'not an array'],
    [['alice'], 'alice'],
    [['alice', 'bob'], 'alice and bob'],
    [['alice', 'bob', 'charlie'], 'alice, bob, and charlie']
  ].forEach(doTest)
})
