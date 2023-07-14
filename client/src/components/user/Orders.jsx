import React, { useEffect, useState } from "react";
import Layout from "../Layouts/Layout";
import UserMenu from "../Layouts/UserMenu";
import axios from "axios";
import { useAuth } from "../context/auth";
import moment from "moment";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title={"Orders | Bucket.co"}>
      <div className="container-fluid p-3 mt-4">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center ">All Orders</h1>
            {orders?.map((od, i) => {
              return (
                <div className="border">
                  <table className="table" key={i}>
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col"> date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{od?.status}</td>
                        <td>{od?.buyer?.name}</td>
                        <td>{moment(od?.createAt).fromNow()}</td>
                        <td>{od?.payment.success ? "Success" : "Failed"}</td>
                        <td>{od?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {od?.products?.map((p, i) => (
                      <div
                        className="row mb-2 p-3 card d-flex flex-column align-items-center"
                        key={p._id}
                      >
                        <div className="col-md-5">
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top img-responsive"
                            alt={p.name}
                            width="240px"
                            height={"240px"}
                          />
                        </div>
                        <div className="col-md-7">
                          <p>{p.name}</p>
                          <p>{p.description.substring(0, 30)}</p>
                          <p>Price : {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
