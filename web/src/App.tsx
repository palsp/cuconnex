import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { AuthenticatedContext } from "@src/AuthenticatedContext";
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
  ProfilePage,
  LandingPage,
  SelectEventPage,
  SelectTeamPage,
} from "@pages/index";

import { fetchUserDataAPI, userLogoutAPI } from "@api/index";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [redirect, setRedirect] = useState<JSX.Element>();

  const fetchDataHandler = async () => {
    try {
      const userData = await fetchUserDataAPI();
      setIsAuthenticated(true);
      console.log("SUCCESS fetchDataHandler", userData);
    } catch (e) {
      console.log("fetchDataHandler error", e);
    }
  };
  const logoutHandler = async () => {
    try {
      await userLogoutAPI();
      setIsAuthenticated(false);
      setRedirect(<Redirect to="/" />);
    } catch (e) {
      console.log("FAILED loggingout", e);
    }
  };

  const routes = isAuthenticated ? (
    <BrowserRouter>
      <AuthenticatedContext.Provider
        value={{ isAuthenticated, setIsAuthenticated }}
      >
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
          <Route path="/success" exact component={SuccessPage} />
          <Route path="/landing" exact component={LandingPage} />
          <Route path="/myteams" exact component={MyTeamPage} />
          <Route path="/profile" exact component={ProfilePage} />
          <Route path="/selectevents" exact component={SelectEventPage} />
          <Route path="/selectteams" exact component={SelectTeamPage} />
          <Route path="/test" exact component={TestPage} />
          <Route path="/" render={() => <h1>Nothing to see here!!!</h1>} />
        </Switch>
      </AuthenticatedContext.Provider>
    </BrowserRouter>
  ) : (
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

      <button onClick={fetchDataHandler}>FETCH</button>
      <button onClick={logoutHandler}>LOGOUT</button>
    </div>
  );
};

export default App;
