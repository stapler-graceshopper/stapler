const router = require("express").Router();
const {
  models: { User, Product, ShoppingCart },
} = require("../db");
const { requireToken, isAdmin } = require("./gatekeepingMiddleware");

// Routes for /api/shoppingcart

router.get("/", requireToken, async (req, res, next) => {
  try {
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

//update by unique id-----
router.put('/checkout', requireToken, async (req,res,next) => {
  try {
    const itemsInCart = await User.findOne({
      include: [{ model: Product }],
      where: {
        id: req.user.id,
      },
    });

    console.log(itemsInCart)

    purchasedItems = itemsInCart.products.filter(product => product.shoppingCart.purchased === false)

    purchasedItems.forEach(async product => {
      const newQty = product.quantity - product.shoppingCart.quantity;

      await product.update({quantity: newQty})
      await product.shoppingCart.update({purchased: true})
    })

    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

//slug is id of product
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
      const user = await User.findByPk(req.user.id);
      const product = await Product.findByPk(req.params.id);

      await user.removeProduct(product);

      res.status(202).send("Product removed from user");
    } catch (error) {
      next(error);
    }
  })//update by unique id-----
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
