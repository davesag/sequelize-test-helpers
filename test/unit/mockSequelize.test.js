// const { expect } = require('chai')

const Sequelize = require('../../src/mockSequelize')
const DataTypes = require('../../src/dataTypes')

describe('src/mockSequelize', () => {
  it('has Model', () => {
    expect(Sequelize).toHaveProperty('Model')
  })

  it('Model is a class', () => {
    expect(Sequelize.Model).toBeFunction()
    expect(Sequelize.Model.constructor).toBeFunction()
  })

  it('Model has a static init function', () => {
    expect(Sequelize.Model.init).toBeFunction()
  })

  it('has DataTypes', () => {
    expect(Sequelize).toHaveProperty('DataTypes', DataTypes)
  })
})
