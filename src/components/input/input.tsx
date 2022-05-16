import React from "react";

const Input: React.FC = ({ children, ...inputProps }) => {
  return <input {...inputProps}>{children}</input>;
};

export { Input };
