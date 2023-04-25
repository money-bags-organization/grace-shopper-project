const Sequelize = require("sequelize");
const db = require("../db");

const Products = db.define("product", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
});

module.exports = Products;
