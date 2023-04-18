const Sequelize = require("sequelize");
const db = require("../db");

const OrderProducts = db.define("orderproduct", {
  orderId: {
    type: Sequelize.INTEGER,
  },
  productID: {
    type: Sequelize.INTEGER,
  },
});

module.exports = OrderProducts;
