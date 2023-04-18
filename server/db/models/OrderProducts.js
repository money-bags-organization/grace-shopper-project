const Sequelize = require('sequelize')
const db = require('../db')



const OrdersProducts = db.define('orderproducts', {
  orderid: {
    type: Sequelize.BOOLEAN,
  },
  productsid: {
    type: Sequelize.INTEGER,
  },


})

module.exports = OrdersProducts