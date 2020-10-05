const createError = require("http-errors");
const User = require("../models/User.model");
const Product = require("../models/Product.model");

module.exports.list = (req, res, next) => {
    Review.find()
        .populate('user')
        .populate('product')
        .then((allReviews) => {
            res.json(allReviews);
        })
        .catch((e) => next(e));
};

