import express from "express";
import formidable from "express-formidable";

import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {
  brainTreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getPhotoProductController,
  getProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  realtedProductController,
  searchProductController,
  singleProductController,
 // stripePaymentController,
  updateProductController,
} from "../controllers/productController.js";

const router = express.Router();



// creat product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// get all product
router.get("/get-product", getProductController);

// get single product
router.get("/get-product/:slug", singleProductController);
export default router;

// get photo product
router.get("/product-photo/:pid", getPhotoProductController);

// delete product
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);

// update product

router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// filter route
router.post("/product-filters", productFiltersController);

// count product
router.get("/product-count", productCountController);

// product per page
router.get("/product-list/:page", productListController);

// search products
router.get("/search/:keyword", searchProductController);

// similar products
router.get("/related-product/:pid/:cid", realtedProductController);

// category wise products display
router.get('/product-category/:slug' , productCategoryController)


//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);



// token product stripe payment gateway
//router.post('/pay', stripePaymentController)