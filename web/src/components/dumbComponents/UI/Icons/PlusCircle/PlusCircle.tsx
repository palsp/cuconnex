import React from "react";
import classes from "./PlusCircle.module.css";
const PlusCircle = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path
        d="M 2 12 C 2 6.477 6.477 2 12 2 C 17.523 2 22 6.477 22 12 C 22 17.523 17.523 22 12 22 C 6.477 22 2 17.523 2 12 Z"
        fill="transparent"
        stroke-width="2"
        stroke="rgb(0,0,0)"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-dasharray=""
      ></path>
      <path
        d="M 12 8 L 12 16 M 8 12 L 16 12"
        fill="transparent"
        stroke-width="2"
        stroke="rgb(0,0,0)"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-dasharray=""
      ></path>
    </svg>
  );
};

export default PlusCircle;
