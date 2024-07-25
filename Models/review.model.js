// models/review.model.js
module.exports = (sequelize, Sequelize) => {
  const Review = sequelize.define("review", {
    productId: {
      type: Sequelize.INTEGER,
      references: { model: 'Products', key: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    rating: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    comment: {
      type: Sequelize.TEXT
    }
  });

  // Review.associate = (models) => {
  //   Review.belongsTo(models.Product, { foreignKey: 'productId', onDelete: 'CASCADE' });
  // };

  return Review;
};
