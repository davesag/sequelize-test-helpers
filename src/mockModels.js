const fs = require('fs')
const path = require('path')
const { fileFilter } = require('./utils')

const PROJECT_ROOT = process.cwd()

let sequelizerc
const sequelizercPath = path.join(PROJECT_ROOT, '.sequelizerc')

try {
  sequelizerc = require(sequelizercPath)
} catch (err) {
  /* istanbul ignore next */
  if (!err.code === 'MODULE_NOT_FOUND') throw err
}

const DEFAULT_SUFFIX = '.js'
const DEFAULT_MODELS_FOLDER = sequelizerc
  ? /* istanbul ignore next */ sequelizerc['models-path']
  : path.join(PROJECT_ROOT, 'src', 'models')

const makeName = suffix => file => file.slice(0, -suffix.length)

const listToObject = (acc, elem) => {
  acc[elem] = elem
  return acc
}

//
const listModels = (
  /* istanbul ignore next */ folder = DEFAULT_MODELS_FOLDER,
  suffix = DEFAULT_SUFFIX
) => fs.readdirSync(folder).filter(fileFilter(suffix)).map(makeName(suffix))

const finder = (folder, suffix) => listModels(folder, suffix).reduce(listToObject, {})

const makeMockModels = (models, folder, suffix) => ({
  ...finder(folder, suffix),
  ...models,
  '@noCallThru': true
})

module.exports = {
  makeMockModels,
  listModels
}
