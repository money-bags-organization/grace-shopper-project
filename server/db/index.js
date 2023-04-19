//this is the access point for all things database related!

const db = require('./db');
const User = require('./models/User');
const Orders = require('./models/Orders');
const Products = require('./models/Products');
const OrderProducts = require('./models/OrderProducts');

//associations could go here!

User.hasMany(Orders);
Orders.belongsTo(User);

//many to many relationship
Orders.belongsToMany(Products, { through: OrderProducts });
Products.belongsToMany(Orders, { through: OrderProducts });

module.exports = {
  db,
  models: {
    User,
    Orders,
    Products,
    OrderProducts,
  },
};
