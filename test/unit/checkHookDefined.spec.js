const { sequelize, dataTypes, checkHookDefined } = require('../../src')
const HasHooksModel = require('../models/HasHooks')

describe('src/checkHookDefined', () => {
  const Model = HasHooksModel(sequelize, dataTypes)
  const instance = new Model()
  ;['beforeValidate', 'afterValidate', 'afterCreate'].forEach(
    checkHookDefined(instance)
  )
})
