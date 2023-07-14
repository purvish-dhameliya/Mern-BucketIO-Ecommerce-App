import React from "react";
import { BiPlus } from "react-icons/bi";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 col-12 mx-auto d-flex">
          <div className="col-md-8">
            <input
              className="form-control"
              size={"30px"}
              type="text"
              placeholder="Enter Category Name..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div className="col-md-4 d-flex flex-start ms-3">
            <button type="submit" className="btn btn-sm btn-outline-success">
            <BiPlus size={"25px"}/>  Create category
            </button>
          </div>
        </div>

      </form>
    </>
  );
};

export default CategoryForm;
