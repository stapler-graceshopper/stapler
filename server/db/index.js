//this is the access point for all things database related!

const db = require('./db')

const Product = require('./models/Product')
const User = require('./models/User')
const ShoppingCart = require('./models/ShoppingCart')
const Category = require('./models/Categories')

//associations could go here!

// JOE_CR: What does unique:false do here?
User.belongsToMany(Product,{through: {model: ShoppingCart, unique: false}})
Product.belongsToMany(User,{through: {model: ShoppingCart, unique: false}})

Product.hasOne(ShoppingCart)
// JOE_CR: This association just feels wrong semantically even though it does model the information correctly.
// I feel like "ShoppingCart" model would be more accurately described as "ShoppingCartItem".
ShoppingCart.belongsTo(Product)

Product.belongsToMany(Category, {through: 'ProductsToCategories'})
Category.belongsToMany(Product, {through: 'ProductsToCategories'})


module.exports = {
  db,
  models: {
    User,
    Product,
    ShoppingCart,
    Category
  },
}
