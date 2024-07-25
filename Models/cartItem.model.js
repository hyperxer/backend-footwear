// models/cartItem.model.js
module.exports = (sequelize, Sequelize) => {
    const CartItem = sequelize.define("cartItem", {
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      }
    });
  
    CartItem.associate = (models) => {
      CartItem.belongsTo(models.Product);
      CartItem.belongsTo(models.User);
    };
  
    return CartItem;
  };