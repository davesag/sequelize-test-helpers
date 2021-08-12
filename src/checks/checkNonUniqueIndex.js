const { checkSingleIndex, checkAllIndexes } = require('./utils')

const checkSingleNonUniqueIndex = instance => checkSingleIndex(instance, false)
const checkAllNonUniqueIndexes = instance => checkAllIndexes(instance, false)

const checkNonUniqueIndex = instance => indexName =>
  Array.isArray(indexName)
    ? checkAllNonUniqueIndexes(instance)(indexName)
    : checkSingleNonUniqueIndex(instance)(indexName)

module.exports = checkNonUniqueIndex
