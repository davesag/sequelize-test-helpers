// const { expect } = require('chai')

const { listModels } = require('../../src')

describe('src/listModels', () => {
  const expected = ['HasHooks', 'Indexed', 'Simple']
  describe('default suffix', () => {
    const models = listModels('test/models')

    it('lists the models', () => {
      expect(models).toEqual(expected)
    })
  })

  describe('custom suffix', () => {
    const models = listModels('test/models', '.js')

    it('lists the models', () => {
      expect(models).toEqual(expected)
    })
  })
})
