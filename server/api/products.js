const productRouter = require("express").Router();
const {
  models: { Product, User },
} = require("../db");

// ALL ROUTES MOUNTED ON /api/products

//  Dry Route Syntax. Combined all routes with '/:id' using .route() funciton

const requireToken = async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    req.user = user;
    next();
  } catch (error) {
    next(error)
  }
};

productRouter
  .route("/")
    .get(async (req, res, next) => {
      try {
        res.send(await Product.getAllProducts());
      } catch (error) {
        next(error);
      }
    })
    .post(requireToken, async (req, res, next) => {
      try {
        if (req.user.type === 'admin') {
        res.send(await Product.addProduct(req.body));
        } else {
          res.sendStatus(403)
        }
      } catch (error) {
        next(error);
      }
    })
    .put(requireToken, async (req, res, next) => {
      try {
        if (req.user.type === 'admin') {
        res.send(await Product.updateProduct(req.body));
        } else {
          res.sendStatus(403)
        }
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
    .delete(requireToken, async (req, res, next) => {
      try {
        if (req.user.type === 'admin') {
        res.send(await Product.removeProduct(req.params.id));
        } else {
          res.sendStatus(403)
        }
      } catch (error) {
        next(error);
      }
    });

module.exports = productRouter;
