const productRouter = require('express').Router()
const { models: { Product }} = require('../db');
const { getAllProducts } = require('../db/models/Product');


// ALL ROUTES MOUNTED ON /api/products


productRouter.route('/')
.get(async (req, res, next) => {
  try {
     res.send(await Product.getAllProducts())
  } catch(error) {
    next(error)
  }
})
.post(async(req, res, next) => {
  try {
    res.send(await Product.addProduct(req.body))
  } catch(error) {
    next(error)
  }
  })

//  Dry Route Syntax. Combined all routes with '/:id' using .route() funciton

productRouter.route('/:id')
  .get(async (req, res, next) => {
    try {
      res.send(await Product.getProduct(req.params.id))
    } catch(error) {
      next(error)
    }
  })
  .delete(async(req, res, next) => {
    try {
      res.send(await Product.removeProduct(req.params.id,))
    } catch(error) {
      next(error)
    }
  })
  .put(async(req, res, next) => {
    try {
      res.send(await Product.editProduct(req.params.id, req.body))
    } catch(error) {
      next(error)
    }
})


module.exports = productRouter;
