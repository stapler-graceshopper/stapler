const Sequelize = require("sequelize");
const db = require("../db");
const Category = require("./Categories");

// JOE_CR: This is a simple pattern but effective -- configure a large value independently here
// instead of embedding it in a more complicated object later on.
const defaultImageUrl = 'https://i5.walmartimages.com/asr/4182b507-3510-472d-bbcf-b9b1fa2683a4.d61796fa6f1dcddf3bf27a8defae4ca9.jpeg?odnHeight=372&odnWidth=372&odnBg=FFFFFF'

// JOE_CR: Great usage of extra validations on this model!
const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  description: {
    type: Sequelize.TEXT,
  },

  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
      isNumeric: true
    }
  },

  // JOE_CR: Maybe an "isUrl" validation can go here.
  imgUrl: {
    type: Sequelize.TEXT,
    defaultValue:
     defaultImageUrl,
  },

  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      isNumeric: true,
    },
  },

  // JOE_CR: What does this column mean?
  itemNumber: {
    type: Sequelize.INTEGER,
    validate: {
      isNumeric: true,
    },
  },
});

Product.getAllProducts = async () => {
  const products = await Product.findAll();
  products.sort((a,b)=>(a.id > b.id ? 1 : -1))
  return products;
};

// JOE_CR: Great usage of class methods across your models,
// but this one feels very useful especially.
Product.getByCategory = async (category) => {
  const products = await Product.findAll({
    include: {
      model: Category,
      where: {name: category}
    },
  })
  products.sort((a,b)=>(a.id > b.id ? 1 : -1))
  return products
}

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

Product.updateProduct = async (data) => {
  const product = await Product.findByPk(data.id);
  const update = await product.update(data)
  return update
}

module.exports = Product;
