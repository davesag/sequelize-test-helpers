const { isJestRunner, expect } = require('../../src/utils/checkIsJestRunner')

const Sequelize = require('../../src/mockSequelize')
const DataTypes = require('../../src/dataTypes')

describe('src/mockSequelize', () => {
  it('has Model', () => {
    isJestRunner ?
      expect(Sequelize).toHaveProperty('Model') :
      expect(Sequelize).to.have.property('Model')
  })

  it('Model is a class', () => {
    isJestRunner ?
      expect(Sequelize.Model).toBeFunction() :
      expect(Sequelize.Model).to.be.a('function')
    isJestRunner ?
      expect(Sequelize.Model.constructor).toBeFunction() :
      expect(Sequelize.Model.constructor).to.be.a('function')
  })

  it('Model has a static init function', () => {
    isJestRunner ?
      expect(Sequelize.Model.init).toBeFunction() :
      expect(Sequelize.Model.init).to.be.a('function')
  })

  it('has DataTypes', () => {
    isJestRunner ?
      expect(Sequelize).toHaveProperty('DataTypes', DataTypes) :
      expect(Sequelize).to.have.property('DataTypes', DataTypes)
  })
})
