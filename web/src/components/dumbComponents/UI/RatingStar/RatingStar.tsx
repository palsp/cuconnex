import React, { useEffect } from "react";
import { Rating } from "@material-ui/lab";
import { withStyles } from "@material-ui/core/styles";

interface Props {
  ratedStarHandler: (e: number | null) => void;
}

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

const RatingStar: React.FC<Props> = (props) => {
  const [value, setValue] = React.useState<number | null>(0);
  const [hover, setHover] = React.useState(-1);

  const onChangehandler = (
    event: React.ChangeEvent<any>,
    value: number | null
  ) => {
    console.log("Value at RatingStar: ", value);
    setValue(value);
    props.ratedStarHandler(value);
  };

  return (
    <div>
      <StyledRating
        name="userRating"
        size="large"
        value={value}
        precision={0.5}
        onChange={onChangehandler}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
    </div>
  );
};

export default RatingStar;
