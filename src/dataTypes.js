const Noop = require('./types/Noop')
const NumericType = require('./types/NumericType')
const StringType = require('./types/StringType')
const basicTypes = require('./constants/basicTypes')
const numericTypes = require('./constants/numericTypes')
const stringTypes = require('./constants/stringTypes')
const deferrables = require('./constants/deferrables')

const basicDataTypes = basicTypes.reduce((acc, elem) => {
  acc[elem] = Noop
  return acc
}, {})

const numericDataTypes = numericTypes.reduce((acc, elem) => {
  acc[elem] = NumericType
  return acc
}, basicDataTypes)

const dataTypes = stringTypes.reduce((acc, elem) => {
  acc[elem] = StringType
  return acc
}, numericDataTypes)

const Deferrable = deferrables.reduce((acc, elem) => {
  acc[elem] = elem
  return acc
}, {})

module.exports = {
  ...dataTypes,
  Deferrable
}
