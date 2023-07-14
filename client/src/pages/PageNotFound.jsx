import React from "react";
import Layout from "../components/Layouts/Layout";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Layout title={"Go Back - 404 NOT FOUND"}>
      <div className="d-grid grid-template-coloums pt-5 ">
        <div>PageNotFound</div>
        <h1>Page Not Found - 404</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
      <Link to="/" className="btn btn-primary">
        Go Back
      </Link>
    </Layout>
  );
};

export default PageNotFound;
