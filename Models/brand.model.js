// models/brand.model.js
module.exports = (sequelize, Sequelize) => {
    const Brand = sequelize.define("brand", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
    return Brand;
  };