const { expect } = require('chai')

const checkUniqueIndex = instance => indexName => {
  it(`indexed a unique ${indexName}`, () => {
    expect(
      instance.indexes.find(
        index => index.unique === true && index.fields[0] === indexName
      )
    ).not.to.be.undefined
  })
}

module.exports = checkUniqueIndex
