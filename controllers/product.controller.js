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

module.exports.create = (req, res, next) => {
  const product = new Product({
    ...req.body,
    user: req.session.user.id
  });
  product
    .save()
    .then((p) => {
      res.json(p);
    })
    .catch((e) => next(e));
};
