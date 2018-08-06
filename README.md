# sequelize-test-helpers

A collection of utilities to help with unit-testing [Sequelize](http://docs.sequelizejs.com) models and code that needs those models.

[![Greenkeeper badge](https://badges.greenkeeper.io/davesag/sequelize-test-helpers.svg)](https://greenkeeper.io/)

## Branches

| Branch | Status | Coverage |   |
| ------ | ------ | -------- | - |
| `develop` | [![CircleCI](https://circleci.com/gh/davesag/sequelize-test-helpers/tree/develop.svg?style=svg)](https://circleci.com/gh/davesag/sequelize-test-helpers/tree/develop) | [![codecov](https://codecov.io/gh/davesag/sequelize-test-helpers/branch/develop/graph/badge.svg)](https://codecov.io/gh/davesag/sequelize-test-helpers) | Work in progress |
| `master` | [![CircleCI](https://circleci.com/gh/davesag/sequelize-test-helpers/tree/master.svg?style=svg)](https://circleci.com/gh/davesag/sequelize-test-helpers/tree/master) | [![codecov](https://codecov.io/gh/davesag/sequelize-test-helpers/branch/master/graph/badge.svg)](https://codecov.io/gh/davesag/sequelize-test-helpers) | Latest stable release |

## Prerequisites

This library assumes:

1. You are using [`chai`](http://www.chaijs.com)
2. You are using [`sinon`](http://sinonjs.org)

## Install

Add `sequelize-test-helpers` as a `devDependency`:

    npm i -D sequelize-test-helpers

## Examples

### Unit Testing Models

Let's say you have a Sequelize model `User` as follows:

#### `src/models/User.js`

    const model = (sequelize, DataTypes) => {
      const User = sequelize.define(
        'User',
        {
          age: {
            type: DataTypes.INTEGER.UNSIGNED
          },
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

You can use `sequelize-test-helpers` to unit-test this as follows:

#### `test/unit/models/User.spec.js`

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
          'age',
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

### Built in checks

| Check                      | What it does |
| -------------------------- | ------------ |
| `checkHookDefined`         | Checks that a particular hook is defined. |
| `checkModelName`           | Checks that the model is named correctly. |
| `checkNonUniqueIndex`      | Checks that a specific non-unique index is defined. |
| `checkPropertyExists`      | Checks that the model has defined the given property. |
| `checkUniqueCompoundIndex` | Checks that a specific unique compound index is defined. |
| `checkUniqueIndex`         | Checks that a specific unique index is defined. |

### Checking associations

The various association functions are stubbed so you can simply invoke the the model's `associate` function in a `before` block then use `sinon`'s standard expectation syntax to check they were called with the correct values.

#### `hasOne`

    it("defined a hasOne association with Image as 'profilePic'", () => {
      expect(User.hasOne).to.have.been.calledWith(Image, {
        as: 'profilePic'
      })
    })

#### `belongsTo`

    it('defined a belongsTo association with Company', () => {
      expect(User.belongsTo).to.have.been.calledWith(Company)
    })

#### `hasMany`

    it("defined a hasMany association with User as 'employees'", () => {
      expect(Company.hasMany).to.have.been.calledWith(User, {
        as: 'employees'
      })
    })

#### `belongsToMany`

    it("defined a belongsToMany association with Category through CategoriesCompanies as 'categories'", () => {
      expect(Company.belongsToMany).to.have.been.calledWith(Category, {
        through: CategoriesCompanies,
        as: 'categories'
      })
    })

### Unit testing code that requires `models`

Let's say you have a utility function that takes some data and uses it to update a user record. If the user does not exist it returns `null`. (Yes I know this is a contrived example)

#### `src/utils/save.js`

    const { User } = require('../models')

    const save = async ({ id, ...data }) => {
      const user = await User.findOne({ where: { id } })
      if (user) return await user.update(data)
      return null
    }

    module.exports = save

You want to unit-test this without invoking a database connection (so you can't `require('src/models')` in your test).

This is where `makeMockModels`, `sinon`, and [`proxyquire`](https://github.com/thlorenz/proxyquire) come in handy.

#### `test/unit/utils/save.spec.js`

    const { expect } = require('chai')
    const sinon = require('sinon')
    const proxyquire = require('proxyquire')

    const { makeMockModels } = require('sequelize-test-helpers')

    const mockModels = makeMockModels({ User: { findOne: sinon.stub() } })

    const save = proxyquire('../../../src/utils/save', { '../models': mockModels })

    const fakeUser = { update: sinon.stub() }

    describe('src/save', () => {
      const data = {
        firstname: 'Testy',
        lastname: 'McTestface',
        email: 'testy.mctestface.test.tes',
        token: 'some-token'
      }

      const resetStubs = () => {
        mockModels.User.findOne.resetHistory()
        fakeUser.update.resetHistory()
      }

      let result

      context('user does not exist', () => {
        before(async () => {
          mockModels.User.findOne.resolves(undefined)
          result = await save(data)
        })

        after(resetStubs)

        it('called User.findOne', () => {
          expect(mockModels.User.findOne).to.have.been.called
        })

        it("didn't call user.update", () => {
          expect(fakeUser.update).not.to.have.been.called
        })

        it('returned null', () => {
          expect(result).to.be.null
        })
      })

      context('user exists', () => {
        before(async () => {
          fakeUser.update.resolves(fakeUser)
          mockModels.User.findOne.resolves(fakeUser)
          result = await save(data)
        })

        after(resetStubs)

        it('called User.findOne', () => {
          expect(mockModels.User.findOne).to.have.been.called
        })

        it('called user.update', () => {
          expect(fakeUser.update).to.have.been.calledWith(sinon.match(data))
        })

        it('returned the user', () => {
          expect(result).to.deep.equal(fakeUser)
        })
      })
    })

As a convenience, `makeMockModels` will automatically populate your `mockModels` with mocks of all of the models defined in your `src/models` folder (or if you have a `.sequelizerc` file it will look for the `model-path` in that). Simply override any of the specific models you need to do stuff with.

### Listing your models

It's useful to be able to generate a list of the names of your models.

    const { listModels } = require('sequelize-test-helpers')

    console.log(listModels()) // will spit out a list of your model names.

Similarly to `makeMockModels` above, `listModels` will find all of the models defined in your `src/models` folder (or if you have a `.sequelizerc` file it will look for the `model-path` in that).

## Contributing

Please see the [contributing notes](CONTRIBUTING.md).
