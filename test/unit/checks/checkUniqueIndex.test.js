const { isJestRunner, expect } = require('../../../src/utils/checkIsJestRunner')

const { sequelize, dataTypes, checkUniqueIndex } = require('../../../src')
const IndexedModel = require('../../models/Indexed')

describe('src/checkUniqueIndex', () => {
  const Model = IndexedModel(sequelize, dataTypes)
  const instance = new Model()

  describe('happy path', () => {
    ;['uuid'].forEach(checkUniqueIndex(instance))
  })

  describe('unhappy path', () => {
    it('fails the test', () =>
      isJestRunner ?
        expect(() => {
          checkUniqueIndex(instance)('no such index')
        }).toThrow() :
        expect(() => {
          checkUniqueIndex(instance)('no such index')
        }).to.throw)
  })
})
