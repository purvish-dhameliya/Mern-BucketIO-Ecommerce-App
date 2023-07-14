import React from "react";

const Mybutton = ({ type, className, onClick, buttonText,  },{...props}) => {
  return (
    <>
      <button type={type} className={className} onClick={onClick} {...props}>
        {buttonText}
      </button>
    </>
  );
};

export default Mybutton;
