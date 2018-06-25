const checkHookDefined = require('./checkHookDefined')
const checkModelName = require('./checkModelName')
const checkNonUniqueIndex = require('./checkNonUniqueIndex')
const checkPropertyExists = require('./checkPropertyExists')
const checkUniqueCompoundIndex = require('./checkUniqueCompoundIndex')
const checkUniqueIndex = require('./checkUniqueIndex')
const dataTypes = require('./dataTypes')
const sequelize = require('./sequelize')
const { makeMockModels, listModels } = require('./mockModels')

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
  sequelize
}
