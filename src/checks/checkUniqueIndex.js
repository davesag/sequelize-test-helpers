const { checkIndex } = require('./utils')

const checkUniqueIndex = instance => indexName => checkIndex(instance, indexName, true)

module.exports = checkUniqueIndex
