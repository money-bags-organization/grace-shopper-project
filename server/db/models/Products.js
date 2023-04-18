const Sequelize = require('sequelize')
const db = require('../db')



const Products = db.define('products', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
        max: 10
    }
  },


})

module.exports = Products