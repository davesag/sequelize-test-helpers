const { checkSingleIndex, checkAllIndexes } = require('./utils')

const checkSingleUniqueIndex = instance => checkSingleIndex(instance, true)
const checkAllUniqueIndexes = instance => checkAllIndexes(instance, true)

const checkUniqueIndex = instance => indexName =>
  Array.isArray(indexName)
    ? checkAllUniqueIndexes(instance)(indexName)
    : checkSingleUniqueIndex(instance)(indexName)

module.exports = checkUniqueIndex
