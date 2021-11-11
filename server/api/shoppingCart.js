const router = require('express').Router()
const { models: { User, Product, ShoppingCart }} = require('../db')
const { requireToken, isAdmin } = require("./gatekeepingMiddleware");

//removed requireToken, will need it later
router.get('/', requireToken, async (req, res, next) => {
  try {
      const userProducts = await User.findOne({
        include: { model: Product },
        where: {
          id: req.user.id
        }
      })
      res.json(userProducts)
  } catch (err) {
    next(err)
  }
})

module.exports = router
