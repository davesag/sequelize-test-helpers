const { expect } = require('chai')

const { sequelize, dataTypes, checkUniqueCompoundIndex } = require('../../../src')
const IndexedModel = require('../../models/Indexed')

describe('src/checkUniqueCompoundIndex', () => {
  const Model = IndexedModel(sequelize, dataTypes)
  const instance = new Model()

  context('happy path', () => {
    ;[['name', 'lunch']].forEach(checkUniqueCompoundIndex(instance))
  })

  context('unhappy path', () => {
    it('fails the test', () =>
      expect(() => {
        checkUniqueCompoundIndex(instance)('no such index')
      }).to.throw)
  })
})
