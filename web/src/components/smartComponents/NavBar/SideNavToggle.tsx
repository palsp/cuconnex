import React from "react";

import classes from "./SideNavToggle.module.css";

interface Props {
  toggleHamburger: boolean;
  setToggleHamburger: any;
}
const SideNavToggle: React.FC<Props> = (props) => {
  const SidNavClasses = [classes.SideNavToggle];
  if (props.toggleHamburger) {
    SidNavClasses.push(classes.Close);
  }

  return (
    <div className={SidNavClasses.join(" ")} onClick={props.setToggleHamburger}>
      {/* <input type="checkbox" /> */}
      <span className={classes.SideNavLine}></span>
      <span className={classes.SideNavLine}></span>
      <span className={classes.SideNavLine}></span>
    </div>
  );
};

export default SideNavToggle;
