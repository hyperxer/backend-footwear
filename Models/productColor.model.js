// models/productColor.model.js
module.exports = (sequelize, Sequelize) => {
    const ProductColor = sequelize.define("productColor", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      productId: {
        type: Sequelize.INTEGER,
        references: { model: 'Products', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      colorId: {
        type: Sequelize.INTEGER,
        references: { model: 'Colors', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
    });
  
    // ProductColor.associate = (models) => {
    //   ProductColor.belongsTo(models.Product, { foreignKey: 'productId' });
    //   ProductColor.belongsTo(models.Color, { foreignKey: 'colorId' });
    // };
  
    return ProductColor;
  };
  