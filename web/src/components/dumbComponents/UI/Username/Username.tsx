import React from "react";

interface Props {
  value: string;
}

const Username: React.FC<Props> = (props) => {
  return (
    <div data-test="usernameComponent">
      <p data-test="username-prop-value">{props.value}</p>
    </div>
  );
};

export default Username;
