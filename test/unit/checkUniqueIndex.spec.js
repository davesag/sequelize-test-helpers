const { sequelize, dataTypes, checkUniqueIndex } = require('../../src')
const IndexedModel = require('../models/Indexed')

describe('src/checkUniqueIndex', () => {
  const Model = IndexedModel(sequelize, dataTypes)
  const instance = new Model()
  ;['uuid'].forEach(checkUniqueIndex(instance))
})
