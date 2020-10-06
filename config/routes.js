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

// Products:
// List products as buyer
// This shouldn't return your own products if you have them
router.get('/product', productController.list);
//List the products a user is selling
router.get('/:id/product', productController.listUserProducts)
// List products as buyer
router.get('/:id/other-product', productController.listOtherProducts)

// Reviews
router.get('/reviews', reviewController.list)
