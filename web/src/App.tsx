import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { AuthenticatedContext } from "@hooks/AuthenticatedContext";
import { UserDataContext } from "@hooks/UserDataContext";
import {
  AuthPage,
  PersonalInfoPage,
  SelectInterestPage,
  FriendsPage,
  RecruitMemberPage,
  TestPage,
  SuccessPage,
  MyTeamPage,
  ProfilePage,
  LandingPage,
  SelectEventPage,
  SelectTeamPage,
  SelectMemberPage,
  TeamDetail,
  ExplorePage,
} from "@pages/index";

import PushPage from "@pages/PushPage/PushPage";
import CreateTeamPage from "@pages/CreateTeamPage/CreateTeamPage";
import classes from "./App.module.css";
import CreateTeamPrompt from "@pages/CreateTeamPage/CreateTeamPrompt/CreateTeamPrompt";
import { IUser } from "@models/index";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUser>({
    id: "",
    name: "",
    interests: {
      Technology: [],
      Business: [],
      Design: [],
    },
    faculty: "",
    image: "",
  });

  const [heightStyle, setHeightStyle] = useState({});

  useEffect(() => {
    setHeightStyle({ height: `${window.innerHeight}px` });
  }, []);

  const routes = isAuthenticated ? (
    <BrowserRouter>
      <AuthenticatedContext.Provider
        value={{ isAuthenticated, setIsAuthenticated }}
      >
        <UserDataContext.Provider value={{ userData, setUserData }}>
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
            {/* <Route path="/findteams" exact component={FindTeamPage} /> */}
            {/* <Route path="/recruitmembers" exact component={RecruitMemberPage} /> */}
            <Route path="/success" exact component={SuccessPage} />
            <Route path="/landing" exact component={LandingPage} />
            <Route path="/myteams" exact component={MyTeamPage} />
            <Route path="/profile" exact component={ProfilePage} />
            <Route path="/selectevents" exact component={SelectEventPage} />
            <Route path="/selectteams" exact component={SelectTeamPage} />
            <Route path="/post" exact component={PushPage} />
            <Route path="/selectmember" exact component={SelectMemberPage} />
            <Route path="/createteam" exact component={CreateTeamPage} />
            <Route path="/teamdetail" exact component={TeamDetail} />
            <Route path="/explore" exact component={ExplorePage} />
            <Route path="/testprompt" exact component={CreateTeamPrompt} />
            <Route path="/test" exact component={TestPage} />
            <Route path="/" component={LandingPage} />
          </Switch>
        </UserDataContext.Provider>
      </AuthenticatedContext.Provider>
    </BrowserRouter>
  ) : (
    <BrowserRouter>
      <AuthenticatedContext.Provider
        value={{ isAuthenticated, setIsAuthenticated }}
      >
        <UserDataContext.Provider value={{ userData, setUserData }}>
          <Switch>
            <Route path="/" exact component={AuthPage} />
            <Route path="/" render={() => <h1>Nothing to see here!!!</h1>} />
          </Switch>
        </UserDataContext.Provider>
      </AuthenticatedContext.Provider>
    </BrowserRouter>
  );

  return (
    <div className={classes.mainContainer} style={heightStyle}>
      {routes}
    </div>
  );
};

export default App;
