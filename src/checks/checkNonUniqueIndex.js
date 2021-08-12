const { checkSingleIndex, checkAllIndexes } = require('./utils')

const checkSingleNonUniqueIndex = instance => checkSingleIndex(instance)
const checkAllNonUniqueIndexes = instance => checkAllIndexes(instance)

const checkNonUniqueIndex = instance => indexName =>
  Array.isArray(indexName)
    ? checkAllNonUniqueIndexes(instance)(indexName)
    : checkSingleNonUniqueIndex(instance)(indexName)

module.exports = checkNonUniqueIndex
