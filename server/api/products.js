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

productRouter.get('/:id', (req, res, next) => {
  try {
    res.send(Product.getProduct(req.params.id))
  } catch(error) {
    next(error)
  }
})

productRouter.delete('/:id', (req, res, next) => {
  try {
    res.send(Product.removeProduct(req.params.id,))
  } catch(error) {
    next(error)
  }
})

productRouter.post('/:id', (req, res, next) => {
  try {
    res.send(Product.editProduct(req.params.id, req.body))
  } catch(error) {
    next(error)
  }
})

productRouter.put('/:id', (req, res, next) => {
  try {
    res.send(Product.editProduct(req.params.id, req.body))
  } catch(error) {
    next(error)
  }
})


module.exports = productRouter;
