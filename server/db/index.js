//this is the access point for all things database related!

const db = require('./db')
const Orders = require('./models/Orders')
const Products = require('./models/Products')


const User = require('./models/User')

//associations could go here!

Orders.hasMany(Products)
Products.belongsTo(Orders)


//**********Blocker: Associations need to be resolved, Ideas below */
// Orders.belongsTo(User)
// User.hasMany(Orders)

//Stevens idea
// Orders.hasMany(Products);
// OrderProducts.belongsTo(Products);
// User.hasMany(Orders);
// Orders.belongsTo(User);

//******************************************************* */

module.exports = {
  db,
  models: {
    User,
    Products,
    Orders
  
  },
}
