const createError = require("http-errors");
const Review = require("../models/Review.model");
const User = require("../models/User.model");
const Product = require("../models/Product.model");

module.exports.list = (req, res, next) => {
    Review.find()
/*         .populate('user')
        .populate('product') */
        .then((allReviews) => {
            console.log('allReviews', allReviews)
            res.json(allReviews);
        })
        .catch((e) => next(e));
};

