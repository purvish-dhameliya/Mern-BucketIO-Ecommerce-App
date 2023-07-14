import React, { useState } from "react";
import Myinputs from "../../components/Reusables/Myinputs";
import Mybutton from "../../components/Reusables/Mybutton";
import Layout from "../../components/Layouts/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, phone, password, address, answer }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong..");
    }
  };

  return (
    <Layout title={"signUp Now | Bucket.co"}>
      <div className="container mt-2">
        <div className="row border-1">
          <h2>Registration</h2>
          <div className="col-md-6 mx-auto mt-5">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <Myinputs
                  value={name}
                  type="text"
                  className="form-control"
                  placeholder="Enter your Name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
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
              <div className="mb-3">
                <Myinputs
                  value={phone}
                  type="text"
                  className="form-control"
                  placeholder="Enter your Phone"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Myinputs
                  value={address}
                  type="text"
                  className="form-control"
                  placeholder="Enter your Address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <Myinputs
                  value={answer}
                  type="text"
                  className="form-control"
                  placeholder="what is your favorite sports?"
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </div>

              <div className="mb-3 d-grid">
                <div className="d-flex flex-column">
                  <Mybutton
                    type="submit"
                    className="btn btn-primary"
                    buttonText="SignUp"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
