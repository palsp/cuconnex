import React from "react";
import { Checkbox } from "@material-ui/core";
import { CircleUnFilled, CircleFilled } from "@icons/index";

const CheckBox: React.FC = () => {
  return <Checkbox icon={<CircleUnFilled />} checkedIcon={<CircleFilled />} />;
};

export default CheckBox;
