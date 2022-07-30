![Horizontal Logo](logo/horizontal.svg)

A collection of utilities to help with unit-testing [Sequelize](http://docs.sequelizejs.com) models and code that needs those models.

[![NPM](https://nodei.co/npm/sequelize-test-helpers.png)](https://nodei.co/npm/sequelize-test-helpers/)

## Related Projects

- [`sequelize-pg-utilities`](https://github.com/davesag/sequelize-pg-utilities) — Simple utilities that help you manage your Sequelize configuration.

## How to use

### Prerequisites

This library assumes:

1. You are using [`chai`](http://www.chaijs.com) — Version 4 or better.
2. You are using [`sinon`](http://sinonjs.org) — Version 5 or better.
3. Using [`mocha`](https://mochajs.org) is also recommended, but as long as you are using `chai` and `sinon` this should work with any test runner.

**Note** Jest is not supported unless you are also using `sinon` and `chai`, which is unlikely.

### Installation

Add `sequelize-test-helpers` as a `devDependency`:

```sh
npm i -D sequelize-test-helpers
```

## Examples

### Unit testing models created with `sequelize.define`

**Note**: See below for how to test models created using `Model.init`

Let's say you have a Sequelize model `User` as follows:

#### `src/models/User.js`

```js
const model = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      age: {
        type: DataTypes.INTEGER.UNSIGNED
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      lastName: {
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
        { unique: true, fields: ['token'] },
        { unique: false, fields: ['firstName', 'lastName'] }
      ]
    }
  )

  User.associate = ({ Company }) => {
    User.belongsTo(Company)
  }

  return User
}

module.exports = model
```

You can use `sequelize-test-helpers` to unit-test this with `mocha` as follows:

#### `test/unit/models/User.spec.js`

```js
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
    ;['age', 'firstName', 'lastName', 'email', 'token'].forEach(checkPropertyExists(user))
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
    context('unique', () => {
      ;['email', 'token'].forEach(checkUniqueIndex(user))
    })

    context('non unique (and also composite in this example)', () => {
      ;[['firstName', 'lastName']].forEach(checkNonUniqueIndex(user))
    })
  })
})
```

### Built-in checks

| Check                 | What it does                                          |
| --------------------- | ----------------------------------------------------- |
| `checkHookDefined`    | Checks that a particular hook is defined.             |
| `checkModelName`      | Checks that the model is named correctly.             |
| `checkNonUniqueIndex` | Checks that a specific non-unique index is defined.   |
| `checkPropertyExists` | Checks that the model has defined the given property. |
| `checkUniqueIndex`    | Checks that a specific unique index is defined.       |

#### Deprecation notice

| Check                      | Note                                                   |
| -------------------------- | ------------------------------------------------------ |
| `checkUniqueCompoundIndex` | Use either `checkUniqueIndex` or `checkNonUniqueIndex` |

### Checking associations

The various association functions are stubbed so you can simply invoke the the model's `associate` function in a `before` block then use `sinon`'s standard expectation syntax to check they were called with the correct values.

#### `hasOne`

```js
it("defined a hasOne association with Image as 'profilePic'", () => {
  expect(User.hasOne).to.have.been.calledWith(Image, {
    as: 'profilePic'
  })
})
```

#### `belongsTo`

```js
it('defined a belongsTo association with Company', () => {
  expect(User.belongsTo).to.have.been.calledWith(Company)
})
```

#### `hasMany`

```js
it("defined a hasMany association with User as 'employees'", () => {
  expect(Company.hasMany).to.have.been.calledWith(User, {
    as: 'employees'
  })
})
```

#### `belongsToMany`

```js
it("defined a belongsToMany association with Category through CategoriesCompanies as 'categories'", () => {
  expect(Company.belongsToMany).to.have.been.calledWith(Category, {
    through: CategoriesCompanies,
    as: 'categories'
  })
})
```

### Unit testing code that requires `models`

Let's say you have a utility function that takes some data and uses it to update a user record. If the user does not exist it returns `null`. (Yes I know this is a contrived example)

#### `src/utils/save.js`

```js
const { User } = require('../models')

const save = async ({ id, ...data }) => {
  const user = await User.findOne({ where: { id } })
  if (user) return await user.update(data)
  return null
}

module.exports = save
```

You want to unit-test this without invoking a database connection (so you can't `require('src/models')` in your test).

This is where `makeMockModels`, `sinon`, and [`proxyquire`](https://github.com/thlorenz/proxyquire) come in handy.

#### `test/unit/utils/save.test.js`

```js
const { expect } = require('chai')
const { match, stub, resetHistory } = require('sinon')
const proxyquire = require('proxyquire')

const { makeMockModels } = require('sequelize-test-helpers')

describe('src/utils/save', () => {
  const User = { findOne: stub() }
  const mockModels = makeMockModels({ User })

  const save = proxyquire('../../../src/utils/save', {
    '../models': mockModels
  })

  const id = 1
  const data = {
    firstName: 'Testy',
    lastName: 'McTestFace',
    email: 'testy.mctestface.test.tes',
    token: 'some-token'
  }
  const fakeUser = { id, ...data, update: stub() }

  let result

  context('user does not exist', () => {
    before(async () => {
      User.findOne.resolves(undefined)
      result = await save({ id, ...data })
    })

    after(resetHistory)

    it('called User.findOne', () => {
      expect(User.findOne).to.have.been.calledWith(match({ where: { id } }))
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
      User.findOne.resolves(fakeUser)
      result = await save({ id, ...data })
    })

    after(resetHistory)

    it('called User.findOne', () => {
      expect(User.findOne).to.have.been.calledWith(match({ where: { id } }))
    })

    it('called user.update', () => {
      expect(fakeUser.update).to.have.been.calledWith(match(data))
    })

    it('returned the user', () => {
      expect(result).to.deep.equal(fakeUser)
    })
  })
})
```

As a convenience, `makeMockModels` will automatically populate your `mockModels` with mocks of all of the models defined in your `src/models` folder (or if you have a `.sequelizerc` file it will look for the `models-path` in that). Simply override any of the specific models you need to do stuff with.

### Testing models created with `Model.init`

Sequelize also allows you to create models by extending `Sequelize.Model` and invoking its static `init` function as follows:

**Note**: creating your models this way makes it harder to test their use.

```js
const { Model, DataTypes } = require('sequelize')

const factory = sequelize => {
  class User extends Model {}
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING
    },
    { sequelize, modelName: 'User' }
  )
  return User
}

module.exports = factory
```

You can test this using `sequelize-test-helpers`, `sinon`, and `proxyquire`.

```js
const { expect } = require('chai')
const { spy } = require('sinon')
const proxyquire = require('proxyquire')
const { sequelize, Sequelize } = require('sequelize-test-helpers')

describe('src/models/User', () => {
  const { DataTypes } = Sequelize

  const UserFactory = proxyquire('src/models/User', {
    sequelize: Sequelize
  })

  let User

  before(() => {
    User = UserFactory(sequelize)
  })

  // It's important you do this
  after(() => {
    User.init.resetHistory()
  })

  it('called User.init with the correct parameters', () => {
    expect(User.init).to.have.been.calledWith(
      {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING
      },
      {
        sequelize,
        modelName: 'User'
      }
    )
  })
})
```

### Listing your models

Assuming your `src/models/index.js` (or your equivalent) exports all your models, it's useful to be able to generate a list of their names.

```js
const { listModels } = require('sequelize-test-helpers')

console.log(listModels()) // will spit out a list of your model names.
```

Similarly to `makeMockModels` above, `listModels` will find all of the models defined in your `src/models` folder (or if you have a `.sequelizerc` file it will look for the `models-path` in that).

## Custom `models` paths and custom file suffixes

By default `makeMockModels` and `listModels` will both look for your models in files ending with `.js` in either the models path defined in `.sequelizerc`, or in `src/models`. If however your models are not `.js` files and the `models` folder is somewhere else you can pass in a custom models folder path and a custom suffix.

- `listModels(customModelsFolder, customSuffix)`

  ```js
  const modelNames = listModels('models', '.ts')
  ```

- `makeMockModels(yourCustomModels, customModelsFolder, customSuffix)`

  ```js
  const models = makeMockModels({ User: { findOne: stub() } }, 'models', '.ts')
  ```

## Development

### Branches

<!-- prettier-ignore -->
| Branch | Status | Coverage | Audit | Notes |
| ------ | ------ | -------- | ----- | ----- |
| `develop` | [![CircleCI](https://circleci.com/gh/davesag/sequelize-test-helpers/tree/develop.svg?style=svg)](https://circleci.com/gh/davesag/sequelize-test-helpers/tree/develop) | [![codecov](https://codecov.io/gh/davesag/sequelize-test-helpers/branch/develop/graph/badge.svg)](https://codecov.io/gh/davesag/sequelize-test-helpers) | [![Vulnerabilities](https://snyk.io/test/github/davesag/sequelize-test-helpers/develop/badge.svg)](https://snyk.io/test/github/davesag/sequelize-test-helpers/develop) | Work in progress |
| `main` | [![CircleCI](https://circleci.com/gh/davesag/sequelize-test-helpers/tree/main.svg?style=svg)](https://circleci.com/gh/davesag/sequelize-test-helpers/tree/main) | [![codecov](https://codecov.io/gh/davesag/sequelize-test-helpers/branch/main/graph/badge.svg)](https://codecov.io/gh/davesag/sequelize-test-helpers) | [![Vulnerabilities](https://snyk.io/test/github/davesag/sequelize-test-helpers/main/badge.svg)](https://snyk.io/test/github/davesag/sequelize-test-helpers/main) | Latest stable release |

### Development Prerequisites

- [NodeJS](https://nodejs.org). I use [`nvm`](https://github.com/creationix/nvm) to manage Node versions — `brew install nvm`.

### Initialisation

```sh
npm install
```

### Test it

- `npm test` — runs the unit tests
- `npm run test:unit:cov` — runs the unit tests with code coverage

### Lint it

```sh
npm run lint
```

## Contributing

Please see the [contributing notes](CONTRIBUTING.md).

## Thanks

- Thanks to [`reallinfo`](https://github.com/reallinfo) for the logo.
