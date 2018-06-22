const model = (sequelize, DataTypes) => {
  const Indexed = sequelize.define(
    'Indexed',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      lunch: DataTypes.STRING,
      uuid: DataTypes.UUID
    },
    {
      indexes: [
        { unique: true, fields: ['uuid'] },
        { unique: false, fields: ['name'] },
        { unique: true, fields: ['name', 'lunch'] }
      ]
    }
  )

  return Indexed
}

module.exports = model
