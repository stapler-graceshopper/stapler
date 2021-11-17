const router = require("express").Router();
const {
  models: { Product, ShoppingCart },
} = require("../db");
const { requireToken } = require("./gatekeepingMiddleware");

// Routes for /api/shoppingcart

router.get("/", requireToken, async (req, res, next) => {
  try {
    const cart = await Product.fetchHistoryOrCart("cart", req.user.id);

    res.json(cart);
  } catch (err) {
    next(err);
  }
});

// Routes for /api/shoppingcart/history

router.get("/history", requireToken, async (req, res, next) => {
  try {
    const history = await Product.fetchHistoryOrCart("history", req.user.id);

    res.json(history);
  } catch (err) {
    next(err);
  }
});

router.put("/checkout", requireToken, async (req, res, next) => {
  try {
    const itemsInCart = await Product.fetchHistoryOrCart("cart", req.user.id);

    itemsInCart.forEach(async product => {
      const newQty = product.quantity - product.shoppingCart.quantity;
      const date = Date.now();

      await product.update({ quantity: newQty });
      await product.shoppingCart.update({
        purchased: true,
        purchasePrice: product.price,
        purchaseDate: date,
      });
    });

    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
});

router.put("/guestCheckout", async (req, res, next) => {
  try {
    const itemsInCart = req.body;

    itemsInCart.forEach(async item => {
      const fetchItem = await Product.findByPk(item.id);
      const newQty = item.quantity - item.shoppingCart.quantity;

      await fetchItem.update({ quantity: newQty });
    });

    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
});

//slug is id of product
router
  .route("/:id")
  .post(requireToken, async (req, res, next) => {
    try {
      const addedItem = await ShoppingCart.create({
        userId: req.user.id,
        productId: req.params.id,
        quantity: req.body.quantity,
      });

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
          purchased: false,
        },
      });

      itemInCart.destroy();

      res.status(202).send("Product removed from user");
    } catch (error) {
      next(error);
    }
  })
  .put(requireToken, async (req, res, next) => {
    try {
      const itemInCart = await ShoppingCart.findOne({
        where: {
          userId: req.user.id,
          productId: req.params.id,
          purchased: false,
        },
      });

      const updatedItemInCart = await itemInCart.update({
        quantity: req.body.quantity,
      });

      res.send(updatedItemInCart);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
