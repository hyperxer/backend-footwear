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
    }
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Brand);
    Product.belongsTo(models.Category);
    Product.belongsToMany(models.Color, { through: models.ProductColor });
    Product.belongsToMany(models.Size, { through: models.ProductSize });
    Product.hasMany(models.ProductColor, { foreignKey: 'productId' });
  };

  return Product;
};