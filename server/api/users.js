const router = require('express').Router()
const { models: { User }} = require('../db')


const requireToken = async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    req.user = user;
    next();
  } catch (error) {
    next(error)
  }
};

router.get('/', requireToken, async (req, res, next) => {
  try {
    if(req.user.type === 'admin') {
      const users = await User.findAll({
        // explicitly select only the id and username fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['id', 'username', 'email', 'type', 'image', 'address']
      })
      res.json(users)
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
