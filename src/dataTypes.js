/* istanbul ignore next  */
const noop = () => {}

// see http://docs.sequelizejs.com/variable/index.html#static-variable-DataTypes
const types = [
  'ABSTRACT',
  'ARRAY',
  'BIGINT',
  'BLOB',
  'BOOLEAN',
  'CHAR',
  'CIDR',
  'DATE',
  'DATEONLY',
  'DECIMAL',
  'DOUBLE',
  'DOUBLE PRECISION',
  'ENUM',
  'FLOAT',
  'GEOGRAPHY',
  'GEOMETRY',
  'HSTORE',
  'HSTORE',
  'INET',
  'INTEGER',
  'JSON',
  'JSONB',
  'JSONTYPE',
  'MACADDR',
  'MEDIUMINT',
  'NOW',
  'NUMBER',
  'NUMERIC',
  'RANGE',
  'REAL',
  'SMALLINT',
  'STRING',
  'TEXT',
  'TIME',
  'TINYINT',
  'UUID',
  'UUIDV1',
  'UUIDV4',
  'VIRTUAL'
]

const dataTypes = types.reduce((acc, elem) => {
  acc[elem] = noop
  return acc
}, {})

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
