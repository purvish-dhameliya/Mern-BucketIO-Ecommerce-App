import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <div className="footer bg-light text-light bg-dark">
      <hr />
      <p className="text-center">
        All rights Reserved &copy;purvish B. dhameliya ,{currentYear}
      </p>
      <div className="d-flex justify-content-center align-items-center gap-2">
        <Link to="/about" className="nav-link">
          About
        </Link>{" "}
        ||
        <Link to="/contact" className="nav-link">
          Contact{" "}
        </Link>{" "}
        ||
        <Link to="/policy" className="nav-link">
          Policy{" "}
        </Link>
      </div>
      <hr />
    </div>
  );
};

export default Footer;
