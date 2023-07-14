import React from "react";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

import Layout from "../components/Layouts/Layout";
import contactus from "../images/contactt.jpg";

const Contact = () => {
  return (
    <Layout title={"Contact us | Bucket.co"}>
      <div className="container ">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <img
              src={contactus}
              alt="contactImg"
              width={"80%"}
              height={"80%"}
              className="img-responsive "
            />
          </div>
          <div className="col-md-6">
            <h1
              className="bg-dark p-2 text-white text-center"
              style={{
                boxShadow: "15px 22px 52px -14px rgba(0,0,0,0.83)",
                borderRadius: "7px",
              }}
            >
              CONTACT US
            </h1>
            <p className="text-justify mt-2">
              any query and info about prodduct feel free to call anytime we
              24X7 vaialible
            </p>
            <p className="mt-3">
              <BiMailSend /> : www.help@ecommerceapp.com
            </p>
            <p className="mt-3">
              <BiPhoneCall /> : 012-3456789
            </p>
            <p className="mt-3">
              <BiSupport /> : 1800-0000-0000 (toll free)
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
