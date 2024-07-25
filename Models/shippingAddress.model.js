// models/shippingAddress.model.js
module.exports = (sequelize, Sequelize) => {
    const ShippingAddress = sequelize.define("shippingAddress", {
        firstname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false
        },
        state: {
            type: Sequelize.STRING,
            allowNull: false
        },
        zipCode: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    ShippingAddress.associate = (models) => {
        ShippingAddress.belongsTo(models.Order);
      };

    return ShippingAddress;
};
