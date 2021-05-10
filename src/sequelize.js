// const jest = require('jest-mock')
// const sinon = require('sinon')
const hooks = require('./constants/hooks')
const staticMethods = require('./constants/staticMethods')
const { syncMethods, asyncMethods } = require('./constants/staticModelMethods')

const sequelize = {
  define: (modelName, modelDefn, metaData = {}) => {
    const model = function () {}
    model.modelName = modelName

    const attachHook = name => hook => {
      if (!model.prototype.hooks)
        model.prototype.hooks = metaData.hooks || /* istanbul ignore next  */ {}
      model.prototype.hooks[name] = hook
    }

    const attachProp = key => {
      model.prototype[key] = modelDefn[key]
    }

    const addStatic = key => {
      model[key] = jest.fn()
    }

    hooks.forEach(hook => {
      model[hook] = attachHook(hook)
    })

    model.addHook = (hookType, name, hook) =>
      typeof name === 'function' ? attachHook(hookType)(name) : attachHook(hookType)(hook)

    model.hook = model.addHook

    syncMethods.forEach(addStatic)
    asyncMethods.forEach(addStatic)

    model.isHierarchy = jest.fn()

    model.prototype.update = jest.mock()
    model.prototype.reload = jest.mock()
    model.prototype.set = jest.fn()
    Object.keys(modelDefn).forEach(attachProp)

    model.prototype.indexes = metaData.indexes
    model.prototype.scopes = metaData.scopes
    model.prototype.validate = metaData.validate
    return model
  }
}

staticMethods.forEach(method => {
  sequelize[method] = jest.mock()
})

module.exports = sequelize
