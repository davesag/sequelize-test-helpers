const { expect } = require('chai')

const { dataTypes } = require('../../src')

describe('src/dataTypes#string', () => {
  const doTest = dataType => {
    describe(`Testing ${dataType}`, () => {
      context('non function', () => {
        it(`supports ${dataType} with BINARY`, () => {
          expect(dataTypes[dataType].BINARY).to.exist
        })
      })

      context('function', () => {
        it(`supports ${dataType}() with BINARY`, () => {
          expect(dataTypes[dataType](10).BINARY).to.exist
        })
      })
    })
  }
  ;['CHAR', 'STRING'].forEach(doTest)
})
