// const { expect } = require('chai')

const { sequelize, dataTypes, checkUniqueCompoundIndex } = require('../../../src')
const IndexedModel = require('../../models/Indexed')

describe('src/checkUniqueCompoundIndex', () => {
  const Model = IndexedModel(sequelize, dataTypes)
  const instance = new Model()
  describe('happy path', () => {
    ;[['name', 'lunch']].forEach(checkUniqueCompoundIndex(instance))
  })

  describe('unhappy path', () => {
    it('fails the test', () =>
      expect(() => {
        checkUniqueCompoundIndex(instance)('no such index')
      }).toThrow())
  })
})
