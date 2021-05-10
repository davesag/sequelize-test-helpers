const { isJestRunner, expect } = require('../utils/checkIsJestRunner')

const checkNonUniqueIndex = instance => indexName => {
  it(`indexed a non-unique ${indexName}`, () => {
    isJestRunner ?
      expect(instance.indexes.find(index => index.unique === false && index.fields[0] === indexName))
        .not.toBeUndefined() :
      expect(instance.indexes.find(index => index.unique === false && index.fields[0] === indexName))
        .not.to.be.undefined
  })
}

module.exports = checkNonUniqueIndex
