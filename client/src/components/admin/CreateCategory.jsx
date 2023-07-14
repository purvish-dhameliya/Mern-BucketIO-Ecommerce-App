import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Modal } from "antd";

import AdminMenu from "../Layouts/AdminMenu";
import Layout from "../Layouts/Layout";
import CategoryForm from "../form/CategoryForm";
import { BiEdit, BiTrash } from "react-icons/bi";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const [isModelOpen, setIsModalOpen] = useState(false);
  const [selected, setselected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

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

  // delete category
  const handleDeleteCategory = async (cId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${cId}`
      );
      if (data.success) {
        toast.success(`${name} is deleted..`);
        getAllCategory()
      }
    } catch (error) {
      console.log(error);
      toast.error("delete failed..");
    } 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (data.success) {
        toast.success(`${name} is created..`);
        setName("")
        getAllCategory();
      } else {
        toast.error(data.category);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
       
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("No response from the server.");
      } else {
        toast.error("Something went wrong while creating the category.");
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${name} is updated..`);
        setselected(null);
        setUpdatedName("");
        setIsModalOpen(false);
        getAllCategory();
      }
    } catch (error) {
      toast.error("update failed..");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);


  return (
    <Layout title={"create category | Bucket.co"}>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-2 ">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-100">
              <table className="table table-hover">
                <thead>
                  <tr >
                    <th className="text-start" scope="col">Name</th>
                    <th className="text-center"scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr key={c._id}>
                        <td className="text-start"><h5>{c.name}</h5></td>
                        <td>
                          <button
                            className="btn btn-sm btn-warning"
                            onClick={() => {
                              setIsModalOpen(true);
                              setUpdatedName(c.name);
                              setselected(c);
                            }}
                          >
                           <BiEdit /> Edit category
                          </button>
                          <button
                            className="btn btn-sm  btn-outline-danger ms-3"
                            onClick={() => {
                              handleDeleteCategory(c._id);
                            }}
                          >
                           <BiTrash size={"20px"}/> Delete category
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setIsModalOpen(false)}
              footer={null}
              open={isModelOpen}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
