import React from "react";
import classes from "./Blockchain.module.css";

const Blockchain: React.FC = () => {
  return (
    <div className={classes.Blockchain}>
      <svg
        id="fi_2592201"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            d="m52.237 123.342-17.935 4.658v256l221.698 128 221.698-128v-256l-17.935-4.658z"
            fill="#00b3fe"
          ></path>
          <path
            d="m256 123.342v388.658l221.698-128v-256l-17.935-4.658z"
            fill="#0274f9"
          ></path>
          <path
            d="m420.698 128-164.698 127.951-221.698-127.941v-.01l221.698-128z"
            fill="#01f5ff"
          ></path>
          <path
            d="m477.698 128v.01l-221.698 127.941v-255.951z"
            fill="#00b3fe"
          ></path>
        </g>
      </svg>
    </div>
  );
};

export default Blockchain;
