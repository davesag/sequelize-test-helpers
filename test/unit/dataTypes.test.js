const { isJestRunner, expect } = require('../../src/utils/checkIsJestRunner')

const dataTypes = require('../../src/dataTypes')
const Noop = require('../../src/types/Noop')
const NumericType = require('../../src/types/NumericType')
const StringType = require('../../src/types/StringType')

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

const deferrables = [
  'INITIALLY_IMMEDIATE',
  'INITIALLY_DEFERRED',
  'NOT',
  'SET_DEFERRED',
  'SET_IMMEDIATE'
]

describe('dataTypes', () => {
  it('is an object', () => {
    isJestRunner ?
      expect(dataTypes).toBeObject() :
      expect(dataTypes).to.be.an('object')
  })

  it('has Deferrable', () => {
    isJestRunner ?
      expect(dataTypes).toHaveProperty('Deferrable') :
      expect(dataTypes).to.have.property('Deferrable')
    isJestRunner ?
      expect(dataTypes.Deferrable).toContainKeys(deferrables) :
      expect(dataTypes.Deferrable).to.have.keys(deferrables)
  })

  it('has basicTypes', () => {
    basicTypes.forEach(type => {
      isJestRunner ?
        expect(dataTypes).toHaveProperty(type, Noop) :
        expect(dataTypes).to.have.property(type, Noop)
    })
  })

  it('has numericTypes', () => {
    numericTypes.forEach(type => {
      isJestRunner ?
        expect(dataTypes).toHaveProperty(type, NumericType) :
        expect(dataTypes).to.have.property(type, NumericType)
    })
  })

  it('has stringTypes', () => {
    stringTypes.forEach(type => {
      isJestRunner ?
        expect(dataTypes).toHaveProperty(type, StringType) :
        expect(dataTypes).to.have.property(type, StringType)
    })
  })
})
