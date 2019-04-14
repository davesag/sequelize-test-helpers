const fileFilter = file =>
  file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-3) === '.js'

module.exports = fileFilter
