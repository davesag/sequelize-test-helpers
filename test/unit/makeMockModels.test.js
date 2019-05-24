const { expect } = require('chai')

const { makeMockModels, listModels } = require('../../src')

describe('src/makeMockModels', () => {
  const doTests = ([label, suffix]) => {
    const mockModels = makeMockModels({ Fake: 'a fake' }, 'test/models', suffix)
    const models = listModels('test/models', suffix)

    context(label, () => {
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
  }

  ;[['default suffix'], ['custom suffix', '.js']].forEach(doTests)
})
