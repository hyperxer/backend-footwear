// models/color.model.js
module.exports = (sequelize, Sequelize) => {
  const Color = sequelize.define("color", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  Color.associate = (models) => {
    Color.hasMany(models.ProductColor, { foreignKey: 'colorId' });
  };

  return Color;
};
