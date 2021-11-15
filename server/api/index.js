const router = require('express').Router()

router.use('/products', require('./products'))

router.use('/users', require('./users'))

<<<<<<< HEAD
router.use('/cart', require('./cart'))
=======
router.use('/shoppingCart', require('./shoppingCart'))
>>>>>>> 124c90d63cdf40fff73ed693f29afce82791fb13

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
