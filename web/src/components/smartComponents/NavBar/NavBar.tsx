import React from "react";
import classes from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { Close, Mail, Search } from "@dumbComponents/UI/Icons";
import { Hamburger } from "@dumbComponents/UI";

interface Props {
  displayHamburgerMenu: boolean;
  setDisplayHamburgerMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar: React.FC<Props> = (props) => {
  const { displayHamburgerMenu, setDisplayHamburgerMenu } = props;

  const hamburgerHandler = () => {
    setDisplayHamburgerMenu((prev) => !prev);
  };

  return (
    <div className={classes.navContainer}>
      <div className={classes.nav}>
        <Link to="/explore">
          <div className={classes.search}>
            <Search />
          </div>
        </Link>

        <div className={classes.rightIcons}>
          <Link to="/notification">
            <div className={classes.mail}>
              <Mail />
            </div>
          </Link>

          <div onClick={hamburgerHandler} className={classes.hamburger}>
            {displayHamburgerMenu ? <Close /> : <Hamburger />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
