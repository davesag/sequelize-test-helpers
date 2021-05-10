const { isJestRunner, expect } = require('../../src/utils/checkIsJestRunner')

const { dataTypes } = require('../../src')

describe('src/dataTypes#numeric', () => {
  const doTest = dataType => {
      describe(`Testing ${dataType}`, () => {
        describe('non function', () => {
          it(`supports ${dataType} with ZEROFILL`, () => {
            isJestRunner ?
              expect(dataTypes[dataType].ZEROFILL).toBeTruthy() :
              expect(dataTypes[dataType].ZEROFILL).to.exist
          })

          it(`supports ${dataType} with UNSIGNED`, () => {
            isJestRunner ?
              expect(dataTypes[dataType](10).UNSIGNED).toBeTruthy() :
              expect(dataTypes[dataType](10).UNSIGNED).to.exist
          })

          it(`supports ${dataType} with UNSIGNED.ZEROFILL`, () => {
            isJestRunner ?
              expect(dataTypes[dataType].UNSIGNED.ZEROFILL).toBeTruthy() :
              expect(dataTypes[dataType].UNSIGNED.ZEROFILL).to.exist
          })

          it(`supports ${dataType} with ZEROFILL.UNSIGNED`, () => {
            isJestRunner ?
              expect(dataTypes[dataType].ZEROFILL.UNSIGNED).toBeTruthy() :
              expect(dataTypes[dataType].ZEROFILL.UNSIGNED).to.exist
          })
        })

        describe('function', () => {
          it(`supports ${dataType}() with ZEROFILL`, () => {
            isJestRunner ?
              expect(dataTypes[dataType](10).ZEROFILL).toBeTruthy() :
              expect(dataTypes[dataType](10).ZEROFILL).to.exist
          })

          it(`supports ${dataType}() with UNSIGNED`, () => {
            isJestRunner ?
              expect(dataTypes[dataType](10).UNSIGNED).toBeTruthy() :
              expect(dataTypes[dataType](10).UNSIGNED).to.exist
          })

          it(`supports ${dataType}() with UNSIGNED.ZEROFILL`, () => {
            isJestRunner ?
              expect(dataTypes[dataType](10).UNSIGNED.ZEROFILL).toBeTruthy() :
              expect(dataTypes[dataType](10).UNSIGNED.ZEROFILL).to.exist
          })

          it(`supports ${dataType}() with ZEROFILL.UNSIGNED`, () => {
            isJestRunner ?
              expect(dataTypes[dataType](10).ZEROFILL.UNSIGNED).toBeTruthy() :
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
