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
import axios from "axios";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  let routes: any = null;
  useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    console.log("fetching data");
    const fetchUserData = async () => {
      try {
        const userData = await axios.get("https://connex.test/api/users");
        console.log(userData);
        setIsAuthenticated(true);
      } catch (e) {
        console.log("Errors FETCHING", e);
      }
    };
    fetchUserData();
  }, []);
  if (isAuthenticated) {
    routes = (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={AuthPage} />
          <Route path="/selectinterests" exact component={SelectInterestPage} />
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
    </div>
  );
};

export default App;
