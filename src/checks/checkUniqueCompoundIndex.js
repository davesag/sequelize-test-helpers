const { isJestRunner, expect } = require('../utils/checkIsJestRunner')

const checkUniqueCompoundIndex = instance => indecies => {
  it(`indexed a unique index of ${indecies.join(' and ')}`, () => {
    isJestRunner ?
      expect(
        instance.indexes.find(
          index => index.unique === true && index.fields.join('') === indecies.join('')
        )
      ).not.toBeUndefined() :
      expect(
        instance.indexes.find(
          index => index.unique === true && index.fields.join('') === indecies.join('')
        )
      ).not.to.be.undefined
  })
}

module.exports = checkUniqueCompoundIndex
