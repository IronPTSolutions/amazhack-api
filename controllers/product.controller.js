const Product = require("../models/Product.model");
const User= require("../models/User.model");

module.exports.list = (req, res, next) => {
  Product.find()
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
  .then(user => {
    
    res.json(user.reviews)
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
