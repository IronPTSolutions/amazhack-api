const createError = require("http-errors");
const { populate } = require("../models/User.model");
const User = require("../models/User.model");



module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw createError(400, "Missing credentials"); 
  }
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        throw createError(400, "Wrong credentials");
      } else {
        return user.checkPassword(password).then((match) => {
          if (!match) {
            throw createError(400, "Wrong credentials");
          } else {
            req.session.user = user;
            res.json(user);
          }
        });
      }
    })
    .catch((e) => next(e));
};

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  res.status(204).json();
}

module.exports.listUser = (req, res, next) => {
  const id = req.params.id;
 
  User.findById(id)
    .populate('products')
    .populate('reviews')
    .then((user) => {
    
     res.json(user)
    })
    .catch((e) => next(e));
};
