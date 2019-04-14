const { expect } = require('chai')

const { sequelize, dataTypes, checkPropertyExists } = require('../../../src')
const SimpleModel = require('../../models/Simple')

describe('src/checkPropertyExists', () => {
  const Model = SimpleModel(sequelize, dataTypes)
  const instance = new Model()
  context('happy path', () => {
    ;['name'].forEach(checkPropertyExists(instance))
  })

  context('unhappy path', () => {
    it('fails the test', () =>
      expect(() => {
        checkPropertyExists(instance)('no name')
      }).to.throw)
  })
})
