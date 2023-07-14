import React from "react";

import Layout from "../components/Layouts/Layout";
import { useSearch } from "../components/context/search";
import AdminMenu from "../components/Layouts/AdminMenu";
import { useCart } from "../components/context/cart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BiCartAdd, BiInfoCircle } from "react-icons/bi";
const Search = () => {
  const [values] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  return (
    <Layout title={"Search results | Bucket.co"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="text-center">
              <h1>Search Resuts</h1>
              <h6>
                {values?.results.length < 1
                  ? "No Products Found"
                  : `Found ${values?.results.length}`}
              </h6>
              <div className="d-flex flex-wrap mt-4">
                {values?.results.map((p, index) => (
                  <div
                    className="card m-2"
                    style={{ width: "18rem" }}
                    key={`${p._id}-${index}`}
                  >
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top img-responsive"
                      alt={p.name}
                      width={"200px"}
                      height={"200px"}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">
                        {p.description.substring(0, 30)}...
                      </p>
                      <p className="card-text"> $ {p.price}</p>
                      <button
                        className="btn btn-sm btn-outline-info"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        {" "}
                        <BiInfoCircle size={"15px"} /> More Details
                      </button>
                      <button
                        className="btn btn-sm btn-success ms-1"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("add successfully");
                        }}
                      >
                        <BiCartAdd size={"25px"} /> ADD TO CART
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
