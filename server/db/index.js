//this is the access point for all things database related!

const db = require('./db')

const Product = require('./models/Product')
const User = require('./models/User')
const ShoppingCart = require('./models/ShoppingCart')

//associations could go here!

User.belongsToMany(Product,{through: ShoppingCart})
Product.belongsToMany(User,{through: ShoppingCart})



module.exports = {
  db,
  models: {
    User,
    Product,
    ShoppingCart
  },
}
