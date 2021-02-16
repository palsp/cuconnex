import React from "react";

interface Props {
  children: string;
}

const Button: React.FC<Props> = (props) => {
  return <button>{props.children}</button>;
};

export default Button;
