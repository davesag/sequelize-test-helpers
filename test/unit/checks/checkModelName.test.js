// const { expect } = require('chai')

const { sequelize, dataTypes, checkModelName } = require('../../../src')
const SimpleModel = require('../../models/Simple')

describe('src/checkModelName', () => {
  const Model = SimpleModel(sequelize, dataTypes)
  describe('happy path', () => {
    checkModelName(Model)('Simple')
  })

  describe('unhappy path', () => {
    it('fails the test', () =>
      expect(() => {
        checkModelName(Model)('Not So Simple')
      }).toThrow())
  })
})
