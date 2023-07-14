import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import Myinputs from "../../components/Reusables/Myinputs";
import { useNavigate } from "react-router-dom";
import Mybutton from "../../components/Reusables/Mybutton";
import { useAuth } from "../../components/context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("please signup or register..");
    }
  };

  return (
    <Layout title={"Login | Bucket.co"}>
      <div className="container mt-2 ">
        <div className="row border-1">
          <h2>Login User</h2>
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
                  value={password}
                  type="password"
                  className="form-control"
                  placeholder="Enter your Password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <Mybutton
                type="submit"
                className="btn btn-primary"
                buttonText="Submit"
              />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
