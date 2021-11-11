const Sequelize = require('sequelize')
const db = require('../db')


const ShoppingCart = db.define('shoppingCart', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0, //to do seed file should randomize this value
    validate: {
      notEmpty: true
    }
  }
})

module.exports = ShoppingCart
