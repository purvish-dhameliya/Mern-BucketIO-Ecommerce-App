import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";


//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
      const decode = JWT.verify(
          req.headers.authorization,
          process.env.JWT_SECRET
          );

          req.user = decode;
          console.log("DATA::",decode);
    next();
  } catch (error) {
    console.log("22::",error);
    res.status(401).send({
      success: false,
      error,
      message: "not to sign in ",
    });
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    console.log('req.user=-=-=-=-=-=-=-=-=-=', req.user)
    if (user.role!==1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
