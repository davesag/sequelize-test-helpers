/**
 * Returns a file filter function that removes the given suffix before comparing file names
 *
 * @param {*} suffix '.js' or '.jsx' etc.
 * @returns {Function} a function that can be supplied to `array.filter` to filter an array of file names
 */
const fileFilter = suffix => file =>
  file.indexOf('.') !== 0 && file !== `index${suffix}` && file.slice(-suffix.length) === suffix

module.exports = fileFilter
