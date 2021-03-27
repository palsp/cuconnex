import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

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

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  let routes;
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
        <Switch>
          <Route
            path="/"
            exact
            component={() => (
              <AuthPage setIsAuthenticated={setIsAuthenticated} />
            )}
          />
          <Route path="/" render={() => <h1>Nothing to see here!!!</h1>} />
        </Switch>
      </BrowserRouter>
    );
  }

  return <div>{routes}</div>;
};

export default App;
