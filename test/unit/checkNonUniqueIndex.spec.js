const { sequelize, dataTypes, checkNonUniqueIndex } = require('../../src')
const IndexedModel = require('../models/Indexed')

describe('src/checkNonUniqueIndex', () => {
  const Model = IndexedModel(sequelize, dataTypes)
  const instance = new Model()
  ;['name'].forEach(checkNonUniqueIndex(instance))
})
