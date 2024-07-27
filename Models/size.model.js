// models/size.model.js
module.exports = (sequelize, Sequelize) => {
  const Size = sequelize.define("size", {
    size: {
      type: Sequelize.STRING,
      allowNull: false
    },
    gender: {
      type: Sequelize.ENUM('male', 'female'),
      allowNull: false
    }
  });


  Size.associate = (models) => {
    Size.belongsToMany(models.Product, { through: models.ProductSize, as: 'products' });
  };
  
  return Size;
};