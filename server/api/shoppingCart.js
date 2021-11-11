const router = require('express').Router()
const { models: { User, Product, ShoppingCart }} = require('../db')
const { requireToken, isAdmin } = require("./gatekeepingMiddleware");

//removed requireToken, will need it later
router.get('/', requireToken, async (req, res, next) => {
  try {
      const userProducts = await User.findOne({
        include: { model: Product },
        where: {
          id: req.user.id
        }
      })
      res.json(userProducts)
  } catch (err) {
    next(err)
  }
})

//slug is id of product
router.post('/:id', requireToken, async (req,res,next) => {
  try {
    const user = await User.findByPk(req.user.id)
    const product = await Product.findByPk(req.params.id)
    let updatedItem;


    const [itemInCart, itemCreated] = await ShoppingCart.findOrCreate({
      where: {
        userId: req.user.id,
        productId: req.params.id
      }
    })

    //make sure component updates on submit
    if (!itemCreated) {
      updatedItem = await itemInCart.update({quantity: itemInCart.quantity + Number(req.body.quantity)})
    } else {
        await user.addProduct(product)
        updatedItem = await itemInCart.update({quantity: Number(req.body.quantity)})
    }

    res.send(updatedItem);
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', requireToken, async (req,res,next) => {
  try {
    const user = await User.findByPk(req.user.id)
    const product = await Product.findByPk(req.params.id)

    await user.removeProduct(product)

    res.status(202).send('Product removed from user');
  } catch (error) {
    next(error)
  }
})


module.exports = router
