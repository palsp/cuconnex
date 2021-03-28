import React from "react";
import recruitMemberLogo from "../../../../assets/Logo/recruitMemberLogo.png";

import classes from "./RecruitmemberLogo.module.css";

const RecruitMemberLogo: React.FC = () => {
  return (
    <div>
      <img
        className={classes.appLogo}
        src={recruitMemberLogo}
        alt="RECRUIT MEMBER LOGO"
      />
    </div>
  );
};

export default RecruitMemberLogo;
