const Sequelize = require("sequelize");
const db = require("../db");

const Orders = db.define("order", {
  fulfilled: {
    type: Sequelize.BOOLEAN,
  },
  userId: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Orders;
