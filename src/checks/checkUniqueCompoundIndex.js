const { expect } = require('chai')

const checkUniqueCompoundIndex = instance => indecies => {
  it(`indexed a unique index of ${indecies.join(' and ')}`, () => {
    expect(
      instance.indexes.find(
        index =>
          index.unique === true && index.fields.join('') === indecies.join('')
      )
    ).not.to.be.undefined
  })
}

module.exports = checkUniqueCompoundIndex
