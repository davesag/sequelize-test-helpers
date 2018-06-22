const model = (sequelize, DataTypes) => {
  const HasHooks = sequelize.define(
    'HasHooks',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      hooks: {
        beforeValidate: hooker => {
          hooker.name = 'Alice'
        }
      }
    }
  )

  HasHooks.hook('afterValidate', hooker => {
    hooker.name = 'Bob'
  })

  HasHooks.addHook('afterCreate', 'removeMe', hooker => {
    hooker.name = 'Carla'
  })

  return HasHooks
}

module.exports = model
