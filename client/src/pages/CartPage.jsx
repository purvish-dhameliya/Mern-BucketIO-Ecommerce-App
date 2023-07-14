import React, { useEffect, useState } from "react";
import Layout from "../components/Layouts/Layout";

import { useCart } from "../components/context/cart";
import { useAuth } from "../components/context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import { Empty } from "antd";
import { IoMdRemove } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [instance, setInstance] = useState("");
  const navigate = useNavigate();

  // const handleToken = async (token) => {
  //   try {
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_API}/api/v1/stripe/pay`,
  //       {
  //         token: token,
  //         payment: totalPrice(),
  //       }
  //     );
  //     console.log(response.data);
  //     toast.success("payment successfull..");
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("payment failed..");
  //   }
  // };

  //get payment gateway token

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => (total = total + item.price));
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // delete product cart
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Your Cart - Bucket.co"}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h5 className="text-center mt-4">
              {cart?.length ? (
                `you have ${cart?.length} items in Cart  ${
                  auth?.token ? "" : "Please login to Checkout"
                }`
              ) : (
                <>
                  <Empty />
                </>
              )}
            </h5>
          </div>
        </div>
        <div className="row m-2">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div
                className="row card flex-row align-items-center m-3"
                key={p._id}
              >
                <div className="col-md-4">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="p-3 card-img-top ShadowImg img-responsive"
                    alt={p.name}
                    width="100%"
                    height={"200px"}
                  />
                </div>
                <div className="col-md-4 p-2">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price : {p.price}</p>
                </div>
                <div className="col-md-4 cart-remove-btn p-2 d-flex align-items-center">
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    <IoMdRemove /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 cart-summary ">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()} </h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    <BiEdit size={"20px"} /> Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    <BiEdit size={"20px"} /> Update Address
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    <BsPeople /> Plase Login to checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
