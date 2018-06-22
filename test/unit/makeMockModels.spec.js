const { expect } = require('chai')

const { makeMockModels } = require('../../src')

const mockModels = makeMockModels({ Fake: 'a fake' }, 'test/models')

describe('makeMockModels', () => {
  const doTest = model => {
    it(`has the model ${model}`, () => {
      expect(mockModels).to.have.property(model)
    })
  }
  ;['Simple', 'HasHooks', 'Indexed', 'Fake'].forEach(doTest)

  it("adds '@noCallThru: true'", () => {
    expect(mockModels).to.have.property('@noCallThru', true)
  })
})
