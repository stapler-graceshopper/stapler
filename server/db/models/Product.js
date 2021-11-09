const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { Switch } = require("react-router");

const Product = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  description: {
    type: Sequelize.TEXT,
  },

  imgUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://www.google.com/imgres?imgurl=https%3A%2F%2Fi5.walmartimages.com%2Fasr%2F4182b507-3510-472d-bbcf-b9b1fa2683a4.d61796fa6f1dcddf3bf27a8defae4ca9.jpeg%3FodnHeight%3D372%26odnWidth%3D372%26odnBg%3DFFFFFF&imgrefurl=https%3A%2F%2Fwww.walmart.com%2Fip%2FArrow-T50AC-Electric-Staple-Gun-and-Nailer%2F47707242&tbnid=0oGwe61uyBAGhM&vet=12ahUKEwjQhqag0Yv0AhUR81MKHWAOAXEQMygLegUIARCuAQ..i&docid=bSmNlkqsaOXD9M&w=372&h=372&q=hardcore%20stapler%20images&ved=2ahUKEwjQhqag0Yv0AhUR81MKHWAOAXEQMygLegUIARCuAQ",
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

//THIS IS BOTH ADD AND EDIT A PRODUCT
Product.editProduct = async (id, data) => {
  const prodToBeUpdated =  await Product.findByPk(id);
  if(prodToBeUpdated){
    await prodToBeUpdated.update(data);
    return prodToBeUpdated
  }
  const addedProduct = await Product.create(data)
  return addedProduct;
}

module.exports = Product;
