const fs = require('fs')
const path = require('path')

const fileFilter = require('./utils/fileFilter')

const projectRoot = process.cwd()

let sequelizerc
const sequelizercPath = path.join(projectRoot, '.sequelizerc')

try {
  sequelizerc = require(sequelizercPath)
} catch (err) {
  /* istanbul ignore next */
  if (!err.code === 'MODULE_NOT_FOUND') throw err
}

const modelsFolder = sequelizerc
  ? /* istanbul ignore next */ sequelizerc['models-path']
  : path.join(projectRoot, 'src', 'models')

const makeName = file => file.slice(0, -3)

const listToObject = (acc, elem) => {
  acc[elem] = elem
  return acc
}

/* istanbul ignore next */
const listModels = (folder = modelsFolder) =>
  fs
    .readdirSync(folder)
    .filter(fileFilter)
    .map(makeName)

const finder = folder => listModels(folder).reduce(listToObject, {})

const makeMockModels = (models, folder) => ({
  ...finder(folder),
  ...models,
  '@noCallThru': true
})

module.exports = {
  makeMockModels,
  listModels
}
