import React from "react";
import Layout from "../Layouts/Layout";
import UserMenu from "../Layouts/UserMenu";
import { useAuth } from "../context/auth";

const DashBoard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard | Bucket.co"}>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>{auth?.user?.name}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashBoard;
