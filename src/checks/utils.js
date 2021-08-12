const { expect } = require('chai')

const checkSingleIndex =
  (instance, unique = false) =>
  indexName => {
    it(`indexed a unique ${indexName}`, () => {
      expect(
        instance.indexes.find(index => index.unique === unique && index.fields[0] === indexName)
      ).not.to.be.undefined
    })
  }

const checkAllIndexes =
  (instance, unique = false) =>
  indexNames => {
    context(`indexed a unique composite of [${indexNames.join(', ')}]`, () => {
      indexNames.forEach((indexName, i) => {
        it(`includes ${indexName} at ${i}`, () => {
          expect(
            instance.indexes.find(index => index.unique === unique && index.fields[i] === indexName)
          ).not.to.be.undefined
        })
      })
    })
  }

module.exports = {
  checkSingleIndex,
  checkAllIndexes
}
