const Sequelize = require("sequelize")
const db = require("../db")

const Category = db.define("category", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
})

//  Class methods for Api s

Category.getAll = async function () {
  const categories = await Category.findall();
  return categories;
}

Category.addCategory = async function(str) {
  await Category.create({name: str})
}

Category.removeCategory = async function(str) {
  const category = await category.findOne({where:{name: str}})
  await category.destroy()
}

// Hooks

const makeNameLowerCase = async (category) => {
  category.name = category.name.toLowerCase();
}

Category.beforeCreate(makeNameLowerCase)

module.exports = Category
