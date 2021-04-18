import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import classes from "./HamburgerPrompt.module.css";
import { Heading } from "@dumbComponents/UI";
import { userLogoutAPI } from "@api/index";
import { AuthenticatedContext } from "@hooks/AuthenticatedContext";
const HamburgerPrompt: React.FC = () => {
  const [redirect, setRedirect] = useState<JSX.Element>();
  const { setIsAuthenticated } = useContext(AuthenticatedContext);
  const logoutHandler = async () => {
    try {
      //needs await and order is important here!!!
      await setRedirect(<Redirect to="/" />);
      setIsAuthenticated(false);
      await userLogoutAPI();

      console.log("LOGOUT");
    } catch (e) {
      console.log("FAILED loggingout", e);
    }
  };
  return (
    <div className={classes.main}>
      <Link style={{ textDecoration: "none" }} to="/myteams">
        <Heading value="My Teams" />
      </Link>
      <Link style={{ textDecoration: "none" }} to="/friendlists">
        <Heading value="My Connections" />
      </Link>
      <Heading value="Account Setting" />
      <div onClick={logoutHandler}>
        <Heading value="Log out" />
      </div>
      {redirect}
    </div>
  );
};

export default HamburgerPrompt;
