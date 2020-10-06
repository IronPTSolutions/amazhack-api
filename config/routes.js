const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const baseController = require("../controllers/base.controller");
const userController = require("../controllers/user.controller");
const productController = require("../controllers/product.controller");

module.exports = router;

router.get("/", authMiddleware.isNotAuthenticated, baseController.index);

// Authentication
router.post("/login", authMiddleware.isNotAuthenticated, userController.login);
router.get("/logout", authMiddleware.isAuthenticated, userController.logout);

// Users
router.get("/user/:id", authMiddleware.isAuthenticated, userController.profile);

// Products
router.get("/product", authMiddleware.isAuthenticated, productController.list);
router.post(
  "/product",
  authMiddleware.isAuthenticated,
  productController.create
);
router.patch(
  "/product/:id",
  authMiddleware.isAuthenticated,
  productController.edit
);
router.delete(
  "/product/:id",
  authMiddleware.isAuthenticated,
  productController.delete
);

// Reviews
router.post("/product/:id/review", authMiddleware.isAuthenticated, productController.createReview)