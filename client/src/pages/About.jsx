import React from "react";
import Layout from "../components/Layouts/Layout";
import about from "../images/about.jpeg";
const About = () => {
  return (
    <Layout title={'About us | Bucket.co'}>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center  pt-5">
          <div className="col-md-6">
            <h1
              className="bg-dark p-2 text-light text-center"
              style={{
                boxShadow: "15px 22px 52px -14px rgba(0,0,0,0.83)",
                borderRadius: "7px",
              }}
            >
              About us
            </h1>
            <p className="mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam \
              rerum molestiae sunt, optio, suscipit voluptas deserunt, illum \
              quaerat dicta obcaecati quasi? Eligendi, veritatis! Deleniti \
              explicabo consequuntur, quibusdam quaerat optio culpa? Neque illum
              \ temporibus provident consectetur! Provident inventore, hic optio
              \ est laboriosam aliquid odio veniam, temporibus iusto ipsam rerum
              \ vel nobis assumenda quaerat facilis accusamus quis, consequuntur
              \ quisquam ex pariatur maxime!
            </p>
          </div>
          <div className="col-md-6 ">
            <img className='img-responsive' src={about} alt="contactImg" width={"80%"} height={"80%"} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
