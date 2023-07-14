import React from "react";

const Mylabel = ({ label, className, id }) => {
  return (
    <>
      <label className={className} id={id}>
        {label}
      </label>
    </>
  );
};

export default Mylabel;
