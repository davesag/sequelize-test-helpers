const { expect } = require('chai')

const { sequelize, dataTypes, checkNonUniqueIndex } = require('../../../src')
const IndexedModel = require('../../models/Indexed')

describe('src/checkNonUniqueIndex', () => {
  const Model = IndexedModel(sequelize, dataTypes)
  const instance = new Model()

  context('happy path', () => {
    ;['name', ['coffee', 'lunch']].forEach(checkNonUniqueIndex(instance))
  })

  context('unhappy path', () => {
    it('fails the test', () =>
      expect(() => {
        checkNonUniqueIndex(instance)('no name')
      }).to.throw)
  })
})
