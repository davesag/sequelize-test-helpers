const { expect } = require('chai')

const checkHookDefined = instance => hookName => {
  it(`defined the ${hookName} hook`, () => {
    expect(instance.hooks[hookName]).to.be.a('function')
  })
}

module.exports = checkHookDefined
