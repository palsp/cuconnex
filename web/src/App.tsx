import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import {
  AuthPage,
  PersonalInfoPage,
  SelectInterestPage,
  FriendsPage,
  FindTeamPage,
  RecruitMemberPage,
} from "@pages/index";

const App: React.FC = () => {
  let routes = (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={AuthPage} />
        <Route path="/selectinterests" exact component={SelectInterestPage} />
        <Route path="/personalInformation" exact component={PersonalInfoPage} />
        <Route path="/friendlists" exact component={FriendsPage} />
        <Route path="/findteams" exact component={FindTeamPage} />
        <Route path="/recruitmembers" exact component={RecruitMemberPage} />
        <Route path="/" render={() => <h1>Nothing to see here!!!</h1>} />
      </Switch>
    </BrowserRouter>
  );
  return <div>{routes}</div>;
};

export default App;
