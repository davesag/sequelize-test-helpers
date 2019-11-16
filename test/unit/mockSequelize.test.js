const { expect } = require('chai')

const Sequelize = require('../../src/mockSequelize')
const DataTypes = require('../../src/dataTypes')

describe('src/mockSequelize', () => {
  it('has Model', () => {
    expect(Sequelize).to.have.property('Model')
  })

  it('Model is a class', () => {
    expect(Sequelize.Model).to.be.a('function')
    expect(Sequelize.Model.constructor).to.be.a('function')
  })

  it('Model has a static init function', () => {
    expect(Sequelize.Model.init).to.be.a('function')
  })

  it('has DataTypes', () => {
    expect(Sequelize).to.have.property('DataTypes', DataTypes)
  })
})
