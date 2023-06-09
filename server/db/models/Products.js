
const Sequelize = require("sequelize");
const db = require("../db");

const Products = db.define("product", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,

  },
  imageUrl: {
    type: Sequelize.STRING,
     defaultValue: '/atari.jpg',
  },
  price: {
    type: Sequelize.INTEGER,
  },
  quantity: {
    type: Sequelize.INTEGER,

  },
});

module.exports = Products;

    

