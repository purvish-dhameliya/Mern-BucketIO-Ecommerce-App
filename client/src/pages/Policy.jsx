import React from "react";
import Layout from "../components/Layouts/Layout";
import policy from "../images/policy.jpg";
const Policy = () => {
  return (
    <Layout title={"Privacy Policy | Bucket.co"}>
      <div className="container">
        <div className="row contactus mt-3 pt-5 d-flex justify-content-center align-items-center">
          <div className="col-md-6 ">
            <img
              className="img-responsive"
              src={policy}
              alt="contactus"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-4">
            <p>add privacy policy</p>
            <p>add privacy policy</p>
            <p>add privacy policy</p>
            <p>add privacy policy</p>
            <p>add privacy policy</p>
            <p>add privacy policy</p>
            <p>add privacy policy</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
