const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { Switch } = require("react-router");

const defaultImageUrl = 'https://i5.walmartimages.com/asr/4182b507-3510-472d-bbcf-b9b1fa2683a4.d61796fa6f1dcddf3bf27a8defae4ca9.jpeg?odnHeight=372&odnWidth=372&odnBg=FFFFFF'


const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  description: {
    type: Sequelize.TEXT,
  },

  imgUrl: {
    type: Sequelize.TEXT,
    defaultValue:
     defaultImageUrl,
  },

  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      isNumeric: true,
    },
  },
  itemNumber: {
    type: Sequelize.INTEGER,
    validate: {
      isNumeric: true,
    },
  },

  inStock: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

Product.getAllProducts = async () => {
  const products = await Product.findAll();
  return products;
};

Product.getProduct = async (id) => {
  const product = await Product.findByPk(id);
  return product;
};

Product.removeProduct = async (id) => {
  const removedProduct = await Product.findByPk(id);
  await removedProduct.destroy();
  return removedProduct;
};

Product.addProduct = async (data) => {
  const addedProduct = await Product.create(data);
  return addedProduct
}

Product.updateProduct = async (data, id) => {
  const product = await Product.findByPk(id);
  const update = await product.update(data)
  return update
}

module.exports = Product;
