const { isJestRunner, expect } = require('../utils/checkIsJestRunner')

const checkUniqueIndex = instance => indexName => {
  it(`indexed a unique ${indexName}`, () => {
    isJestRunner ?
      expect(instance.indexes.find(index => index.unique === true && index.fields[0] === indexName))
        .not.toBeUndefined() :
      expect(instance.indexes.find(index => index.unique === true && index.fields[0] === indexName))
        .not.to.be.undefined
  })
}

module.exports = checkUniqueIndex
