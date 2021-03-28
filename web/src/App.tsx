import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthenticatedContext } from "./AuthenticatedContext";

import "./App.css";
import {
  AuthPage,
  PersonalInfoPage,
  SelectInterestPage,
  FriendsPage,
  FindTeamPage,
  RecruitMemberPage,
  TestPage,
} from "@pages/index";
import axios from "@src/axiosInstance/axiosInstance";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [numUseEffect, setNumUseEffect] = useState<number>(0);
  let routes: any = null;

  useEffect(() => {
    console.log("Fetching data GET /api/users");
    const fetchUserData = async () => {
      try {
        const userData = await axios.get("/api/users");
        console.log("Successfully GET userData", userData);
        setIsAuthenticated(true);
      } catch (e) {
        console.log("Errors FETCHING userData", e);
      }
    };
    fetchUserData();
    console.log("Am I Authen?", isAuthenticated);
    setNumUseEffect((old) => old + 1);
  }, [isAuthenticated]);
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
      {numUseEffect}
    </div>
  );
};

export default App;
