import React from "react";
import classes from "./Background.module.css";

interface Props {
  hasNav: boolean;
}

const Background: React.FC<Props> = ({ children, hasNav }) => {
  const height = hasNav ? `${window.innerHeight - 80}px` : window.innerHeight;
  return (
    <div className={classes.appBackground} style={{ minHeight: height }}>
      {children}
    </div>
  );
};

export default Background;
