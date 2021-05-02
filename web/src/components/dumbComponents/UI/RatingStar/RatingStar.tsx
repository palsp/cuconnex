import React from "react";
import { Rating } from "@material-ui/lab";
import { withStyles } from "@material-ui/core/styles";

const StyledRating = withStyles({
  iconEmpty: {
    borderColor: "#F33182",
  },
  iconFilled: {
    //   color: "#ff6d75",
    color: "#F33182",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);

const RatingStar: React.FC = () => {
  const [value, setValue] = React.useState<number | null>(0);
  const [hover, setHover] = React.useState(-1);

  return (
    <div>
      <StyledRating
        size="large"
        value={value}
        precision={0.5}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
    </div>
  );
};

export default RatingStar;
