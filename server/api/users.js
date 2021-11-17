const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const { requireToken, isAdmin } = require("./gatekeepingMiddleware");

router.get("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username", "email", "type", "image", "address"],
    });
    users.sort((a,b)=>(a.id > b.id ? 1 : -1))
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', requireToken, isAdmin, async(req, res, next) => {
  try {
    const user = await User.findOne({
      where: {id: req.params.id},
      attributes: ["id", "username", "email", "type", "image", "address"]
    })
    if(user) {
      res.send(user)
    } else {
      res.sendStatus(400)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/byToken', requireToken, async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const user = await User.findByToken(token)
    const updatedUser = await user.update(req.body)
    res.send(updatedUser)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', requireToken, isAdmin, async(req, res, next) => {
  try {
    const {username, email, address} = req.body
    const user = await User.findByPk(req.params.id)
    if (user.type !== 'admin') {
      const update = {
        username,
        email,
        address
      }
      await user.update(update)
      const updatedUser = await User.findOne({
        where: {id: req.params.id},
        attributes: ["id", "username", "email", "type", "image", "address"]
      })
      res.send(updatedUser)
    } else {
      res.sendStatus(400)
    }
  } catch (error) {
    next (error)
  }
})

router.delete('/:id', requireToken, isAdmin, async(req, res, next) => {
  try {

    const user = await User.findByPk(req.params.id)
    console.log('USER: ', user)
    if (user.type !== 'admin') {
      await user.destroy()
      res.sendStatus(202)
    } else {
      res.sendStatus(400)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router;
