const { isJestRunner, sinon } = require('./utils/checkIsJestRunner')
const { spy } = sinon

const DataTypes = require('./dataTypes')

class Model {}
Model.init = isJestRunner ? jest.fn() : spy()
Model.belongsToMany = isJestRunner ? jest.fn() : spy()
Model.belongsTo = isJestRunner ? jest.fn() : spy()
Model.hasMany = isJestRunner ? jest.fn() : spy()
Model.hasOne = isJestRunner ? jest.fn() : spy()

module.exports = { Model, DataTypes }
