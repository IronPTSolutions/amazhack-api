const Product = require("../models/Product.model");

module.exports.list = (req, res, next) => {
  Product.find()
    .populate("reviews")
    .populate("user")
    .then((products) => {
      res.json(products);
    })
    .catch((e) => next(e));
};
