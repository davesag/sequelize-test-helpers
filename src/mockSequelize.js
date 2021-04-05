const { spy } = require('sinon')

const DataTypes = require('./dataTypes')

class Model {}
Model.init = spy()
Model.belongsToMany = spy()
Model.belongsTo = spy()
Model.hasMany = spy()
Model.hasOne = spy()

module.exports = { Model, DataTypes }
