// models/orderItem.model.js
module.exports = (sequelize, Sequelize) => {
    const OrderItem = sequelize.define("orderItem", {
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      }
    });
  
    OrderItem.associate = (models) => {
      OrderItem.belongsTo(models.Order);
      OrderItem.belongsTo(models.Product);
    };
  
    return OrderItem;
  };