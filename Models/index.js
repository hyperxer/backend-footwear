// models/index.js
const Sequelize = require("sequelize");
const sequelize = require("../Config/sequelize.config.js");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.brand = require("./brand.model.js")(sequelize, Sequelize);
db.category = require("./category.model.js")(sequelize, Sequelize);
db.color = require("./color.model.js")(sequelize, Sequelize);
db.size = require("./size.model.js")(sequelize, Sequelize);
db.product = require("./product.model.js")(sequelize, Sequelize);
db.productColor = require("./productColor.model.js")(sequelize, Sequelize);
db.productSize = require("./productSize.model.js")(sequelize, Sequelize);
db.cartItem = require("./cartItem.model.js")(sequelize, Sequelize);
db.order = require("./order.model.js")(sequelize, Sequelize);
db.orderItem = require("./orderItem.model.js")(sequelize, Sequelize);
db.shippingAddress = require("./shippingAddress.model.js")(sequelize, Sequelize);
db.review = require("./review.model.js")(sequelize, Sequelize);

db.product.belongsTo(db.brand);
db.product.belongsTo(db.category);
db.product.belongsToMany(db.color, { through: db.productColor });
db.color.belongsToMany(db.product, { through: db.productColor });
db.product.belongsToMany(db.size, { through: db.productSize });
db.size.belongsToMany(db.product, { through: db.productSize });
db.cartItem.belongsTo(db.product);
db.cartItem.belongsTo(db.user);
db.order.belongsTo(db.user);
db.order.hasMany(db.orderItem);
db.orderItem.belongsTo(db.order);
db.orderItem.belongsTo(db.product);
db.shippingAddress.belongsTo(db.order);
db.review.belongsTo(db.product);
db.review.belongsTo(db.user);


module.exports = db;
