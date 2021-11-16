const Sequelize = require('sequelize')
const db = require('../db')


const ShoppingCart = db.define('shoppingCart', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      notEmpty: true
    }
  },
  purchaseDate: {
    type: Sequelize.DATE,
  },
  purchasePrice: {
    type: Sequelize.FLOAT
  },
  purchased: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = ShoppingCart
