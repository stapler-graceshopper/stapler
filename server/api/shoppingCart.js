const router = require("express").Router();
const {
  models: { User, Product, ShoppingCart },
} = require("../db");
const { requireToken, isAdmin } = require("./gatekeepingMiddleware");

// Routes for /api/shoppingcart

router.get("/", requireToken, async (req, res, next) => {
  try {
    const cart = await User.findOne({
      include: { model: Product },
      where: {
        id: req.user.id,
      },
    });

    const itemInCart = cart.products.filter(product => product.shoppingCart.purchased === false)

    res.json(itemInCart);
  } catch (err) {
    next(err);
  }
});

//slug is id of product
router.route("/:id")
  .post(requireToken, async (req, res, next) => {
    try {
      const user = await User.findByPk(req.user.id);
      const product = await Product.findByPk(req.params.id);
      let updatedItem;

      const [itemInCart, itemCreated] = await ShoppingCart.findOrCreate({
        where: {
          userId: req.user.id,
          productId: req.params.id,
        },
      });

      //make sure component updates on submit
      if (!itemCreated) {
        updatedItem = await itemInCart.update({
          quantity: itemInCart.quantity + Number(req.body.quantity),
        });
      } else {
        await user.addProduct(product);
        updatedItem = await itemInCart.update({
          quantity: Number(req.body.quantity),
        });
      }

      res.send(updatedItem);
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
  })
  .put(requireToken, async (req, res,next) => {
    try {
      const itemInCart = await ShoppingCart.findOne({
        where: {
          userId: req.user.id,
          productId: req.params.id,
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



// Routes for /api/shoppingcart/history

router.get("/history", requireToken, async (req, res, next) => {
  try {
    const cart = await User.findOne({
      include: { model: Product },
      where: {
        id: req.user.id,
      },
    });

    const history = cart.products.filter(product => product.shoppingCart.purchased === true)

    res.json(history);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
