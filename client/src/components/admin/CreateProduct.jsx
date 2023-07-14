import React, { useEffect, useState } from "react";
import Layout from "../Layouts/Layout";
import AdminMenu from "../Layouts/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
const Option = { Select };

const CreateProduct = () => {
  const navigate = useNavigate();
  const [Categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(false);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data.success) {
        setCategories(data.category);
        console.log(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in get all categories..");
    }
  };

  // handle create product
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("photo", photo);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("shipping", shipping);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast?.success(data.message);
        navigate("/dashboard/admin/products");
        setPhoto("");
        setName("");
        setPrice("");
        setQuantity("");
        setShipping("");
        setDescription("");
      } else {
        toast?.error("Product is not created..");
      }
    } catch (error) {
      console.log(error);
      toast.error("error while create Product..");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title={"create Product | Bucket.co"}>
      <div className="container-fluid mt-5">
  <div className="row">
    <div className="col-md-3">
      <AdminMenu />
    </div>
    <div className="col-md-9">
      <h1>Create Product</h1>
      <div className="m-1 w-100 my-auto">
        <div className="row">
          <div className="col-md-6 mb-2">
            <Select
              bordered={false}
              placeholder="Select category"
              size="small" // smaller size
              showSearch
              className="form-select"
              onChange={(value) => {
                setCategory(value);
              }}
            >
              {Categories?.map((c) => (
                <Option key={c.id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
          </div>
          <div className="col-md-6 mb-2">
            <label className="btn btn-outline-dark col-md-12">
              {photo ? photo.name : "Upload Photo"}
              <input
                type="file"
                name="photo"
                accept="image/*"
                id=""
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            {photo && (
              <div className="text-start">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product_photo"
                  height={"200px"}
                  className="img img-responsive p-1"
                />
              </div>
            )}
          </div>
          <div className="col-md-6 mb-3 mt-2">
            <input
              type="text"
              value={name}
              placeholder="Write a name"
              className="form-control"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <textarea
              type="text"
              value={description}
              placeholder="Write a Description"
              className="form-control"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className="col-md-6 mb-3">
            <input
              type="number"
              value={price}
              placeholder="Enter product Price"
              className="form-control"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              type="number"
              value={quantity}
              placeholder="Enter Product Quantity"
              className="form-control"
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
          </div>
          <div className="col-md-6 mb-3">
            <Select
              bordered={false}
              placeholder="Select Shipping"
              size="small" // smaller size
              showSearch
              className="form-select"
              onChange={(value) => {
                setShipping(value);
              }}
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <button
              className="btn btn-success btn-sm mt-2"
              onClick={handleCreateProduct}
            >
             <BiPlus size={"25px"}/> Create Product
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </Layout>
  );
};

export default CreateProduct;
