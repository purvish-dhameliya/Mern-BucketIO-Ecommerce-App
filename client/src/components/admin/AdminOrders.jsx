import React, { useEffect, useState } from "react";
import Layout from "../Layouts/Layout";
import AdminMenu from "../Layouts/AdminMenu";
import { useAuth } from "../context/auth";
import moment from "moment";

import axios from "axios";
import { Select } from "antd";

const { Option } = Select;

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);

  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        {
          status: value,
        }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Orders | Bucket.co">
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center mb-4">ALL ORDERS</h1>
            {orders.map((order, index) => (
              <div className="card mb-4" key={order._id}>
                <div className="card-body">
                  <h5 className="card-title mb-3">Order #{index + 1}</h5>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(order._id, value)}
                            defaultValue={order.status}
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{order.buyer.name}</td>
                        <td>{moment(order.createAt).fromNow()}</td>
                        <td>{order.payment.success ? "Success" : "Failed"}</td>
                        <td>{order.products.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {order.products.map((product) => (
                      <div
                        className="card mb-2 p-3 d-flex flex-wrap justify-items-center"
                        key={product._id}
                      >
                        <div className="col-md-12 d-flex flex rows">
                          <div>
                            <img
                              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                              className="card-img-top img-responsive "
                              alt={product.name}
                              height={"200px"}
                              width={"250px"}
                            />
                          </div>
                          <div className="d-flex flex-column ms-4 my-auto text-start">
                            <h6>{product.name}</h6>
                            <p>{product.description.substring(0, 30)}</p>
                            <p>Price: {product.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
