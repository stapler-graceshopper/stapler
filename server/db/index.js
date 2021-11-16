//this is the access point for all things database related!

const db = require('./db')

const Product = require('./models/Product')
const User = require('./models/User')
const ShoppingCart = require('./models/ShoppingCart')

//associations could go here!

User.belongsToMany(Product,{through: {model: ShoppingCart, unique: false}})
Product.belongsToMany(User,{through: {model: ShoppingCart, unique: false}})

Product.hasOne(ShoppingCart)
ShoppingCart.belongsTo(Product)


module.exports = {
  db,
  models: {
    User,
    Product,
    ShoppingCart
  },
}
