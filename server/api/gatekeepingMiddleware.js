const {
  models: { User },
} = require("../db");

//makes sure user is logged in
const requireToken = async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    req.user = user;
    next();
  } catch (error) {
    next(error)
  }
};

//makes sure user is an admin
const isAdmin = (req, res,next) => {
  if (req.user.type !== 'admin') {
    return res.sendStatus(403)
  } else {
    next()
  }
}

module.exports = {
  requireToken,
  isAdmin
}
