import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Mybutton from "../../components/Reusables/Mybutton";
import Myinputs from "../../components/Reusables/Myinputs";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newpassword, setnewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        { email, newpassword, answer }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("please signup or register..");
    }
  };
  return (
    <Layout title={"forget password | Bucket.co"}>
      <div className="container mt-2 ">
        <div className="row border-1">
          <h2>RESET PASSWORD</h2>
          <div className="col-md-6 mx-auto mt-5">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <Myinputs
                  value={email}
                  type="email"
                  className="form-control"
                  placeholder="Enter your Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Myinputs
                  value={newpassword}
                  type="password"
                  className="form-control"
                  placeholder="Enter your Password"
                  onChange={(e) => setnewPassword(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="mb-3">
                <Myinputs
                  value={answer}
                  type="text"
                  className="form-control"
                  placeholder="which is your favorite sports?"
                  onChange={(e) => setAnswer(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <Mybutton
                type="submit"
                className="btn btn-primary"
                buttonText="forget Password"
              />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
