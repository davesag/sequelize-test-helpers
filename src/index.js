const checkHookDefined = require('./checks/checkHookDefined')
const checkModelName = require('./checks/checkModelName')
const checkNonUniqueIndex = require('./checks/checkNonUniqueIndex')
const checkPropertyExists = require('./checks/checkPropertyExists')
const checkUniqueCompoundIndex = require('./checks/checkUniqueCompoundIndex')
const checkUniqueIndex = require('./checks/checkUniqueIndex')
const dataTypes = require('./dataTypes')
const sequelize = require('./sequelize')
const { makeMockModels, listModels } = require('./mockModels')
const Sequelize = require('./mockSequelize')

module.exports = {
  checkHookDefined,
  checkModelName,
  checkNonUniqueIndex,
  checkPropertyExists,
  checkUniqueCompoundIndex,
  checkUniqueIndex,
  dataTypes,
  listModels,
  makeMockModels,
  sequelize,
  Sequelize
}
