// models/order.model.js
module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Pending"
      }
    });
  
    Order.associate = (models) => {
      Order.belongsTo(models.User);
      Order.hasMany(models.OrderItem);
    };
  
    return Order;
  };