import dotenv from "dotenv";
import express from "express";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";


import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from './routes/CategoryRoute.js'
import productRoute from './routes/ProductRoute.js'
// app
const app = express();
//configure
dotenv.config();
// datanbase config
connectDB();
// middleware
app.use(express.json());
app.use(cors())
app.use(morgan("dev"));


// routes
app.use("/api/v1/auth", authRoute);

// category
app.use("/api/v1/category", categoryRoute)

// product
app.use("/api/v1/product", productRoute)

// payment
//app.use("/api/v1/stripe", productRoute)

// port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `succussfully run on  ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
