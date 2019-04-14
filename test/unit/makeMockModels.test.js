const { expect } = require('chai')

const { makeMockModels, listModels } = require('../../src')

describe('src/makeMockModels', () => {
  const mockModels = makeMockModels({ Fake: 'a fake' }, 'test/models')
  const models = listModels('test/models')

  const doTest = model => {
    it(`has the model ${model}`, () => {
      expect(mockModels).to.have.property(model)
    })
  }
  ;[...models, 'Fake'].forEach(doTest)

  it("adds '@noCallThru: true'", () => {
    expect(mockModels).to.have.property('@noCallThru', true)
  })
})
