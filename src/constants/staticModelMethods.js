const syncMethods = [
  'addScope',
  'belongsTo',
  'belongsToMany',
  'build',
  'getTableName',
  'hasMany',
  'hasOne',
  'init',
  'removeAttribute',
  'schema',
  'scope',
  'unscoped'
]

const asyncMethods = [
  'aggregate',
  'bulkCreate',
  'count',
  'create',
  'decrement',
  'describe',
  'destroy',
  'drop',
  'findAll',
  'findAndCountAll',
  'findByPk',
  'findCreateFind',
  'findOne',
  'findOrBuild',
  'findOrCreate',
  'increment',
  'max',
  'min',
  'restore',
  'sum',
  'sync',
  'truncate',
  'update',
  'upsert'
]

module.exports = { syncMethods, asyncMethods }
