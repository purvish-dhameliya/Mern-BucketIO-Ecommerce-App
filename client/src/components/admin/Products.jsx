import React, { useEffect, useState } from "react";
import AdminMenu from "../Layouts/AdminMenu";
import Layout from "../Layouts/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [product, setProduct] = useState([]);

  // get products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      if (data.success) {
        setProduct(data.product);
        console.log("products:::", data);
      } else {
        toast.error("error in product fetch");
      }
    } catch (error) {
      console.log(error);
      toast.error("error while getting Product..");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout title={"Products | Bucket.co"}>
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All product List </h1>
            <div className="d-flex flex-wrap justify-content-center text-start">
              {product?.map((pro) => (
                <Link
                  key={pro._id}
                  to={`/dashboard/admin/product/${pro.slug}`}
                  className="product-link"
                >
                  <div
                    className="card m-1 showingCard"
                    style={{ width: "18rem" }}
                    key={pro._id}
                  >
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${pro._id}`}
                      className="card-img-top p-4 img-responsive"
                      height={"200px"}
                      alt={pro.name}
                    />
                    <div className="card-body p-2 text-center ">
                      <h5 className="card-title">{pro.name}</h5>
                      <p className="card-text">{pro.description}</p>
                      <p className="card-text">₹ {pro.price}</p>
                      <p className="card-text">available: {pro.quantity}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
