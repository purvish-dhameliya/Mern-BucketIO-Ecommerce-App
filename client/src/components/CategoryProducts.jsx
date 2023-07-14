
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "./Layouts/Layout";
import {CgSearchFound} from 'react-icons/cg'
import { BiInfoCircle } from "react-icons/bi";

const CategoryProducts = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getProductsbyCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.slug]);

  const getProductsbyCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.product);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Category Product | Bucket.co"}>
      <div className="container-fluid mt-3 category">
        <h4 className="text-center">category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found <CgSearchFound size={"25px"}/></h6>
        <div className="row">
          <div className="col-md-9 d-flex flex-column text-center align-items-center mx-auto">
            <div className="d-flex ">
              {products?.map((p) => (
                <div className="card m-2" key={p._id}>
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top p-4 img-responsive"
                    alt={p.name}
                    width={"400px"}
                    height={"200px"}
                  />
                  <div className="card-body">
                    <div className="card-name-price">
                      <h5 className="card-title">{p.name}</h5>
                      <h5 className="card-title card-price">
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </h5>
                    </div>
                    <p className="card-text ">
                      {p.description.substring(0, 60)}...
                    </p>
                    <div className="card-name-price">
                      <button
                        className="btn btn-sm btn-info text-light ms-1"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                       <BiInfoCircle size={"15px"}/> More Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProducts;
