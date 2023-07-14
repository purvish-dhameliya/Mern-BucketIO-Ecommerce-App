import slugify from "slugify";
import ProductModel from "../models/ProductModel.js";
import CategoryModel from "../models/CategoryModel.js";
import fs from "fs";
import braintree from "braintree";
import dotenv from 'dotenv'
import OrderModel from "../models/OrderModel.js";

dotenv.config();
let gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "rbszqjjcvn3t4smv",
  publicKey: "dsdbrd2xhrqpdqxt",
  privateKey: "2281897a8015b4207381717c13649d0b",
});



// payment
// import stripe from "stripe";
// import { v4 as uuidv4 } from "uuid";

//let stripepay = new stripe(`${process.env.STRIPE_KEY}`);

// create product controller
export const createProductController = async (req, res) => {
  try {
    // its not write req.body because of express-formidable package which is handle upload file etc..
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    if (
      !name ||
      !description ||
      !price ||
      !quantity ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res
        .status(400)
        .send({ error: "Please provide all required fields." });
    }

    if (photo && photo.size > 5000000) {
      return res
        .status(400)
        .send({ error: "Photo is required and should be less than 5mb." });
    }

    const product = new ProductModel({
      name,
      slug: slugify(name),
      description,
      price,
      category,
      quantity,
      shipping,
    });

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();

    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Product creation failed",
      error,
    });
  }
};

// get product controller
export const getProductController = async (req, res) => {
  try {
    const product = await ProductModel.find({})
      .select("-photo")
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: product.length,
      message: "getting all product",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "get product error",
      error,
    });
  }
};

export const singleProductController = async (req, res) => {
  try {
    const product = await ProductModel.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    res.status(200).send({
      success: true,
      message: "single product selected",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "single product failed",
      error,
    });
  }
};

// photo controller
export const getPhotoProductController = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "get photos of products failed",
      error,
    });
  }
};

// delete product controller
export const deleteProductController = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.pid).select(
      "-photo"
    );
    res.status(200).send({
      success: true,
      message: "deleted successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      msg: "delete product failed",
    });
  }
};

// updateProductController
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    console.log("category-=-==-=-=-=-", req.fields.category);
    const { photo } = req.files;
    //alidation
    // switch (true) {
    //   case !name:
    //     return res.status(500).send({ error: "Name is Required" });
    //   case !description:
    //     return res.status(500).send({ error: "Description is Required" });
    //   case !price:
    //     return res.status(500).send({ error: "Price is Required" });
    //   case !category:
    //     return res.status(500).send({ error: "Category is Required" });
    //   case !quantity:
    //     return res.status(500).send({ error: "Quantity is Required" });
    //   case !shipping:
    //     return res.status(500).send({ error: "shipping is Required" });
    //   case photo && photo.size > 1000000:
    //     return res
    //       .status(500)
    //       .send({ error: "photo is Required and should be less then 1mb" });
    // }

    const products = await ProductModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    console.log("products=-=-=-=-", products);
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update product",
    });
  }
};

// filter controller

export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked.split(",");
    if (radio) {
      const [minPrice, maxPrice] = radio.split(",");
      args.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    }
    const products = await ProductModel.find(args);
    res.status(200).send({
      success: true,
      message: "Products filtered successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while filtering products",
      error,
    });
  }
};

// count product

export const productCountController = async (req, res) => {
  try {
    const total = await ProductModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      message: "count product success",
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Product count faild",
      error,
    });
  }
};

// product per page
export const productListController = async (req, res) => {
  try {
    const perPage = 4;
    const page = req.params.page ? req.params.page : 1;
    const products = await ProductModel.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "count product success",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "product list failed",
      error,
    });
  }
};

// search product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await ProductModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-photo");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "search product failed",
      error,
    });
  }
};

// similar product
export const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await ProductModel.find({
      category: cid,
      _id: { $ne: pid },
    })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

// product categorry controller
export const productCategoryController = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    const product = await ProductModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "category wise product fails",
      error,
    });
  }
};


export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

// payment gateway
export const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new OrderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
}







// payment stripePaymentController

// export const stripePaymentController = async (req, res) => {
//   try {
//     const { token, payment } = req.body;
//     const idempotencyKey = uuidv4();

//     const customer = await stripepay.customers.create({
//       email: token.email,
//       source: token.id
//     });

//     const charge = await stripepay.charges.create({
//       amount: payment * 100,
//       currency: 'usd',
//       customer: customer.id,
//       receipt_email: token.email
//     }, { idempotency_key: idempotencyKey });

//     res.status(200).json(charge);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({
//       success: false,
//       message: "Payment failed",
//       error
//     });
//   }
// };