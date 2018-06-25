const fs = require('fs')
const path = require('path')

const projectRoot = process.cwd()

let sequelizerc

try {
  sequelizerc = require(path.join(projectRoot, '.sequelizerc'))
} catch (err) {
  /* istanbul ignore next */
  if (!err.message.startsWith('Cannot find module')) throw err
}

const modelsFolder = sequelizerc
  ? /* istanbul ignore next */ sequelizerc['models-path']
  : path.join(projectRoot, 'src', 'models')

const fileFilter = file =>
  file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-3) === '.js'

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
