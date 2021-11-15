const productRouter = require("express").Router();
const {
  models: { Product, User },
} = require("../db");
const {requireToken, isAdmin} = require('./gatekeepingMiddleware')

// ALL ROUTES MOUNTED ON /api/products

//  Dry Route Syntax. Combined all routes with '/:id' using .route() funciton


productRouter
  .route("/")
    .get(async (req, res, next) => {
      try {
        res.send(await Product.getAllProducts());
      } catch (error) {
        next(error);
      }
    })
    .post(requireToken, isAdmin, async (req, res, next) => {
      try {
        res.send(await Product.addProduct(req.body));
      } catch (error) {
        next(error);
      }
    })
    .put(requireToken, isAdmin, async (req, res, next) => {
      try {
        res.send(await Product.updateProduct(req.body));
      } catch (error) {
        next(error);
      }
    });

productRouter
  .route("/:id")
    .get(async (req, res, next) => {
      try {
        res.send(await Product.getProduct(req.params.id));
      } catch (error) {
        next(error);
      }
    })
    .delete(requireToken, isAdmin, async (req, res, next) => {
      try {
        res.send(await Product.removeProduct(req.params.id));
      } catch (error) {
        next(error);
      }
    });

module.exports = productRouter;
