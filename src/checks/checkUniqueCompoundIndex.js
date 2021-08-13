const { expect } = require('chai')
const { serialCommaList } = require('../utils')

/**
 * @deprecated both `checkUniqueIndex` and `checkNonUniqueIndex` will now check for either simple or composite indexes.
 */
const checkUniqueCompoundIndex = instance => indexes => {
  it(`indexed an unique index of ${serialCommaList(indexes)}`, () => {
    expect(
      instance.indexes.find(
        index => index.unique === true && index.fields.join('') === indexes.join('')
      )
    ).not.to.be.undefined
  })
}

module.exports = checkUniqueCompoundIndex
