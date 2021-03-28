import "./Toggles.css";
import React from "react";
import Toggle from 'react-toggle'
const Toggles: React.FC = () => {
  return (
    <div>
      <Toggle
      icons={false}
      defaultChecked={true}
      className="thisToggle"
      ></Toggle>
    </div>
  );
};

export default Toggles;
