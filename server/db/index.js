//this is the access point for all things database related!

const db = require('./db')

const Product = require('./models/Product')
const User = require('./models/User')
const ShoppingCart = require('./models/ShoppingCart')
const Category = require('./models/Categories')

//associations could go here!

User.belongsToMany(Product,{through: {model: ShoppingCart, unique: false}})
Product.belongsToMany(User,{through: {model: ShoppingCart, unique: false}})

Product.hasOne(ShoppingCart)
ShoppingCart.belongsTo(Product)

Product.belongsToMany(Category, {through: 'ProductsToCategories'})
Category.belongsToMany(Product, {through: 'ProductsToCategories'})

Product.fetchHistoryOrCart = async (path, userId) => {
  const type = path === 'history' ? true : false;

  const cart = await Product.findAll({
    include: {model: ShoppingCart, where: {
      userId: userId,
      purchased: type
    }},
  })

  return cart
}



module.exports = {
  db,
  models: {
    User,
    Product,
    ShoppingCart,
    Category
  },
}
