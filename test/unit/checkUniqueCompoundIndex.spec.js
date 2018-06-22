const { sequelize, dataTypes, checkUniqueCompoundIndex } = require('../../src')
const IndexedModel = require('../models/Indexed')

describe('src/checkUniqueCompoundIndex', () => {
  const Model = IndexedModel(sequelize, dataTypes)
  const instance = new Model()
  ;[['name', 'lunch']].forEach(checkUniqueCompoundIndex(instance))
})
