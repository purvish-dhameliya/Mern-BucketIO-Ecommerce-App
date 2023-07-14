import React from "react";
import Layout from "../Layouts/Layout";
import AdminMenu from "../Layouts/AdminMenu";
import { useAuth } from "../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Admin dashboard | Bucket.co"}>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3 d-flex flex-direction-column align-items-start  ">
              <h6>Name : {auth?.user?.name}</h6>
              <h6>Email :{auth?.user?.email}</h6>
              <h6>Phone :{auth?.user?.phone}</h6>
              <h6>Address:{auth?.user?.address}</h6>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
