import React from "react";
import { Checkbox } from "@material-ui/core";
import { CircleUnFilled, CircleFilled } from "@icons/index";

const CheckBox: React.FC = () => {
  return (
    <div>
      <Checkbox icon={<CircleUnFilled />} checkedIcon={<CircleFilled />} />
    </div>
  );
};

export default CheckBox;
