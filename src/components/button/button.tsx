import React from "react";

const Button: React.FC = ({ children, ...buttonProps }) => {
  return <button {...buttonProps}>{children}</button>;
};

export { Button };
