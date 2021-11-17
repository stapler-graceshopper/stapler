const {
  models: { User },
} = require("../db");

//makes sure user is logged in
const requireToken = async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    // JOE_CR: I think you should check to see if you have a user here before continuing (i.e. calling next())
    // because this middleware is called *require*Token, and it seems to allow req.user to be set to null.
    req.user = user;
    next();
  } catch (error) {
    next(error)
  }
};

//makes sure user is an admin
const isAdmin = (req, res,next) => {
  // JOE_CR: This middleware assumes there will be a .user key on the req object,
  // so it MUST be used in conjunction with requireToken. Hopefully it is, but it should
  // also be defensive/ensure that req.user is there first before it tries to access
  // a property on it.
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
