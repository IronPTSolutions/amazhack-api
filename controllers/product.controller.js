const Product = require("../models/Product.model");
const User= require("../models/User.model");
const Review = require("../models/Review.model");
const createError = require("http-errors");

module.exports.list = (req, res, next) => {
  Product.find()
    .populate("reviews")
    .populate("user")
    .then((products) => {
      
      res.json(products);
    })
    .catch((e) => next(e));
};

module.exports.listUserProducts = (req, res, next) => {
  Product.find({"user":req.params.id})
  .then(user => {
    
    res.json(user)
  })
  .catch((e) => next(e));
}


module.exports.listOtherProducts = (req, res, next) => {
  Product.find({"user":{$ne: req.params.id}})
  .then(product => {
    
    res.json(product.reviews)
  })
  .catch((e) => next(e));
}
module.exports.searchProduct = (req, res, next) => {
  console.log(req.query.name)
  Product.find({'name': {$regex: req.query.name , $options: "i"}} )
  .then(product => {
      console.log(product)
    res.json(product)
  })
  .catch((e) => next(e));
}

module.exports.create = (req, res, next) => {
  const product = new Product({
    ...req.body,
    user: req.session.user.id,
  });
  product
    .save()
    .then((p) => {
      res.json(p);
    })
    .catch((e) => next(e));
};

module.exports.edit = (req, res, next) => {
  Product.findById(req.params.id)
    .then((p) => {
      if (p.user != req.currentUser.id) {
        throw createError(403, "You can't edit another user's products");
      } else {
        return p.update(req.body).then((editedProduct) => {
          res.json(editedProduct);
        });
      }
    })
    .catch((e) => next(e));
};

module.exports.delete = (req, res, next) => {
  Product.findById(req.params.id)
    .then((p) => {
      if (!p) {
        throw createError(404, "Product not found");
      } else {
        if (p.user != req.currentUser.id) {
          throw createError(
            403,
            "You cannot delete products that aren't yours"
          );
        } else {
          return p.delete().then(() => {
            return Review.remove({ product: p.id }).then((r) => {
              res.json({});
            });
          });
        }
      }
    })
    .catch((e) => next(e));
};

module.exports.createReview = (req, res, next) => {
  Product.findById(req.params.id)
    .then((p) => {
      if (!p) {
        throw createError(404, "Product not found");
      } else {
        if (p.user === req.currentUser.id) {
          throw createError(
            403,
            "You cannot leave reviews for your own product"
          );
        } else {
          const review = new Review({
            ...req.body,
            user: req.currentUser.id,
            product: p.id,
          });
          return review.save().then((r) => {
            res.json(r);
          });
        }
      }
    })
    .catch((e) => next(e));
};

module.exports.deleteReview = (req, res, next) => {
  Review.findById(req.params.id)
    .then((r) => {
      if (!r) {
        throw createError(404, "Review not found");
      } else {
        if (r.user != req.currentUser.id) {
          throw createError(403, "You cannot delete another user's reviews");
        } else {
          return r.delete().then((r) => {
            res.json({});
          });
        }
      }
    })
    .catch((e) => next(e));
};

