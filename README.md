# sequelize-test-helpers

A collection of utilities to help with unit-testing [Sequelize](http://docs.sequelizejs.com) models

## Branches

| Branch | Status | Coverage |   |
| ------ | ------ | -------- | - |
| `develop` | [![CircleCI](https://circleci.com/gh/davesag/sequelize-test-helpers/tree/develop.svg?style=svg)](https://circleci.com/gh/davesag/sequelize-test-helpers/tree/develop) | [![codecov](https://codecov.io/gh/davesag/sequelize-test-helpers/branch/develop/graph/badge.svg)](https://codecov.io/gh/davesag/sequelize-test-helpers) | Work in progress |
| `master` | [![CircleCI](https://circleci.com/gh/davesag/sequelize-test-helpers/tree/master.svg?style=svg)](https://circleci.com/gh/davesag/sequelize-test-helpers/tree/master) | [![codecov](https://codecov.io/gh/davesag/sequelize-test-helpers/branch/master/graph/badge.svg)](https://codecov.io/gh/davesag/sequelize-test-helpers) | Latest stable release |

## Prerequisites

This library assumes

1. You are using [`chai`](http://www.chaijs.com)
2. You are using [`sinon`](http://sinonjs.org)

## Install

Add this as a `devDependency`

    npm i -D sequelize-test-helpers

## Example

let's say you have a Sequelize model `User` as follows

### `src/models/User.js`

    const model = (sequelize, DataTypes) => {
      const User = sequelize.define(
        'User',
        {
          firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: true
            }
          },
          lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: true
            }
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            lowercase: true,
            validate: {
              isEmail: true,
              notEmpty: true
            }
          },
          token: {
            type: DataTypes.STRING,
            validate: {
              notEmpty: true
            }
          }
        },
        {
          indexes: [
            { unique: true, fields: ['email'] },
            { unique: true, fields: ['token'] }
          ]
        }
      )

      User.associate = ({ Company }) => {
        User.belongsTo(Company)
      }

      return User
    }

    module.exports = model

You an use `sequelize-test-helpers` to unit-test this as follows

### `test/unit/models/User.spec.js`

    const { expect } = require('chai')

    const {
      sequelize,
      dataTypes,
      checkModelName,
      checkUniqueIndex,
      checkPropertyExists
    } = require('sequelize-test-helpers')

    const UserModel = require('../../src/models/User')

    describe('src/models/User', () => {
      const User = UserModel(sequelize, dataTypes)
      const user = new User()

      checkModelName(User)('User')

      context('properties', () => {
        ;[
          'firstname',
          'lastname',
          'email',
          'token'
        ].forEach(checkPropertyExists(user))
      })

      context('associations', () => {
        const Company = 'some dummy company'

        before(() => {
          User.associate({ Company })
        })

        it('defined a belongsTo association with Company', () => {
          expect(User.belongsTo).to.have.been.calledWith(Company)
        })
      })

      context('indexes', () => {
        ;['email', 'token'].forEach(checkUniqueIndex(user))
      })
    })

## Built in checks

| Check                      | What it does |
| -------------------------- | ------------ |
| `checkHookDefined`         | Checks that a particular hook is defined. |
| `checkModelName`           | Checks that the model is named correctly. |
| `checkNonUniqueIndex`      | Checks that a specific non-unique index is defined. |
| `checkPropertyExists`      | Checks that the model has defined the given property. |
| `checkUniqueCompoundIndex` | Checks that a specific unique compound index is defined. |
| `checkUniqueIndex`         | Checks that a specific unique index is defined. |

## Checking associations

The various association functions are stubbed so you can simply invoke the the model's `associate` function in a `before` block then use `sinon`'s standard expectation syntax to check they were called with the correct values.

### `hasOne`

    it("defined a hasOne association with Image as 'profilePic'", () => {
      expect(User.hasOne).to.have.been.calledWith(Image, {
        as: 'profilePic'
      })
    })

### `belongsTo`

    it('defined a belongsTo association with Company', () => {
      expect(User.belongsTo).to.have.been.calledWith(Company)
    })

### `hasMany`

    it("defined a hasMany association with User as 'employees'", () => {
      expect(Company.hasMany).to.have.been.calledWith(User, {
        as: 'employees'
      })
    })

### `belongsToMany`

    it("defined a belongsToMany association with Category through CategoriesCompanies as 'categories'", () => {
      expect(Company.belongsToMany).to.have.been.calledWith(Category, {
        through: CategoriesCompanies,
        as: 'categories'
      })
    })

## Contributing

Please see the [contributing notes](CONTRIBUTING.md).
