const hooks = require('./constants/hooks')
const staticMethods = require('./constants/staticMethods')
const { syncMethods, asyncMethods } = require('./constants/staticModelMethods')
const { isJestRunner, sinon } = require('./utils/checkIsJestRunner')

const sequelize = {
  define: (modelName, modelDefn, metaData = {}) => {
    const model = function() {
    }
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
      model[key] = isJestRunner ? jest.fn() : sinon.stub()
    }

    hooks.forEach(hook => {
      model[hook] = attachHook(hook)
    })

    model.addHook = (hookType, name, hook) =>
      typeof name === 'function' ? attachHook(hookType)(name) : attachHook(hookType)(hook)

    model.hook = model.addHook

    syncMethods.forEach(addStatic)
    asyncMethods.forEach(addStatic)

    model.isHierarchy = isJestRunner ? jest.fn() : sinon.spy()

    model.prototype.update = isJestRunner ? jest.mock() : sinon.stub()
    model.prototype.reload = isJestRunner ? jest.mock() : sinon.stub()
    model.prototype.set = isJestRunner ? jest.fn() : sinon.spy()
    Object.keys(modelDefn).forEach(attachProp)

    model.prototype.indexes = metaData.indexes
    model.prototype.scopes = metaData.scopes
    model.prototype.validate = metaData.validate
    return model
  }
}

staticMethods.forEach(method => {
  sequelize[method] = isJestRunner ? jest.mock() : sinon.stub()
})

module.exports = sequelize
