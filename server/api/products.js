const productRouter = require('express').Router()
const { models: { Product }} = require('../db');


// ALL ROUTES MOUNTED ON /api/products

//  Dry Route Syntax. Combined all routes with '/:id' using .route() funciton

productRouter.route('/')
.get(async (req, res, next) => {
  try {
     res.send(await Product.getAllProducts())
  } catch(error) {
    next(error)
  }
})
.post(async (req, res, next) => {
  try {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!THIS IS THE BODY', req.body)
    res.send(await Product.addProduct(req.body))
  } catch(error) {
    next(error)
  }
})
.put(async(req, res, next) => {
  try {
    res.send(await Product.updadteProduct(req.body))
  } catch(error) {
    next(error)
  }


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
})


module.exports = productRouter;
