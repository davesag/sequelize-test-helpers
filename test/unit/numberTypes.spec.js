const { expect } = require('chai')

const { dataTypes } = require('../../src')

describe('src/dataTypes#numeric', () => {
  const doTest = dataType => {
    describe(`Testing ${dataType}`, () => {
      context('non function', () => {
        it(`supports ${dataType} with ZEROFILL`, () => {
          expect(dataTypes[dataType].ZEROFILL).to.exist
        })

        it(`supports ${dataType} with UNSIGNED`, () => {
          expect(dataTypes[dataType](10).UNSIGNED).to.exist
        })

        it(`supports ${dataType} with UNSIGNED.ZEROFILL`, () => {
          expect(dataTypes[dataType].UNSIGNED.ZEROFILL).to.exist
        })

        it(`supports ${dataType} with ZEROFILL.UNSIGNED`, () => {
          expect(dataTypes[dataType].ZEROFILL.UNSIGNED).to.exist
        })
      })

      context('function', () => {
        it(`supports ${dataType}() with ZEROFILL`, () => {
          expect(dataTypes[dataType](10).ZEROFILL).to.exist
        })

        it(`supports ${dataType}() with UNSIGNED`, () => {
          expect(dataTypes[dataType](10).UNSIGNED).to.exist
        })

        it(`supports ${dataType}() with UNSIGNED.ZEROFILL`, () => {
          expect(dataTypes[dataType](10).UNSIGNED.ZEROFILL).to.exist
        })

        it(`supports ${dataType}() with ZEROFILL.UNSIGNED`, () => {
          expect(dataTypes[dataType](10).ZEROFILL.UNSIGNED).to.exist
        })
      })
    })
  }
  ;[
    'BIGINT',
    'DECIMAL',
    'DOUBLE',
    'DOUBLE PRECISION',
    'FLOAT',
    'INTEGER',
    'REAL',
    'SMALLINT',
    'TINYINT'
  ].forEach(doTest)
})
