import React from "react";
import { useSearch } from "../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (keyword) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${keyword}`
      );
      setValues({ ...values, keyword, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const keyword = e.target.value;
    setValues({ ...values, keyword });
    handleSubmit(keyword);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(values.keyword);
    
  };

  return (
    <div>
      <form className="d-flex search-form" role="search" onSubmit={handleFormSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default SearchInput;
