const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')
const baseController = require('../controllers/base.controller');
const userController = require('../controllers/user.controller');
const productController = require('../controllers/product.controller');
const reviewController = require('../controllers/review.controller');

module.exports = router;

router.get('/', authMiddleware.isNotAuthenticated, baseController.index)

// Authentication
router.post('/login', authMiddleware.isNotAuthenticated, userController.login)
router.get('/logout', authMiddleware.isAuthenticated, userController.logout)


// User:
router.get('/user/:id', authMiddleware.isAuthenticated, userController.listUser)

// Products:
// List products as buyer
// This shouldn't return your own products if you have them
router.get('/product', productController.list);
//List the products a user is selling
router.get('/:id/product', productController.listUserProducts)
// List products as buyer
router.get('/:id/other-product', productController.listOtherProducts)
//Search for products
router.get('/products/search', productController.searchProduct)


// Reviews
router.get('/reviews', reviewController.list)

//Add a review
router.post('/review/add/:id',  authMiddleware.isAuthenticated, reviewController.addReview)

//Delete a review you wrote
router.delete('/review/delete/:id',  authMiddleware.isAuthenticated, reviewController.deleteReview)

//Edit a review you wrote
router.patch('/review/edit/:id', authMiddleware.isAuthenticated, reviewController.updateReview)
