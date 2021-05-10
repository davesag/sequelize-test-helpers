const { isJestRunner, expect } = require('../../src/utils/checkIsJestRunner')

const { dataTypes } = require('../../src')

describe('src/dataTypes#string', () => {
  const doTest = dataType => {
      describe(`Testing ${dataType}`, () => {
        describe('non function', () => {
          it(`supports ${dataType} with BINARY`, () => {
            isJestRunner ?
              expect(dataTypes[dataType].BINARY).toBeTruthy() :
              expect(dataTypes[dataType].BINARY).to.exist
          })
        })

        describe('function', () => {
          it(`supports ${dataType}() with BINARY`, () => {
            isJestRunner ?
              expect(dataTypes[dataType](10).BINARY).toBeTruthy() :
              expect(dataTypes[dataType](10).BINARY).to.exist
          })
        })
      })
    }
  ;['CHAR', 'STRING'].forEach(doTest)
})
