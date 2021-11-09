const productRouter = require('express').Router()
const { models: { Product }} = require('../db');
const { getAllProducts } = require('../db/models/Product');


// ALL ROUTES MOUNTED ON /products


productRouter.get('/', (req, res, next) => {
  try {
    res.send(Product.getAllProducts())
  } catch(error) {
    next(error)
  }
  // res.send('hello world')
})

//  Dry Route Syntax. Combined all routes with '/:id' using .route() funciton

productRouter.route('/:id')
  .get((req, res, next) => {
    try {
      res.send(Product.getProduct(req.params.id))
    } catch(error) {
      next(error)
    }
  })
  .delete((req, res, next) => {
    try {
      res.send(Product.removeProduct(req.params.id,))
    } catch(error) {
      next(error)
    }
  })
  .post((req, res, next) => {
    try {
      res.send(Product.editProduct(req.params.id, req.body))
    } catch(error) {
      next(error)
    }
    })
  .put((req, res, next) => {
    try {
      res.send(Product.editProduct(req.params.id, req.body))
    } catch(error) {
      next(error)
    }
})


module.exports = productRouter;
