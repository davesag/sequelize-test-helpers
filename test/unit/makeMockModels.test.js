const { isJestRunner, expect } = require('../../src/utils/checkIsJestRunner')

const { makeMockModels, listModels } = require('../../src')

describe('src/makeMockModels', () => {
  const doTests = ([label, suffix]) => {
    const mockModels = makeMockModels({ Fake: 'a fake' }, 'test/models', suffix)
    const models = listModels('test/models', suffix)

    describe(label, () => {
      const doTest = model => {
        it(`has the model ${model}`, () => {
          isJestRunner
            ? expect(mockModels).toHaveProperty(model)
            : expect(mockModels).to.have.property(model)
        })
      }
      ;[...models, 'Fake'].forEach(doTest)

      it("adds '@noCallThru: true'", () => {
        isJestRunner
          ? expect(mockModels).toHaveProperty('@noCallThru', true)
          : expect(mockModels).to.have.property('@noCallThru', true)
      })
    })
  }

  ;[['default suffix'], ['custom suffix', '.js']].forEach(doTests)
})
