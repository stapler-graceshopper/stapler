//this is the access point for all things database related!

const db = require('./db')

const Product = require('./models/Product')
const User = require('./models/User')

//associations could go here!
// const UserProduct = db.define('user_product',{})
User.belongsToMany(Product,{through: "userProduct"})
Product.belongsToMany(User,{through: "userProduct"})
module.exports = {
  db,
  models: {
    // UserProduct,
    User,
    Product,
  },
}
