const { expect } = require('chai')
const { sequelize, dataTypes, checkModelName } = require('../../../src')
const SimpleModel = require('../../models/Simple')

describe('src/checkModelName', () => {
  const Model = SimpleModel(sequelize, dataTypes)
  context('happy path', () => {
    checkModelName(Model)('Simple')
  })

  context('unhappy path', () => {
    it('fails the test', () =>
      expect(() => {
        checkModelName(Model)('Not So Simple')
      }).to.throw)
  })
})
