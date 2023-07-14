import React, { useEffect, useState } from "react";
import { Checkbox, Empty, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layouts/Layout";
import axios from "axios";
import { BiCartAdd, BiInfoCircle } from "react-icons/bi";
import { Prices } from "../components/Prices";
import { toast } from "react-toastify";
import { useCart } from "../components/context/cart";

const Home = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const filterProducts = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        {
          checked: checked.toString(),
          radio: radio.toString(),
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    filterProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, radio]);

  useEffect(() => {
    getAllCategory();
  }, []);

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleReset = () => {
    setChecked([]);
    setRadio("");
    getAllProducts();
    filterProducts();
  };

  return (
    <Layout title="Best Offers | Bucket.co">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 mt-5 border-end">
            <h5 className="text-start m-3">FILTER BY CATEGORY</h5>
            <div className="d-flex flex-column align-items-start p-2">
              {categories.map((category, indexx) => (
                <Checkbox
                  key={indexx}
                  onChange={(e) => handleFilter(e.target.checked, category._id)}
                >
                  {category.name}
                </Checkbox>
              ))}
            </div>

            <h5 className="mt-2 text-start m-2">FILTER BY PRICES</h5>
            <div className="align-items-center p-2 text-start">
              <Radio.Group
                onChange={(e) => setRadio(e.target.value)}
                className="d-flex flex-column"
              >
                {Prices?.map((price, idx) => (
                  <Radio key={idx} value={price.array}>
                    {price.name}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column">
              <button
                className="btn btn-sm btn-secondary"
                onClick={handleReset}
              >
                RESET
              </button>
            </div>
          </div>
          <div className="col-md-9">
            <h2 className="text-center m-3">ALL CATEGORY</h2>
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {products?.length > 0 ? (
                products?.map((product, inde) => (
                  <div
                    className="card m-1 showingCard bg-light text-dark"
                    style={{ width: "calc(30.33% - 1rem)" }}
                    key={inde}
                  >
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                      className="card-img-top p-4 img-responsive showingCard"
                      height={"200px"}
                      alt={product.name}
                    />
                    <div className="card-body p-2 text-center">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">
                        {product.description.substring(0, 30)}...
                      </p>
                      <p className="card-text">{`$ ${product.price}`}</p>
                      <p className="card-text">{`Available: ${product.quantity}`}</p>
                      <button
                        className="btn btn-sm btn-outline-info"
                        type="submit"
                        onClick={() => navigate(`/product/${product.slug}`)}
                      >
                        <BiInfoCircle size={"15px"} /> More details
                      </button>
                      <button
                        className="btn btn-sm btn-success ms-2"
                        type="submit"
                        onClick={() => {
                          setCart([...cart, product]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, product])
                          );
                          toast.success("add successfully");
                        }}
                      >
                        <BiCartAdd size={"25px"} /> Add to cart
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <Empty />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
