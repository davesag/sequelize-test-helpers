// const { expect } = require('chai')

const checkHookDefined = instance => hookName => {
  it(`defined a ${hookName} hook`, () => {
    expect(instance.hooks[hookName]).toBeFunction()
  })
}

module.exports = checkHookDefined
