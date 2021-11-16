const router = require('express').Router()

router.use('/products', require('./products'))

router.use('/users', require('./users'))

router.use('/shoppingCart', require('./shoppingCart'))

router.use('/category' , require('./category'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
