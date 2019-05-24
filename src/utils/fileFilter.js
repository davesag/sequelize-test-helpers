const fileFilter = suffix => file =>
  file.indexOf('.') !== 0 &&
  file !== `index${suffix}` &&
  file.slice(-suffix.length) === suffix

module.exports = fileFilter
