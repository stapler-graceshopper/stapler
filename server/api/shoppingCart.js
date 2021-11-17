const router = require("express").Router();
const {
  models: { Product, ShoppingCart },
} = require("../db");
const { requireToken } = require("./gatekeepingMiddleware");

// Routes for /api/shoppingcart

router.get("/", requireToken, async (req, res, next) => {
  try {
    // JOE_CR: Why start at Product and join ShoppingCart(Items)?
    // And not the other way around?
    const cart = await Product.findAll({
      include: {model: ShoppingCart, where: {
        userId: req.user.id,
        purchased: false
      }},
    })

    res.json(cart);
  } catch (err) {
    next(err);
  }
});

// Routes for /api/shoppingcart/history

// JOE_CR: This route and the route above do exactly the same thing.
router.get("/history", requireToken, async (req, res, next) => {
  try {
    const history = await Product.findAll({
      include: {model: ShoppingCart, where: {
        userId: req.user.id,
        purchased: true
      }},
    })

    res.json(history);
  } catch (err) {
    next(err);
  }
});


router.put('/checkout', requireToken, async (req,res,next) => {
  try {
    // JOE_CR: Since I know y'all are using class methods, and I've seen this exact query repeated 3 times
    // in this file ... make it a class method! :D
    const itemsInCart = await Product.findAll({
      include: {model: ShoppingCart, where: {
        userId: req.user.id,
        purchased: false
      }},
    })

    itemsInCart.forEach(async product => {
      // JOE_CR: Nice!
      const newQty = product.quantity - product.shoppingCart.quantity;
      const date = Date.now()

      await product.update({quantity: newQty})
      // JOE_CR: Nice job capturing the current price from the product.
      await product.shoppingCart.update({purchased: true, purchasePrice: product.price, purchaseDate: date})
    })

    // JOE_CR: Is this response generated once you know all of your DB records have been updated,
    // or before they are all updated?
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

//slug is id of product
// JOE_CR: Appreciate the comment that specifies what the URL param :id means,
// but I think the param itself should be more descriptive i.e. /:productId.
router.route("/:id")
  .post(requireToken, async (req, res, next) => {
    try {
      const addedItem = await ShoppingCart.create({
        userId: req.user.id,
        productId: req.params.id,
        quantity: req.body.quantity
      })

      res.send(addedItem);
    } catch (error) {
      next(error);
    }
  })
  .delete(requireToken, async (req, res, next) => {
    try {
      const itemInCart = await ShoppingCart.findOne({
        where: {
          userId: req.user.id,
          productId: req.params.id,
          purchased: false
        }
      })

      itemInCart.destroy();

      res.status(202).send("Product removed from user");
    } catch (error) {
      next(error);
    }
  })
  .put(requireToken, async (req, res,next) => {
    try {
      const itemInCart = await ShoppingCart.findOne({
        where: {
          userId: req.user.id,
          productId: req.params.id,
          purchased: false
        },
      })

      const updatedItemInCart = await itemInCart.update({
        quantity: req.body.quantity
      })

      res.send(updatedItemInCart);
    } catch (error) {
      next(error)
    }
  })





module.exports = router;
