const { sequelize, dataTypes, checkModelName } = require('../../src')
const SimpleModel = require('../models/Simple')

describe('src/checkModelName', () => {
  const Model = SimpleModel(sequelize, dataTypes)
  const instance = new Model()

  checkModelName(Model)('Simple')
})
