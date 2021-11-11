const router = require('express').Router()
const { models: { User, Product }} = require('../db')

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
