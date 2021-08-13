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
      coffee: DataTypes.STRING,
      uuid: DataTypes.UUID
    },
    {
      indexes: [
        { unique: true, fields: ['uuid'] },
        { unique: false, fields: ['name'] },
        { unique: true, fields: ['name', 'lunch'] },
        { fields: ['coffee', 'lunch'] } // leave out index: false here to test falsiness
      ]
    }
  )

  return Indexed
}

module.exports = model
