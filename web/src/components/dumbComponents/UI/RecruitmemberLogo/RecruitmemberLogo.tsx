import React from "react";
import recruitMemberLogo from "../../../../assets/Logo/recruitMemberLogo.png";

import classes from "./RecruitmemberLogo.module.css";

const RecruitMemberLogo: React.FC = () => {
  return (
    <div className={classes.main}>
      <img
        className={classes.appLogo}
        src={recruitMemberLogo}
        alt="RECRUIT MEMBER LOGO"
      />
      <div className={classes.space}>Create Team</div>
    </div>
  );
};

export default RecruitMemberLogo;
