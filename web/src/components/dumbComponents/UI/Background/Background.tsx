import React from "react";
import classes from "./Background.module.css";

interface Props {
  heightStyle?: any;
  hasTeam?: boolean;
}

const defaultProps: Props = {
  heightStyle: { minHeight: "100%" },
  hasTeam: true,
};

const Background: React.FC<Props> = ({ children, heightStyle, hasTeam }) => {
  const style = hasTeam ? {} : heightStyle;
  return (
    <div className={classes.appBackground} style={style}>
      {children}
    </div>
  );
};

Background.defaultProps = defaultProps;

export default Background;
