import React, { useState } from "react";
import { Rating } from "@material-ui/lab";
import { withStyles } from "@material-ui/core/styles";
import { Rating as Rting } from "@pages/RatingPage/RatingPage";
import classes from "./RatingStar.module.css";

interface Props {
  ratedStarHandler: (e: number, key: number) => void;
  rating: Rting;
  index: number;
}

const RatingStar: React.FC<Props> = (props) => {
  const [score, setScore] = useState(props.rating.rating);
  const { rating, index, ratedStarHandler } = props;
  console.log("ratingStarindex", props.index);
  console.log(`rating start ${props.rating.ratingId}`);
  const onChangehandler = (value: string, index: number) => {
    console.log(`Value at RatingStar: ${index}`, value);
    const val = parseInt(value);
    props.ratedStarHandler(val, index);
  };

  const decreaseScore = () => {
    if (score <= 0) {
      return null;
    } else {
      setScore(score - 1);
      ratedStarHandler(score - 1, rating.ratingId);
    }
  };

  const increaseScore = () => {
    if (score >= 5) {
      return null;
    } else {
      setScore(score + 1);
      ratedStarHandler(score + 1, rating.ratingId);
    }
  };

  return (
    <div className={classes.counter}>
      <div className={classes.button} onClick={decreaseScore}>
        -
      </div>
      {score}
      <div className={classes.button} onClick={increaseScore}>
        +
      </div>
    </div>
  );
};

export default RatingStar;
