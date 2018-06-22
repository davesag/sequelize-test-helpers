const { sequelize, dataTypes, checkModelName } = require('../../src')
const SimpleModel = require('../models/Simple')

describe('src/checkModelName', () => {
  const Model = SimpleModel(sequelize, dataTypes)

  checkModelName(Model)('Simple')
})
