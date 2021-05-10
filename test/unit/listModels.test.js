const { isJestRunner, expect } = require('../../src/utils/checkIsJestRunner')

const { listModels } = require('../../src')

describe('src/listModels', () => {
  const expected = ['HasHooks', 'Indexed', 'Simple']
  describe('default suffix', () => {
    const models = listModels('test/models')

    it('lists the models', () => {
      isJestRunner ?
        expect(models).toEqual(expected) :
        expect(models).to.deep.equal(expected)
    })
  })

  describe('custom suffix', () => {
    const models = listModels('test/models', '.js')

    it('lists the models', () => {
      isJestRunner ?
        expect(models).toEqual(expected) :
        expect(models).to.deep.equal(expected)
    })
  })
})
