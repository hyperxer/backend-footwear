// models/size.model.js
module.exports = (sequelize, Sequelize) => {
    const Size = sequelize.define("size", {
      value: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return Size;
  };