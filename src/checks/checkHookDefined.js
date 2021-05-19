const { isJestRunner, expect } = require('../utils/checkIsJestRunner')

const checkHookDefined = instance => hookName => {
  it(`defined a ${hookName} hook`, () => {
    isJestRunner
      ? expect(instance.hooks[hookName]).toBeFunction()
      : expect(instance.hooks[hookName]).to.be.a('function')
  })
}

module.exports = checkHookDefined
