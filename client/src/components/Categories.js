import React from "react";
import { NavLink } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "./Layouts/Layout";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories | Bucket.co"}>
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row container">
          {categories.map((c,index) => (
            <div className="col-md-4 mt-5 mb-3 gx-3 gy-3 col-12" key={index}>
              <div className="card">
                <NavLink to={`/category/${c.slug}`} className="btn btn-sm cat-btn nav-link ">
                  {c.name}
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
