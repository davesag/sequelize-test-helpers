const { expect } = require('chai')

/**
 * @deprecated both `checkUniqueIndex` and `checkNonUniqueIndex` will now check for either simple or composite indexes.
 */
const checkUniqueCompoundIndex = instance => indexes => {
  it(`indexed a unique index of ${indexes.join(' and ')}`, () => {
    expect(
      instance.indexes.find(
        index => index.unique === true && index.fields.join('') === indexes.join('')
      )
    ).not.to.be.undefined
  })
}

module.exports = checkUniqueCompoundIndex
