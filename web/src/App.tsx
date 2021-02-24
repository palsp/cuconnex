import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import AuthPage from "./Pages/AuthPage/AuthPage";
import PersonalInfoPage from "./Pages/PersonalInfoPage/PersonalInfoPage";
import SelectInterestPage from "./Pages/SelectInterestPage/SelectInterestPage";
import FriendsPage from "./Pages/FriendsPage/FriendsPage";
import FindTeamPage from "./Pages/FindTeamPage/FindTeamPage";
import RecruitMember from "./Pages/RecruitMemberPage/RecruitMemberPage";

const App: React.FC = () => {
  let routes = (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={AuthPage} />
        <Route path="/selectinterests" exact component={SelectInterestPage} />
        <Route path="/personalInformation" exact component={PersonalInfoPage} />
        <Route path="/friendlists" exact component={FriendsPage} />
        <Route path="/findteams" exact component={FindTeamPage} />
        <Route path="/recruitmembers" exact component={RecruitMember} />
        <Route path="/" render={() => <h1>Nothing to see here!!!</h1>} />
      </Switch>
    </BrowserRouter>
  );
  return <div>{routes}</div>;
};

export default App;
