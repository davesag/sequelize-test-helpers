const model = (sequelize, DataTypes) => {
  const Simple = sequelize.define('Simple', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  })

  return Simple
}

module.exports = model
