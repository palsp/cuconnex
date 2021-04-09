import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "../Icons";
const Hamburger: React.FC = () => {
  return (
    <div>
      <svg viewBox="0 0 100 80" width="40" height="43">
        <rect width="80" height="10"></rect>
        <rect y="30" width="80" height="10"></rect>
        <rect y="60" width="80" height="10"></rect>
      </svg>
    </div>
  );
};

export default Hamburger;
