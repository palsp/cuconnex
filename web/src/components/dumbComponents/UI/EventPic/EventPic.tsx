import React, { SyntheticEvent } from "react";
import { AppLogo } from "..";
import tempEvent from "@assets/tempEvent.png";
import classes from "./EventPic.module.css";

interface Props {
  PicUrl?: string;
}

const EventPic: React.FC<Props> = (props) => {
  let eventCSS;
  eventCSS = [classes.defaultPic];
  if (props.PicUrl) {
    eventCSS = [classes.eventPic];
  }
  // const url = "https://www.cu-connex.com/api/users/" + props.PicUrl;
  const url = props.PicUrl;

  const imageErrorHandler = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = tempEvent;
  };
  return (
    <div className={classes.container}>
      <div className={eventCSS.join(" ")}>
        {props.PicUrl ? (
          <img
            src={url}
            className={classes.eventPic}
            onError={imageErrorHandler}
            alt="eventPic"
          />
        ) : (
          <div className={classes.defaultPic}></div>
        )}
      </div>
      {/* <div className={classes.triangle}></div> */}
    </div>
    // <div className={classes.eventPic}>
    //   <div className={classes.container}>
    //     <div className={classes.pic}></div>
    //     <div className={classes.triangle}></div>
    //   </div>
    // </div>
  );
};

export default EventPic;

{
  /* <div className={classes.TeamPic}>
<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
  width="137"
  height="150"
  fill="url(../../../../assets/tempProfile.png)"
>
  <g>
    <defs>
      <pattern
        id="fillImage"
        width="100%"
        height="100%"
        patternContentUnits="objectBoundingBox"
      >
        <image width="1" height="1"></image>
      </pattern>
    </defs>
    <path
      d="M -32.746 -16.311 C -32.15 -20.317 -29.624 -23.187 -26.697 -23.187 L 124.42 -23.187 C 128.339 -23.187 131.268 -18.151 130.469 -12.786 L 102.148 177.26 C 101.552 181.266 99.026 184.136 96.099 184.136 L -55.018 184.136 C -58.937 184.136 -61.866 179.1 -61.067 173.736 Z"
      fill="url(../../../../assets/tempProfile.png)"
    ></path>
  </g>
</svg>

</div> */
}
