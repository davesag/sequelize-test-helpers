const { expect } = require('chai')

const { listModels } = require('../../src')

describe('src/listModels', () => {
  const expected = ['HasHooks', 'Indexed', 'Simple']
  const models = listModels('test/models')

  it('lists the models', () => {
    expect(models).to.deep.equal(expected)
  })
})
