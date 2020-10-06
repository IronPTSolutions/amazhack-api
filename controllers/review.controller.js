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

module.exports.addReview = (req, res, next) => {

    const { title, description, score } = req.body;

    const review = new Review({
        title: title,
        description: description,
        score: score,
        user: req.session.user.id,
        product: req.params.id
    })
    review.save()
        .then(rev => res.json(rev))
        .catch((e) => next(e));
};

