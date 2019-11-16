const { spy } = require('sinon')

const DataTypes = require('./dataTypes')

class Model {}
Model.init = spy()

module.exports = { Model, DataTypes }
