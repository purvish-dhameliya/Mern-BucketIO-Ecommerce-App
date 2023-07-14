import React from "react";

const Myinputs = ({
  type,
  value,
  className,
  id,
  onChange,
  placeholder,
  required,
  autoComplete,
  disabled
}) => {
  return (
    <>
      <input
        autoComplete={autoComplete}
        type={type}
        className={className}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        value={value}
        disabled={disabled}
      />
    </>
  );
};

export default Myinputs;
