const router = require('express').Router()
const { models: { User, Product }} = require('../db')

// JOE_CR: This middleware function can be imported from a centralized source i.e. gatekeepingMiddleware.js
const requireToken = async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    req.user = user;
    next();
  } catch (error) {
    next(error)
  }
};

router.get('/', requireToken, async (req, res, next) => {
  try {
      // JOE_CR: Consider using `findByPk` instead of `findOne` since you are looking
      // for a record by its primary key.
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
