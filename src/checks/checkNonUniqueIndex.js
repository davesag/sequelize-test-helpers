const { checkIndex } = require('./utils')

const checkNonUniqueIndex = instance => indexName => checkIndex(instance, indexName)

module.exports = checkNonUniqueIndex
