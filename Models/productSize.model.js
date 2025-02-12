// models/productSize.model.js
module.exports = (sequelize, Sequelize) => {
    const ProductSize = sequelize.define("productSize", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sizeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  
    return ProductSize;
  };
  