const { isJestRunner, expect } = require('../../../src/utils/checkIsJestRunner')

const { sequelize, dataTypes, checkNonUniqueIndex } = require('../../../src')
const IndexedModel = require('../../models/Indexed')

describe('src/checkNonUniqueIndex', () => {
  const Model = IndexedModel(sequelize, dataTypes)
  const instance = new Model()
  describe('happy path', () => {
    ;['name'].forEach(checkNonUniqueIndex(instance))
  })

  describe('unhappy path', () => {
    it('fails the test', () =>
      isJestRunner
        ? expect(() => {
            checkNonUniqueIndex(instance)('no name')
          }).toThrow()
        : expect(() => {
            checkNonUniqueIndex(instance)('no name')
          }).to.throw)
  })
})
