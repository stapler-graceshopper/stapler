const router = require('express').Router()
const {
  models: {Category},
} = require('../db')
const {requireToken, isAdmin} = require('./gatekeepingMiddleware')

// ALL ROUNTES MOUNTED ON /api/category

router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const allCategories = await Category.getAll()
    res.send(allCategories);
  } catch (error) {
    next(error)
  }
});

router.post('/:name', requireToken, isAdmin, async (req, res, next) => {
  try {
    await Category.create({name: req.params.name})
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

router.delete('/:name', requireToken, isAdmin, async (req, res, next) => {
  try {
    const categoryToDelete = await category.findOne({where: {name = req.params.name}})
    await Category.destroy(categoryToDelete)
  } catch (error) {
    next(error)
  }
});

module.exports = router
