//this is the access point for all things database related!

const db = require('./db')

const Product = require('./models/Product')
const User = require('./models/User')
const ShoppingCart = require('./models/ShoppingCart')

//associations could go here!

User.belongsToMany(Product,{through: ShoppingCart})
Product.belongsToMany(User,{through: ShoppingCart})


<<<<<<< HEAD

=======
>>>>>>> 6040e7a924163f285a54900226ea57eb9ac938e3
module.exports = {
  db,
  models: {
    User,
    Product,
    ShoppingCart
  },
}
