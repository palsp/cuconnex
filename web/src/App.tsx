import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { AuthenticatedContext } from "./AuthenticatedContext";
import axios from "@src/axiosInstance/axiosInstance";
import "./App.css";
import {
  AuthPage,
  PersonalInfoPage,
  SelectInterestPage,
  FriendsPage,
  FindTeamPage,
  RecruitMemberPage,
  TestPage,
  SuccessPage,
  MyTeamPage,
} from "@pages/index";

import LandingPage from "@pages/LandingPage/LandingPage";
import classes from "*.module.css";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [redirect, setRedirect] = useState<any>();
  // const [numUseEffect, setNumUseEffect] = useState<number>(0);

  let routes: any = null;

  // useEffect(() => {
  //   console.log("Fetching data GET /api/users");
  //   const fetchUserData = async () => {
  //     try {
  //       const userData = await axios.get("/api/users");
  //       console.log("Successfully GET userData", userData);
  //       setIsAuthenticated(true);
  //     } catch (e) {
  //       console.log("Errors FETCHING userData", e);
  //     }
  //   };
  //   fetchUserData();
  //   console.log("Am I Authen?", isAuthenticated);
  //   setNumUseEffect((old) => old + 1);
  // }, [isAuthenticated]);
  const testFetchData = async () => {
    try {
      const resultGET = await axios.get("/api/users");
      setIsAuthenticated(true);
      console.log("SUCCESS testFetchData", resultGET);
    } catch (e) {
      console.log("testFetchData error", e);
    }
  };
  const handleLogout = async () => {
    try {
      const resultLogout = await axios.post("/api/auth/signout");
      setIsAuthenticated(false);
      setRedirect(<Redirect to="/" />);
      console.log("SUCCESSFULLY Logout", resultLogout);
    } catch (e) {
      console.log("logout ERROR", e);
    }
  };
  if (isAuthenticated) {
    routes = (
      <BrowserRouter>
        <AuthenticatedContext.Provider
          value={{ isAuthenticated, setIsAuthenticated }}
        >
          <Switch>
            <Route path="/" exact component={AuthPage} />
            <Route
              path="/selectinterests"
              exact
              component={SelectInterestPage}
            />
            <Route
              path="/personalInformation"
              exact
              component={PersonalInfoPage}
            />
            <Route path="/friendlists" exact component={FriendsPage} />
            <Route path="/findteams" exact component={FindTeamPage} />
            <Route path="/recruitmembers" exact component={RecruitMemberPage} />
            <Route path="/success" exact component={SuccessPage} />
            <Route path="/landing" exact component={LandingPage} />
            <Route path="/myteam" exact component={MyTeamPage} />
            <Route path="/test" exact component={TestPage} />
            <Route path="/" render={() => <h1>Nothing to see here!!!</h1>} />
          </Switch>
        </AuthenticatedContext.Provider>
      </BrowserRouter>
    );
  } else if (!isAuthenticated) {
    routes = (
      <BrowserRouter>
        <AuthenticatedContext.Provider
          value={{ isAuthenticated, setIsAuthenticated }}
        >
          <Switch>
            <Route path="/" exact component={AuthPage} />
            {redirect}
            <Route path="/" render={() => <h1>Nothing to see here!!!</h1>} />
          </Switch>
        </AuthenticatedContext.Provider>
      </BrowserRouter>
    );
  }

  return (
    <div>
      {routes}
      <button
        onClick={() => {
          setIsAuthenticated(true);
        }}
      >
        LOG IN
      </button>
      <button
        onClick={() => {
          console.log("show state", isAuthenticated);
        }}
      >
        Show state
      </button>
      <button
        onClick={() => {
          console.log("show route", routes.props.children);
        }}
      >
        Show route
      </button>
      <button
        onClick={() => {
          testFetchData();
        }}
      >
        FETCH
      </button>
      <button
        onClick={() => {
          handleLogout();
        }}
      >
        LOGOUT
      </button>
      {/* {numUseEffect} */}
    </div>
  );
};

export default App;
