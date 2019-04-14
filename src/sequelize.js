const sinon = require('sinon')
const hooks = require('./constants/hooks')

const sequelize = {
  define: (modelName, modelDefn, metaData = {}) => {
    const model = function() {}
    model.modelName = modelName

    const attachHook = name => hook => {
      if (!model.prototype.hooks)
        model.prototype.hooks = metaData.hooks || /* istanbul ignore next  */ {}
      model.prototype.hooks[name] = hook
    }

    const attachProp = key => {
      model.prototype[key] = modelDefn[key]
    }

    hooks.forEach(hook => {
      model[hook] = attachHook(hook)
    })

    model.addHook = (hookType, name, hook) =>
      typeof name === 'function'
        ? attachHook(hookType)(name)
        : attachHook(hookType)(hook)

    model.hook = model.addHook

    model.belongsToMany = sinon.spy()
    model.belongsTo = sinon.spy()
    model.hasMany = sinon.spy()
    model.hasOne = sinon.spy()

    model.isHierarchy = sinon.spy()

    model.prototype.update = sinon.stub()
    model.prototype.reload = sinon.stub()
    model.prototype.set = sinon.spy()
    Object.keys(modelDefn).forEach(attachProp)

    model.prototype.indexes = metaData.indexes
    return model
  }
}

module.exports = sequelize
