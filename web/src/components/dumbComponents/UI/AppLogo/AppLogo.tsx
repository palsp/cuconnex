import React from "react";
import CUConnexLogo from "../../../../assets/cuconnexLogo.png";
const AppLogo: React.FC = () => {
  return (
    <div>
      <img data-test="app-logo" src={CUConnexLogo} alt="CU CONNEX LOGO" />
    </div>
  );
};

export default AppLogo;
