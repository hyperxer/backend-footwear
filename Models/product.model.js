// models/product.model.js
module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    detail: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    prod_img: {
      type: Sequelize.STRING,
      allowNull: false
    },
    gender: {
      type: Sequelize.ENUM('male', 'female'),
      allowNull: false
    }
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Brand);
    Product.belongsTo(models.Category);
    Product.belongsToMany(models.Color, { through: models.ProductColor, as: 'colors' });
    Product.belongsToMany(models.Size, { through: models.ProductSize, as: 'sizes' });
    Product.hasMany(models.ProductColor, { foreignKey: 'productId' });
  };


  return Product;
};