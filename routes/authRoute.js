import express from "express";
import {
  forgetPasswordController,
  getAllOrdersController,
  getOrdersController,
  getuserController,
  loginController,
  orderStatusController,
  registerController,
  testController,
  updateProfileController,
  
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
const router = express.Router();

// register method post
router.post("/register", registerController);

// login method post
router.post("/login", loginController);

// forget password route || POST
router.post('/forgot-password', forgetPasswordController)

// requireSignIn
router.get("/test", requireSignIn, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// protected User profile route
router.put('/profile', requireSignIn , updateProfileController)

// user order
router.get('/orders', requireSignIn, getOrdersController)

router.get('/all-orders', requireSignIn, isAdmin,getAllOrdersController)

router.put('/order-status/:orderId', requireSignIn,isAdmin, orderStatusController)

router.get('/users',requireSignIn, isAdmin, getuserController);

export default router;
