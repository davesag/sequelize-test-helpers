/* istanbul ignore next  */
const noop = () => {}

function NumericType() {
  return NumericType
}

NumericType.UNSIGNED = NumericType
NumericType.ZEROFILL = NumericType

function StringType() {
  return StringType
}

StringType.BINARY = StringType

// see http://docs.sequelizejs.com/variable/index.html#static-variable-DataTypes
const basicTypes = [
  'ABSTRACT',
  'ARRAY',
  'BLOB',
  'BOOLEAN',
  'CIDR',
  'DATE',
  'DATEONLY',
  'ENUM',
  'GEOGRAPHY',
  'GEOMETRY',
  'HSTORE',
  'HSTORE',
  'INET',
  'JSON',
  'JSONB',
  'JSONTYPE',
  'MACADDR',
  'MEDIUMINT',
  'NOW',
  'NUMBER',
  'NUMERIC',
  'RANGE',
  'TEXT',
  'TIME',
  'UUID',
  'UUIDV1',
  'UUIDV4',
  'VIRTUAL'
]

const numericTypes = [
  'BIGINT',
  'DECIMAL',
  'DOUBLE',
  'DOUBLE PRECISION',
  'FLOAT',
  'INTEGER',
  'REAL',
  'SMALLINT',
  'TINYINT'
]

const stringTypes = ['CHAR', 'STRING']

const basicDataTypes = basicTypes.reduce((acc, elem) => {
  acc[elem] = noop
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

const deferrables = [
  'INITIALLY_IMMEDIATE',
  'INITIALLY_DEFERRED',
  'NOT',
  'SET_DEFERRED',
  'SET_IMMEDIATE'
]

const Deferrable = deferrables.reduce((acc, elem) => {
  acc[elem] = elem
  return acc
}, {})

module.exports = {
  ...dataTypes,
  Deferrable
}
