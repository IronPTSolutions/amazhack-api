const Product = require("../models/Product.model");
const User= require("../models/User.model");

module.exports.list = (req, res, next) => {
  Product.find()
    .then((products) => {
      console.log(products)
      res.json(products);
    })
    .catch((e) => next(e));
};

module.exports.listUserProducts = (req, res, next) => {
  Product.find({"user":req.params.id})
  .then(user => {
    console.log(user)
    res.json(user)
  })
  .catch((e) => next(e));
}
