const { expect } = require('chai')

const { sequelize, dataTypes, checkUniqueIndex } = require('../../../src')
const IndexedModel = require('../../models/Indexed')

describe('src/checkUniqueIndex', () => {
  const Model = IndexedModel(sequelize, dataTypes)
  const instance = new Model()

  context('happy path', () => {
    ;['uuid', ['name', 'lunch']].forEach(checkUniqueIndex(instance))
  })

  context('unhappy path', () => {
    it('fails the test', () =>
      expect(() => {
        checkUniqueIndex(instance)('no such index')
      }).to.throw)
  })
})
