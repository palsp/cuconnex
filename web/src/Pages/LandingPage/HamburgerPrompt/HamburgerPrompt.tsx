import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import classes from "./HamburgerPrompt.module.css";
import { Heading } from "@dumbComponents/UI";
import { userLogoutAPI } from "@api/index";
import { AuthenticatedContext } from "@hooks/AuthenticatedContext";
import { UserContext } from "@context/UserContext";
import WaveCanvasBg from "@src/canvas/WaveCanvasBg";
const HamburgerPrompt: React.FC = () => {
  const [redirect, setRedirect] = useState<JSX.Element>();
  const { setIsAuthenticated } = useContext(AuthenticatedContext);
  const { userData, clearUserDataHandler } = useContext(UserContext);

  const logoutHandler = async () => {
    try {
      //clear cookie first
      await userLogoutAPI();
      //needs await and order is important here!!!
      clearUserDataHandler();
      await setRedirect(<Redirect to="/" />);
      setIsAuthenticated(false);

      console.log("LOGOUT");
    } catch (e) {
      console.log("FAILED loggingout", e);
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.waveBg}>
        <WaveCanvasBg
          width={window.innerWidth}
          height={window.innerHeight * 0.4}
        />
      </div>
      <Link style={{ textDecoration: "none" }} to="/myteams">
        <Heading value="My Teams" />
      </Link>
      <Link style={{ textDecoration: "none" }} to="/friendlists">
        <Heading value="My Connections" />
      </Link>
      <Link
        style={{ textDecoration: "none" }}
        to={{ pathname: "/profile", state: { users: userData } }}
      >
        <Heading value="Account Setting" />
      </Link>
      <div className={classes.logout} onClick={logoutHandler}>
        <Heading value="Log out" />
      </div>
      {redirect}
    </div>
  );
};

export default HamburgerPrompt;
