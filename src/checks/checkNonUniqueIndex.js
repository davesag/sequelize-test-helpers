// const { expect } = require('chai')

const checkNonUniqueIndex = instance => indexName => {
  it(`indexed a non-unique ${indexName}`, () => {
    expect(instance.indexes.find(index => index.unique === false && index.fields[0] === indexName))
      .not.toBeUndefined()
  })
}

module.exports = checkNonUniqueIndex
