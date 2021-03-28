import React, { useState } from "react";
import Background from "../../components/dumbComponents/UI/Background/Background";
import classes from "./LandingPage.module.css";
import LandingHeader from "./Sections/LandingHeader";
import LandingHero from "./Sections/LandingHero";
import SettingPrompt from "./SettingPrompt/SettingPrompt";
const LandingPage: React.FC = () => {
  const [clickHamburger, setClickHamburger] = useState(false);
  let LandingPrompt = null;
  if (!clickHamburger) {
    LandingPrompt = (
      <div className={classes.flexdiv}>
        <div className={classes.main}>
          <div className={classes.background}>
            <Background />
          </div>
          <div className={classes.flexDiv}>
            <div className={classes.container}>
              <div className={classes.headerDiv}>
                <LandingHeader />
              </div>
              <div>
                <LandingHero />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div>{LandingPrompt}</div>;
};

export default LandingPage;
