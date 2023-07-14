import React, { useEffect, useState } from "react";
import Layout from "../Layouts/Layout";
import { toast } from "react-toastify";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import Mybutton from "../Reusables/Mybutton";
import Myinputs from "../Reusables/Myinputs";
import { useAuth } from "../context/auth";
import UserMenu from "../Layouts/UserMenu";
import { BiEdit } from "react-icons/bi";

const Profile = () => {
  //const navigate = useNavigate();
  //context
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const { name, email, phone, address, password } = auth?.user || {};
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
    setPassword(password);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, phone, password, address }
      );
      if (data?.error) {
        toast.error(data?.message);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let Lstorage = localStorage.getItem("auth");
        let ls = JSON.parse(Lstorage);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong..");
    }
  };

  return (
    <Layout title={"Profile | Bucket.co "}>
      <div className="container-fluid p-3 mt-4">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="container-fluid mt-5">
              <div className="row border-1">
                <h2>USER PROFILE</h2>
                <div className="col-md-6 mx-auto">
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
                        disabled
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

                    <div className="mb-3 d-grid">
                      <div className="d-flex flex-column">
                        <Mybutton
                          type="submit"
                          className="btn btn-sm btn-primary"
                          buttonText="Update"
                          icon= {<BiEdit/>}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
