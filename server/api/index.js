const router = require('express').Router()

router.use('/products', require('./products'))

router.use('/users', require('./users'))

<<<<<<< HEAD
router.use('/cart', require('./cart'))
=======
router.use('/shoppingCart', require('./shoppingCart'))
>>>>>>> 6040e7a924163f285a54900226ea57eb9ac938e3

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
