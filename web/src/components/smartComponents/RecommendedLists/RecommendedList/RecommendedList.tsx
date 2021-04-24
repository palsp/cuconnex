import React from "react";

import { ProfilePic } from "@smartComponents/index";
import { Heading, Subtitle, Username } from "@dumbComponents/UI/index";

import classes from "./RecommendedList.module.css";

interface Props {
  recommended: {
    name: string;
    image: any;
    friendof: string;
    role: string;
    year: number;
  };
}
const RecommendedList: React.FC<Props> = (props) => {
  return (
    <div className={classes.marg} data-test="recommended-list">
      <div className={classes.flex}>
        <div className={classes.marg}>
          <ProfilePic PicUrl={props.recommended.image} />
        </div>
        <div className={classes.titlePage}>
          <Username
            data-test="recommended-list-object-name"
            value={props.recommended ? props.recommended.name : "test-value"}
          />
        </div>
        <div className={classes.divUserInfo}>
          <Heading
            value={
              props.recommended
                ? `Friends of ${props.recommended.friendof}`
                : "test-value"
            }
            size="small"
          />
        </div>
        <div className={classes.divUserInfo}>
          <Subtitle
            value={props.recommended ? props.recommended.role : "test-value"}
          />
        </div>
      </div>
    </div>
  );
};

export default RecommendedList;
