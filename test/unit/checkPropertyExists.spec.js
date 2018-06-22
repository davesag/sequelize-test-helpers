const { sequelize, dataTypes, checkPropertyExists } = require('../../src')
const SimpleModel = require('../models/Simple')

describe('src/checkPropertyExists', () => {
  const Model = SimpleModel(sequelize, dataTypes)
  const instance = new Model()
  ;['name'].forEach(checkPropertyExists(instance))
})
